from rest_framework import serializers
from .models import RoomEscapeInfo

class RoomEscapeInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomEscapeInfo
        fields = '__all__'  # 모든 필드 직렬화
