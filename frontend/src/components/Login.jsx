import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate();

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
        body {
            transition: background-color 0.3s, color 0.3s, background-image 0.3s;
            font-family: Arial, sans-serif;
            text-align: center;
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
        }

        body.light-mode {
            background-color: white;
            color: black;
            background-image: url('https://i0.wp.com/bookme.tours/wp-content/uploads/2023/05/Is-Eiffel-Tower-Better-at-Night-or-Day.jpg?fit=1358%2C1000&ssl=1');
        }

        body.dark-mode {
            background-color: black;
            color: white;
            background-image: url('https://www.pixel4k.com/wp-content/uploads/2018/09/eiffel-tower-paris-night-city-city-lights-france-4k_1538067568.jpg.webp');
        }

        #modeToggle {
            padding: 10px;
            font-size: 16px;
            cursor: pointer;
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1000;
        }

        .glassmorphism {
            border: 1px solid rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, 0.2);
        }`;
        document.head.appendChild(styleSheet);

        const body = document.body;
        if (theme === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
        }
    }, [theme]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:3000/login', { email, password })
    .then(result => {
        console.log(result);
        if (result.data === "Success") {
            console.log("Login Success");
            alert('Login successful!');
            window.location.href = "http://127.0.0.1:5501/web-main/index.html";
        } else {
            alert('Incorrect password! Please try again.');
        }
    })
    .catch(err => console.log(err));
};


    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <div>
            <button id="modeToggle" onClick={toggleTheme}>
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </button>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ height: '100vh', width: '100vw' }}>
                <div className="glassmorphism p-3 rounded" style={{ width: '40%', marginRight: 'auto', marginLeft: '5%' }}>
                    <h2 className='mb-3 text-primary'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                id="exampleInputEmail1"
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <p className='container my-2'>Don't have an account?</p>
                    <Link to='/register' className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
