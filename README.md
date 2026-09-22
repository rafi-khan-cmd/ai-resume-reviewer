# AI Resume Reviewer

A small full-stack app that gives quick feedback on resume text. You paste in a bullet point or a section, and it runs the text through Hugging Face's `facebook/bart-large-mnli` zero-shot classifier to label it against a set of resume-quality criteria (strong vs. weak phrasing, whether it needs quantification, whether it shows impact, and technical detail). A Django REST backend proxies the model call; a React frontend handles the input and shows the ranked labels with confidence scores.

I built it while rewriting my own resume bullets and wanted a fast way to sanity-check whether a line actually reads as strong and quantified.

## How it works

1. The React frontend posts the text to the Django endpoint `POST /api/review/`.
2. The backend calls the Hugging Face Inference API with `facebook/bart-large-mnli` and the candidate labels: *Strong Description*, *Weak Description*, *Needs Quantification*, *Lacks Impact*, *Good Technical Detail*.
3. The ranked labels and scores come back and are rendered as a sorted list, top label first.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), Axios |
| Backend | Django, Django REST Framework |
| Model | Hugging Face Inference API — [`facebook/bart-large-mnli`](https://huggingface.co/facebook/bart-large-mnli) |

## Running it locally

You'll need a free Hugging Face API token.

**Backend**

```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # add your HF_API_KEY
python manage.py migrate
python manage.py runserver  # serves on http://localhost:8000
```

**Frontend**

```bash
cd resume-reviewer-ui
npm install
npm run dev                 # serves on http://localhost:5173
```

The frontend expects the backend at `http://localhost:8000`.

## Notes

This was an early project, so the scope is deliberately small: one endpoint, one model, a single-page UI. The interesting part was mapping a generic zero-shot classifier onto resume-specific labels and getting useful signal out of it without training anything.

## Author

Rafiul Alam Khan
[GitHub](https://github.com/rafi-khan-cmd) · [LinkedIn](https://www.linkedin.com/in/rafiul-alam-k-3a20392b0/) · alamkhanrafiul@gmail.com
