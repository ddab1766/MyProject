# Generated by Django 3.0.4 on 2021-03-19 09:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('company_profile', '0017_auto_20210317_0941'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='companyprofile',
            options={'verbose_name_plural': '1. 회사 프로필 / CompanyProfile'},
        ),
        migrations.AlterModelOptions(
            name='companyprofilecoworker',
            options={'verbose_name_plural': '1_1. 회사동료 / CompanyProfileCoWorker'},
        ),
        migrations.AlterModelOptions(
            name='interview',
            options={'verbose_name_plural': '5. 면접일정 / Interview'},
        ),
        migrations.AlterModelOptions(
            name='jobadvertise',
            options={'verbose_name_plural': '3. 채용공고 / JobAdvertise'},
        ),
        migrations.AlterModelOptions(
            name='jobapplicant',
            options={'verbose_name_plural': '4. 채용지원자 / JobApplicant'},
        ),
        migrations.AlterModelOptions(
            name='sugub',
            options={'verbose_name_plural': '2. 수급의뢰서 / Sugub'},
        ),
        migrations.AlterModelOptions(
            name='sugubreview',
            options={'verbose_name_plural': '2_1. 리뷰 / SugubReview'},
        ),
    ]
