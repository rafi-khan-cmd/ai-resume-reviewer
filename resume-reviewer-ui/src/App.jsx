import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [reviewed, setReviewed] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setReviewed(null);

    try {
      const res = await axios.post('http://localhost:8000/api/review/', {
        name,
        email,
        content,
      });

      setReviewed({
        top: `Top Feedback: ${res.data.top_label} (Confidence: ${(res.data.score * 100).toFixed(1)}%)`,
        labels: res.data.all_labels,
        scores: res.data.all_scores
      });

    } catch (err) {
      console.error('API error:', err);
      alert('Error submitting resume. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI Resume Reviewer</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        /><br />
        <input
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        /><br />
        <textarea
          placeholder="Paste your resume content here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        /><br />
        <button type="submit" style={{ padding: '10px 20px' }} disabled={loading}>
          {loading ? 'Reviewing...' : 'Submit for Review'}
        </button>
      </form>

      {reviewed && (
        <div
          style={{
            marginTop: '20px',
            backgroundColor: '#f9f9f9',
            color: '#222',
            padding: '15px',
            borderRadius: '6px',
            fontSize: '16px',
            lineHeight: '1.5',
            fontWeight: 400
          }}
        >
          <h3>AI Feedback</h3>
          <p>{reviewed.top}</p>
          <ul>
            {reviewed.labels.map((label, i) => (
              <li key={label}>
                {label}: {(reviewed.scores[i] * 100).toFixed(1)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

