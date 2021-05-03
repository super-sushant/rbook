# Generated by Django 3.1.7 on 2021-04-28 09:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20210427_2050'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='comment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.comment'),
        ),
        migrations.AlterField(
            model_name='image',
            name='post',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.post'),
        ),
    ]