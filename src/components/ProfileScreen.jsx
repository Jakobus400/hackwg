import { useState } from 'react';

// Update component signature to accept onPlayEvent
export default function ProfileScreen({ savedEvents = [], onPlayEvent }) {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'saved', 'events'
  // ... (rest of the file remains, I will target specific lines)


  // Mock data
  const user = {
    username: 'creative_user_99',
    posts: 42,
    followers: '1.2M',
    following: 150,
    bio: 'Just browsing ✨',
  };

  const images = Array.from({ length: 9 }).map((_, i) => ({
    id: i,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }));

  return (
    <div className="profile-screen">
      <div className="profile-header">
        <div className="profile-pic"></div>
        <div className="profile-stats">
          <div className="stat-item">
            <div className="number">{user.posts}</div>
            <div className="label">Posts</div>
          </div>
          <div className="stat-item">
            <div className="number">{user.followers}</div>
            <div className="label">Followers</div>
          </div>
          <div className="stat-item">
            <div className="number">{user.following}</div>
            <div className="label">Following</div>
          </div>
        </div>
      </div>

      <div className="bio-section">
        <h3>{user.username}</h3>
        <p>{user.bio}</p>
      </div>

      <div className="action-buttons">
        <button className="edit-btn">Edit Profile</button>
        <button className="share-btn">Share Profile</button>
      </div>

      <div className="profile-nav">
        <div
          className={activeTab === 'posts' ? 'active' : ''}
          onClick={() => setActiveTab('posts')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
        </div>
        <div
          className={activeTab === 'saved' ? 'active' : ''}
          onClick={() => setActiveTab('saved')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
        </div>
        <div
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="M8 14h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M16 14h.01"></path>
            <path d="M8 18h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M16 18h.01"></path>
          </svg>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'posts' && (
          <div className="posts-grid">
            {images.map(img => (
              <div key={img.id} className="grid-item" style={{ backgroundColor: img.color }}></div>
            ))}
          </div>
        )}
        {activeTab === 'saved' && (
          <div className="empty-state">No saved posts yet</div>
        )}
        {activeTab === 'events' && (
          <div className="events-list">
            {savedEvents.length === 0 ? (
              <div className="empty-state">No upcoming events</div>
            ) : (
              savedEvents.map((event, index) => (
                <div
                  key={index}
                  className="event-item"
                  onClick={() => onPlayEvent && onPlayEvent(event)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="event-date">
                    <div className="month">DEC</div>
                    <div className="day">{10 + index}</div>
                  </div>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <p>{event.description || 'Local community event'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style>{`
        .profile-screen {
          height: 100%;
          overflow-y: scroll;
          padding-bottom: 80px;
        }
        .profile-screen::-webkit-scrollbar {
            display: none;
        }
        .profile-header {
          display: flex;
          align-items: center;
          padding: 20px;
          gap: 20px;
        }
        .profile-pic {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
        }
        .profile-stats {
          display: flex;
          flex: 1;
          justify-content: space-around;
        }
        .stat-item {
          text-align: center;
        }
        .number {
          font-weight: 700;
          font-size: 18px;
        }
        .label {
          font-size: 13px;
          color: var(--secondary-text-color);
        }
        .bio-section {
          padding: 0 20px;
        }
        .bio-section h3 {
           font-size: 14px;
           margin-bottom: 4px;
        }
        .bio-section p {
           font-size: 14px;
           line-height: 1.4;
        }
        .action-buttons {
           display: flex;
           gap: 10px;
           padding: 20px;
        }
        .action-buttons button {
           flex: 1;
           background: #262626;
           padding: 8px;
           border-radius: 8px;
           font-weight: 600;
           font-size: 14px;
        }
        .profile-nav {
           display: flex;
           border-top: 1px solid var(--separator-color);
           margin-top: 10px;
        }
        .profile-nav div {
           flex: 1;
           display: flex;
           justify-content: center;
           padding: 10px;
           color: var(--secondary-text-color);
           cursor: pointer;
        }
        .profile-nav div.active {
           color: #fff;
           border-bottom: 2px solid #fff;
        }
        .posts-grid {
           display: grid;
           grid-template-columns: repeat(3, 1fr);
           gap: 2px;
        }
        .grid-item {
           aspect-ratio: 1;
        }
        .empty-state {
            padding: 40px;
            text-align: center;
            color: var(--secondary-text-color);
        }
        .events-list {
            padding: 10px;
        }
        .event-item {
            display: flex;
            gap: 15px;
            padding: 15px;
            background: #262626;
            margin-bottom: 10px;
            border-radius: 8px;
            align-items: center;
        }
        .event-date {
            background: #333;
            padding: 10px;
            border-radius: 6px;
            text-align: center;
            min-width: 50px;
        }
        .month {
            font-size: 10px;
            color: #ff3b5c;
            font-weight: 700;
        }
        .day {
            font-size: 18px;
            font-weight: 700;
        }
        .event-details h4 {
            margin-bottom: 4px;
            font-size: 14px;
        }
        .event-details p {
            font-size: 12px;
            color: var(--secondary-text-color);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
      `}</style>
    </div>
  );
}
