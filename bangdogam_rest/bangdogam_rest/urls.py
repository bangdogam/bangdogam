from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls")),  # accounts 앱의 API 포함
    path("ranking/", include("ranking.urls")),  # ✅ 랭킹 API 추가
    path("theme/", include("theme.urls")),  # ✅ 테마 API 추가
    path('information/', include('information.urls')),  # API 라우팅 추가
    path('api/', include('kakao_login.urls')),
]

