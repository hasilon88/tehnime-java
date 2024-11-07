import React, { useEffect, useState } from "react";
import API from "../services/api";
import CarouselBody from "../components/carouselBody";
import  Header  from "../components/header";
import { Footer } from "../components/footer";
import CarouselWithContent from "../components/mainCarousel";
import TrendingPeak from "../components/trendingPeak";
import {useLocation, useNavigate} from "react-router-dom";
import {Loading} from "./loading";

const DashBoard: React.FC = () => {
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
    const history = user?.history || []

    const [popular, setPopular] = useState<any>([]);
    const [recent, setRecent] = useState<any>([]);
    const [topAiring, setTopAiring] = useState<any>([]);
    const [trending, setTrending] = useState<any>([]);

    useEffect(() => {

        if (user === null || user === undefined || user.id === null || user.id === undefined) {
            navigate("/");
        }
        const fetchLanding = async () => {
            const landing = await API.getLandingData();
            setPopular(landing?.data?.popular);
            setRecent(landing?.data?.recent);
            setTopAiring(landing?.data?.topAiring);
            setTrending(landing?.data?.trending);
        };

        fetchLanding();
    }, []);

    if (trending.length === 0)
        return <Loading />

    return (
        <div>
            <Header user={user}/>
            <CarouselWithContent trendingAnimes={trending} user={user}/>

            <div>
                <CarouselBody animeList={popular} title={"The Popular ones"} subtitle={"Check out the latest popular anime favorites!"} user={user}/>
                <TrendingPeak trendingAnime={trending[Math.floor(Math.random() * trending.length)]}/>
                <CarouselBody animeList={recent} title={"Recent Releases"} subtitle={"Explore the newest anime releases now!"} user={user}/>
                <TrendingPeak trendingAnime={trending[Math.floor(Math.random() * trending.length)]}/>
                <CarouselBody animeList={topAiring} title={"On The Air Right Now"} subtitle={"Catch the top airing anime series everyone's talking about!"} user={user}/>
            </div>

            <Footer />
        </div>
    );
};
export default DashBoard;
