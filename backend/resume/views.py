# resume/views.py

import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

class ResumeReview(APIView):
    def post(self, request):
        content = request.data.get("content", "")

        if not content:
            return Response({"error": "No content provided"}, status=400)

        headers = {
            "Authorization": f"Bearer {settings.HF_API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "inputs": content,
            "parameters": {
                "candidate_labels": [
                    "Strong Description",
                    "Weak Description",
                    "Needs Quantification",
                    "Lacks Impact",
                    "Good Technical Detail"
                ]
            }
        }

        try:
            response = requests.post(
                "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
                headers=headers,
                json=payload
            )
            response.raise_for_status()
            result = response.json()

            return Response({
                "input": result["sequence"],
                "top_label": result["labels"][0],
                "score": result["scores"][0],
                "all_labels": result["labels"],
                "all_scores": result["scores"],
            })

        except requests.exceptions.RequestException as e:
            print("Hugging Face error:", e)
            return Response({"error": "Failed to analyze resume."}, status=500)

