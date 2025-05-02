import { useState } from 'react';

export function ProfileAnalyzer() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    flag: 'red' | 'green';
    reasoning: string;
    messageOpener: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze profile');
      }

      const analysis = await response.json();
      setResult(analysis);
    } catch (err) {
      setError('Failed to analyze profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Instagram Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter username"
          />
        </div>
        
        <button
          onClick={handleAnalyzeProfile}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          {loading ? 'Analyzing...' : 'Analyze Profile'}
        </button>

        {error && (
          <div className="text-red-600 p-3 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-md">
            <div className="text-xl font-bold">
              {result.flag === 'red' ? '🚩 Red Flag' : '✅ Green Flag'}
            </div>
            <div>
              <h3 className="font-semibold">Reasoning:</h3>
              <p>{result.reasoning}</p>
            </div>
            <div>
              <h3 className="font-semibold">Suggested Message Opener:</h3>
              <p>{result.messageOpener}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}