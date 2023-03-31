from rest_framework import serializers
from .models import Test, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'description',)


class TestSerializer(serializers.ModelSerializer):
    task = TaskSerializer(many=True)

    class Meta:
        model = Test
        fields = ('id', 'task', )
