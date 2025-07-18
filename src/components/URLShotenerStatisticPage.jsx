import React from 'react';

const URLShortenerStatisticPage = ({ history }) => {
  if (!history.length) return <p>No history yet.</p>;

  return (
    <div>
      <h2>Shortened URL History</h2>
      <div style={{ marginTop: '20px' }}>
        {history.map((entry, index) => (
          <div key={index} style={{ 
            marginBottom: '15px', 
            padding: '10px', 
            border: '1px solid #ccc', 
 
          }}>
            <p><strong>Original URL:</strong> <a href={entry.original} target="_blank" rel="noreferrer">{entry.original}</a></p>
            <p><strong>Short URL:</strong> <a href={entry.shortUrl} target="_blank" rel="noreferrer">{entry.shortUrl}</a></p>
            <p><strong>Code:</strong> {entry.code}</p>
            <p><strong>Expiry:</strong> {new Date(entry.expiry).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default URLShortenerStatisticPage;
