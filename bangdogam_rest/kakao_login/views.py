import requests
from django.http import JsonResponse
from django.conf import settings

def kakao_login(request):
    kakao_auth_url = f"https://kauth.kakao.com/oauth/authorize?client_id={settings.KAKAO_REST_API_KEY}&redirect_uri={settings.KAKAO_REDIRECT_URI}&response_type=code"
    return JsonResponse({"auth_url": kakao_auth_url})


def kakao_callback(request):
    code = request.GET.get("code")

    token_request = requests.post(
        "https://kauth.kakao.com/oauth/token",
        data={
            "grant_type": "authorization_code",
            "client_id": settings.KAKAO_REST_API_KEY,
            "redirect_uri": settings.KAKAO_REDIRECT_URI,
            "code": code,
        },
    )
    token_response_json = token_request.json()
    access_token = token_response_json.get("access_token")

    user_info_request = requests.get(
        "https://kapi.kakao.com/v2/user/me",
        headers={"Authorization": f"Bearer {access_token}"},
    )
    user_info_json = user_info_request.json()

    user_email = user_info_json.get("kakao_account", {}).get("email")

    return JsonResponse({"email": user_email, "access_token": access_token})
