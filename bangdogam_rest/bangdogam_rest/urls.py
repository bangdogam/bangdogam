from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('information/', include('information.urls')),
    path('api/', include('kakao_login.urls'))
]
