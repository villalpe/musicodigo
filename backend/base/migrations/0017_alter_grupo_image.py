# Generated by Django 4.0.4 on 2022-06-09 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0016_grupo_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grupo',
            name='image',
            field=models.ImageField(default='images/placeholder.png', upload_to='images'),
        ),
    ]
