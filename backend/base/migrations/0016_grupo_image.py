# Generated by Django 4.0.4 on 2022-06-09 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0015_remove_grupo_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='grupo',
            name='image',
            field=models.ImageField(default='images/Placeholder.png', upload_to='images'),
        ),
    ]
