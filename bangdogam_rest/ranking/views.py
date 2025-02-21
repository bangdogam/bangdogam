from django.http import JsonResponse
from django.db import connections

BRANCH_MAP = {
    "hongdae": "홍대",
    "gundae": "건대",
    "gangnam": "강남"
}


def get_ranking_data(request, branch=None):  # ✅ `branch=None`으로 기본값 설정
    """ 특정 지점(홍대, 건대, 강남)이 포함된 데이터만 필터링하고, 전체 조회 가능 """
    branch_korean = BRANCH_MAP.get(branch, branch) if branch else "all"

    with connections["bang_db"].cursor() as cursor:
        if branch_korean == "all":
            query = "SELECT * FROM bang"
            cursor.execute(query)
        else:
            query = "SELECT * FROM bang WHERE branch LIKE :branch"
            cursor.execute(query, {"branch": f"%{branch_korean}%"})

        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()

    data = [dict(zip(columns, row)) for row in rows]

    return JsonResponse(data, safe=False)

# Create your views here.
