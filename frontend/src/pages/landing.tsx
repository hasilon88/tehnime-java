import backgroundImg from '../assets/landing/background.jpg';
import { LoginCard } from '../components/loginCard';

const Landing: React.FC = () => {
    return (
        <div
            className="bg-fixed bg-gradient-to-b from-transparent to-black bg-cover bg-center bg-no-repeat lg:bg-contain min-h-screen"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
            }}
        >
            <div className="flex flex-col items-center justify-center min-h-screen mx-auto text-white">
                <div className="w-full flex flex-col lg:flex-row justify-center items-center m-5 lg:m-0">
                    <div className='w-10/12 lg:w-1/2 flex justify-center items-center mx-auto lg:mx-0 lg:ml-12'>
                        <LoginCard />
                    </div>
                    <div className='flex flex-col justify-center items-center w-full lg:w-1/2 lg:ml-12 text-center'>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;