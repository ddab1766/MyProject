# Generated by Django 3.0.4 on 2021-03-19 09:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company_profile', '0018_auto_20210319_0929'),
        ('employee', '0002_auto_20210317_0941'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='contract',
            options={'verbose_name_plural': '2. 계약 / Contract'},
        ),
        migrations.AlterModelOptions(
            name='contractfile',
            options={'verbose_name_plural': '2_1. 계약첨부파일 / ContractFile'},
        ),
        migrations.AlterModelOptions(
            name='employee',
            options={'verbose_name_plural': '1. 사원 / Employee'},
        ),
        migrations.AddField(
            model_name='contract',
            name='companyprofile',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='contract_companyprofile', to='company_profile.CompanyProfile', verbose_name='사용사업주'),
        ),
    ]