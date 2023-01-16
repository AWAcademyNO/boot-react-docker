import './App.css';
import {useEffect, useState} from "react";
function App() {
  const [message, setMessage] = useState("Loading message...")
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/api/greet')
      const greeting = await res.text()
      setMessage(greeting)
    }

    loadData()
        .catch(console.error)
  }, [])

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
