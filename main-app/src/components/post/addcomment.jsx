import React from 'react'

export default function AddComment(props){
		const form =React.useRef(null)
	const handleSubmit=(e)=>{
		e.preventDefault()
		const url =process.env.REACT_APP_API_URL +"comments/"
		let data = new FormData(form.current)		
		data.append('user',props.user)
		data.append('post',props.post)

		fetch(url,{
			method:'POST',
			headers:{},
			body:data
		}).then(res=>res.json())
		.then(result=>{
			alert(JSON.stringify(result))
		}).catch(err=>alert(JSON.stringify(err)))
	}
	
		const handleChange=(e)=>{
			this.setState({[e.target.id]:e.target.value})}
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
