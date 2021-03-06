# Generated by Django 3.0.4 on 2021-06-07 03:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0014_auto_20210507_1406'),
        ('hr_profile', '0015_auto_20210527_1526'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='hrfee',
            options={'verbose_name_plural': '1_2. 수수료 / HrFEE'},
        ),
        migrations.AddField(
            model_name='hrprofile',
            name='cust_gubun',
            field=models.ForeignKey(blank=True, default='CI0100000', limit_choices_to={'comidx': 'CI'}, null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.ComCode', verbose_name='사업자형태'),
        ),
        migrations.AlterField(
            model_name='hrfee',
            name='hrprofile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hrfee', to='hr_profile.HrProfile', verbose_name='HR회사'),
        ),
        migrations.AlterField(
            model_name='hrprofile',
            name='manager_email',
            field=models.CharField(blank=True, max_length=30, null=True, verbose_name='대표 이메일'),
        ),
        migrations.AlterField(
            model_name='hrprofile',
            name='manager_phone',
            field=models.CharField(blank=True, max_length=11, null=True, verbose_name='대표 연락처'),
        ),
    ]
