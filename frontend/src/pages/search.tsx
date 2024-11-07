import { useEffect, useState } from "react";
import API from "../services/api";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Input,
    IconButton
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { Footer } from "../components/footer";
import {Loading} from "./loading";
import NotFound from "./notFound";

const Search: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState(location.state.query);
    const user = location.state.user;
    const [searchResults, setSearchResults] = useState({ results: [] });
    const [hasNextPage, setHasNextPage] = useState(true);
    const [active, setActive] = useState(1);

    const next = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (!hasNextPage) return;
        setActive(active + 1);
    };

    const prev = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (active === 1) return;
        setActive(active - 1);
    };

    useEffect(() => {
        async function fetchResults() {
            let results: any = await API.search(searchValue, 1);

            if (results?.response === 200) {
                setSearchResults(results?.data);
                setActive(results?.data?.currentPage);
                setHasNextPage(results?.data.hasNextPage);
            } else {
                setSearchResults({ results: [] });
            }
        }

        if ((searchValue !== null) && (searchValue === "Anime" || searchValue === "" || searchValue.trim() === "")) {
            setSearchResults({ results: [] });
            return;
        }

        fetchResults();
    }, [searchValue]);

    useEffect(() => {
        async function getPage() {
            let results: any = await API.search(searchValue, active);

            if (results?.response === 200) {
                setSearchResults(results?.data);
                setActive(results?.data?.currentPage);
                setHasNextPage(results?.data.hasNextPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setSearchResults({ results: [] });
            }
        }

        getPage();
    }, [active]);

    if (searchValue === null) {
        return <NotFound />
    }

    if (searchResults.results.length === 0) {
        return <Loading />
    }

    return (
        <div>
            <Header user={user} />
            <div className="m-5 min-h-screen">
                <div className="w-100 m-5">
                    <Input
                        placeholder={undefined}
                        color="white"
                        crossOrigin={undefined}
                        value={searchValue}
                        onChange={(ev: any) => setSearchValue(ev.target.value)}
                    />
                </div>
                    <Typography placeholder={undefined} className="m-5" variant="h2" color="white">
                        Search results for {searchValue}
                    </Typography>
                {searchResults?.results?.length === 0 ? (
                    <div className="flex justify-center h-screen text-white">No results found</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-4">
                        {searchResults?.results?.map((anime: any) => (
                            <Card
                                placeholder={undefined}
                                key={anime.title}
                                className="overflow-hidden bg-transparent hover:cursor-pointer"
                                onClick={() => navigate('/description', {
                                    state: {
                                        user: user,
                                        animeId: anime?.id
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
                                        {anime.title ?? "Anime"}
                                    </Typography>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                )}
                <div className="flex items-center gap-8 justify-center">
                    <IconButton
                        color="white"
                        placeholder={undefined}
                        size="sm"
                        variant="outlined"
                        onClick={prev}
                        disabled={active === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                    <Typography placeholder={undefined} color="white" className="font-normal">
                        Page <strong className="text-white">{active}</strong>
                    </Typography>
                    <IconButton
                        color="white"
                        placeholder={undefined}
                        size="sm"
                        variant="outlined"
                        onClick={next}
                        disabled={!hasNextPage}
                    >
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Search;
