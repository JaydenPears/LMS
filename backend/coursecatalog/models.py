from django.db import models


# Create your models here.
class Teacher(models.Model):
    fio = models.CharField(max_length=10000)
    photo = models.ImageField(upload_to='teachers_photos/')