import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const userSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const rollNo = document.getElementById("rollNo");
    const userPass = document.getElementById("password");
    const userConfirmPass = document.getElementById("confirmPassword");

    if (userPass.value !== userConfirmPass.value) {
      setLoading(false);
      toast.error("Passwords do not match. Please recheck.");
      return;
    }

    const values = {
      rollNumber: rollNo.value,
      password: userPass.value,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        values
      );

      setLoading(false);

      if (response.data.message === "User already registered") {
        toast.error("User already exists. Please log in.");
      } else {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 1500);
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
          <div className={styles.title}>Registration Form</div>
          <form className={styles.enclose} onSubmit={userSubmit}>
            <div className={styles.field}>
              <input
                type="text"
                name="rollNumber"
                required
                id="rollNo"
                pattern="[2-9]{2}[A-Z]{3}[0-9]{3}"
                title="Roll number should be in format 22ABC132"
              />
              <label>Roll No</label>
            </div>
            <div className={styles.field}>
              <input type="password" name="Password" required id="password" />
              <label>Password</label>
            </div>
            <div className={styles.field}>
              <input
                type="password"
                name="confirmPassword"
                required
                id="confirmPassword"
              />
              <label>Confirm Password</label>
            </div>
            <div className={styles.field}>
              <input type="submit" value="Register" />
            </div>
            <div className={styles.signLink}>
              Already a member? <Link to="/">Sign in</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
