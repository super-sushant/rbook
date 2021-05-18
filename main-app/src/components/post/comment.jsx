import React from 'react'
import {userContext} from '../../userContext'
import UserThumb from './userthumb.jsx'
export default function Comment(props,{userContext}){
	const token =localStorage.getItem('token')
	let comment=props.comment
	const {user} =React.useState(userContext)
	const like=(e)=>{
		let url = process.env.REACT_APP_API_URL+'commentsl/'
		let data={comment:props.comment.url,user:props.user}
		fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify(data)})
		.then(res=>res.json())
		.then(result=>{
		alert(JSON.stringify(result))
		if(result.user){changeLike(1);
		}else{changeLike(-1);}
		});
	}
	const changeLike=(ive)=>{
		const url=props.comment.url
		let data = {likes:comment.likes,user:comment.user,comment:url}
		comment.likes+=ive
		data.likes=data.likes+ive
		fetch(url,{method:'PUT',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify(data)})
		.then(res=>res.json())
	}				
	return(
		<div className="comment">
		<UserThumb profile={props.comment.user}/>
		<hr/>
		<div className="comment-text">{props.comment.text}
                        </div>
		<img className="img-comment" alt="" src={props.comment.image}/>
			<div className="post-lower">
                        {user?<button className="like" onClick={like}>^</button>:""}
                        {comment.likes}
                        </div>
		</div>
	)
}
