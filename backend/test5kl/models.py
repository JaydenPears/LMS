from django.db import models


class Task(models.Model):
    description = models.CharField(max_length=10000)
    type = models.IntegerField()
    correct_answer = models.CharField(max_length=500)


class Test(models.Model):
    task = models.ManyToManyField(Task)

    def get_tasks(self):
        task_list = self.task.all()
        task_str = ''
        for task in task_list:
            task_str += ', ' + task.description
        return task_str.lstrip(', ')


class Answer(models.Model):
    fio = models.CharField(max_length=500)
    answer = models.CharField(max_length=10000)
