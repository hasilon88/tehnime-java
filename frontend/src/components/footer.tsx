import { Typography } from "@material-tailwind/react";
import React from "react";

export function Footer() {
    return (
        <footer className="w-full mt-auto bg-white p-5">
            <div
                className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
                <Typography placeholder={undefined} color="blue-gray" className="text-center font-normal">
                    &copy; {new Date().getFullYear()} - Tehnime
                </Typography>
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography placeholder={undefined}
                                    as="a"
                                    color="blue-gray"
                                    className="font-normal transition-colors hover:text-blue-500 hover:cursor-pointer focus:text-blue-500"
                                    onClick={() => window.location.reload()}
                        >
                            About Us
                        </Typography>
                    </li>
                    <li>
                        <Typography placeholder={undefined}
                                    as="a"
                                    color="blue-gray"
                                    className="font-normal transition-colors hover:text-blue-500 hover:cursor-pointer focus:text-blue-500"
                                    onClick={() => window.location.reload()}
                        >
                            License
                        </Typography>
                    </li>
                    <li>
                        <Typography placeholder={undefined}
                                    as="a"
                                    color="blue-gray"
                                    className="font-normal transition-colors hover:text-blue-500 hover:cursor-pointer focus:text-blue-500"
                                    onClick={() => window.location.reload()}
                        >
                            Contribute
                        </Typography>
                    </li>
                    <li>
                        <Typography placeholder={undefined}
                                    as="a"
                                    color="blue-gray"
                                    className="font-normal transition-colors hover:text-blue-500 hover:cursor-pointer focus:text-blue-500"
                                    onClick={() => window.location.reload()}
                        >
                            Contact Us
                        </Typography>
                    </li>
                </ul>
            </div>
        </footer>
    );
}