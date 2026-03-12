from django.db import models

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('frontend Framework', 'Frontend Framework'),
        ('backend', 'Backend'),
        ('backend Framework', 'Backend Framework'),
        ('testing', 'Testing'),
        ('tools', 'Tools'),
    ]
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency_level = models.IntegerField(help_text="Proficiency level from 1 to 100")
    icon = models.CharField(max_length=50, blank=True, null=True, help_text="Icon class name or SVG path")

    def __str__(self):
        return self.name
