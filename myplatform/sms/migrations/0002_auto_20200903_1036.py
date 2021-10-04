# Generated by Django 3.0.4 on 2020-09-03 10:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('sms', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='authsms',
            name='created_time',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='authsms',
            name='modified_time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]