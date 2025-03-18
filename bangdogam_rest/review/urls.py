from django.urls import path
from .views import ReviewCreateView, ThemeReviewsView, AllReviewsView

urlpatterns = [
    path("create/", ReviewCreateView.as_view(), name="create_review"),  # ✅ 리뷰 작성
    path("all/", AllReviewsView.as_view(), name="all_reviews"),  # ✅ 모든 리뷰 조회
    path("theme/<int:theme_id>/", ThemeReviewsView.as_view(), name="theme_reviews"),  # ✅ 특정 테마 리뷰 조회
]
