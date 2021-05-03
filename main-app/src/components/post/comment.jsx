import React from 'react'
import UserThumb from './userthumb.jsx'
export default function Comment(props){
	const token =localStorage.getItem('token')
	let comment=props.comment
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
		let data = {likes:props.comment.likes,user:props.comment.user,comment:url}
		comment.likes+=ive
		data.likes=data.likes+ive
		fetch(url,{method:'PUT',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify(data)})
		.then(res=>res.json())
	}				
	return(
		<div>
		<UserThumb profile={props.comment.user}/>
		<hr/>
		{props.comment.text}
		<img alt="" src={props.comment.image}/>
			<div className="post-lower">
                        <button className="like" onClick={like}>^</button>
                        {comment.likes}
                        </div>
		</div>
	)
}