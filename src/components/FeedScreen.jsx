import { useRef, useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import HomeScreen from './HomeScreen';
import { VIDEOS_BY_CATEGORY, getVideosForGroup } from '../videoManifest';

// Mock generation for fallback
const generateMockVideo = (category, i) => ({
    id: `mock_${Date.now()}_${i}`,
    type: 'video',
    user: `user_${Math.floor(Math.random() * 1000)}`,
    description: `Fallback ${category} video #${i}`,
    music: 'Original Sound - Artist Name',
    likes: Math.floor(Math.random() * 5000),
    comments: Math.floor(Math.random() * 200),
    saves: Math.floor(Math.random() * 500),
    title: `Mock Topic: ${category} ${i}`,
    bgColor: `linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()})`,
    url: null,
    isEvent: category === 'Events'
});

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export default function FeedScreen({
    category,
    searchQuery,
    onSearch,
    onCategorySelect,
    addHomeSignal,
    scrollTarget,
    onAddToCalendar,
    jumpToVideo
}) {
    // Items can be { type: 'home', ... } or { type: 'video', ... }
    const [feedItems, setFeedItems] = useState([{ type: 'home', id: 'init_home' }]);
    const [activeCategory, setActiveCategory] = useState(null);

    // CHANGED: Use Ref for synchronous tracking of seen IDs to prevent duplicates in loops/effects
    const seenVideoIds = useRef(new Set());

    // Global counter for ALL videos (to satisfy numbering request)
    const globalVideoCounter = useRef(0);

    const containerRef = useRef(null);
    const isProgrammaticScroll = useRef(false);

    // Watch for Jump To Video signal
    useEffect(() => {
        if (jumpToVideo) {
            // Create a new instance of the video to act as the "jump target"
            // We use a unique ID to ensure it's treated as a new item we can scroll to
            const jumpId = `jump_${Date.now()}_${jumpToVideo.id}`;
            const videoToInsert = {
                ...jumpToVideo,
                id: jumpId,
                title: `(Jump) ${jumpToVideo.title}`
            };

            setFeedItems(prev => [...prev, videoToInsert]);

            // Wait for render then scroll
            setTimeout(() => {
                const element = document.getElementById(jumpId);
                if (element) {
                    console.log('Scrolling to jumped video:', jumpId);
                    isProgrammaticScroll.current = true;
                    // CHANGED: 'auto' for instant jump
                    element.scrollIntoView({ behavior: 'auto', block: 'center' });
                    setTimeout(() => isProgrammaticScroll.current = false, 1000);
                } else {
                    console.warn('Jump target not found:', jumpId);
                }
            }, 300);
        }
    }, [jumpToVideo]);

    // When App signals to add a new Home screen
    useEffect(() => {
        if (addHomeSignal > 0) {
            setFeedItems(prev => [...prev, { type: 'home', id: `home_${Date.now()}` }]);
            setActiveCategory(null);

            setTimeout(() => {
                if (containerRef.current) {
                    const scrollHeight = containerRef.current.scrollHeight;
                    isProgrammaticScroll.current = true;
                    containerRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
                    setTimeout(() => isProgrammaticScroll.current = false, 800);
                }
            }, 100);
        }
    }, [addHomeSignal]);

    // Helper to generate next batch (PURELY NEW VIDEOS)
    const getNextBatch = (cat, count = 3) => {
        let newItems = [];

        let availableVideos = VIDEOS_BY_CATEGORY[cat];
        if (!availableVideos && (cat === 'Brainrot' || cat === 'Information')) {
            availableVideos = getVideosForGroup(cat);
        }

        for (let i = 0; i < count; i++) {
            globalVideoCounter.current += 1; // Increment for every item
            const itemNumber = globalVideoCounter.current;

            let selectedVideoUrl = null;

            // Filter available videos against seen set (read from Ref)
            if (availableVideos) {
                const unseen = availableVideos.filter(v => !seenVideoIds.current.has(v));
                if (unseen.length > 0) {
                    // Pick random or next
                    const randomIndex = Math.floor(Math.random() * unseen.length);
                    selectedVideoUrl = unseen[randomIndex];

                    // Add to seen set immediately (sync)
                    seenVideoIds.current.add(selectedVideoUrl);
                }
            }

            if (selectedVideoUrl) {
                newItems.push({
                    id: Math.random().toString(36).substr(2, 9),
                    type: 'video',
                    user: `user_${Math.floor(Math.random() * 1000)}`,
                    description: `This is a ${cat} video`,
                    music: 'Original Sound',
                    likes: Math.floor(Math.random() * 5000),
                    comments: Math.floor(Math.random() * 200),
                    saves: Math.floor(Math.random() * 500),
                    title: `Topic: ${cat} #${itemNumber}`, // Numbered title
                    url: selectedVideoUrl,
                    bgColor: `linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()})`, // Nice placeholder
                    isEvent: cat === 'Events'
                });
            } else {
                // FALLBACK: Mock video
                // We use the same global counter instead of separate mock counter
                newItems.push({
                    ...generateMockVideo(cat, itemNumber),
                    title: `Mock Topic: ${cat} #${itemNumber}` // Override title with global number
                });
            }
        }
        return newItems;
    };

    const handleLocalCategorySelect = (selectedCat) => {
        onCategorySelect?.(selectedCat);
        const newVideos = getNextBatch(selectedCat, 5);
        setFeedItems(prev => [...prev, ...newVideos]);
        setActiveCategory(selectedCat);

        setTimeout(() => {
            if (containerRef.current) {
                isProgrammaticScroll.current = true;
                containerRef.current.scrollBy({ top: containerRef.current.clientHeight, behavior: 'smooth' });
                setTimeout(() => isProgrammaticScroll.current = false, 800);
            }
        }, 100);
    };

    const handleScroll = () => {
        if (!containerRef.current || isProgrammaticScroll.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 100) {
            if (activeCategory) {
                const newVideos = getNextBatch(activeCategory, 3);
                setFeedItems(prev => [...prev, ...newVideos]);
            }
        }
    };

    // Handler for the Repeat Button - DIRECT INSERTION
    const handleRepeatVideo = (video, currentIndex) => {
        // Clone the video with a new ID
        const repeatedVideo = {
            ...video,
            id: `repeat_${Date.now()}_${video.id}`,
            title: `(Repeat) ${video.title}`
        };

        const insertIndex = currentIndex + 3;

        setFeedItems(prev => {
            const newFeed = [...prev];

            if (insertIndex > newFeed.length) {
                if (activeCategory) {
                    // Ensure we have enough buffer
                    const fillerNeeded = insertIndex - newFeed.length;
                    if (fillerNeeded > 0) {
                        const fillers = getNextBatch(activeCategory, fillerNeeded);
                        newFeed.push(...fillers);
                    }
                }
            }

            // Splice it in
            newFeed.splice(insertIndex, 0, repeatedVideo);
            return newFeed;
        });

        console.log(`Inserted repeat for ${video.title} at index ${insertIndex}`);
    };

    return (
        <div
            className="feed-screen theme-scroll-container"
            ref={containerRef}
            onScroll={handleScroll}
        >
            {feedItems.map((item, index) => {
                if (item.type === 'home') {
                    return (
                        <div key={item.id} className="feed-item home-slide">
                            <HomeScreen
                                onSearch={onSearch}
                                onCategorySelect={handleLocalCategorySelect}
                                currentCategory={activeCategory || 'Brainrot'}
                            />
                        </div>
                    );
                } else {
                    return (
                        <VideoCard
                            key={item.id}
                            video={{
                                ...item,
                                onRepeat: () => handleRepeatVideo(item, index),
                                onAddToCalendar: () => onAddToCalendar?.(item)
                            }}
                            isActive={true}
                        />
                    );
                }
            })}

            <style>{`
        .feed-screen {
          height: 100%;
          width: 100%;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
        .feed-screen::-webkit-scrollbar {
          display: none;
        }
        .feed-screen {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .feed-item {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          height: 100%;
          width: 100%;
        }
        .home-slide {
           background: var(--bg-color);
           overflow: hidden;
        }
        .video-card {
           height: 100%;
        }
      `}</style>
        </div>
    );
}
