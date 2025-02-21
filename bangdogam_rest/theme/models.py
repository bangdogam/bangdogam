from django.db import models

class BangTheme(models.Model):
    id = models.AutoField(primary_key=True)
    branch = models.CharField(max_length=100)  # 홍대, 건대, 강남 등
    title = models.CharField(max_length=255)  # 방탈출 테마 이름
    genre = models.CharField(max_length=100)  # 장르 (공포, 미스터리 등)
    difficulty = models.CharField(max_length=50)  # 난이도 (상, 중, 하)
    description = models.TextField()  # 설명

    class Meta:
        managed = False
        db_table = "bang"

# Create your models here.
