import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import '../../styles/profileLayout.css'

const Profile = () => {

    const { id } = useParams();
    const [profile, setprofile] = useState(null)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/foodpartner/${id}`, { withCredentials: true }).then(response => {
            setprofile(response.data.foodPartner),
                setVideos(response.data.foodPartner.foodItems)
        })
    }, [id])


    // const profileData = {
    //     businessName: 'Business Name',
    //     address: 'Address',
    //     totalMeals: 43,
    //     customerServe: '15K'
    // }

    // const videos = Array(9).fill({
    //     id: Math.random(),
    //     description: 'Video'
    // })

    if (!profile) {
        return <h1>Loading...</h1>
    }



    return (
        <div className="profile-container">
            {/* Profile Info Section */}
            <div className="profile-section">
                <div className="profile-left">
                    <div className="profile-avatar"></div>
                </div>

                <div className="profile-right">
                    <div className="profile-field">
                        <input
                            type="text"
                            placeholder="Business Name"
                            value={profile.businessName}
                            readOnly
                        />
                    </div>
                    <div className="profile-field">
                        <input
                            type="text"
                            placeholder="Address"
                            value={profile.address}
                            readOnly
                        />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
                <div className="stat-box">
                    <div className="stat-label">Total Meals</div>
                    <div className="stat-value">{profile.totalMeals}</div>
                </div>
                <div className="stat-box">
                    <div className="stat-label">Customer Serve</div>
                    <div className="stat-value">{profile.customerServe}</div>
                </div>
            </div>

            {/* Video Grid Section */}
            <div className="video-grid-section">
                <div className="video-grid">
                    {videos.map((video, index) => (
                        <div key={index} className="video-tile">
                            <video
                                id='each-video'
                                src={video.video}
                                description={video.description}
                                muted

                            >

                            </video>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
