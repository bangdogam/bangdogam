from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, user_id, username, password=None, **extra_fields):
        if not user_id:
            raise ValueError("아이디(user_id)는 필수 입력 사항입니다.")
        user = self.model(user_id=user_id, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(user_id, username, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.CharField(max_length=30, unique=True, default="default_user") # 로그인용 아이디
    username = models.CharField(max_length=50)  # 닉네임
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "user_id"  # 로그인할 때 사용할 필드
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username

