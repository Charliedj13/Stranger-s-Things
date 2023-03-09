// Library Imports
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./components/All.css"
//Component Imports
import { useEffect, useState } from "react";
import { AllPosts, SinglePost, Homepage, RegisterForm, LogIn, Profile } from "./components"


const App = () => {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function fetchPosts() {
        try {
            const response = await fetch ('https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts',{ headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }
            )
             
            
            
        
            const translatedData = await response.json();

            setPosts(translatedData.data.posts);
            console.log(translatedData)
    } catch (error) {
        console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    const [myData, setMyData] = useState({})

    // Step 1b
    useEffect(() => {
        // Step 1c
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true)
            let token = localStorage.getItem("token")
            console.log("token" , token)
            fetchMyData(token)
        } else {
            setIsLoggedIn(false)
            console.log("No token exists!")
        }
   
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
    setMyData(translatedData.data)
    }
        } catch (error) {
            console.log(error);
        }
    }
    }, [])

    return (
        <BrowserRouter>
            <div>
                <nav id="nav">
                    <Link to="/">Homepage</Link>
                    <Link to="/register">Sign up</Link>
                    <Link to="/login">Log In </Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/allposts">Click to see all posts</Link>
                    
                </nav>

                <Routes>
                    <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/allposts" element={<AllPosts propPosts={posts} isLoggedIn={isLoggedIn}/>} />
                    <Route path="/posts/:_id" element={<SinglePost propPosts={posts} setPosts={setPosts}/>}></Route>
                    <Route path="/profile" element={<Profile propPosts={posts} setPosts={setPosts} myData={myData}/>} />

                    
                </Routes>
            </div>
        </BrowserRouter>
    )
}
createRoot(document.getElementById("app")).render(<App />)