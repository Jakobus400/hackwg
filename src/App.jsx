import { useState } from 'react'
import NavBar from './components/NavBar';
import FeedScreen from './components/FeedScreen';
import ProfileScreen from './components/ProfileScreen';

function App() {
  const [currentView, setCurrentView] = useState('feed');
  const [scrollTarget, setScrollTarget] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Brainrot');
  const [addHomeSignal, setAddHomeSignal] = useState(0);
  const [savedEvents, setSavedEvents] = useState([]);

  const [jumpToVideo, setJumpToVideo] = useState(null);

  const handleViewChange = (view) => {
    if (view === 'home') {
      if (currentView === 'feed') {
        // Already on feed -> Add new Home Screen search
        setAddHomeSignal(prev => prev + 1);
      } else {
        // Coming from elsewhere -> Just resume feed (no new search)
        setCurrentView('feed');
      }
    } else {
      setCurrentView(view);
      if (view === 'feed') setScrollTarget('feed');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setScrollTarget('feed');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleScrollChange = (target) => {
  };

  const handleAddToCalendar = (event) => {
    setSavedEvents(prev => [...prev, event]);
  };

  const handlePlayEvent = (event) => {
    setJumpToVideo(event);
    setCurrentView('feed');
  };

  return (
    <div className="screen-container">
      <div className="content-area" style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ display: currentView === 'feed' ? 'block' : 'none', height: '100%' }}>
          <FeedScreen
            addHomeSignal={addHomeSignal}
            category={selectedCategory}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
            scrollTarget={scrollTarget}
            onScrollChange={handleScrollChange}
            onAddToCalendar={handleAddToCalendar}
            jumpToVideo={jumpToVideo}
          />
        </div>
        <div style={{ display: currentView === 'profile' ? 'block' : 'none', height: '100%' }}>
          <ProfileScreen
            savedEvents={savedEvents}
            onPlayEvent={handlePlayEvent}
          />
        </div>
      </div>

      <NavBar currentView={currentView} onViewChange={handleViewChange} />
    </div>
  )
}

export default App
