from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view

from .serializers import TestSerializer
from .models import Test

# Create your views here.

class TestView(viewsets.ModelViewSet):
    serializer_class = TestSerializer
    queryset = Test.objects.all()

@api_view(['POST'])
def get_result(request):
    if request.method == 'POST':
        data = request.data
        print(data)