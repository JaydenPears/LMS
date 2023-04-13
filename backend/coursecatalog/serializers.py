from rest_framework import serializers

from coursecatalog.models import Course


class CatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id',
                  'name',
                  'teacher',)