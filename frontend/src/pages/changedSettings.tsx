import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import logo from '../assets/logo.png';

const Changed = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const message = location?.state.message;

    const state = {
        email: location?.state?.email, 
        firstName: location?.state?.firstName, 
        history: location?.state?.history, 
        id: location?.state?.id, 
        lastName: location?.state?.lastName, 
        watchlist: location?.state?.watchlist
    };

    const [user, setUser] = useState<any>(state);


    useEffect(() => {
        if(user === null || user === undefined || user.id === null || user.id === undefined){
            navigate("/");
        }
    }, []);

    return (
        <div className="bg-fixed bg-gradient-to-b from-transparent to-black bg-cover bg-center bg-no-repeat lg:bg-contain h-screen flex flex-col justify-center items-center">
            <div className="mb-8" onClick={() => navigate('/dashboard', {
                state: {
                    email: user.email,
                    firstName: user.firstName,
                    history: user.history,
                    id: user.id,
                    lastName: user.lastName,
                    watchlist: user.watchlist
                }
            })}>
                <img src={logo} alt="Tehnime Logo" className="w-32 md:w-48 lg:w-64 cursor-pointer"/>
            </div>
            <Typography
                placeholder={undefined}
                variant="h1"
                color="white"
                className="text-center font-bold text-4xl md:text-5xl lg:text-6xl"
            >
                {message + " successfully modified!"}
            </Typography>
            <Typography
                placeholder={undefined}
                color="gray"
                className="mt-4 text-center"
            >
                Click on the logo to go home
            </Typography>
        </div>
    );
}

export default Changed;
