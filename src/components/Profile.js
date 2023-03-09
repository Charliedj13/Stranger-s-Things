import { useEffect } from "react"
import SinglePost from "./SinglePost";
const Profile = (props) => {
    {console.log(props.myData)}
    return (
        <div>
            <p> Here you can find your messages</p>

            {props.myData.messages ? (<div>Message from {props.myData.username} {props.myData.messages}</div>
            ):""
            }

            
            
            
        </div>
    )
}
export default Profile;