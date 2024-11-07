import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
    Alert
} from "@material-tailwind/react";
import logo from '../assets/logo.png';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import axios from "axios";
import API from "../services/api";

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

export function ResetPwd(props:any) {
    const navigate = useNavigate();

    const [userPassword , setUserPassword] = useState("");
    const [confirmPwd , setConfirmPwd] = useState("");

    const [matchPwd, setMatchPwd] = useState(false);
    const [validPwd, setValidPwd] = useState(false);


    useEffect(() => {
            setMatchPwd(userPassword == confirmPwd);
            setValidPwd(api.regexPwd.test(userPassword) && userPassword == confirmPwd);
        },
        [userPassword,confirmPwd]);

    const submitSignUp =  () => {
        if (validPwd && matchPwd) {
            API.resetPwd(props.idUser,userPassword)
            navigate("/");
        }
        else
            console.log("operation reset password failed")
    }
    return (
        <>
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

                    <Typography placeholder={undefined}>
                        Create a new password
                    </Typography>

                    <Input
                        crossOrigin={undefined}
                        placeholder={undefined}
                        label="Password"
                        type="password"
                        size="lg"
                        onChange={e => setUserPassword(e.target.value)}
                    />
                    <div className="w-[32rem]">
                        <Input
                            crossOrigin={undefined}
                            placeholder={undefined}
                            label="Confirm password"
                            type="password"
                            size="lg"
                            onChange={e => setConfirmPwd(e.target.value)}
                        />
                        <Typography
                            placeholder={undefined}
                            variant="small"
                            color={"gray"}
                            className="mt-2 flex items-center gap-1 font-normal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="-mt-px h-4 w-4"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {matchPwd?"Use at least 8 characters, one uppercase, one lowercase and one number.":"Passwords do not match"}
                        </Typography>

                    </div>

                    <div className="flex-grow"></div>
                </CardBody>

                <CardFooter
                    placeholder={undefined}
                    className="pt-0"
                >
                    <Button placeholder={undefined} variant="gradient" fullWidth onClick={()=> {submitSignUp()}} disabled={!(validPwd && matchPwd)}>
                        Submit
                    </Button>

                </CardFooter>
            </Card>
        </>

    );
}