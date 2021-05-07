import React from 'react'
import Post from './post.jsx'
import AddPost from './addpost.jsx'
import {userContext} from '../../userContext'
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
		if(nextProps.id!==this.state.id || nextProps.com!==this.state.com){
			this.loadPost()
			this.setState({id:nextProps.id,com:nextProps.com})
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
		if(this.props.id!=='0' && this.props.id!=='null'){
			const id=this.props.id
			url=process.env.REACT_APP_API_URL+"posts/?user="+id
		}else if(typeof(this.props.com)!=='undefined'){
			url=process.env.REACT_APP_API_URL+"posts/?community="+this.props.com
		}else{	url=process.env.REACT_APP_API_URL+'posts/'}

		await fetch(url,{
			method:'GET',
			headers:{'Content-Type':'application/json'}
			})
			.then(res=>res.json())
			.then(result=>{if(Array.isArray(result)){this.setState({posts:result})}})
			.catch(err=>alert(JSON.stringify(err)))
	}
	render(){
	let Posts = this.state.posts.map(post=><Post post={post} handle={this.handleStateChange} user={this.props.user}/>)
		return(
			<div>
				<userContext.Consumer>
				{({user}) => {
				if(Object.keys(user)===0){
					return (
((typeof this.state.com!=='undefined' && user.user!=='')|| this.state.id===user.user.split('/')[5])?
<AddPost com={this.state.com} handle={this.handleStateChange} />:"")}}}
				</userContext.Consumer>
				{Posts}
			</div>
		)
	}
}
