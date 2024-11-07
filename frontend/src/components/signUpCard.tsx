import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import logo from '../assets/logo.png';
import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import * as ValidEmail from 'email-validator';
import { useNavigate } from "react-router-dom";
import Api from "../services/api";
import API from "../services/api";


export function SignUpCard() {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [userFirstName, setUserFirstName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [submit, setSubmit] = useState(false);

    const [validName, setValidName] = useState(false);
    const [validFirstName, setValidFirstName] = useState(false);
    const [validEmail, setValidEmail] = useState(false)
    const [matchPwd, setMatchPwd] = useState(false);
    const [validPwd, setValidPwd] = useState(false);

    useEffect(() => {
            setValidName(API.regex.test(userName));
            setValidFirstName(API.regex.test(userFirstName));
            setValidEmail(ValidEmail.validate(userEmail));
            setMatchPwd(userPassword === confirmPwd);
            setValidPwd(API.regexPwd.test(userPassword) && userPassword === confirmPwd);
        },
        [userName, userFirstName, userEmail, userPassword, confirmPwd]);

    const submitSignUp = () => {
        if (validName && validFirstName && validEmail && validPwd && matchPwd) {
            axios.post(api.endpoints.user.signup, {
                firstName: userFirstName,
                lastName: userName,
                email: userEmail,
                password: userPassword
            }).then((res) => {
                if (res.status === 200) {
                    navigate("/");
                } else {
                    console.log(res.status);
                }
            })
                .catch((error) => {
                    console.error("Error sign-in request :", error);
                });

        }
        else
            console.log("user's informations no valid")
    }
    return (
        <>
            <Card
                placeholder={undefined}
                className="m-5 w-full"
            >
                <CardBody
                    placeholder={undefined}
                    className="flex flex-col gap-4 items-center h-full"
                >
                    <div className="w-1/2 flex justify-center">
                        <img src={logo} alt="Logo" className="object-contain" onClick={()=>navigate("/")}/>
                    </div>

                    <Input
                        variant="outlined"
                        crossOrigin={undefined}
                        placeholder={undefined}
                        label="First Name"
                        size="md"
                        onChange={e => setUserFirstName(e.target.value)}
                        error={!validFirstName && submit}
                    />

                    <Input
                        crossOrigin={undefined}
                        placeholder={undefined}
                        label="Last Name"
                        size="md"
                        onChange={e => setUserName(e.target.value)}
                        error={!validName && submit}

                    />
                    <Input
                        crossOrigin={undefined}
                        placeholder={undefined}
                        label="Email"
                        size="md"
                        type="email"
                        onChange={e => setUserEmail(e.target.value)}
                        error={!validEmail && submit}


                    />
                    <Input
                        crossOrigin={undefined}
                        placeholder={undefined}
                        label="Password"
                        type="password"
                        size="md"
                        onChange={e => setUserPassword(e.target.value)}
                        error={!validPwd && submit}
                    />
                    <div className="w-full">
                        <Input
                            crossOrigin={undefined}
                            placeholder={undefined}
                            label="Confirm password"
                            type="password"
                            size="md"
                            onChange={e => setConfirmPwd(e.target.value)}
                            error={!validPwd && submit}
                        />
                        <Typography
                            placeholder={undefined}
                            variant="small"
                            color={!validPwd && submit ? "red" : "gray"}
                            className="mt-2 flex items-center gap-1 font-normal"
                        >
                            {matchPwd || !submit ? "Use at least 8 characters, one uppercase, one lowercase and one number." : "Passwords do not match"}
                        </Typography>

                    </div>

                    <div className="flex-grow"></div>
                </CardBody>

                <CardFooter
                    placeholder={undefined}
                    className="pt-0"
                >
                    <Button placeholder={undefined} variant="gradient" fullWidth onClick={() => { setSubmit(true); submitSignUp() }}>
                        Sign Up
                    </Button>

                </CardFooter>
            </Card>
        </>
    );
}
