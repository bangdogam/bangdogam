from django.urls import path
from .views import SignUpAPI, LoginAPI
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("signup/", SignUpAPI.as_view(), name="signup_api"),
    path("login/", LoginAPI.as_view(), name="login_api"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]


