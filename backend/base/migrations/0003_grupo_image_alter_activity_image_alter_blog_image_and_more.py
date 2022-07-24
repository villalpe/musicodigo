# Generated by Django 4.0.4 on 2022-04-26 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_review_page_forum_file_bookmark_blog_activity'),
    ]

    operations = [
        migrations.AddField(
            model_name='grupo',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='activity',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='blog',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='bookmark',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='file',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='forum',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='page',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
