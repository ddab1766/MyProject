# Generated by Django 3.0.4 on 2021-08-02 05:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0018_demand'),
    ]

    operations = [
        migrations.AddField(
            model_name='demand',
            name='paidup_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL, verbose_name='지불자'),
        ),
    ]
