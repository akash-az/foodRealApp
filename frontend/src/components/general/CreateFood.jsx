
import React, { useState } from 'react'
import '../../styles/createFood.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        video: null
    })

    const [videoPreview, setVideoPreview] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({
                ...prev,
                video: file
            }))
            const videoURL = URL.createObjectURL(file)
            setVideoPreview(videoURL)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Form Data:', formData)


        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("video", formData.video);

        const response = await axios.post('http://localhost:3000/api/food', data, {
            withCredentials: true,

        })

        console.log('Response:', response.data)
        navigate("/");

    }

    return (
        <div className="create-food-container">
            <div className="create-food-card">
                <div className="create-food-header">
                    <h1 className="create-food-title">Create Food Reel</h1>
                    <p className="create-food-subtitle">Upload a new food video to share with the community</p>
                </div>

                <form onSubmit={handleSubmit} className="create-food-form">
                    {/* Food Name Field */}
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Food Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter food name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                    </div>

                    {/* Description Field */}
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Describe your food reel..."
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-textarea"
                            rows="5"
                            required
                        ></textarea>
                    </div>

                    {/* Video Upload Field */}
                    <div className="form-group">
                        <label htmlFor="video" className="form-label">Upload Video</label>
                        <div className="video-upload-wrapper">
                            <input
                                type="file"
                                id="video"
                                name="video"
                                accept="video/*"
                                onChange={handleVideoChange}
                                className="video-input"
                                required
                            />
                            <label htmlFor="video" className="video-upload-label">
                                <div className="video-upload-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                        <circle cx="12" cy="13" r="4"></circle>
                                    </svg>
                                </div>
                                <div className="video-upload-text">
                                    <p className="video-upload-main">Click to upload or drag video</p>
                                    <p className="video-upload-sub">MP4, WebM or Ogg (Max 100MB)</p>
                                </div>
                            </label>
                        </div>

                        {/* Video Preview */}
                        {videoPreview && (
                            <div className="video-preview">
                                <video src={videoPreview} controls className="preview-video"></video>
                                <button
                                    type="button"
                                    className="remove-video-btn"
                                    onClick={() => {
                                        setVideoPreview(null)
                                        setFormData(prev => ({ ...prev, video: null }))
                                    }}
                                >
                                    Remove Video
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        Upload Reel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateFood
