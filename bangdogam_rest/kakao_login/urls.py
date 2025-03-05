from django.urls import path
from .views import kakao_login, kakao_callback

urlpatterns = [
    path("login/kakao/", kakao_login, name="kakao-login"),
    path("login/kakao/callback/", kakao_callback, name="kakao-callback"),
]
