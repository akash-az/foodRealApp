import React, { useState } from 'react'
import '../../styles/saved.css'

const Saved = () => {
    // Dummy saved videos
    const [savedVideos] = useState([
        {
            id: 1,
            description: 'Delicious Pizza'
        },
        {
            id: 2,
            description: 'Fresh Sushi'
        },
        {
            id: 3,
            description: 'Homemade Pasta'
        },
        {
            id: 4,
            description: 'Crispy Fried Chicken'
        },
        {
            id: 5,
            description: 'Chocolate Cake'
        },
        {
            id: 6,
            description: 'Grilled Salmon'
        }
    ])

    return (
        <div className="saved-container">
            <div className="saved-header">
                <h1 className="saved-title">Saved Reels</h1>
                <p className="saved-subtitle">Your favorite food videos</p>
            </div>

            {savedVideos.length > 0 ? (
                <div className="saved-grid">
                    {savedVideos.map(video => (
                        <div key={video.id} className="saved-card">
                            <div className="saved-video-placeholder">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                                    <line x1="7" y1="6" x2="7" y2="18"></line>
                                    <line x1="11" y1="9" x2="11" y2="15"></line>
                                    <line x1="15" y1="6" x2="15" y2="18"></line>
                                </svg>
                            </div>
                            <div className="saved-card-content">
                                <p className="saved-description">{video.description}</p>
                                <button className="saved-play-btn">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z"></path>
                                    </svg>
                                    Play
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="saved-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    </svg>
                    <h2>No Saved Videos</h2>
                    <p>Start saving your favorite food reels to view them later</p>
                </div>
            )}
        </div>
    )
}

export default Saved
