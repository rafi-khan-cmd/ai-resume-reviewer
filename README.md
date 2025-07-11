# 🧠 AI Resume Reviewer

An AI-powered web application that provides real-time feedback on resume content. It uses Hugging Face’s `facebook/bart-large-mnli` zero-shot classification model to identify strengths and weaknesses in resume text. Built with a Django REST API backend and a React frontend.

---

## ✨ Features

- 🔍 Paste your resume or individual bullet points and receive feedback instantly
- 🧠 Uses Hugging Face's `facebook/bart-large-mnli` for zero-shot classification
- ⚙️ Full-stack: Django + React + Vite + Axios
- 🚦 Highlights areas like:
  - Strong/weak descriptions
  - Need for quantification
  - Technical detail
  - Impact

---

## 🛠 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React (Vite), Axios, JavaScript   |
| Backend   | Django, Django REST Framework     |
| AI Model  | Hugging Face Inference API        |
| Model Used| [`facebook/bart-large-mnli`](https://huggingface.co/facebook/bart-large-mnli) |

---
