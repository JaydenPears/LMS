from django.contrib import admin

from coursecatalog.models import Teacher


# Register your models here.
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('fio', 'photo', )


admin.site.register(Teacher, TeacherAdmin)