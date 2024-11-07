import {Alert, Button, Card, CardBody, CardFooter, Input, Typography} from "@material-tailwind/react";
import logo from "../assets/logo.png";
import React, {useEffect, useState} from "react";

import axios from "axios";
import api from "../services/api";
import * as ValidEmail from "email-validator";
import {ResetPwdToken} from "./resetPwdToken";
import {useNavigate} from "react-router-dom";
import {Loading} from "../pages/loading";

function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
        >
            <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function IncorrectPassword({setError}: any) {
    const [open, setOpen] = useState(true);
    return (
        <>
            <Alert
                variant="gradient"
                open={open}
                icon={<Icon />}
                color="red"
                action={
                    <Button
                        placeholder={undefined}
                        variant="text"
                        color="white"
                        size="sm"
                        className="!absolute top-3 right-3"
                        onClick={() => {
                            setOpen(false);
                            setError(false);
                        }}
                    >
                        Close
                    </Button>
                }
            >
                Incorrect email or password !
            </Alert>
        </>
    );
}

export function ResetPwdEmail () {
    const navigate = useNavigate();

    const [userExists, setUserExists] = useState(false);
    const [userEmail , setUserEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
            setValidEmail(ValidEmail.validate(userEmail));
        },
        [userEmail]);
    const  submit = () => {
        if(validEmail) {
            axios.patch(api.endpoints.user.forgotPassword, null, {
                params: {
                    email: userEmail
                }
            })
                .then((res) => {
                    setUserExists(res.data.value);
                })
                .catch((error) => {
                    setShowError(true);
                    console.error("Error email verification request :", error);
                })

        }
        else
            console.log("Email not valid")
    }

    return (
        <>
            {!userExists?
                <Card
                    placeholder={undefined}
                >
                    <CardBody
                        placeholder={undefined}
                        className="flex flex-col gap-4 items-center h-full"
                    >
                        <div className="w-1/2 flex justify-center">
                            <img src={logo} alt="Logo" className="object-contain" onClick={()=>navigate("/")}/>
                        </div>
                        {showError ? <IncorrectPassword setError={setShowError}/> : <div/>}

                        <Typography placeholder={undefined}>
                            To initiate a password reset, kindly provide your email address below.<br/>
                            If your account exists, we'll send a code to your email for verification.
                        </Typography>

                        <Input
                            crossOrigin={undefined}
                            placeholder={undefined}
                            label="Email"
                            type="email"
                            size="lg"
                            onChange={e => setUserEmail(e.target.value)}
                        />

                        <div className="flex-grow"></div>
                    </CardBody>

                    <CardFooter
                        placeholder={undefined}
                        className="pt-0"
                    >
                        <Button placeholder={undefined} variant="gradient" fullWidth onClick={()=> submit()} disabled={!validEmail}>
                            Submit
                        </Button>

                    </CardFooter>
                </Card>:<ResetPwdToken/>
            }

        </>

    );
}