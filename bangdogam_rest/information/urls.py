from django.urls import path
from .views import RoomEscapeInfoList

urlpatterns = [
    path('api/roomescapes/', RoomEscapeInfoList.as_view(), name='roomescape-list'),
]
