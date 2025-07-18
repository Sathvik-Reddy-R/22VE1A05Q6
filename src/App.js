// src/App.js
import React, { useState } from 'react';
import URLShortenerPage from './components/URLShortenerPage';
import URLShortenerStatisticPage from './components/URLShotenerStatisticPage';

const App = () => {
  const [history, setHistory] = useState([]);

  const addToHistory = (entry) => {
    setHistory((prev) => [...prev, entry]);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>URL Shortener</h1>
      <hr />
      <URLShortenerPage onShorten={addToHistory} />
      <URLShortenerStatisticPage history={history} />
    </div>
  );
};

export default App;
