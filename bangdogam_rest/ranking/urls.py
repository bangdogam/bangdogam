from django.urls import path
from .views import get_ranking_data

urlpatterns = [
    path("", get_ranking_data, name="get_ranking_all"),
    path("<str:branch>/", get_ranking_data, name="get_ranking_data"),
]

