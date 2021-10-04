# Generated by Django 3.0.4 on 2021-05-07 14:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('company_profile', '0024_auto_20210429_1748'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyprofilecoworker',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='companyprofilecoworker', to=settings.AUTH_USER_MODEL, verbose_name='User'),
        ),
    ]