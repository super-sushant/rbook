import React from 'react'
import Post from './post.jsx'
export default class Feed extends React.Component{
	constructor(props){
	super(props)
	this.state={posts:[]}
	this.loadPost=this.loadPost.bind(this)
	}	
	componentDidMount(){
		this.loadPost()
	}
	async loadPost(){
		let url =""
		if(this.props.id){
			const id=this.props.id
			url=process.env.REACT_APP_API_URL+"posts/?user="+id
		}else{
			url=process.env.REACT_APP_API_URL+"posts/"
		}
		await fetch(url,{
			method:'GET',
			headers:{'Content-Type':'application/json'}
		}).then(res=>res.json()).then(result=>{
			if(result.length){
				alert(JSON.stringify(result))
				this.setState({posts:result})	
			}
		}).catch(err=>alert(JSON.stringify(err)))
			
	}
	
	render(){
	const Posts = this.state.posts.map(post=><Post post={post} user={this.props.user}/>)
		return(
			<div>
				{Posts}
			</div>
		)
	}
}
