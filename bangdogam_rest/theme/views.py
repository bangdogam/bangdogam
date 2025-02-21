from django.http import JsonResponse
from django.db import connections

# 영어-한글 변환 딕셔너리
BRANCH_MAP = {
    "hongdae": "홍대",
    "gundae": "건대",
    "gangnam": "강남"
}

GENRE_MAP = {
    "horror": "공포", "stealth": "잠입", "mystery": "미스", "fun": "병맛",
    "thriller": "스릴러", "survival": "생존", "adventure": "어드벤처", "fantasy": "판타지",
    "sentimental": "감성", "sf": "SF", "drama": "드라마", "mission": "미션",
    "crime": "범죄", "detective": "추리", "comic": "코믹", "challenge": "도전",
    "action": "액션", "etc": "?"  # ✅ 18개 테마
}


def get_theme_data(request, branch=None, genre=None):
    """ 특정 지역(홍대, 건대, 강남) 및 특정 테마(공포, 미스터리 등)로 필터링 """
    branch_korean = BRANCH_MAP.get(branch, branch) if branch else "all"
    genre_korean = GENRE_MAP.get(genre, genre) if genre else None  # ✅ 장르 변환 (없으면 None)

    with connections["bang_db"].cursor() as cursor:
        if branch_korean == "all" and not genre_korean:
            query = "SELECT * FROM bang"  # ✅ 모든 데이터 반환
            cursor.execute(query)
        elif branch_korean == "all" and genre_korean:
            query = "SELECT * FROM bang WHERE genre LIKE :genre"  # ✅ 장르 필터만 적용
            cursor.execute(query, {"genre": f"%{genre_korean}%"})
        elif genre_korean:
            query = "SELECT * FROM bang WHERE branch LIKE :branch AND genre LIKE :genre"  # ✅ 지역 + 장르 필터링
            cursor.execute(query, {"branch": f"%{branch_korean}%", "genre": f"%{genre_korean}%"})
        else:
            query = "SELECT * FROM bang WHERE branch LIKE :branch"  # ✅ 지역 필터만 적용
            cursor.execute(query, {"branch": f"%{branch_korean}%"})

        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()

    data = [dict(zip(columns, row)) for row in rows]

    return JsonResponse(data, safe=False)

# Create your views here.
