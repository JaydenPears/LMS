from django.contrib import admin
from .models import Task, Test, Answer


class TaskAdmin(admin.ModelAdmin):
    list_display = ('description', 'type', 'correct_answer')


class TestAdmin(admin.ModelAdmin):
    list_display = ('get_tasks', )


class AnswerAdmin(admin.ModelAdmin):
    list_display = ('test', 'answer')


admin.site.register(Task, TaskAdmin)
admin.site.register(Test, TestAdmin)
admin.site.register(Answer, AnswerAdmin)