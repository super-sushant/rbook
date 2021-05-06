import React from 'react'
import Post from './post.jsx'
import AddPost from './addpost.jsx'
export default class Feed extends React.Component{
	constructor(props){
	super(props)
	this.state={posts:[],id:this.props.id}
	this.loadPost=this.loadPost.bind(this)
	this.handleStateChange=this.handleStateChange.bind(this)
	}

	componentDidMount(){
		this.loadPost()
	}
	componentWillUpdate(nextProps){
		if(nextProps.id!==this.state.id){
			this.loadPost()
			this.setState({id:nextProps.id})
		}
	}
	handleStateChange(value,arg){
		let posts=this.state.posts
		if(arg){posts.unshift(value)}
		else{var index = posts.findIndex(function(o){return o.url === value.url;})
		if (index !== -1) posts.splice(index, 1);}
		this.setState({posts:posts})
	}
	async loadPost(){
		let url =""
		if(this.props.id!=='0'){
			const id=this.props.id
			url=process.env.REACT_APP_API_URL+"posts/?user="+id
		}else if(this.props.com!=='0'){
			url=process.env.REACT_APP_API_URL+"posts/?community="+this.props.com
		}
		const token =localStorage.getItem('token')
		await fetch(url,{
			method:'GET',
			headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}
			})
			.then(res=>res.json())
			.then(result=>{if(Array.isArray(result)){this.setState({posts:result})}})
			.catch(err=>alert(JSON.stringify(err)))
			
	}
	
	render(){
	let Posts = this.state.posts.map(post=><Post post={post} handle={this.handleStateChange} user={this.props.user}/>)
	
		return(
			<div>
				{this.state.id===this.props.user.split('/')[5]?<AddPost user={this.props.user} handle={this.handleStateChange} />:""}	
				{Posts}
			</div>
		)
	}
}
