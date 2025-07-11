from django.db import models

# Create your models here.

class Resume(models.Model):
    name = models.CharField(max_length = 100)
    email = models.EmailField()
    content = models.TextField(help_text="Paste your resume content here")
    reviewed = models.TextField(blank = True, null = True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
