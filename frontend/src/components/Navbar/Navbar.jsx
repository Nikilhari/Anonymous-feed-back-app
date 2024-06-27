import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className={styles.c}>
            <div className={styles.logo}>
                <h1 title='Shh!!!'>WHISPER WIRE</h1>
            </div>
            <div className={styles.enclose}>
                <Link to='/register' className={styles.contents}>
                    <h3>Register</h3>
                </Link>
                <Link to='/' className={styles.contents}>
                    <h3>Login</h3>
                </Link>
            </div>
        </div>
    )
}

export default Navbar