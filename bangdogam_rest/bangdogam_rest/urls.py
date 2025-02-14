from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('information/', include('information.urls')),  # API 라우팅 추가
]
