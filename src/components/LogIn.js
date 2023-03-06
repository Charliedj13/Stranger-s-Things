import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LogIn = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    async function logInRequest(e) {
        e.preventDefault()
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password,
                    }
                })
            });
            const translatedData = await response.json();

            console.log(translatedData)
            if(!translatedData.success) {
                alert("Username and/or Password is incorrect. Please try again")
            } else {
                const myJWT = translatedData.data.token;
                props.setIsLoggedIn(true);
                console.log(translatedData)
                localStorage.setItem("token", myJWT);
                navigate("/")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h3 id="login">Please Log In here</h3>
        <form onSubmit={logInRequest}>
            <input
            id="login"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            />
            <input
            id="login"
            type="text"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            />
            <button id="login" type="submit">Log In</button>

            

        </form>
        </div>
    )
}

export default LogIn