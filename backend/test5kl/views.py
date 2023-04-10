import json

from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view

from .serializers import TestSerializer
from .models import Test, Answer, Task



class TestView(viewsets.ModelViewSet):
    serializer_class = TestSerializer
    queryset = Test.objects.all()

@api_view(['POST', 'GET'])
def get_result(request):
    if request.method == 'POST':
        data = request.data
        answer = Answer()
        answer.fio = data['username']
        result = []
        for res in data['answers']:
            correct_answer = Task.objects.filter(pk=res['id'])[0].correct_answer
            user_answer = res['user_answer']
            correctness = str(int(user_answer == correct_answer))
            result.append('|'.join((correctness, user_answer, correct_answer)))
        answer.answer = ';'.join(result)
        answer.save()
    return HttpResponse("Спасибо за участие!")
