import { Link, Redirect } from 'react-router-dom';
import {useState, useEffect} from 'react';

import useFetch from 'hooks/fetch.hook';
import useLocalStorage from "hooks/localStorage.hook";



const Auth = props => {
    const isLogin = props.match.path === '/login';
    const apiUrl = isLogin ? '/user/login' : '/users';
    const [email, setEmail] = useState(''),
          [password, setPassword] = useState(''),
          [username, setUsername] = useState(''),
          [isSuccessFullSubmit, setIsSuccesFullSubmit] = useState(false);
    const [{isLoading, response, error}, setFetch] = useFetch(apiUrl);
    const user = isLogin ? {email, password} : {email, password, username};
    const [token, setToken] = useLocalStorage('token');


    console.log('tok', token);
    function handleSubmit(event) {
        event.preventDefault();
        console.log('data:', email, password);
        setFetch({
            method: 'post',
            data: {
                user
            }
        });
    }
    useEffect(() => {
        if(!response) {
            return
        }
        setToken(response.user.token);
        setIsSuccesFullSubmit(true);
    }, [response, setToken])

    if(isSuccessFullSubmit) {
        return <Redirect to='/' />
    }
    return <div className='auth-page'>
                <div className='container page'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3 col-xs-12'>
                            <h1 className='text-xs-center'>{isLogin ? 'Sign in' : 'Sign up'}</h1>
                            <p className='text-xs-center'>
                                <Link to={isLogin ? '/register' : '/login'}>{isLogin ? 'Need an account?' : 'Have an account?'}</Link>
                            </p>
                            <form onSubmit={handleSubmit}>
                                <fieldset>
                                    {!isLogin && (
                                         <fieldset className='form-group'>
                                         <input 
                                         type='text' 
                                         className='form-control form-control-ls' 
                                         placeholder='Username'
                                         value={username}
                                         onChange={e => setUsername(e.target.value)}
                                         />
                                     </fieldset>
                                    )}
                                    <fieldset className='form-group'>
                                        <input 
                                        type='email' 
                                        className='form-control form-control-ls' 
                                        placeholder='Your Email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <input 
                                        type='password' 
                                        className='form-control form-control-ls' 
                                        placeholder='Your Password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        />
                                    </fieldset>
                                    <button 
                                    className='btn btn-lg btn-primary pull-xs-right' 
                                    type='submit'
                                    disabled={isLoading}
                                    >{isLogin ? 'Sign in' : 'Sign up'}</button>
                                </fieldset>   
                            </form>
                        </div>
                    </div>
                </div>
           </div>
};
export default Auth;