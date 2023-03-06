// Step 1a
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Homepage = (props) => {
    const [myData, setMyData] = useState({})

    // Step 1b
    useEffect(() => {
        // Step 1c
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true)
            let token = localStorage.getItem("token")
            console.log("token" , token)
            fetchMyData(token)
        } else {
            props.setIsLoggedIn(false)
            console.log("No token exists!")
        }
    // async function fetchMyData(token){
    //     try {
    //     const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/me", {
            
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         }
    //     })
    async function fetchMyData(token) {
        try {
            const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/me" , {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
        

    const translatedData = await response.json()
    
    console.log("Below is our personal account data:")
    console.log(translatedData)
    // setMyData(translatedData.user)
    if (translatedData.success == true) {
    setMyData(translatedData.user)
    }
        } catch (error) {
            console.log(error);
        }
    }
    }, [])

    return (
        <div>
            {
            props.isLoggedIn ? <h3 id="homepage">Thanks for logging in, Welcome to Stranger's things </h3>: <h3> Please login or register for a new account!</h3>
            
            }
        </div>
            
    )
}
export default Homepage;