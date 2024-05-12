import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../Login/Login.module.css'
import axios from 'axios'
const Register = () => {
    const navigate = useNavigate();
    const userSubmit = async (event) => {
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
            }, 1000);
        }
        else {
            const values = {
                rollNumber: rollNo.value,
                password: userPass.value
            };
            await axios.post('http://localhost:3000/auth/register', values)
                .then(res => { navigate('/') })
                .catch(err => { console.log(err) });
        }

    };

    return (
        <div className={styles.wrapper} id='container'>
            <div className={styles.title}>
                Registeration Form
            </div>
            <form className={styles.enclose} onSubmit={userSubmit}>
                <div className={styles.field}>
                    <input type="text" name='rollNumber' required id='rollNo' />
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
                    Already a member? <Link to='/'>Signin now</Link>
                </div>
            </form>
        </div>
    )
}

export default Register