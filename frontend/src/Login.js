import {useEffect, useState} from 'react';

function Login({user, loggedIn}) {
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        const loginUser = async () => {
            let headers = auth ? {
                // btoa converts username and password to base64 encoded string
                'Authorization': 'Basic ' + btoa(auth.username + ":" + auth.password)
            } : {}
            const res = await fetch('/user', {
                headers: {
                    ...headers,
                    // Causes Spring Security to _not_ include a WWW-authenticate header if the request is unauthorized
                    // It this header is included the default browser username and password dialog is shown - which we do not want!
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            await loggedIn(res.status === 401 ? null : await res.json())
        }

        loginUser()
            .catch(console.error)
    }, [auth, loggedIn]);


    function doLogin(evt) {
        evt.preventDefault();
        setAuth(credentials);
    }

    function doLogout() {
        function getTokenFromCookie() {
            return document.cookie.split('=')[1];
        }

        fetch('/logout', {
            method: 'post', headers: {
                'X-XSRF-TOKEN': getTokenFromCookie(),
            }
        })
            .then(r => r.text())
            .then(r => loggedIn(null))
            .catch(console.error);
    }

    return <>
            <h2>{user ? `Username: ${user.name}` : 'Not logged in'}</h2>
            <div>
                {
                    !user ?
                        <form method='post'>
                            <input type='text' name={credentials.username}
                                   onChange={(evt) => setCredentials((s) => ({...s, username: evt.target.value}))}
                                   placeholder='Username'/>
                            <input type='text' name={credentials.password}
                                   onChange={(evt) => setCredentials((s) => ({...s, password: evt.target.value}))}
                                   placeholder='Password'/>
                            <input type='submit' name='login' value='Login' onClick={doLogin}/>
                        </form> : <button onClick={doLogout}>Logout</button>
                }
            </div>
        </>
}

export default Login;
