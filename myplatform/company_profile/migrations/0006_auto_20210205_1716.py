# Generated by Django 3.0.4 on 2021-02-05 17:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hr_profile', '0003_remove_hrprofile_attachments'),
        ('company_profile', '0005_auto_20210201_1748'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobapplicant',
            name='hrprofile',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hrprofile_jobapp', to='hr_profile.HrProfile', verbose_name='HR회사'),
        ),
    ]
