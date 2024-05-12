import React from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const rollNo = document.getElementById("rollNumber");
        const password = document.getElementById("password")
        const values = {
            rollNumber: rollNo.value,
            password: password.value
        }
        await axios.post("https://anonymous-feed-back-app-1.onrender.com/auth/login", values).then((res) => {
            localStorage.setItem("token", res.data);
            navigate('/Feedback')
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                Login Form
            </div>
            <form className={styles.enclose} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <input type="text" required id="rollNumber" />
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
                    Not a member? <Link to='/Register'>Signup now</Link>
                </div>
            </form>
        </div>
    )
}

export default Login