from django.db import models

class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True)
    email = models.EmailField()
    github_link = models.URLField(blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

class Experience(models.Model):
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField()

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.role} at {self.company}"
