import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import React, {FC, useEffect, useState} from "react";
import API from "../services/api";
import * as ValidEmail from 'email-validator';
import {useNavigate} from "react-router-dom";
import {Typewriter} from "react-simple-typewriter";

interface stateProps {
    oldUser: {
        email: string,
        firstName: string,
        history: [],
        id: number,
        lastName: string,
        watchlist: []
    }
}

export const SettingsCard: FC<stateProps> = ({oldUser}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null || user === undefined || user.id === null || user.id === undefined){
            navigate("/");
        }
    }, []);

    const [user, setUser] = useState(oldUser);
    const [userName , setUserName] = useState(oldUser?.lastName);
    const [userFirstName , setUserFirstName] = useState(oldUser?.firstName);
    const [userEmail , setUserEmail] = useState(oldUser?.email);
    const [submit, setSubmit] = useState(false);

    const [validName, setValidName] = useState(false);
    const [validFirstName, setValidFirstName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);


    useEffect(() => {
        setValidName(API.regex.test(userName));
        setValidFirstName(API.regex.test(userFirstName));
        setValidEmail(ValidEmail.validate(userEmail));

    }, [userName,userFirstName,userEmail]);

    async function changeSettings(id: number, firstname: string, lastName: string, email: string) {
        if((validName && validFirstName && validEmail)){
            const request = await API.editUser(id, firstname, lastName, email);

            if(request?.response === 200) {
                navigate('/feedback', {
                state: {
                    email: user.email,
                    firstName: user.firstName,
                    history: user.history,
                    id: user.id,
                    lastName: user.lastName,
                    watchlist: user.watchlist,
                    message: "Settings"
                }
            })
            } else {
                navigate('/*')
            }
        }

    }

    return (
        <>
            <Card
                placeholder={undefined}
                className="md:pl-40 md:pr-40 md:pt-10 md:pb-10 p-auto"
            >
                <CardBody
                    placeholder={undefined}
                    className="flex flex-col gap-4 items-center h-full"
                >

                    <Typography
                        placeholder={undefined}
                        variant="h1"
                        color="black"
                        className="text-center font-bold"
                        style={{ height: '60px', minWidth: '250px' }}
                    >
                        <Typewriter
                            words={["Settings"]}
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                            loop={0}

                        />
                    </Typography>

                    <Typography
                        placeholder={undefined}
                        variant="h5"
                        color="black"
                        className="pt-4"
                    >
                        Email
                    </Typography>
                    <Input
                        crossOrigin={undefined}
                        placeholder={undefined}
                        label={userEmail} size="lg"
                        type="email"
                        onChange={e => setUserEmail(e.target.value)}
                        error={!validEmail && submit}


                    />
                    <Typography
                        placeholder={undefined}
                        variant="h5"
                        color="black"
                        className="pt-4"
                    >
                        First Name
                    </Typography>
                    <Input
                        variant="outlined"
                        crossOrigin={undefined}
                        placeholder={undefined}
                        label={userFirstName}
                        size="lg"
                        onChange={e => setUserFirstName(e.target.value)}
                        error={!validFirstName && submit}
                    />
                    <Typography
                        placeholder={undefined}
                        variant="h5"
                        color="black"
                        className="pt-4"
                    >
                        Last Name
                    </Typography>
                    <Input
                        crossOrigin={undefined}
                        placeholder={undefined}
                        label={userName} size="lg"
                        onChange={e => setUserName(e.target.value)}
                        error={!validName && submit}

                    />

                    <div className="flex-grow"></div>

                    <Typography
                        placeholder={undefined}
                        variant="small"
                        className="flex justify-center"
                    >
                        Don't want to change anything?
                        <Typography
                            placeholder={undefined}
                            as="a"
                            variant="small"
                            color="blue-gray"
                            className="hover: cursor-pointer ml-1 font-bold"
                            onClick={() => navigate("/dashboard", {
                                state: {
                                    email: user.email,
                                    firstName: user.firstName,
                                    history: user.history,
                                    id: user.id,
                                    lastName: user.lastName,
                                    watchlist: user.watchlist
                                }
                            })}
                        >
                            Go Home
                        </Typography>
                    </Typography>

                    <Typography
                        placeholder={undefined}
                        variant="small"
                        className="flex justify-center"
                    >
                        Want to change your password?
                        <Typography
                            placeholder={undefined}
                            as="a"
                            variant="small"
                            color="blue-gray"
                            className="hover: cursor-pointer ml-1 font-bold"
                            onClick={() => navigate("/password", {
                                state: {
                                    email: user.email,
                                    firstName: user.firstName,
                                    history: user.history,
                                    id: user.id,
                                    lastName: user.lastName,
                                    watchlist: user.watchlist
                                }
                            })}
                        >
                            Change it
                        </Typography>
                    </Typography>
                </CardBody>
                <CardFooter
                    placeholder={undefined}
                    className="pt-0"
                >
                    <Button placeholder={undefined} variant="gradient" fullWidth onClick={()=> {setSubmit(true); changeSettings(user.id, userFirstName, userName, userEmail) } }>
                        Change
                    </Button>

                </CardFooter>
            </Card>
        </>
    );
}