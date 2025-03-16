from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()  # 현재 사용 중인 유저 모델

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # ✅ 유저 ID 저장
    username = models.CharField(max_length=50)  # ✅ 유저 닉네임 저장
    theme_id = models.IntegerField()  # ✅ 방탈출 테마 ID 저장
    theme_title = models.CharField(max_length=255)  # ✅ 방탈출 테마 제목 저장
    branch = models.CharField(max_length=255)  # ✅ 방탈출 지점 저장
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # ⭐ 별점 (1~5)
    experience_date = models.DateField()  # 체험일자
    keywords = models.JSONField(default=list)  # ✅ 키워드 (최대 3개 선택)
    success = models.BooleanField()  # 탈출 여부 (성공/실패)
    content = models.TextField(blank=True, null=True)  # 리뷰 내용
    created_at = models.DateTimeField(auto_now_add=True)  # ✅ 최신순 정렬용

    def __str__(self):
        return f"{self.username} - {self.theme_title} ({self.branch}) - {self.rating}★"
