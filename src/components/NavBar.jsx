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
          background: #000;
          border-top: 1px solid #333;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-bottom: var(--safe-area-bottom);
        }
        .nav-bar button {
          color: #666;
          padding: 10px;
        }
        .nav-bar button.active {
          color: #fff;
        }
        .nav-bar button svg {
          width: 26px;
          height: 26px;
        }
        .nav-bar .add-btn {
          background: linear-gradient(45deg, #00f2ea, #ff0050); 
          border-radius: 8px;
          width: 44px;
          height: 30px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }
        .nav-bar .add-btn svg {
          stroke-width: 3;
          width: 18px;
          height: 18px;
          background: #000;
          height: 100%;
          width: 90%;
          margin: 0 auto;
        }
      `}</style>
        </div>
    );
}
