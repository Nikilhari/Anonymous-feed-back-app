import React from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios'
import { useState } from 'react';
const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const rollNo = document.getElementById("rollNumber");
        const password = document.getElementById("password")
        const values = {
            rollNumber: rollNo.value,
            password: password.value
        }
        await axios.post("https://anonymous-feed-back-app-1.onrender.com/auth/login", values).then((res) => {
            setLoading(false)
            if (res.data === "user_not_found") {
                alert("Enter valid username/password");
            }
            else if (res.data === "password_do_not_match") {
                alert("Enter valid usermame/password");
            }
            else {

                localStorage.setItem("token", res.data);
                navigate('/Feedback')
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <Navbar />
            {loading ? <div className='loader'>
            </div> :
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        Login Form
                    </div>
                    <form className={styles.enclose} onSubmit={handleSubmit}>
                        <div className={styles.field}>
                            <input type="text" required id="rollNumber" pattern='[2-9]{2}[A-Z]{3}[0-9]{3}' title='Roll number should be in format 22ABC132' />
                            <label>Roll No</label>
                        </div>
                        <div className={styles.field}>
                            <input type="password" required id="password" />
                            <label>Password</label>
                        </div>
                        <div className={styles.field}>
                            <input type="submit" value="Login" />
                        </div>
                        <div className={styles.signLink}>
                            Not a member? <Link to='/Register'>Register</Link>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default Login