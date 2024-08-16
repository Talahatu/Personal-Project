import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Buffer } from "buffer";
import "./App.css";

function App() {
    console.log("APP");

    const [url, setURL] = useState("Placeholder");
    const clientID = "5963f3b37ff143208b1d3da4d7292616";
    const clientSecret = "4bf58e369c2a4615a04ca79041096ea9";
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const redirectURI = "http://127.0.0.1:5173/";

    const main = async () => {
        console.log("MAIN");

        if (!code) {
            console.log("IF");

            redirectToAuthCodeFlow(clientID, redirectURI);
        } else {
            console.log("ELSE");

            const token = await getAccessToken(
                clientID,
                clientSecret,
                code,
                redirectURI
            );
            const profile = await fetchProfile(token!!);

            console.log("User Profiles:");
            console.log(token, profile, code);

            document.getElementById("profile")!.innerText =
                profile.display_name;
        }
    };
    //======================= Authentication to Spotify =================================
    const generateCodeVerifier = (length: number) => {
        let text = "";
        let possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++) {
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }
        return text;
    };
    // async function generateCodeChallenge(codeVerifier: string) {
    //     const data = new TextEncoder().encode(codeVerifier);
    //     const digest = await window.crypto.subtle.digest("SHA-256", data);
    //     return btoa(
    //         String.fromCharCode.apply(null, [...new Uint8Array(digest)])
    //     )
    //         .replace(/\+/g, "-")
    //         .replace(/\//g, "_")
    //         .replace(/=+$/, "");
    // }
    const redirectToAuthCodeFlow = async (clientId: string, URI: string) => {
        console.log("Redirect...");

        // TODO: Redirect to Spotify authorization page
        const verifier = generateCodeVerifier(16);
        // const challenge = await generateCodeChallenge(verifier);

        localStorage.setItem("verifier", verifier);
        chrome.storage.local.set({ verifier: verifier });

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", URI);
        params.append(
            "scope",
            "user-read-private user-read-email playlist-read-private"
        );
        // params.append("code_challenge_method", "S256");
        // params.append("code_challenge", challenge);
        params.append("state", verifier);

        let url = `https://accounts.spotify.com/authorize?${params.toString()}`;
        document.location = url;
        // chrome.tabs.create({ url: url });
    };

    //======================= Authentication to Spotify =================================

    const getAccessToken = async (
        clientId: string,
        clientSecret: string,
        code: string,
        URI: string
    ): Promise<string> => {
        // TODO: Get access token for code
        const verifier = await localStorage.getItem("verifier");

        console.log("Verfier:");

        console.log(verifier);

        // const verifier = await chrome.storage.local.get("verifier");
        const params = new URLSearchParams();
        // params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", URI);
        // params.append("code_verifier", verifier["verifier"]);
        // params.append("code_verifier", verifier!);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(clientId + ":" + clientSecret).toString(
                        "base64"
                    ),
                "content-type": "application/x-www-form-urlencoded",
            },
            body: params,
        });

        console.log("RESULT: ");
        console.log(result);

        const { access_token } = await result.json();

        console.log("Access Token: ");
        console.log(access_token);

        if (access_token) {
            localStorage.setItem("token", access_token);
            chrome.storage.local.set({ token: access_token });
        }

        return access_token;
    };

    const fetchProfile = async (token: string): Promise<any> => {
        // TODO: Call Web API
        console.log("PROFILE TOKEN: ");

        console.log(token);
        if (!token && localStorage.getItem("token")) {
            token = localStorage.getItem("token")!;
            chrome.storage.local.get("token", function (item) {
                token = item["token"];
            });
        }

        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        return await result.json();
    };

    const getURL = async () => {
        let tabs = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        setURL(tabs[0].url!!);
    };

    main();

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
            <h1 id="profile">Placeholder</h1>
            <div className="card">
                <button onClick={() => getURL()}>Get Current URL</button>
                <p id="result">{url}</p>
            </div>
            <p className="read-the-docs">Go to Spotify website playlist</p>
        </>
    );
}

export default App;
