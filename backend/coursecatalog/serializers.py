from rest_framework import serializers

from coursecatalog.models import Course, Department, Building


class CatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'teacher',)


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id', 'name')


class DepartmentImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id', 'icon')


class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = ('id', 'address')