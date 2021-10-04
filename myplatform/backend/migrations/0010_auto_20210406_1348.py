# Generated by Django 3.0.4 on 2021-04-06 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_auto_20210331_1140'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_agree',
            field=models.BooleanField(default=True, verbose_name='이용약관 동의'),
        ),
        migrations.AddField(
            model_name='user',
            name='is_privacy',
            field=models.BooleanField(default=True, verbose_name='개인정보취급방침 동의'),
        ),
    ]