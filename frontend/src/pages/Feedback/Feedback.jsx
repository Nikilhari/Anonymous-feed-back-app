import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css';
import Navbar_logout from '../../components/Navbar_logout/Navbar_logout';
import toast, { Toaster } from 'react-hot-toast';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [receiverRollNumber, setReceiverRollNumber] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchFeedbacks = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Authorization token not found');
            return;
        }

        try {
            const response = await axios.get("https://anonymous-feed-back-app-1.onrender.com/feedback", {
                headers: { Authorization: token }
            });
            setFeedbacks(response.data.feedbacks);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch feedbacks');
        } finally {
            setLoading(false);
        }
    };

    const postFeedback = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Authorization token not found');
            return;
        }

        try {
            const postPromise = axios.post(
                "https://anonymous-feed-back-app-1.onrender.com/feedback",
                { receiverRollNumber, message },
                { headers: { Authorization: token } }
            );

            toast.promise(
                postPromise,
                {
                    loading: 'Saving...',
                    success: 'Feedback posted successfully!',
                    error: 'Failed to post feedback.',
                }
            );

            await postPromise;

            setReceiverRollNumber('');
            setMessage('');
            fetchFeedbacks();
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while posting feedback.');
        }
    };


    const handleDelete = async (feedbackId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Authorization token not found');
            return;
        }

        const originalFeedbacks = [...feedbacks];
        setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== feedbackId));
        toast.success("Feedback deleted successfully")
        try {
            await axios.delete(`https://anonymous-feed-back-app-1.onrender.com/feedback/${feedbackId}`, {
                headers: { Authorization: token }
            });
            toast.success('Feedback deleted successfully');
        } catch (error) {
            console.error(error);
            setFeedbacks(originalFeedbacks);
            toast.error('Failed to delete feedback');
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);
    useEffect(() => {
        toast.success("Logged in successfully");
    }, []);
    return (
        <>
            <Navbar_logout />
            {loading ? (
                <div className='loader'></div>
            ) : (
                <>
                    <div className="feedback_container">
                        <h2 className="feedback_heading">My Feedbacks</h2>
                        {feedbacks.length === 0 ? (
                            <p className="no_feedbacks">No feedbacks available</p>
                        ) : (
                            <ul className="feedback_list">
                                {feedbacks.map(({ _id, message }) => (
                                    <li key={_id} className="feedback_item">
                                        <p className="feedback_message">{message}</p>
                                        <button onClick={() => handleDelete(_id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="post_feedback">
                        <input
                            type="text"
                            value={receiverRollNumber}
                            onChange={(e) => setReceiverRollNumber(e.target.value)}
                            placeholder="Receiver Roll Number"
                        />
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your feedback"
                        />
                        <button onClick={postFeedback}>Post</button>
                    </div>
                </>
            )}
            <Toaster position="top-center" reverseOrder={true} />
        </>
    );
};

export default Feedback;
