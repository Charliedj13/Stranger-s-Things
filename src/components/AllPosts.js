import { Link } from "react-router-dom"
import { useState } from "react"

const AllPosts = (props) => {
    //Search Bar
    const [search, setSearch] = useState("")
    //Creating Post
    const [newPostForm, setnewPostForm] = useState(false);
    const [product, setProduct] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState("");
    const [Location, setLocation] = useState("");
    const [willDeliver, setwillDeliver] = useState(false);

    



    
    console.log(props)

    function toggleNewForm() {
        setnewPostForm(!newPostForm)
    } 

    let filteredPosts = props.propPosts.filter((singlePost) => {
        let lowercasePost = singlePost.title.toLowerCase();

        return lowercasePost.includes(search.toLowerCase())
    })

    async function newPostRequest (event) {
        event.preventDefault();
        try {
            const response = await fetch (`https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    post: {
                        title: product,
                        description: Description,
                        price: Price,
                        location: Location,
                        willDeliver: willDeliver
                    }
                })
            });
            const result = await response.json();
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="div">
            <input id="search" type="text" placeholder="Search Posts Here..." onChange={(event) => {
                setSearch(event.target.value)
            }}></input>
            
            {props.isLoggedIn ? 
            <div><button onClick={toggleNewForm}>Create New Post</button>
            
                
            <form onSubmit={newPostRequest}>
                <input 
                type="text"
                placeholder="Product Name"
                value={product}
                onChange={(event) => setProduct(event.target.value)}
                />
                <input 
                type="text"
                placeholder="Price"
                value={Price}
                onChange={(event) => setPrice(event.target.value)}
                />
                <input 
                type="text"
                placeholder="Location"
                value={Location}
                onChange={(event) => setLocation(event.target.value)}
                />
                <input 
                id="checkbox"
                type="checkbox"
                placeholder="Can I Deliver?"
                value={willDeliver}
                onChange={(event) => setwillDeliver(!willDeliver)}
                /> 
                <label
                htmlFor="checkbox"
                > Can I deliver?
                </label>
            
                <textarea 
                type="text"
                rows="3"
                cols="100"
                placeholder="Description"
                value={Description}
                onChange={(event) => setDescription(event.target.value)}
                />
                <button type="submit">Submit</button>
            </form> 
                
            
            
            </div>:<p>{""}</p>}
            <h3 id="allposthead">
            All Posts Listed Below...
            </h3>
            <section id="allpost">
        

                {
                    filteredPosts.length ? filteredPosts.map((singlePost, _id) => {
                        return (
                            <div key={singlePost._id}>
                                <h3><Link to={`/posts/${singlePost._id}`}>{singlePost.title}</Link></h3>
                                <h5>Seller: {singlePost.author.username}</h5>
                            </div>
                        )
                    }): <div>Data is loading...</div>
                }
                
            
            </section>


        </div>
    )
}

export default AllPosts;
