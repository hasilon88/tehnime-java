import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../components/header";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import {Footer} from "../components/footer";
import API from "../services/api";

const WatchList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const state = {
        email: location?.state?.email, 
        firstName: location?.state?.firstName, 
        history: location?.state?.history, 
        id: location?.state?.id, 
        lastName: location?.state?.lastName, 
        watchlist: location?.state?.watchlist
    };
    const [user, setUser] = useState<any>(state);
    const [watchlist, setWatchlist] = useState<any>();


    useEffect(() => {
        const data = async () => {
            if (user === null || user === undefined || user.id === null || user.id === undefined) {
                navigate("/");
            }
            const watchlistResponse = await API.getWatchlist(user.id);
            if(watchlistResponse!=null){
                setWatchlist(watchlistResponse.data)
            }
        }
        data();
    }, []);

    function modifyAnimeId(animeId: string) {
        animeId = animeId.replaceAll("-", " ");
        animeId = animeId[0].toUpperCase() + animeId.substring(1);

        return animeId;
    }

    return (
        <div>
            <div className="min-h-screen">
                <Header user={user} />
                <div>
                    <Typography placeholder={undefined} className="m-5 text-center" variant="h2" color="white">
                        {user?.firstName}'s Watchlist
                    </Typography>
                </div>
                {watchlist == null ? (
                    <div className="flex justify-center h-screen text-white">No results found</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-5 m-4">
                        {watchlist?.map((anime: any) => (
                            <Card
                                placeholder={undefined}
                                key={anime.id}
                                className="overflow-hidden bg-transparent hover:cursor-pointer"
                                onClick={() => navigate('/description', {
                                    state: {
                                        email: user.email,
                                        firstName: user.firstName,
                                        history: user.history,
                                        id: user.id,
                                        lastName: user.lastName,
                                        watchlist: user.watchlist,
                                        animeId: anime?.animeId
                                    }
                                })}
                            >
                                <CardHeader
                                    placeholder={undefined}
                                    color="transparent"
                                    className="m-0"
                                >
                                    <img
                                        src={anime.image}
                                        alt={anime.title}
                                        className="w-full h-72 md:h-96 object-cover"
                                    />
                                    <div className="rounded absolute top-0 left-0 right-0 bottom-0 opacity-0 hover:opacity-80 transition-opacity duration-300 bg-black p-2">
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9L5 21V3z" />
                                            </svg>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody placeholder={undefined}>
                                    <Typography placeholder={undefined} variant="h6" color="white" className="text-center">
                                        {modifyAnimeId(anime.animeId) ?? "Anime"}
                                    </Typography>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default WatchList;
