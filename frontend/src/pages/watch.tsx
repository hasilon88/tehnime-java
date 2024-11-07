import React, { useEffect, useState } from "react";
import API from "../services/api";
import { DropDownList } from "../components/dropdown";
import { Button } from "@material-tailwind/react";
import VideoPlayer from "../components/videoPlayer";
import {useLocation, useNavigate} from "react-router-dom";
import {Loading} from "./loading";
import tehnime from "../assets/logo.png";

const Watch: React.FC = () => {
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

    const details = location?.state?.details;

    const history = user?.history;

    const [episode, setEpisode] = useState<any>({ number: details?.episodes[0]?.episodeNumber, id: details?.episodes[0]?.id, urls: null });
    const [url, setUrl] = useState<string>("");
    const [isExpanded, setIsExpanded] = useState<boolean>(window.innerWidth > 768);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    useEffect(() => {

        if (user === null || user === undefined || details === null || details === undefined) {
            navigate("/");
        }

        async function refreshHistory() {
            const tempHistory = await API.getHistory(user.id);
            const tempUser = user;
            tempUser.history = tempHistory?.data;

            setUser(tempUser);
        }

        async function getEpisodeUrl() {
            const tempEpisode = await API.getEpisode(episode?.id);

            if (tempEpisode?.response === 200) {
                setEpisode({ ...episode, urls: tempEpisode?.data });
                setUrl(tempEpisode?.data?.ultra)
            }
        }
        refreshHistory();
        getEpisodeUrl();
    }, [episode.number]);

    function handlePrevious() {
        if (isButtonDisabled)
            return;

        setIsButtonDisabled(true);
        if (episode.number > 1) {
            setEpisode({ number: episode.number - 1, id: `${details.id}-episode-${episode.number - 1}`, urls: { ultra: "" } });
        }
        setTimeout(() => setIsButtonDisabled(false), 3000);
    }

    function handleNext() {
        if (isButtonDisabled) return;

        setIsButtonDisabled(true);
        if (episode.number !== details.episodes[details.episodes.length - 1].episodeNumber) {
            setEpisode({ number: episode.number + 1, id: `${details.id}-episode-${episode.number + 1}`, urls: { ultra: "" } });
        }
        setTimeout(() => setIsButtonDisabled(false), 3000);
    }

    if (episode.urls === null) {
        return <Loading />;
    }

    return (
        <div
            className="p-5 bg-fixed bg-gradient-to-b from-transparent to-black bg-cover bg-center bg-no-repeat lg:bg-contain h-full"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${details.images.cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
            }}>

            <div className="hover: cursor-pointer w-10" onClick={() => navigate('/dashboard', {state: user})}>
                <img src={tehnime} alt="logo-ct"/>
            </div>

            <div className="container text-white mx-auto">
                <br/>
                <div className="ml-5 mb-2">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-start">
                        <b>Watching </b>{details.title.en} Episode <b>{episode.number}</b>
                    </h1>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 m-3">
                        <VideoPlayer
                            url={url}
                            key={url}
                            userId={user.id}
                            episodeId={episode.id}
                            history={history}
                            animeImages={details.images}
                            setUser={setUser}
                            user={user}
                        />
                        <div className="mt-3 text-white flex flex-row">
                            <div className="m-3 w-1/2">
                                <DropDownList list={episode.urls} setUrl={setUrl}/>
                            </div>
                            <div className="m-3 w-1/2">
                                <Button
                                    placeholder={undefined}
                                    size="sm"
                                    className="w-full"
                                    color="white"
                                    variant="outlined"
                                    onClick={() => window.open(episode.urls.download, '_blank')}
                                >
                                    <span className="inline-flex items-center justify-center space-x-2">
                                        Download
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-initial md:w-1/4 ml-3">
                        <div className="border-2 border-gray-300 shadow-lg rounded-lg backdrop-blur-md p-5">
                            <h1 className="text-center text-2xl font-semibold mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor"
                                     className="w-6 h-6 mr-6 inline-block hover:cursor-pointer" onClick={handlePrevious}
                                     style={{
                                         pointerEvents: isButtonDisabled ? 'none' : 'auto',
                                         opacity: isButtonDisabled ? 0.5 : 1
                                     }}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"/>
                                </svg>

                                Episodes
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor"
                                     className="w-6 h-6 ml-2 inline-block hover:cursor-pointer"
                                     onClick={() => setIsExpanded(!isExpanded)}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor"
                                     className="w-6 h-6 ml-6 inline-block hover:cursor-pointer" onClick={handleNext}
                                     style={{
                                         pointerEvents: isButtonDisabled ? 'none' : 'auto',
                                         opacity: isButtonDisabled ? 0.5 : 1
                                     }}>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                                </svg>
                            </h1>
                            <hr/>

                            {isExpanded && (
                                <div className="relative m-auto" style={{transition: 'max-height 0.5s ease-in-out'}}>
                                    <div
                                        className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-4 overflow-y-auto"
                                        style={{
                                            maxHeight: 'calc(7*2.5rem + 16*0.375rem + 1rem)',
                                            msOverflowStyle: 'none',
                                            scrollbarWidth: 'none',
                                        }}
                                    >
                                        {
                                            details.episodes.map((ep: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className={`flex justify-center items-center lg:w-10 lg:h-10 font-bold rounded cursor-pointer hover:bg-gray-500 ${index + 1 === episode.number ? "bg-transparent border border-white text-white" : "bg-white text-black"}`}
                                                    onClick={() => {
                                                        if (isButtonDisabled) return;

                                                        setIsButtonDisabled(true);
                                                        setEpisode({
                                                            number: ep.episodeNumber,
                                                            id: ep.id,
                                                            urls: {ultra: undefined}
                                                        });

                                                        setTimeout(() => {
                                                            setIsButtonDisabled(false);
                                                        }, 3000);
                                                    }}
                                                >
                                                    {ep.episodeNumber}
                                                </div>
                                            ))
                                        }

                                    </div>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor"
                                         className="absolute bottom-0 right-0 w-4 h-4" style={{
                                        pointerEvents: 'none',
                                        marginBottom: '-0.7rem',
                                        marginRight: '-0.8rem'
                                    }}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"/>
                                    </svg>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row m-5">
                    <div className="md:w-1/4 m-3">
                        <img src={details.images.poster} alt="Poster" className="rounded-2xl overflow-hidden"/>
                    </div>
                    <div className="md:flex-1 relative">
                        <div className="m-5">
                            <h1 className="text-3xl lg:text-4xl font-semibold">
                                <b>{details.title.en} - ({details.title.jp})</b>
                            </h1>
                            <div className="mt-3">
                                <div className="text-lg lg:text-xl mt-3">
                                    <h5>
                                        <div className="text-2xl ms-2 mt-3">
                                            <span id="badge-dismiss-dark"
                                                  className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                     fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd"
                                                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
                                                          clipRule="evenodd"/>
                                                </svg>

                                                <div className="ml-1">
                                                    {details.status}
                                                </div>

                                            </span>
                                            <span id="badge-dismiss-yellow"
                                                  className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                     fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd"
                                                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                                                          clipRule="evenodd"/>
                                                </svg>

                                                <div className="ml-1">
                                                    {details.rating} / 100
                                                </div>

                                            </span>
                                            <span id="badge-dismiss-red"
                                                  className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                     fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd"
                                                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                                          clipRule="evenodd"/>
                                                </svg>

                                                <div className="ml-1">
                                                    {details.ageRating}
                                                </div>

                                            </span>
                                            <span id="badge-dismiss-green"
                                                  className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/>
                                                </svg>

                                                <div className="ml-1">
                                                    {details.startDate}
                                                </div>

                                            </span>
                                        </div>
                                    </h5>
                                </div>
                            </div>
                            <div className="text-justify text-lg lg:text-xl font-semibold mt-5">
                                {details.description.length < 550 ? details.description : `${details.description.substring(0, 550)}...`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Watch;