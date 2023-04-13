from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from coursecatalog.models import Course, Lesson
from coursecatalog.serializers import CatalogSerializer


class CatalogView(viewsets.ModelViewSet):
    serializer_class = CatalogSerializer
    queryset = Course.objects.all()


@api_view(['GET', ])
def catalog(request):
    response = []
    courses = Course.objects.all()
    for course in courses:
        lessons = Lesson.objects.filter(course=course.pk)
        res = {'id_course': course.pk, 'type_of_activity': course.format,
               'name': course.name, 'teacher': course.teacher.fio,
               'address': course.building.address,
               'age_limit': [course.start_class, course.end_class],
               'schedule': [lesson.weekday for lesson in lessons],
               'short_description': course.short_description,
               'url': course.link, 'cost':course.financing,
               'department':course.department.name}
        response.append(res)
    return Response(response)


@api_view(['GET', ])
def course_view(request, pk):
    course = get_object_or_404(Course, pk=pk)
    lessons = Lesson.objects.filter(course=course.pk)
    res = {'id_course': course.pk, 'type_of_activity': course.format,
           'name': course.name, 'teacher': course.teacher.fio,
           'address': course.building.address,
           'age_limit': [course.start_class, course.end_class],
           'schedule': [(lesson.weekday, lesson.start_time, lesson.end_time)
                        for lesson in lessons],
           'short_description': course.short_description,
           'full_description': course.long_description,
           'url': course.link, 'cost':course.financing,
           'department':course.department.name}
    return Response(res)