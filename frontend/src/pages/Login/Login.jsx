import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const rollNo = document.getElementById("rollNumber");
    const password = document.getElementById("password");

    const values = {
      rollNumber: rollNo.value,
      password: password.value,
    };

    try {
      const response = await axios.post(
        "https://anonymous-feed-back-app-1.onrender.com/auth/login",
        values
      );

      setLoading(false);

      if (response.data === "user_not_found") {
        toast.error("User does not exist. Please register first.");
      } else if (response.data === "password_do_not_match") {
        toast.error("Incorrect password. Please try again.");
      } else {
        localStorage.setItem("token", response.data);
        toast.success("Login successful!");
        setTimeout(() => navigate("/Feedback"), 1500); // Delay to show toast
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.title}>Login Form</div>
          <form className={styles.enclose} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <input
                type="text"
                required
                id="rollNumber"
                pattern="[2-9]{2}[A-Z]{3}[0-9]{3}"
                title="Roll number should be in format 22ABC132"
              />
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
              Not a member? <Link to="/Register">Register</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
