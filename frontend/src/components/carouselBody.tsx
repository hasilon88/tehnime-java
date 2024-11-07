import React, {FC, useEffect, useState} from 'react';
import {
    Carousel,
    IconButton,
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

interface Anime {
    id: string;
    title: string;
    image: string;
    description:string;
    imageCover:string;
    releaseDate: string;
}
interface CarouselProps {
    user: {
        email: string,
        firstName: string,
        history: [],
        id: number,
        lastName: string,
        watchlist: []
    },
    animeList: Anime[];
    title: string,
    subtitle: string
}



const CarouselBody: FC<CarouselProps> = ({ user, animeList, title, subtitle }) => {
    const chunkArray = (arr: any, size: any) =>
        arr.reduce((acc: any, e: any, i: any) => {
            return i % size ? acc : [...acc, arr.slice(i, i + size)];
        }, []);

    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
    const [chunkSize, setChunkSize] = useState(window.innerWidth <= 640 ? 2 : 5);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            // Update chunk size when window size is mobile
            setChunkSize(window.innerWidth <= 640 ? 2 : 5);
            setIsLargeScreen(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const chunkedAnimeList = chunkArray(animeList, chunkSize);

    return (
        <div className="mt-8">
            <Typography placeholder={undefined} variant="h4" className="lg:mb-2 ml-20 text-2xl lg:text-3xl font-bold text-white">
                {title}
            </Typography>
            <Typography placeholder={undefined} variant="small" className="ml-20 text-sm lg:text-lg text-justify mr-24 text-gray-500 mb-6">
                {subtitle}
            </Typography>
            <Carousel
                placeholder={undefined}
                loop={true}
                autoplay={false}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                                key={i}
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                    activeIndex === i ? "w-8 bg-transparent" : "w-4 bg-transparent"
                                }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
                prevArrow={({handlePrev}) => (
                    <IconButton
                        placeholder={undefined}
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handlePrev}
                        className="!absolute top-1/4 left-2 -translate-y-0/4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                    </IconButton>
                )}
                nextArrow={({handleNext}) => (
                    <IconButton
                        placeholder={undefined}
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handleNext}
                        className="!absolute top-1/4 !right-2 -translate-y-0/4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                        </svg>
                    </IconButton>
                )}
            >
                {chunkedAnimeList.map((chunk: any, index: any) => (
                    <div key={index} className="mx-14 flex justify-around">
                        {chunk.map((anime: any) => (
                            <Card
                                placeholder={undefined}
                                key={anime.title}
                                className="mx-2 overflow-hidden bg-transparent hover:cursor-pointer"
                                onClick={() => navigate('/description', {
                                    state: {
                                        email: user.email,
                                        firstName: user.firstName,
                                        history: user.history,
                                        id: user.id,
                                        lastName: user.lastName,
                                        watchlist: user.watchlist,
                                        animeId: anime?.id
                                    }
                                })}
                            >
                                <CardHeader
                                    placeholder={undefined}
                                    floated={false}
                                    shadow={false}
                                    color="transparent"
                                    className="m-0"
                                >
                                    <img
                                        src={anime.image}
                                        alt={anime.title}
                                        className={isLargeScreen ? "rounded object-cover h-80 w-96" : "rounded object-cover h-56 w-72"}
                                    />
                                    <div
                                        className="rounded absolute top-0 left-0 right-0 bottom-0 opacity-0 hover:opacity-80 transition-opacity duration-300 bg-black p-2">

                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9L5 21V3z"/>
                                            </svg>
                                        </div>

                                    </div>
                                </CardHeader>
                                <CardBody placeholder={undefined}>
                                    <Typography placeholder={undefined} variant="h6" color="white" className="text-center">
                                        {anime.title?.length > 16 ? anime.title?.substring(0, 16) + "..." : anime.title ?? "Anime"}
                                    </Typography>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default CarouselBody;
