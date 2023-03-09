import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"

const SinglePost = (props) => {
    const [editFormStatus, seteditFormStatus] = useState(false);
    const [sendMessage, setsendMessage] = useState(false);
    


    const { _id } = useParams();

    let filteredPost = props.propPosts.filter((SinglePost) => {
        return SinglePost._id == _id
    })
    
    const [newProductName, setnewProductName] = useState(
        filteredPost.length ? filteredPost[0].title : ""
    );
    const [newProductDescription, setnewProductDescription] = useState(
        filteredPost.length ? filteredPost[0].description : ""
    );
    const [newPrice, setnewPrice] = useState(
        filteredPost.length ? filteredPost[0].price : ""
    )
    const [newLocation, setnewLocation] = useState(
        filteredPost.length ? filteredPost[0].location : ""
    )
    const [newDeliver, setnewDeliver] = useState(
        filteredPost.length ? filteredPost[0].willDeliver : ""
    )
    
    const navigate = useNavigate()

    
//Button for updating
function toggleEditFormFunc() {
    seteditFormStatus(!editFormStatus)
}
//Button for message
function toggleMessageForm() {
    setsendMessage(!sendMessage)
}


//async function for updating
async function sendPutRequestForUpdateFunc(event) {
    event.preventDefault();
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-ET-WEB-FT/posts/${_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            title: newProductName,
            description: newProductDescription,
            price: newPrice,
            location: newLocation,
            willDeliver: newDeliver,
        })
        });

        const translatedData = await response.json();

        let filteredPostArray = props.posts.filter((SinglePost) => {
            if(SinglePost._id != _id) {
                return SinglePost
            }
        })
        setPosts(filteredPostArray)
    } catch (error) {
        console.log(error)
    }
}
//Async function for messaging
async function sendMessageReq(event) {
    event.preventDefault();
    try {
        console.log(event.target[0])
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts/${_id}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                message: {
                    content: (event.target[0].value)
                }
            })
            
            
        })
        navigate("/allposts")
    } catch (error) {
        console.log(error)
    }
}

//Async function for deleting post
async function deleteSpecificPost(event) {
    event.preventDefault();
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        const result = await response.json()
        let filteredPostArrayDelete = props.posts.filter((singlePost) => {
            if(singlePost._id != _id ) {
                return singlePost
            }
        })
        setPosts(filteredPostArrayDelete)
        
        navigate("/allposts")
        
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

    

return (
        <div id="singlepost">
            <h3 id="single" className="singlehead"> Here you can find more details about {filteredPost[0].title}</h3>

            {
            filteredPost.length ? (
                <section id="single" className="data">
                    <p>Name: {filteredPost[0].title}</p>
                    <p>Price: {filteredPost[0].price}</p>
                    <p>Location: {filteredPost[0].location}</p>
                    <p>Delivery? </p>
                        {
                            filteredPost[0].willDeliver ? <p>Yes I can deliver</p>
                            : <p> No, I cannot deliver </p>
                        }
                    
                    
                    <p>Description: {filteredPost[0].description}</p>
                    <p></p>

                </section>
                ):""
            }
            
            {filteredPost[0].isAuthor ? <div><button onClick={toggleEditFormFunc}>Toggle Edit Form</button>
            {
              editFormStatus ? (
              <form onSubmit={sendPutRequestForUpdateFunc}>
              <h5>Update Your Selected Product Here:</h5>
              <input type="text" value={newProductName} onChange={(event) => setnewProductName(event.target.value)} placeholder="New Product Name"></input>
              <input type="text" value={newPrice} onChange={(event) => setnewPrice(event.target.value)} placeholder="Price"></input>
              <input type="text" value={newLocation} onChange={(event) => setnewLocation(event.target.value)} placeholder="Location"></input>
              <input type="text" value={newDeliver} onChange={(event) => setnewDeliver(event.target.value)} placeholder="Deliver? (true or false)"></input>
              <textarea 
              type="text" 
              row="3" 
              cols="100" 
              value={newProductDescription}
              onChange={(event) => setnewProductDescription(event.target.value)}
              placeholder="New Product Description">
              </textarea>
              <button type="submit">Submit</button>
          </form>
              ) : ""
            }
            </div>:<p>{""}</p>}

            {
            filteredPost[0].isAuthor ? (
            <button 
            onClick={deleteSpecificPost} 
            value={SinglePost._id}
            >Delete Post</button>
            ):""
            }

            {
            filteredPost[0].isAuthor ? (""
                ):
            <button id="single"onClick={toggleMessageForm}>Send Message</button>
        }
        {
                sendMessage ? (
                    <div>
                        <form onSubmit={sendMessageReq}>
                    <textarea 
                    type="text"
                    row="3"
                    cols="100"
                    placeholder="Send Message Here..."
                    >
                    </textarea>
                    <input type="submit"></input>
                    </form>
                    </div>

                    

                    
                          
                ):""
            }
            
       
        </div>

    )
}
export default SinglePost