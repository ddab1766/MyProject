# Generated by Django 3.0.4 on 2021-02-01 17:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('company_profile', '0002_auto_20210201_1656'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jobapplicant',
            name='hrprofile',
        ),
    ]
