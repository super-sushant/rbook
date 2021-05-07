import React from 'react'
import {userContext} from '../../userContext'
export default function AddComment(props){
	const form =React.useRef(null)
	const {user,header}=React.useContext(userContext)
	const handleSubmit=(e)=>{
		e.preventDefault()
		const url =process.env.REACT_APP_API_URL +"comments/"
		let data = new FormData(form.current)		
		data.append('user',user.user)
		data.append('post',props.post)
		fetch(url,{
			method:'POST',
			headers:{...header},
			body:data
		}).then(res=>res.json())
		.then(result=>{
			if(result.user){props.handle(result)}
		}).catch(err=>alert(JSON.stringify(err)))
	}
	
		return(
			<div className="comment-box">
			<form className="comment-form" onSubmit={handleSubmit} ref={form}>
			<input 
				type='text'
				className="comment-text"
				name="text"
			/>
			<input type='file' id='image' name="image"/>
			</form>
			</div>
		)
	}
