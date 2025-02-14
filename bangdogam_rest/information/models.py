from django.db import models

class RoomEscapeInfo(models.Model):
    branch = models.CharField(max_length=30, verbose_name="지점", null=True)
    title = models.CharField(max_length=255, verbose_name="이름", null=True)
    image_url = models.URLField(verbose_name="이미지", null=True)
    genre = models.CharField(max_length=100, verbose_name="장르", null=True)
    time = models.CharField(max_length=10, verbose_name="이용시간", null=True)
    difficulty = models.CharField(max_length=10, verbose_name="난이도", null=True)
    horror = models.CharField(max_length=30, null=True, verbose_name="공포도")
    description = models.TextField(verbose_name="세부 설명", null=True)
    booking_link = models.URLField(verbose_name="예약 링크", null=True)

    def __str__(self):
        return self.title
