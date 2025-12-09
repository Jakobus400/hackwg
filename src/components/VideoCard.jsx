import { useState } from 'react';

export default function VideoCard({ video, isActive }) {
    const [liked, setLiked] = useState(video.isLiked || false);
    const [saved, setSaved] = useState(video.isSaved || false);
    const [repeatClicked, setRepeatClicked] = useState(false);
    const [dateSaved, setDateSaved] = useState(video.isDateSaved || false);
    const [videoError, setVideoError] = useState(false);

    const handleRepeat = () => {
        if (repeatClicked) return;

        setRepeatClicked(true);
        video.onRepeat?.();

        // Reset visual state after animation if needed? 
        // No, user wants to see it happened.
        // But for "on repeated video to repeat it again", 
        // the NEW video card will have fresh state.
        // So for THIS card, it stays clicked.
    };

    return (
        <div className="video-card">
            <div
                className="video-content"
                style={{
                    background: video.bgColor || 'linear-gradient(45deg, #FF3B30, #FF9500)',
                }}
            >
                <div className="video-placeholder-text">
                    {video.url && !videoError ? (
                        <video
                            src={video.url}
                            loop
                            muted
                            autoPlay={isActive}
                            playsInline
                            onError={() => {
                                console.warn('Video load error:', video.url);
                                setVideoError(true);
                            }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <h2>{video.title}</h2>
                    )}
                </div>
            </div>

            <div className="sidebar-actions">
                <div className="action-btn" onClick={() => setLiked(!liked)}>
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill={liked ? "#ff3b5c" : "white"}
                        stroke={liked ? "none" : "white"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            transform: liked ? 'scale(1.2)' : 'scale(1)',
                            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span className="count">{video.likes + (liked ? 1 : 0)}</span>
                </div>

                <div className="action-btn">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span className="count">{video.comments}</span>
                </div>

                <div className="action-btn" onClick={() => setSaved(!saved)}>
                    <svg width="35" height="35" viewBox="0 0 24 24" fill={saved ? "gold" : "white"} stroke={saved ? "none" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span className="count">{video.saves}</span>
                </div>

                <div className="action-btn" onClick={handleRepeat}>
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={repeatClicked ? "#4CAF50" : "white"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                            transform: repeatClicked ? 'rotate(180deg) scale(1.2)' : 'rotate(0deg) scale(1)',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                    >
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <polyline points="1 20 1 14 7 14"></polyline>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                    </svg>
                    <span className="count" style={{ color: repeatClicked ? '#4CAF50' : 'white' }}>
                        {/* No text change requested, but color change indicates activation */}
                        Repeat
                    </span>
                </div>

                {video.isEvent && (
                    <div className="action-btn" onClick={() => {
                        if (!dateSaved) {
                            setDateSaved(true);
                            // Pass updated state up so it can be stored
                            video.onAddToCalendar?.({ ...video, isDateSaved: true });
                        }
                    }}>
                        <svg width="35" height="35" viewBox="0 0 24 24" fill={dateSaved ? "#4CAF50" : "none"} stroke={dateSaved ? "#4CAF50" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                            {dateSaved ? (
                                <path d="M9 16l2 2 4-4" stroke="white" strokeWidth="3" />
                            ) : (
                                <>
                                    <path d="M12 14h.01"></path>
                                    <path d="M9 16h6"></path>
                                </>
                            )}
                        </svg>
                        <span className="count" style={{ color: dateSaved ? '#4CAF50' : 'white' }}>
                            {dateSaved ? 'Saved' : 'Save Date'}
                        </span>
                    </div>
                )}

                <div className="action-btn">
                    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span className="count">Share</span>
                </div>
            </div>

            <div className="bottom-info">
                <div className="user-info">
                    <h3>@{video.user}</h3>
                    <p>{video.description}</p>
                </div>
                <div className="music-marquee">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18V5l12-2v13"></path>
                        <circle cx="6" cy="18" r="3"></circle>
                        <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                    <span>{video.music}</span>
                </div>
            </div>

            <style>{`
        .video-card {
           width: 100%;
           height: 100%;
           position: relative;
           scroll-snap-align: start;
           scroll-snap-stop: always;
           overflow: hidden;
        }
        .video-content {
           width: 100%;
           height: 100%;
           display: flex;
           align-items: center;
           justify-content: center;
           background-size: cover;
           background-position: center;
        }
        .video-placeholder-text {
           color: white;
           text-align: center;
           padding: 20px;
           text-shadow: 0 2px 4px rgba(0,0,0,0.5);
           width: 100%;
           height: 100%;
        }
        .sidebar-actions {
           position: absolute;
           right: 10px;
           bottom: 100px;
           display: flex;
           flex-direction: column;
           gap: 20px;
           align-items: center;
           z-index: 10;
        }
        .action-btn {
           display: flex;
           flex-direction: column;
           align-items: center;
           gap: 5px;
           cursor: pointer;
           transition: opacity 0.2s;
        }
        .action-btn:active {
           opacity: 0.7;
        }
        .count {
           font-size: 12px;
           font-weight: 600;
           text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        .bottom-info {
           position: absolute;
           bottom: 20px;
           left: 10px;
           z-index: 10;
           width: 75%;
           text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        .user-info h3 {
           font-size: 16px;
           margin-bottom: 5px;
        }
        .user-info p {
           font-size: 14px;
           margin-bottom: 10px;
           line-height: 1.3;
        }
        .music-marquee {
           display: flex;
           align-items: center;
           gap: 5px;
           font-size: 13px;
        }
      `}</style>
        </div>
    );
}
