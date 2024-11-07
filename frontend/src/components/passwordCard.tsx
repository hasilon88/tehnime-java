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
import {useNavigate} from "react-router-dom";

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

export const PasswordCard: FC<stateProps> = ({oldUser}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(oldUser);

    const [id, setId] = useState(user?.id);
    const [email, setEmail] = useState(user?.email);
    const [oldPwd, setOldPassword] = useState("");
    const [newPwd, setNewPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const [validOldPwd, setValidOldPwd] = useState(true);
    const [validNewPwd, setValidNewPwd] = useState(false);


    useEffect(() => {
        if (user === null || user === undefined || user.id === null || user.id === undefined) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        setValidNewPwd(API.regexPwd.test(newPwd))
    }, [oldPwd, newPwd])

    async function changePassword(oldPassword: string, newPassword: string) {
        if (validNewPwd) {
            const request = await API.changePassword(id, email, oldPassword, newPassword)

            if (request?.response === 200) {
                navigate('/feedback', {
                    state: {
                        email: user.email,
                        firstName: user.firstName,
                        history: user.history,
                        id: user.id,
                        lastName: user.lastName,
                        watchlist: user.watchlist,
                        message: "Password"
                    }
                })
            } else {
                setValidOldPwd(false);
            }
        }

    }

    return (
        <>
            <Card
                placeholder={undefined}
                className="md:pl-20 md:pr-20 md:pt-10 md:pb-10 p-auto"
            >
                <CardBody
                    placeholder={undefined}
                    className="flex flex-col gap-4 items-center h-full"
                >
                    <Typography
                        placeholder={undefined}
                        variant="h5"
                        color="black"
                        className="pt-4"
                    >
                        Old Password
                    </Typography>
                    <Input
                        crossOrigin={undefined}
                        placeholder={undefined}
                        label="Old Password"
                        type="password"
                        size="md"
                        onChange={e => setOldPassword(e.target.value)}
                        error={!validOldPwd && submit}
                    />
                    <Typography
                        placeholder={undefined}
                        variant="h5"
                        color="black"
                        className="pt-4"
                    >
                        New Password
                    </Typography>
                    <Input
                        crossOrigin={undefined}
                        placeholder={undefined}
                        label="New Password"
                        type="password"
                        size="md"
                        onChange={e => setNewPassword(e.target.value)}
                        error={!validNewPwd && submit}
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
                </CardBody>
                <CardFooter
                    placeholder={undefined}
                    className="pt-0"
                >
                    <Button placeholder={undefined} variant="gradient" fullWidth onClick={() => {
                        setSubmit(true);
                        changePassword(oldPwd, newPwd)
                    }}>
                        Change
                    </Button>

                </CardFooter>
            </Card>
        </>
    );
}