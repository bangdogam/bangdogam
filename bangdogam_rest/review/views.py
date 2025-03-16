from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.db import connections
from .models import Review
from .serializers import ReviewSerializer


class ReviewCreateView(APIView):
    """ 리뷰 작성 API (유저 정보 & bang.db에서 theme_id, branch 자동 저장) """

    @method_decorator(login_required)
    def post(self, request):
        data = request.data.copy()

        # ✅ 로그인한 유저 정보 가져오기 (유저 ID, 닉네임)
        user = request.user
        data["user"] = user.id  # ✅ 유저 ID 저장
        data["username"] = user.username  # ✅ 유저 닉네임 저장

        theme_title = data.get("theme_title")
        rating = data.get("rating")

        print("theme_title 데이터 타입:", type(theme_title))
        print("theme_title 값:", theme_title)

        # ✅ bang.db에서 theme_id, branch 가져오기
        with connections["bang_db"].cursor() as cursor:
            query = "SELECT id, branch FROM bang WHERE title = :title"
            cursor.execute(query, {"title": theme_title})  # ✅ 올바른 방식으로 수정
            result = cursor.fetchone()

        if not result:
            return Response({"error": "해당 테마를 찾을 수 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

        theme_id, branch = result
        data["theme_id"] = theme_id
        data["branch"] = branch

        print(f"🎯 theme_id: {theme_id}, branch: {branch}")

        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

            print("✅ 리뷰 저장 완료. 평균 별점 업데이트 시작...")
            self.update_rating(theme_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update_rating(self, theme_id):
        """해당 테마의 모든 리뷰에서 평균 rating을 계산하여 bang.db에 반영"""
        # ✅ theme_id가 None이 아닌지 확인
        if not theme_id:
            print("🚨 오류: theme_id가 None입니다.")
            return

        print(f"🔍 update_rating() 실행 - theme_id: {theme_id}")

        # ✅ 평균 별점 계산
        with connections["default"].cursor() as cursor:
            cursor.execute("SELECT AVG(rating) FROM review_review WHERE theme_id = :theme_id", {"theme_id": theme_id})
            avg_rating = cursor.fetchone()[0] or 0  # 별점이 없으면 기본값 0

        print(f"⭐ 평균 rating 계산 완료: {avg_rating}")

        # ✅ SQLite 쿼리 실행 시 named placeholder 사용
        with connections["bang_db"].cursor() as cursor:
            cursor.execute("UPDATE bang SET rating = :rating WHERE id = :theme_id",
                           {"rating": avg_rating, "theme_id": theme_id})

        print(f"✅ bang.db 업데이트 완료: theme_id={theme_id}, rating={avg_rating}")


class AllReviewsView(APIView):
    """ 모든 리뷰 조회 (최신순) """
    def get(self, request):
        reviews = Review.objects.all().order_by("-created_at")  # ✅ 최신순 정렬
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ThemeReviewsView(APIView):
    """ 특정 방탈출 테마의 리뷰 조회 """
    def get(self, request, theme_id):
        reviews = Review.objects.filter(theme_id=theme_id).order_by("-created_at")  # ✅ 해당 테마 리뷰만 최신순 정렬
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)