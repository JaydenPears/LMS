from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from coursecatalog.models import Course, Lesson, Department, Building, Teacher
from coursecatalog.serializers import CatalogSerializer, DepartmentSerializer, \
    DepartmentImagesSerializer, BuildingSerializer, TeacherSerializer


class CatalogView(viewsets.ModelViewSet):
    serializer_class = CatalogSerializer
    queryset = Course.objects.all()


@api_view(['GET', ])
def catalog(request):
    response = []
    courses = Course.objects.all()
    for course in courses:
        lessons = Lesson.objects.filter(course=course.pk)
        res = {'id_course': course.pk, 'type_of_activity': course.department.pk,
               'name': course.name, 'teacher': course.teacher.fio,
               'address': course.building.address,
               'age_limit': [course.start_class, course.end_class],
               'schedule': [lesson.weekday for lesson in lessons],
               'short_description': course.short_description,
               'url': course.link, 'cost': course.financing,
               'format': course.format}
        response.append(res)
    return Response(response)


@api_view(['GET', ])
def course_view(request, pk):
    course = get_object_or_404(Course, pk=pk)
    lessons = Lesson.objects.filter(course=course.pk)
    WEEKDAY_DICT = {
        'Понедельник': 'ПН',
        'Вторник': 'ВТ',
        'Среда': 'СР',
        'Четверг': 'ЧТ',
        'Пятница': 'ПТ',
        'Суббота': 'СБ',
        'Воскресенье': 'ВС',
    }
    res = {'id_course': course.pk, 'type_of_activity': course.department.pk,
           'name': course.name, 'teacher': course.teacher.fio,
           'address': course.building.address,
           'age_limit': [course.start_class, course.end_class],
           'schedule': [{WEEKDAY_DICT[lesson.weekday]: [lesson.start_time, lesson.end_time]}
                        for lesson in lessons],
           'short_description': course.short_description,
           'full_description': course.long_description,
           'url': course.link, 'cost': course.financing,
           'format': course.format}
    return Response(res)


class DepartmentView(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()


class DepartmentImagesView(viewsets.ModelViewSet):
    serializer_class = DepartmentImagesSerializer
    queryset = Department.objects.all()


class BuildingView(viewsets.ModelViewSet):
    serializer_class = BuildingSerializer
    queryset = Building.objects.all()


class TeacherView(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()


@api_view(['GET', ])
def activities(request):
    departments = Department.objects.all()
    resp = {}
    for dep in departments:
        resp[dep.pk] = {'label': dep.name, 'value': dep.name}
    return Response(resp)


@api_view(['GET', ])
def addresses(request):
    all_buildings = Building.objects.all()
    resp = {}
    for building in all_buildings:
        resp[building.pk] = {'label': building.address,
                             'value': building.address}
    return Response(resp)