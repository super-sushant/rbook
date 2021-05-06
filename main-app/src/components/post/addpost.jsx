import React from 'react'
export default function AddPost(props){
	const token =localStorage.getItem('token')
	const form =React.useRef(null)
	const handleSubmit=(e)=>{
		e.preventDefault()
		const url =process.env.REACT_APP_API_URL +"posts/"
		let data = new FormData(form.current)
		data.append('user',props.user)
		fetch(url,{
			method:'POST',
			headers:{'Authorization':`Bearer ${token}`},
			body:data
		}).then(res=>res.json())
		.then(result=>{
			if(result.url){
				uploadFiles(result.url);
				props.handle(result,1)}
		}).catch(err=>alert(JSON.stringify(err)))
	}
	let selectedFiles={}
	const uploadFiles=(urlp)=>{
		const url =process.env.REACT_APP_API_URL +"images/"
		let data = new FormData()
		data.append('post',urlp)
		Object.values(selectedFiles).forEach(file=>{
		data.append('image',file)
		fetch(url,{
			method:'POST',
			headers:{'Authorization':`Bearer ${token}`},
			body:data})
		.then(res=>res.json())
		.then(result=>{
			alert(JSON.stringify(result))})
		.catch(err=>alert(JSON.stringify(err)))
		})			
	}				
	const handleChange=(e)=>{
		e.preventDefault()
		selectedFiles=e.target.files
		alert(JSON.stringify(selectedFiles))
		}
	
		return(
			<div className="post-box">
			<form className="post-form" onSubmit={handleSubmit} ref={form}>
			<textarea 
				className="comment-text"
				name="text"
			>Enter your Post Here</textarea>
			<input type='file' id='image' name="image" multiple onChange={handleChange}/>
			<input type='submit' />
			</form>
			</div>
		)
	}
