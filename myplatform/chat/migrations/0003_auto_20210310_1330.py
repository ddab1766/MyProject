# Generated by Django 3.0.4 on 2021-03-10 13:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('company_profile', '0015_auto_20210225_1400'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0002_auto_20210308_0942'),
    ]

    operations = [
        migrations.AddField(
            model_name='chatroom',
            name='sugub',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='sugub_chatroom', to='company_profile.Sugub'),
        ),
        migrations.AlterField(
            model_name='chatroom',
            name='participants',
            field=models.ManyToManyField(blank=True, null=True, related_name='chatroom', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='message',
            name='chatroom',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='chatroom_messages', to='chat.ChatRoom'),
        ),
    ]
