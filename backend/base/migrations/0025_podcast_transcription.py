# Generated by Django 4.0.4 on 2022-06-17 15:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0024_podcast_audio_file_podcast_time_pod_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='podcast',
            name='transcription',
            field=models.TextField(blank=True, null=True),
        ),
    ]
