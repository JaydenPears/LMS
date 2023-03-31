import json

from django.core.management.base import BaseCommand, CommandError
from test5kl.models import Task


class Command(BaseCommand):
    help = 'Import new tasks from tasks.json'

    def handle(self, *args, **options):
        with open('tasks.json') as tasks_file:
            f = tasks_file.read()
            data = json.loads(f)
            for item in data:
                task = Task()
                task.type = item['type']
                task.description = item['description']
                task.correct_answer = item['correct_answer']
                task.save()