// import React from 'react';
import { Link } from "react-router-dom";
// import img1 from 'src/components/Images/background.jfif';
 

const Home = () => {
  return (
    <div style= {{backgroundImage : `url(./plane.png)`, backgroundSize: 'cover', backgroundPosition: 'center'}} className="d-flex flex-column justify-content-center align-items-center text-center vh-100">
        <h1>Login Success Page</h1>
        <Link to='/login' className="btn btn-light my-5">Logout</Link>
    </div>
  )
}

export default Home