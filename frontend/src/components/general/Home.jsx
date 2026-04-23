
import React, { useEffect, useState, useRef } from 'react'
import '../../styles/videoReel.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Home = () => {
    const [videos, setVideos] = useState([])
    const [likes, setLikes] = useState({})
    const [saves, setSaves] = useState({})
    const [comments, setComments] = useState({})
    const navigate = useNavigate()
    const videoRefs = useRef([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const currentVideo = entry.target

                    if (entry.intersectionRatio >= 0.9) {
                        // Pause all videos first
                        videoRefs.current.forEach(video => {
                            if (video && video !== currentVideo) {
                                video.pause()
                            }
                        })

                        // Play current video
                        currentVideo.play().catch(() => { })
                    } else {
                        currentVideo.pause()
                    }
                })
            },
            {
                threshold: [0.5, 0.75, 0.9, 1.0] // smoother detection
            }
        )

        videoRefs.current.forEach(video => {
            if (video) observer.observe(video)
        })

        return () => {
            videoRefs.current.forEach(video => {
                if (video) observer.unobserve(video)
            })
        }
    }, [videos])

    useEffect(() => {

        axios.get('http://localhost:3000/api/food', { withCredentials: true }).then(response => {
            
            console.log(response.data)
            setVideos(response.data.foodItems)          
            // Initialize likes, saves, comments with dummy data
            const initialData = {}
            response.data.foodItems.forEach(video => {
                initialData[video._id] = {
                    likes: Math.floor(Math.random() * 100),
                    saves: Math.floor(Math.random() * 100),
                    comments: Math.floor(Math.random() * 100)
                }
            })
            setLikes(initialData)
        })
    }, [])

    const handleVisitStore = (foodPartner) => {
        console.log('Visiting store:', foodPartner)
        navigate(`/food-partner/${foodPartner}`)
    }

    const toggleLike = (videoId) => {
        setLikes(prev => ({
            ...prev,
            [videoId]: {
                ...prev[videoId],
                isLiked: !prev[videoId]?.isLiked,
                likes: prev[videoId]?.isLiked ? prev[videoId].likes - 1 : prev[videoId].likes + 1
            }
        }))
    }

    const toggleSave = (videoId) => {
        setSaves(prev => ({
            ...prev,
            [videoId]: !prev[videoId]
        }))
    }

    return (
        <div className="video-feed-wrapper">
            <div className="video-feed-container">
                {videos.map((video, index) => (
                    <div key={video._id} className="reel-container">
                        {/* Video Background */}
                        <div className="reel-video">
                            <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                className="reel-video-player"
                                src={video.video}
                                loop
                                muted
                                playsInline
                            />
                            {/* Gradient Overlay for better text visibility */}
                            <div className="reel-overlay-gradient"></div>
                        </div>

                        {/* Right Side Icons */}
                        <div className="reel-actions">
                            {/* Like Button */}
                            <div className="action-item">
                                <button
                                    className={`action-btn like-btn ${likes[video._id]?.isLiked ? 'active' : ''}`}
                                    onClick={() => toggleLike(video._id)}
                                >
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>
                                <span className="action-count">{likes[video._id]?.like || 0}</span>
                            </div>

                            {/* Save Button */}
                            <div className="action-item">
                                <button
                                    className={`action-btn save-btn ${saves[video._id] ? 'active' : ''}`}
                                    onClick={() => toggleSave(video._id)}
                                >
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                    </svg>
                                </button>
                                <span className="action-count">{saves[video._id] ? (likes[video._id]?.likes || 0) : 0}</span>
                            </div>

                            {/* Comment Button */}
                            <div className="action-item">
                                <button className="action-btn comment-btn">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 16v-4m0-4v.01"></path>
                                    </svg>
                                </button>
                                <span className="action-count">{likes[video._id]?.comments || 0}</span>
                            </div>
                        </div>

                        {/* Content Overlay - Description and Button */}
                        <div className="reel-content">
                            <div className="reel-description-section">
                                <p className="reel-description">{video.description}</p>
                                <button
                                    className="reel-visit-btn"
                                    onClick={() => handleVisitStore(video.foodPartner)}
                                >
                                    Visit Store
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Navigation */}
            <div className="bottom-navbar">
                <Link to="/" className="nav-item active">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Home</span>
                </Link>
                <Link to="/saved" className="nav-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    </svg>
                    <span>Saved</span>
                </Link>
            </div>
        </div>
    )
}

export default Home
