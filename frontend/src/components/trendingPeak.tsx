import { Typography } from "@material-tailwind/react";

const TrendingPeak = ({trendingAnime}: any)  => {
    if (trendingAnime === undefined)
        return <div>Loading</div>

    return (
        <figure className="mx-10 my-5 relative h-80 w-auto">
            <img
                className="h-full w-full rounded-xl object-cover object-center"
                src={trendingAnime.imageCover}
                alt="nature image"
                style={{filter: 'brightness(75%)'}}
            />
            <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/65 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                <div>
                    <Typography placeholder={undefined} variant="h5" color="blue-gray">
                        {trendingAnime.title !== null ? trendingAnime.title : "Anime"}
                    </Typography>
                    <Typography placeholder={undefined} color="gray" className="mt-2 font-normal">
                        {trendingAnime.description.substring(0, 100)}...
                    </Typography>
                </div>
                <Typography placeholder={undefined} variant="h6" color="blue-gray">
                    Rank: {trendingAnime.rank}
                </Typography>
            </figcaption>
        </figure>
    );
}

export default TrendingPeak;