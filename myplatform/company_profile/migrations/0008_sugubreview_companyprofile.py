# Generated by Django 3.0.4 on 2021-02-16 10:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company_profile', '0007_auto_20210216_1017'),
    ]

    operations = [
        migrations.AddField(
            model_name='sugubreview',
            name='companyprofile',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='sugub_reviews', to='company_profile.CompanyProfile', verbose_name='사용사업주'),
        ),
    ]
