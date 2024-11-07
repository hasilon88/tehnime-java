import {
    Card,
    CardBody,
    Typography,
    Button, Alert,
} from "@material-tailwind/react";

import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Footer } from "../components/footer";
import Header from "../components/header";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate, useLocation } from "react-router-dom";
import {Loading} from "./loading";


const Description: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [watchlist, setWatchlist] = useState(location?.state?.watchlist);
    
    const user = {
        email: location?.state?.email, 
        firstName: location?.state?.firstName, 
        history: location?.state?.history, 
        id: location?.state?.id, 
        lastName: location?.state?.lastName, 
        watchlist: watchlist
    };

    const animeId = location?.state?.animeId;
    const [descriptionObject, setDescripionObjet] = useState<any>(null);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1366);
    const [open, setOpen] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            const response = await API.getDescriptionData(animeId);

            if (response?.response === 200)
                setDescripionObjet(response.data)
        }

        const handleResize = () => {
            setIsLargeScreen(window.innerHeight > 1366);
        };

        window.addEventListener('resize', handleResize);

        fetchData();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    async function addToWatchlist() {
        const response = await API.addAnimeToWatchlist(user.id, animeId, descriptionObject.images.poster);
        const watchlistResponse = await API.getWatchlist(user.id);

        if (response?.response === 200 && watchlistResponse?.response === 200){
            setWatchlist(watchlistResponse?.data);
            setOpen(true);
        }
        else {
            setClose(true);
        }
    }

    if (descriptionObject === null) {
        return <Loading />
    }

    if (user === null) {
        return <Loading />
    }

    const background = descriptionObject.images.cover;
    const enName = descriptionObject.title.en;
    const jpName = descriptionObject.title.jp;

    if (descriptionObject.ageRating === "null")
        descriptionObject.ageRating = "Everyone"


    return (
        <div className="body">
            <div
                className={isLargeScreen ? "bg-fixed bg-gradient-to-b from-transparent to-black bg-cover bg-center bg-no-repeat lg:bg-contain max-h-full" : "bg-fixed bg-gradient-to-b from-transparent to-black bg-cover bg-center bg-no-repeat lg:bg-contain"}
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <Header user={user}/>
                <div className="mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
                    <div className="sticky top-1/4 z-10 justify-items-end float-end mr-10 w-1/5">
                        <Alert open={open} onClose={() => setOpen(false)} color="green" className="justify-items-end">
                            Anime added to watchlist.
                        </Alert>
                        <Alert open={close} onClose={() => setClose(false)} color="red" className="justify-items-end">
                            Anime already added to watchlist.
                        </Alert>
                    </div>
                    <Card placeholder={undefined}
                          className="justify-center items-center w-full lg:flex-row mt-7 mb-7">
                        <CardBody placeholder={undefined}>
                            <div className="flex flex-col lg:flex-row">
                                <div className="lg:w-1/3 m-5">
                                    <img src={descriptionObject.images.poster} alt="Poster"
                                         className="w-full h-auto rounded-2xl overflow-hidden"/>
                                </div>
                                <div className="lg:w-2/3 flex flex-col justify-center">
                                    <Typography placeholder={undefined} variant="h4" color="blue-gray"
                                                className={enName?.length > 20 || jpName?.length > 20 ? "title uppercase text-center text-2xl ml-auto mr-auto my-4" : "title uppercase text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl ml-auto mr-auto my-4"}
                                                style={{height: '60px', minWidth: '250px'}}>
                                        <Typewriter
                                            words={enName && jpName !== null ? [enName, jpName] : enName === null ? [jpName] : [enName]}
                                            typeSpeed={70}
                                            deleteSpeed={50}
                                            delaySpeed={1000}
                                            loop={0}

                                        />
                                    </Typography>
                                    <Typography placeholder={undefined}
                                                className="description mt-10 mb-5 text-justify text-base md:text-md">
                                        {descriptionObject.description}
                                    </Typography>
                                    <div className="text-center mt-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <Typography placeholder={undefined} className="date mb-6">
                                                    <Typography placeholder={undefined}
                                                                variant="h5">Date:</Typography> {descriptionObject.startDate}
                                                </Typography>
                                                <Typography placeholder={undefined} className="rating mb-6">
                                                    <Typography placeholder={undefined}
                                                                variant="h5">Rating:</Typography> {descriptionObject.rating}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography placeholder={undefined} className="episode-count mb-6">
                                                    <Typography placeholder={undefined}
                                                                variant="h5">Episodes:</Typography> {descriptionObject.episodes?.length}
                                                </Typography>
                                                <Typography placeholder={undefined} className="age-rating mb-6">
                                                    <Typography placeholder={undefined}
                                                                variant="h5">Age:</Typography> {descriptionObject.ageRating}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 px-4 sm:px-0">
                                            <div>
                                                <Button
                                                    placeholder={undefined}
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8 rounded shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                                    onClick={() => navigate('/watch', {
                                                        state: {
                                                            email: user.email,
                                                            firstName: user.firstName,
                                                            history: user.history,
                                                            id: user.id,
                                                            lastName: user.lastName,
                                                            watchlist: watchlist,
                                                            details: descriptionObject
                                                        }
                                                    })}>
                                                    Watch
                                                </Button>
                                            </div>
                                            <div>
                                                <Button
                                                    placeholder={undefined}
                                                    className="text-white font-bold py-2 px-8 rounded shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                                    onClick={addToWatchlist}
                                                >
                                                    Add to Watchlist
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="flex flex-col">
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Description;