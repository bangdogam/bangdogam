from django.http import JsonResponse
from django.db import connections
from django.middleware.csrf import get_token

def search_data(request):
    """ 방탈출 테마 제목(title)으로 검색하는 API """
    query_param = request.GET.get("q", None)

    if query_param is None or query_param.strip() == "":
        return JsonResponse({"error": "검색어를 입력해주세요."}, status=400)

    with connections["bang_db"].cursor() as cursor:
        query = "SELECT * FROM bang WHERE title LIKE :title"
        cursor.execute(query, {"title": f"%{query_param}%"})

        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()

    data = [dict(zip(columns, row)) for row in rows]

    return JsonResponse(data, safe=False)

def csrf_token_view(request):
    return JsonResponse({"csrfToken": get_token(request)})
