# Generated by Django 3.0.4 on 2021-03-24 09:37

import company_profile.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hr_profile', '0008_auto_20210225_1623'),
        ('company_profile', '0018_auto_20210319_0929'),
    ]

    operations = [
        migrations.CreateModel(
            name='Estimate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('modified_time', models.DateTimeField(auto_now=True)),
                ('hrprofile', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='estimate_hrprofile', to='hr_profile.HrProfile')),
                ('sugub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='estimate_sugub', to='company_profile.Sugub', verbose_name='예상견적서')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='estimate_user', to=settings.AUTH_USER_MODEL, verbose_name='작성자')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='EstimateFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('modified_time', models.DateTimeField(auto_now=True)),
                ('estimate_file', models.FileField(blank=True, null=True, upload_to=company_profile.models.estimate_directory_path, verbose_name='예상견적서 관련파일')),
                ('estimate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company_profile.Estimate')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
