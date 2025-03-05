from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from .models import CustomUser
from .serializers import UserSerializer

class SignUpAPI(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "회원가입 성공!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPI(APIView):
    def post(self, request):
        user_id = request.data.get("user_id")
        password = request.data.get("password")
        user = authenticate(request, user_id=user_id, password=password)
        if user:
            login(request, user)
            return Response({"message": "로그인 성공!"}, status=status.HTTP_200_OK)
        return Response({"error": "로그인 실패"}, status=status.HTTP_401_UNAUTHORIZED)

