from django.urls import path
from .views import get_theme_data

urlpatterns = [
    path("", get_theme_data, name="get_theme_all"),
    path("<str:branch>/", get_theme_data, name="get_theme_data"),
    path("<str:branch>/<str:genre>/", get_theme_data, name="get_theme_filtered"),
]

