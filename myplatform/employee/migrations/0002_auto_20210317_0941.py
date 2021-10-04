# Generated by Django 3.0.4 on 2021-03-17 09:41

from django.db import migrations, models
import employee.models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='contractfile',
            options={'verbose_name_plural': '계약첨부파일 / ContractFile'},
        ),
        migrations.AlterField(
            model_name='contract',
            name='contract_gigan',
            field=models.IntegerField(blank=True, default=0, null=True, verbose_name='계약기간(개월)'),
        ),
        migrations.AlterField(
            model_name='contractfile',
            name='contract_file',
            field=models.FileField(blank=True, null=True, upload_to=employee.models.contract_directory_path, verbose_name='계약관련파일'),
        ),
    ]
