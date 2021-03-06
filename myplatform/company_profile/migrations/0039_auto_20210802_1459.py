# Generated by Django 3.0.4 on 2021-08-02 05:59

import company_profile.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company_profile', '0038_auto_20210802_1400'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyprofile',
            name='company_image',
            field=models.ImageField(blank=True, null=True, upload_to=company_profile.models.company_directory_path, verbose_name='회사대표이미지'),
        ),
        migrations.AlterField(
            model_name='companyprofile',
            name='company_logo',
            field=models.ImageField(blank=True, null=True, upload_to=company_profile.models.company_directory_path, verbose_name='회사로고'),
        ),
    ]
