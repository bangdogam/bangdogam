# Create your models here.
from django.db import models

class BangRanking(models.Model):
    id = models.AutoField(primary_key=True)
    branch = models.CharField(max_length=100)  # 홍대, 건대, 강남 등
    title = models.CharField(max_length=255)  # 방탈출 테마 이름

    class Meta:
        managed = False  # ✅ Django가 직접 관리하지 않도록 설정
        db_table = "bang"
