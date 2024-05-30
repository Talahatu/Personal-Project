import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    const [url, setURL] = useState("Placeholder");

    const getURL = async () => {
        let tabs = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        setURL(tabs[0].url!!);
    };

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React + My Soul + My Brain</h1>
            <div className="card">
                <button onClick={() => getURL()}>Get Current URL</button>
                <p id="result">{url}</p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
