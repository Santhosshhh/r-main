import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3000/register', { name, email, password })
        .then(result => {
            console.log(result);
            if(result.data === "Already registered"){
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            }
            else{
                alert("Registered successfully! Please Login to proceed.")
                navigate('/login');
            }
        })
        .catch(err => console.log(err));
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

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
            border-radius:20px; // Rounded button
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1000;
            border: none; // Remove border
            background: rgba(255, 255, 255, 0.5); // Semi-transparent background
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); // Box shadow
        }
            

        .glassmorphism {
            border: 1px solid rgba(255, 255, 255, 0.5);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, 0.2);
        }

        .plane {
            position: absolute;
            height: 230px;
            width: auto;
            animation-duration: 6s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }

        .plane1 {
            top: 10%;
            left: 100vw;
            animation-name: planeMove1;
        }

        .plane2 {
            top: 40%;
            left: 100vw;
            animation-name: planeMove2;
            animation-delay: 14s;
        }

        .plane3 {
            top: 70%;
            left: 100vw;
            animation-name: planeMove3;
            animation-delay: 10s;
        }

        @keyframes planeMove1 {
            from {
                left: 100vw;
            }
            to {
                left: -100%;
            }
        }

        @keyframes planeMove2 {
            from {
                left: 100vw;
            }
            to {
                left: -100%;
            }
        }

        @keyframes planeMove3 {
            from {
                left: 100vw;
            }
            to {
                left: -100%;
            }
        }`
        ;
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

    return (
        <div>
            <button 
                id="modeToggle" 
                onClick={toggleTheme} 
            >
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
            <div className="d-flex justify-content-start align-items-center text-center vh-100" style={{ height: '100vh', width: '100vw', paddingLeft: '3%' }}>
                <div className="p-3 rounded glassmorphism" style={{ width: '40%', position: 'relative', zIndex: 1 }}>
                    <h2 className='mb-3 text-primary'>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputName" className="form-label">
                                <strong>Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                className="form-control" 
                                id="exampleInputName" 
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail" 
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword" 
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                    <p className='my-2' style={{ color: 'white' }}>Already have an account ? <Link to='/login' className="btn btn-secondary">Login</Link></p>
                </div>
            </div>
            <img src="../../public/plane.png" alt="Plane" className="plane plane1" />
            <img src="../../public/plane.png" alt="Plane" className="plane plane2" />
            <img src="../../public/plane.png" alt="Plane"            className="plane plane3" />
        </div>
    );
}

export default Register;
