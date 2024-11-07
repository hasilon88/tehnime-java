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
import {useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";

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

export function LoginCard() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    async function login() {
        const loggedIn = await API.userLogin(email, password);

        if(loggedIn.response !== 401){
            localStorage.setItem("isLoggedIn", "true");
            navigate('/dashboard', {
                state: loggedIn.data
            })
        } else {
            setShowError(true);
        }
    }

    return (
        <Card 
            placeholder={undefined} 
        >
            <CardBody
                placeholder={undefined} 
                className="flex flex-col gap-4 items-center h-full"
            >
                <div className="w-1/2 flex justify-center">
                    <img src={logo} alt="Logo" className="object-contain" />
                </div>

                {showError ? <IncorrectPassword setError={setShowError}/> : <div/>}

                <Input 
                    crossOrigin={undefined} 
                    placeholder={undefined} 
                    label="Email" size="lg"
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <Input 
                    crossOrigin={undefined} 
                    placeholder={undefined} 
                    label="Password"
                    type="password"
                    size="lg"
                    onChange={(ev) => setPassword(ev.target.value)}
                />

                <div className="flex-grow"></div>
            </CardBody>

            <CardFooter 
                placeholder={undefined} 
                className="pt-0"
            >
                <Button placeholder={undefined} variant="gradient" fullWidth onClick={login}>
                    Sign In
                </Button>
                
                <Typography 
                    placeholder={undefined} 
                    variant="small" 
                    className="mt-6 flex justify-center"
                >
                    Don't have an account?
                    <Typography
                        placeholder={undefined}
                        as="a"
                        variant="small"
                        color="blue-gray"
                        className="hover: cursor-pointer ml-1 font-bold"
                        onClick={() => navigate("/sign-up")}
                    >
                        Sign up
                    </Typography>
                </Typography>
                
                <Typography 
                    placeholder={undefined} 
                    variant="small" 
                    className="flex justify-center"
                >
                    Forgot your password?
                    <Typography
                        placeholder={undefined}
                        as="a"
                        variant="small"
                        color="blue-gray"
                        className="ml-1 font-bold hover:cursor-pointer"
                        onClick={()=>navigate("/forgot-pwd")}
                    >
                        Forgot password
                    </Typography>
                </Typography>
            </CardFooter>
        </Card>
    );
}