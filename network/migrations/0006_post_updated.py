# Generated by Django 3.2.9 on 2022-02-01 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0005_auto_20220127_2052'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='updated',
            field=models.BooleanField(default=False),
        ),
    ]
