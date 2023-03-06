// Step 2
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Dont know where this came from 
import { json } from "react-router-dom";

const RegisterForm = () => {
    // Step 2b
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();

    // Step 5
    async function registerNewAccountRequest(e) {
        // Prevents Form from refreshing
        e.preventDefault();
        try {
            console.log("Our new username is: " + newUsername)
            console.log("Our new Passsword is: " + newPassword)

            // Step 5a
            if (newPassword.length < 8) {
                alert("Password is too short")
                return;
            } else if (newUsername.length < 8) {
                alert("Username is too short")
                return;
            }
            // Step 5b
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: {
                        username: newUsername,
                        password: newPassword
                    }
                })
            })
            // Step 5c
            const translatedData = await response.json();
            console.log("This is the register Account Function")
            console.log(translatedData)

            // Step 5d
            if(!translatedData.success) {
                alert("Account was not successfuly created")
            } else {
                const myJWT = translatedData.data.token;
                console.log(translatedData)
                localStorage.setItem("token", myJWT)

                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h3 id="login">Create a new account here</h3>
            
            {/* Step 1 */}
            {/* Step 6 */}
            <form onSubmit={registerNewAccountRequest}>
                <input 
                id="login"
                type="text" 
                placeholder="New Username"
                // Step 3
                value={newUsername}
                // Step 4
                onChange={(event) => setNewUsername(event.target.value)}
                />
                
                <input 
                id="login"
                type="text" 
                placeholder="New Password"
                // Step 3
                value={newPassword}
                // Step 4
                onChange={(event) => setNewPassword(event.target.value)}
                />
                <button id="login"type="submit">Create Account</button>
            </form>
        </div>
    )
}
export default RegisterForm;