import './App.css';
import './services/api';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/landing';
import Watch from './pages/watch';
import Description from "./pages/description";
import Dashboard from './pages/dashboard';
import SignUp from "./pages/signUp";
import Search from "./pages/search";
import ForgotPwd from "./pages/forgotPwd";
import NotFound from "./pages/notFound";
import Settings from "./pages/settings";
import WatchList from "./pages/watchList";
import Changed from "./pages/changedSettings";
import Password from "./pages/password";
import PrivateRoute from './services/privateRoute';
const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path='/watch' element={<Watch />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path='/description' element={<Description/>}/>
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path='search' element={<Search />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path='/settings' element={<Settings />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path='/watchlist' element={<WatchList />} />
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="/feedback" element={<Changed/>}/>
            </Route>
            <Route element={<PrivateRoute />}>
                <Route path="/password" element={<Password/>}/>
            </Route>
            <Route path='/' element={<Landing />} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/forgot-pwd' element={<ForgotPwd />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
    );
}

export default App;