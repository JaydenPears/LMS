"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from backend import settings
from test5kl import views
from coursecatalog import views as course_view

router = routers.DefaultRouter()
router.register(r'test5kl', views.TestView, 'test')
router.register(r'coursecatalog', course_view.CatalogView)
router.register(r'departments', course_view.DepartmentView)
router.register(r'departments-icons', course_view.DepartmentImagesView)
router.register(r'buildings', course_view.BuildingView)
router.register(r'teacher', course_view.TeacherView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/get-answer/', views.get_result),
    path('api/catalog/', course_view.catalog),
    path('api/catalog/<int:pk>/', course_view.course_view),
    path('api/activities/', course_view.activities),
    path('api/addresses/', course_view.addresses),
    path('api/departments-name-dict/', course_view.departments_name_dict),
    path('api/departments-icons-dict/', course_view.departments_images_dict)

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
