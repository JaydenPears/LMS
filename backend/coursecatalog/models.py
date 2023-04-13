from django.core.exceptions import ValidationError
from django.db import models


class Teacher(models.Model):
    fio = models.CharField(max_length=10000)
    photo = models.ImageField(upload_to='teachers_photos/')

    def __str__(self):
        return self.fio


class Building(models.Model):
    address = models.CharField(max_length=500, verbose_name='Адрес')

    def __str__(self):
        return self.address

    class Meta:
        verbose_name = 'Здание'


class Department(models.Model):
    name = models.CharField(max_length=500, verbose_name='Название')
    icon = models.ImageField(upload_to='department_icons/',
                             verbose_name='Изображение')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Направленность'


class Course(models.Model):
    CLASS_LIST = [(f'{i}', f'{i} класс') for i in range(1, 12)]
    FINANCING_TYPES = [
        ('Бесплатно', 'Бесплатно'),
        ('Платно', 'Платно'),
    ]
    FORMAT_TYPES = [
        ('Очно', 'Очно'),
        ('Дистанционно', 'Дистанционно'),
    ]
    name = models.CharField(max_length=500,
                            verbose_name='Название курса')
    short_description = models.CharField(max_length=300,
                                         verbose_name='Короткое описание')
    long_description = models.CharField(max_length=100000,
                                        verbose_name='Полное описание')
    start_class = models.CharField(max_length=100, choices=CLASS_LIST,
                               verbose_name='Класс от')
    end_class = models.CharField(max_length=100, choices=CLASS_LIST,
                                   verbose_name='Класс до')
    financing = models.CharField(max_length=100, choices=FINANCING_TYPES,
                                   verbose_name='Финансирование')
    link = models.URLField(verbose_name='Ссылка на курс')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE,
                                verbose_name='Учитель')
    department = models.ForeignKey(Department, on_delete=models.CASCADE,
                                verbose_name='Направленность')
    building = models.ForeignKey(Building, on_delete=models.CASCADE,
                                   verbose_name='Здание')
    format = models.CharField(max_length=100, choices=FORMAT_TYPES,
                                   verbose_name='Формат проведения')


    class Meta:
        verbose_name = 'Курс'


class Lesson(models.Model):
    WEEKDAY_LIST = [
        ('Понедельник', 'Понедельник'),
        ('Вторник', 'Вторник'),
        ('Среда', 'Среда'),
        ('Четверг', 'Четверг'),
        ('Пятница', 'Пятница'),
        ('Суббота', 'Суббота'),
        ('Воскресение', 'Воскресение'),
    ]
    weekday = models.CharField(max_length=500, choices=WEEKDAY_LIST,
                               verbose_name='День недели')
    start_time = models.CharField(max_length=10,
                                  verbose_name='Время начала в формате 09:15')
    end_time = models.CharField(max_length=10,
                                  verbose_name='Время окончания в формате 10:15')
    course = models.ForeignKey(Course, on_delete=models.CASCADE,
                                   verbose_name='Занятие')

    def clean(self):
        """Здесь будет валидация"""
        cleaned_data = super().clean()
        #true_answer = cleaned_data.get("true_answer")
        #print(self.start_time)
        #raise ValidationError("Время занятия введено некорректно")
        return cleaned_data

    class Meta:
        verbose_name = 'Занятие'