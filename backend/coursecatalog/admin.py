from django.contrib import admin

from coursecatalog.models import Teacher, Course, Lesson, Department, Building


# Register your models here.
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('fio', 'photo', )


class LessonAdmin(admin.StackedInline):
    model = Lesson
    extra = 1


class CourseAdmin(admin.ModelAdmin):
    inlines = [LessonAdmin, ]
    list_display = ('name', 'link', 'teacher',)


class BuildingAdmin(admin.ModelAdmin):
    list_display = ('address',)


class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name',)


admin.site.register(Course, CourseAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Department, DepartmentAdmin)
admin.site.register(Building, BuildingAdmin)
