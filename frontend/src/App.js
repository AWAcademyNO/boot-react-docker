import './App.css';
import {useEffect, useState} from "react";
function App() {
  const [message, setMessage] = useState("Loading message...")
  const [login, setLogin] = useState(false)
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/api/greet', {redirect: "manual"})
      if (res.status === 0) {
        setLogin(true)
        setMessage('Could not load message - perhaps not logged in?')
      } else {
        const greeting = await res.text()
        setMessage(greeting)
      }
    }

    loadData()
        .catch(console.error)
  }, [])

  return (
    <div className="App">
      <h1>{message}</h1>
      {login ?
      <form method='post' action='/login'>
        <input type='text' name='username' placeholder='Username' />
        <input type='text' name='password' placeholder='Password' />
        <input type='submit' name='login' value='Login' />
      </form> : (<></>)}
    </div>
  );
}

export default App;
