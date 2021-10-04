# Generated by Django 3.0.4 on 2021-06-07 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company_profile', '0028_jobapplicant_hrmanager'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='companyprofile',
            name='company_form',
        ),
        migrations.AlterField(
            model_name='sugub',
            name='bokri',
            field=models.TextField(blank=True, max_length=5000, null=True, verbose_name='복리후생'),
        ),
        migrations.AlterField(
            model_name='sugub',
            name='spec',
            field=models.TextField(blank=True, max_length=5000, null=True, verbose_name='필수/우대사항'),
        ),
        migrations.AlterField(
            model_name='sugub',
            name='work_load_addr',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='실근무지(도로명주소)'),
        ),
        migrations.AlterField(
            model_name='sugub',
            name='work_post_addr',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='실근무지(우편주소)'),
        ),
        migrations.AlterField(
            model_name='sugub',
            name='work_role',
            field=models.TextField(max_length=5000, null=True, verbose_name='담당업무'),
        ),
        migrations.AlterField(
            model_name='sugub',
            name='wrk_condition',
            field=models.TextField(blank=True, max_length=5000, null=True, verbose_name='근무조건'),
        ),
    ]