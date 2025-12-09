import { useState } from 'react';
import { TOPICS } from '../videoManifest';

export default function HomeScreen({ onSearch, onCategorySelect, currentCategory }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="home-screen">
      <div className="home-header">
        <h1>What do you wanna watch today?</h1>
      </div>

      <div className="search-container">
        <div className="search-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <div className="filters-container">
        <div className="toggle-group">
          <button
            className={`toggle-btn ${currentCategory === 'Information' ? 'active' : ''}`}
            onClick={() => onCategorySelect('Information')}
          >
            Information
          </button>
          <button
            className={`toggle-btn ${currentCategory === 'Brainrot' ? 'active' : ''}`}
            onClick={() => onCategorySelect('Brainrot')}
          >
            Brainrot
          </button>
        </div>
      </div>

      <div className="topics-grid">
        {TOPICS.map(topic => (
          <button
            key={topic}
            className="topic-card"
            onClick={() => onCategorySelect(topic)}
          >
            {topic}
          </button>
        ))}
      </div>

      <style>{`
        .home-screen {
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .home-header h1 {
          font-size: 32px;
          line-height: 1.2;
          font-weight: 700;
          margin-top: 40px;
          color: var(--text-color);
        }
        .search-container {
          margin-top: 20px;
        }
        .search-bar {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid var(--separator-color);
        }
        .search-bar input {
          background: transparent;
          color: #fff;
          font-size: 16px;
          width: 100%;
        }
        .filters-container {
          display: flex;
          gap: 10px;
        }
        .toggle-group {
          background: var(--card-bg);
          padding: 4px;
          border-radius: 12px;
          display: flex;
          gap: 4px;
          width: 100%;
        }
        .toggle-btn {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          color: var(--secondary-text-color);
          transition: all 0.2s;
        }
        .toggle-btn.active {
          background: var(--primary-color);
          color: #fff;
          font-size: 14px;
        }
        .topics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 20px;
        }
        .topic-card {
          background: var(--card-bg);
          border: 1px solid var(--separator-color);
          padding: 20px;
          border-radius: 16px;
          text-align: center;
          font-weight: 600;
          font-size: 16px;
          transition: transform 0.1s;
        }
        .topic-card:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
