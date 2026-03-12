from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    case_study = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    live_demo_url = models.URLField(blank=True, null=True)
    technologies_used = models.CharField(max_length=500, help_text="Comma-separated technologies")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
