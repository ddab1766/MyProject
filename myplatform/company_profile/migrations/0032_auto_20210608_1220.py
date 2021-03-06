# Generated by Django 3.0.4 on 2021-06-08 03:20

import company_profile.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_alarmsetting'),
        ('company_profile', '0031_auto_20210608_1157'),
    ]

    operations = [
        migrations.AddField(
            model_name='sugubsign',
            name='sign_code',
            field=models.ForeignKey(blank=True, limit_choices_to={'code_topcd': None, 'comidx': 'CJ'}, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.ComCode', verbose_name='결재상태'),
        ),
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
