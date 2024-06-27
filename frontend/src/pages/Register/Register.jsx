import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Login/Login.module.css'
import Navbar from '../../components/Navbar/Navbar.jsx'
import axios from 'axios';
import { useState } from 'react';
const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const userSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const container = document.getElementById("container");
        const rollNo = document.getElementById("rollNo");
        const userPass = document.getElementById("password");
        const userConfirmPass = document.getElementById("confirmPassword");
        event.preventDefault();
        if (userPass.value !== userConfirmPass.value) {
            const errorMessage = document.createElement('h4');
            errorMessage.innerHTML = "Please recheck your password";
            container.appendChild(errorMessage);
            setTimeout(() => {
                container.removeChild(errorMessage);
            }, 3000);
        }
        else {
            const values = {
                rollNumber: rollNo.value,
                password: userPass.value
            };
            await axios.post('https://anonymous-feed-back-app-1.onrender.com/auth/register', values)
                .then(res => { setLoading(false); navigate('/') })
                .catch(err => { console.log(err) });
        }

    };

    return (
        <>
            <Navbar />
            {
                loading ? <div className="loader"></div> :
                    <div className={styles.wrapper} id='container'>
                        <div className={styles.title}>
                            Registration Form
                        </div>
                        <form className={styles.enclose} onSubmit={userSubmit}>
                            <div className={styles.field}>
                                <input type="text" name='rollNumber' required id='rollNo' pattern='[2-9]{2}[A-Z]{3}[0-9]{3}' title='Roll number should be in format 22ABC132' />
                                <label>Roll No</label>
                            </div>
                            <div className={styles.field}>
                                <input type="password" name='Password' required id='password' />
                                <label>Password</label>
                            </div>
                            <div className={styles.field}>
                                <input type="password" name='confirmPassword' required id='confirmPassword' />
                                <label>Confirm Password</label>
                            </div>
                            <div className={styles.field}>
                                <input type="submit" value="Register" />
                            </div>
                            <div className={styles.signLink}>
                                Already a member? <Link to='/'>Sign in</Link>
                            </div>
                        </form>
                    </div>
            }
        </>
    )
}

export default Register