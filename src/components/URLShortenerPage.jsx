import React, { useState } from 'react';

const URLShortenerPage = ({ onShorten }) => {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [expiryMinutes, setExpiryMinutes] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const generateRandomCode = () => {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += i % 2 === 0 ? getRandomChar(consonants) : getRandomChar(vowels);
    }
    code += Math.floor(10 + Math.random() * 90);
    return code;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    if (!url.trim()) {
      setError('enter valid URL.');
      return;
    }

    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    try {
      new URL(formattedUrl);
      const code = customCode || generateRandomCode();
      const short = `https://bit.ly/${code}`;
      const expiry = new Date(Date.now() + (expiryMinutes || 60) * 60000);

      setShortUrl(short);

      onShorten({
        original: formattedUrl,
        shortUrl: short,
        code,
        expiry,
      });
    } catch (err) {
      setError('Invalid URL Format.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter original URL"
          style={{ padding: '8px', marginBottom: '15px', width: '400px' }}
        /><br />
        <input
          type="text"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
          placeholder="short code (optional)"
          style={{ padding: '8px', marginBottom: '15px', width: '400px' }}
        /><br />
        <input
          type="number"
          value={expiryMinutes}
          onChange={(e) => setExpiryMinutes(e.target.value)}
          placeholder="Expiry in minutes (default-60)"
          style={{ padding: '8px', marginBottom: '15px', width: '400px' }}
        /><br />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Shorten URL
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortUrl && (
        <p>
          Shortened URL:{' '}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
};

export default URLShortenerPage;
