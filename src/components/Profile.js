import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"; 
import "../home.css";
import '../App.css';
import SideBar from './sidebar';
import axios from 'axios';
import {useNavigate, createSearchParams} from "react-router-dom"


const Profile = () => {

    const token = JSON.parse(localStorage.getItem('authTokens'));
    const [data, setData] = useState([]);
    const [value, setValue] = useState([]);
    const navigate = useNavigate();
    
    const updatePage = (event) => {
     
        navigate({
            pathname:'/updatetweet',
            search:createSearchParams({
                q: event.target.id,
                y: event.target.name
            }).toString()
        });
        
    }

    const fetchData = () =>{
        axios.get(' http://127.0.0.1:8000/social/api/get-tweet/tweet/' ,{ headers: {"Authorization" : `Bearer ${token.access}`} })
        .then((response)=>{
            console.log(response.data);
            setData(response.data);
        })
    }
    const fetchProfile = () =>{
        axios.get('http://127.0.0.1:8000/accounts/api/followers-list/' ,{ headers: {"Authorization" : `Bearer ${token.access}`} })
        .then((response)=>{
            setValue(response.data);
        })
    }

    useEffect(() => {

        fetchData();
        fetchProfile();
        
    },[])
    /*function custom_sort(a, b) {
        return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
    }
    console.log(Object.keys(data).sort(custom_sort));*/
    const deleteTweet = (event) => {
        axios.delete('http://127.0.0.1:8000/social/api/get-tweet/tweet/' + event.currentTarget.id + '/' ,{headers: {"Authorization" : `Bearer ${token.access}`} })
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <SideBar/>
        <div className='d-inline p-2' style={{width:"600px"}}>
        <div className='card'  style={{width:"100%", marginTop: '-7px', marginLeft:'-9px'}}>
                <Card className="text-center border-0" style={{width:"100%"}}>
                    <Card.Body style={{display: "flex", justifyContent: 'center'}}>
                    <Card className="cent" style={{width:"350px", border:"0px"}}>
                    <Card.Body>
                        <Image height={"150px"} width={"150px"} src="data:image/jpeg;base64,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" roundedCircle />
                        <h3>{value.first_name} {value.last_name}</h3>
                        <h6>@{value.username}</h6>
                        <p>{value.bio}</p>
                        <div className='following '>
                            <h1 style={{float:"left", margin:'0', marginLeft:"15px"}} >{value.following_count}</h1>
                            <h1 style={{float:"right" , margin:'0', marginRight:"15px"}} >{value.followers_count}</h1>
                            
                            {/*<a href="/following">Following</a>*/}
                        </div>
                        <div className='follower ' >
                            <br/><br/>
                            <a style={{float:"left", margin:'0'}} href="/following">Following</a>
                            <a style={{float:"right", margin:'0'}} href="/follower">Follower</a>
                        </div>

                    </Card.Body>
                   
                </Card>
                    </Card.Body>
                </Card>
                <hr style={{    border: "5px grey solid"}}/>
                {
                    data.map(tweet=>(
                <Card key={tweet.id} className="text-center border-0" style={{width:"100%"}}>
                    <Card.Body>
                        <div className='img' style={{textAlign:"left", marginLeft:'10px'}}>
                        <Image className='d-inline p-2 ' style={{width:"100px", height:"100px", marginRight:"15px"}}  src="data:image/jpeg;base64,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" roundedCircle />

                            <h5 className='d-inline p-2 ' >{tweet.user.first_name} {tweet.user.last_name}</h5>
                            <p style={{display:"flex", marginLeft:"122px", marginTop:"-39px"}}>@{tweet.user.username}</p>

                        </div>
                        <p  style={{textAlign:"left",marginLeft: "135px", fontSize:"14px"}}>{tweet.text}</p>
                        <div className="post_footer">
                        <ChatBubbleOutlineIcon style={{width:" 5em"}} fontSize="small" />
                        <RepeatIcon style={{width:" 5em"}} fontSize="small" />
                        <FavoriteBorderIcon style={{width:" 5em"}} fontSize="small" />
                        </div>
                        <br/>
                        <br/>
                        <div className='follower' >
                        <a style={{float:"right", fontSize:"12px", cursor:"pointer"}} id={tweet.id} onClick={deleteTweet} >Delete</a>
                        <a style={{float:"right", fontSize:"12px", marginRight:"10px",  cursor:"pointer"}} id={tweet.id} name={tweet.text} onClick={updatePage}>Update</a>
                        <p style={{float:"left", fontSize:"12px", marginRight:"10px"}}>Posted at: {tweet.updated_at}</p>
                        </div>
                        <br/>
                        <hr/>
                    </Card.Body>
                </Card>
                ))
            }
                </div>

        </div>
      </div>
    );
}

export default Profile;
