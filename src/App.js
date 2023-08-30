import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import JobList from './JobList';
import CompanyList from './CompanyList';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import ProfileForm from './ProfileForm';
import NavBar from './NavBar';
import Home from './Home';
import CompanyDetail from './CompanyDetail';
import { useEffect, useState } from 'react';
import JoblyApi from './api';

function App() {
    const navigate = useNavigate();
    const initialState = {
        currUser: JSON.parse(localStorage.getItem('currUser')) || null,
        token: JSON.parse(localStorage.getItem('token')) || null
    }
    const [currUser, setUser] = useState(initialState.currUser);
    const [token, setToken] = useState(initialState.token);

    useEffect(() => {
        localStorage.setItem('currUser', JSON.stringify(currUser));
    }, [currUser]);

    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
        JoblyApi.token = token;
    }, [token]);

    const login = async (data) => {
        let { username, password } = data;
        let { token } = await JoblyApi.logIn(username, password)
        setToken(() => token);
        JoblyApi.token = token;
        let user = await JoblyApi.getUser(username);
        setUser(() => user);
        navigate("/");
    }

    const logout = async () => {
        setUser(() => null);
        setToken(() => null);
    }

    const signup = async (data) => {
        let { token } = await JoblyApi.signUp(data)
        setToken(() => token);
        JoblyApi.token = token;
        let user = await JoblyApi.getUser(data.username);
        setUser(() => user);
        navigate("/");
    }

    const editUser = async (data) => {
        let user = await JoblyApi.editUser(data)
        setUser(() => user);
        navigate("/");
    }

    const apply = async (job) => {
        await JoblyApi.applyJob(currUser.username, job.id);
        setUser((currUser) => {
            currUser.applications += job.id;
            return currUser;
        });
    }

    return (
        <div className="App">
            <NavBar currUser={currUser} logout={logout} />
            <Routes>

                {/* PUBLIC ROUTES */}
                <Route path='/' element={<Home currUser={currUser} />} />
                <Route path='/signup' element={<SignUpForm signup={signup} />} />
                <Route path='/login' element={<LoginForm login={login} />} />

                {/* 'PROTECTED' ROUTES */}
                {((currUser !== null) && (token !== null)) ? 
                <>
                    <Route path='/jobs' element={<JobList currUser={currUser} apply={apply} />} />
                    <Route path='/companies' element={<CompanyList currUser={currUser} />} />
                    <Route path='/companies/:handle' element={<CompanyDetail currUser={currUser} apply={apply} />} />
                    <Route path='/profile' element={<ProfileForm currUser={currUser} editUser={editUser} />} />
                </> 
                :   <Route path='/*' element={<Navigate to='/'/>} />}

                {/* ERROR ROUTE */}
                <Route path='/*' element={<b>ERROR NOT FOUND</b>} />
            </Routes>
        </div>
    );
}

export default App;
