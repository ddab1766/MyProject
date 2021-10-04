# Generated by Django 3.0.4 on 2021-02-05 17:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20210201_1656'),
        ('hr_profile', '0003_remove_hrprofile_attachments'),
    ]

    operations = [
        migrations.AddField(
            model_name='hrprofile',
            name='hr_bokri',
            field=models.TextField(blank=True, max_length=500, null=True, verbose_name='HR 복리후생'),
        ),
        migrations.AlterField(
            model_name='hrprofile',
            name='address',
            field=models.ForeignKey(blank=True, limit_choices_to={'comidx': 'BE'}, null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.ComCode', verbose_name='회사지역'),
        ),
    ]
