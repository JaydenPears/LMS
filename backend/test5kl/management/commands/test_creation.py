import json
from random import choice

from django.core.management.base import BaseCommand, CommandError
from test5kl.models import Task, Test


class Command(BaseCommand):
    help = 'Create new test'

    def handle(self, *args, **options):
        test = Test()
        test.save()
        for i in range(1, 6):
            tasks_of_i_type = Task.objects.filter(type=i)
            test.task.add(choice(tasks_of_i_type).pk)
        test.save()
