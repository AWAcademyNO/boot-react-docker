import './App.css';
import {useCallback, useEffect, useState} from "react";
import Login from "./Login";

const DEFAULT_MSG = "Message..."

function App() {
    const [message, setMessage] = useState(DEFAULT_MSG);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const res = await fetch('/api/greet')
            const greet = await res.text()
            setMessage(greet)
        }
        if (user !== null) {
            setMessage("Loading Message...")
            loadData()
                .catch(console.error)
        } else {
            setMessage(DEFAULT_MSG)
        }

    }, [user]);

    const updateUser = useCallback((u) => setUser(u), []);

    return (
        <div className="App">
            <h1>{message}</h1>
            <Login user={user} loggedIn={updateUser}/>
        </div>
    );
}

export default App;
