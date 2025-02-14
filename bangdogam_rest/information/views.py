from rest_framework import generics
from .models import RoomEscapeInfo
from .serializers import RoomEscapeInfoSerializer

class RoomEscapeInfoList(generics.ListAPIView):
    queryset = RoomEscapeInfo.objects.all()
    serializer_class = RoomEscapeInfoSerializer
