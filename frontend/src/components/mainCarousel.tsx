import { Carousel, Typography, Button, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

interface TrendingAnime {
    id: string;
    title: string;
    image: string;
    description: string;
    rank: number;
    episodeCount: number;
    imagePoster: string;
    imageCover: string;
}

interface CarouselWithContentProps {
    trendingAnimes: TrendingAnime[];
    user: any;
}

function CarouselWithContent({ trendingAnimes, user }: CarouselWithContentProps) {
    const navigate = useNavigate();
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 768);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Carousel
            placeholder={undefined}
            loop={true}
            className="h-[85vh]"
            autoplay={true}
            autoplayDelay={5000}
            navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                            }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
            prevArrow={({ handlePrev }) => (
                <IconButton
                    placeholder={undefined}
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handlePrev}
                    className="!absolute top-2/4 left-4 -translate-y-2/4"
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
            nextArrow={({ handleNext }) => (
                <IconButton
                    placeholder={undefined}
                    variant="text"
                    color="white"
                    size="lg"
                    onClick={handleNext}
                    className="!absolute top-2/4 !right-4 -translate-y-2/4"
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
            {trendingAnimes.map((anime) => {
                return (
                    <div key={anime.id}
                         className={isLargeScreen ? "relative h-full w-full flex items-center" : "relative h-full w-full flex flex-col items-center"}>
                        <div className="absolute h-full w-full bg-cover bg-center" style={{
                            backgroundImage: `url(${anime.imageCover})`,
                            filter: 'brightness(15%)',
                            zIndex: -1
                        }}></div>

                        <div className="z-10 text-center lg:text-left text-white lg:m-20 lg:p-8 m-7">
                            <Typography placeholder={undefined} variant="h3"
                                        className="lg:mb-8 text-4xl lg:text-5xl font-bold">
                                {anime.title?.length > 15 ? anime.title?.substring(0, 15) + "..." : anime.title ?? "Anime"}
                                {isLargeScreen ? <span id="badge-dismiss-yellow"
                                                       className="ml-4 inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-yellow-900 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                         className="w-5 h-5 mr-1">
                                        <path fillRule="evenodd"
                                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Ranked {anime.rank}
                                </span> : <div/>}

                            </Typography>
                            {isLargeScreen ?
                                <Typography placeholder={undefined} variant="lead"
                                            className="text-lg md:text-xl text-justify opacity-90">
                                    {anime.description.substring(0, 400)}...
                                </Typography>
                                :
                                <div/>
                            }

                            {isLargeScreen ?
                                <div className="mt-3 lg:mt-10">
                                    <Button
                                        placeholder={undefined}
                                        color="white"
                                        size="lg"
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => navigate("/search", {
                                            state: {
                                                email: user.email,
                                                firstName: user.firstName,
                                                history: user.history,
                                                id: user.id,
                                                lastName: user.lastName,
                                                watchlist: user.watchlist,
                                                animeId: anime?.id,
                                                query: anime.title,
                                            
                                            }
                                        })}
                                    >
                                        Start watching
                                    </Button>
                                </div>
                                :
                                <></>
                            }

                        </div>

                        <div className={`${isLargeScreen ? "min-w-[36%]" : "w-full flex justify-center"} `}
                             style={{zIndex: "auto"}}>
                            <img src={anime.imagePoster} alt="Poster"
                                 className={`${isLargeScreen ? "h-auto w-8/12" : "h-auto w-6/12"} object-contain rounded-xl`}/>
                        </div>

                        {!isLargeScreen ?
                            <div className="mt-8 lg:mt-10">
                                <Button placeholder={undefined} color="white" size="lg" fullWidth variant="outlined">Start
                                    watching</Button>
                            </div>
                            :
                            <></>
                        }
                    </div>
                )
            })}
        </Carousel>
    );
}

export default CarouselWithContent;