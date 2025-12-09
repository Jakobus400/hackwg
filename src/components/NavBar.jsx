export default function NavBar({ currentView, onViewChange }) {
  return (
    <div className="nav-bar">
      <button
        className={currentView === 'home' ? 'active' : ''}
        onClick={() => onViewChange('home')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </button>



      <button
        className="add-btn"
        onClick={() => { }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      <button
        className={currentView === 'profile' ? 'active' : ''}
        onClick={() => onViewChange('profile')}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>

      <style>{`
        .nav-bar {
          height: 60px;
          background: var(--card-bg);
          border-top: 1px solid var(--separator-color);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-bottom: var(--safe-area-bottom);
          box-shadow: 0 -1px 3px rgba(0,0,0,0.05);
        }
        .nav-bar button {
          color: var(--secondary-text-color);
          padding: 10px;
          transition: color 0.2s;
        }
        .nav-bar button.active {
          color: var(--primary-color);
        }
        .nav-bar button svg {
          width: 26px;
          height: 26px;
        }
        .nav-bar .add-btn {
          background: var(--primary-color); 
          border-radius: 12px;
          width: 48px;
          height: 32px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.4);
        }
        .nav-bar .add-btn svg {
          stroke-width: 3;
          width: 18px;
          height: 18px;
          background: transparent;
        }
      `}</style>
    </div>
  );
}
