import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [receiverRollNumber, setReceiverRollNumber] = useState('');
    const [message, setMessage] = useState('');
    const [deleteFeedback, setDeletefeedback] = useState('');

    const postFeedback = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://localhost:3000/feedback", { receiverRollNumber, message }, {
                headers: {
                    Authorization: token
                },
            });
            console.log(response.data);
            setReceiverRollNumber('');
            setMessage('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (feed) => {
        try {
            console.log(feed)
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:3000/feedback/${feed}`, {
                headers: {
                    Authorization: token
                },
            });
            console.log(response.data)
            location.reload();
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        const getFeedbacks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:3000/feedback", {
                    headers: {
                        Authorization: token
                    },
                });
                setFeedbacks(response.data.feedbacks);
            } catch (error) {
                console.error(error);
            }
        };
        getFeedbacks();
    }, []);

    return (
        <>
            <div className="feedback_container">
                <h2 className="feedback_heading">My Feedbacks</h2>
                {feedbacks.length === 0 ? (
                    <p className="no_feedbacks">No feedbacks available</p>
                ) : (
                    <ul className="feedback_list">
                        {feedbacks.map((feedback, index) => (
                            <li key={index} className="feedback_item">
                                <p className="feedback_message">{feedback.message}</p>
                                {feedback._id}
                                <button onClick={() => {
                                    handleDelete(feedback._id);
                                }}>delete</button>
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
    );
};

export default Feedback;
