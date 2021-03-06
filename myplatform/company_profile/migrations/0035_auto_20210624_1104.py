# Generated by Django 3.0.4 on 2021-06-24 02:04

import company_profile.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hr_profile', '0017_hrprofile_status_reason'),
        ('company_profile', '0034_auto_20210615_1457'),
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
        migrations.CreateModel(
            name='SugubSuccess',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('modified_time', models.DateTimeField(auto_now=True)),
                ('chae_cd', models.CharField(blank=True, max_length=100, null=True, verbose_name='채용형태')),
                ('sugub_jikjong', models.CharField(blank=True, max_length=500, null=True, verbose_name='직종')),
                ('work_position', models.CharField(blank=True, max_length=50, null=True, verbose_name='포지션')),
                ('work_role', models.TextField(blank=True, max_length=5000, null=True, verbose_name='담당업무')),
                ('sugub_career_gb', models.CharField(blank=True, max_length=50, null=True, verbose_name='경력')),
                ('education_cd', models.CharField(blank=True, max_length=50, null=True, verbose_name='학력')),
                ('salary_gubun', models.CharField(blank=True, max_length=50, null=True, verbose_name='연봉')),
                ('work_load_addr', models.CharField(blank=True, max_length=100, null=True, verbose_name='실근무지')),
                ('spec', models.TextField(blank=True, max_length=5000, null=True, verbose_name='필수/우대사항')),
                ('bokri', models.TextField(blank=True, max_length=5000, null=True, verbose_name='복리후생')),
                ('hrprofile', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='hr_profile.HrProfile', verbose_name='HR회사')),
                ('sugub', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='sugub_sugubsuccess', to='company_profile.Sugub', verbose_name='합격채용의뢰서')),
            ],
            options={
                'verbose_name_plural': '2_2. 합격 채용의뢰서 / SugubSuccess',
            },
        ),
    ]
