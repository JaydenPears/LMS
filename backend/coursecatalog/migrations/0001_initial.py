# Generated by Django 4.1.7 on 2023-04-10 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fio', models.CharField(max_length=10000)),
                ('photo', models.ImageField(upload_to='teachers_photos/')),
            ],
        ),
    ]
