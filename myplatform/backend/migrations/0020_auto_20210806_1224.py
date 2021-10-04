# Generated by Django 3.0.4 on 2021-08-06 03:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0019_demand_paidup_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='jikjong_low',
        ),
        migrations.RemoveField(
            model_name='question',
            name='jikjong_mid',
        ),
        migrations.RemoveField(
            model_name='question',
            name='question_gubun',
        ),
        migrations.AlterField(
            model_name='demand',
            name='paidup_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='지불자'),
        ),
        migrations.DeleteModel(
            name='Answer',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
    ]