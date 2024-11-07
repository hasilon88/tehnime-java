import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import logo from '../assets/logo.png';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-fixed bg-gradient-to-b from-transparent to-black bg-cover bg-center bg-no-repeat lg:bg-contain h-screen flex flex-col justify-center items-center">
            <div className="mb-8" onClick={() => navigate('/')}>
                <img src={logo} alt="Tehnime Logo" className="w-32 md:w-48 lg:w-64 cursor-pointer"/>
            </div>
            <Typography
                placeholder={undefined}
                variant="h1"
                color="white"
                className="text-center font-bold text-4xl md:text-5xl lg:text-6xl"
            >
                Oops! Page Not Found
            </Typography>
            <Typography
                placeholder={undefined}
                color="gray"
                className="mt-4 text-center"
            >
                The page you're looking for doesn't exist.
            </Typography>
        </div>
    );
}

export default NotFound;
