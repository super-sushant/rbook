import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import UserThumb from './userthumb.jsx'
import Comment from './comment.jsx'
import AddComment from './addcomment.jsx'
export default class Post extends React.Component{
	constructor(props){
		super(props)
		this.state={showComments:false,images:[],noComments:false,comments:[],liked:false,profile:{}}
		this.loadComments=this.loadComments.bind(this)
		this.loadImages=this.loadImages.bind(this)
		this.like=this.like.bind(this)
		this.handleClick=this.handleClick.bind(this)
		}
	componentDidMount(){
		this.loadImages()
		}
	handleClick(e){
		e.preventDefault()
		if(!this.state.comments.length){
			this.loadComments()
		}
		this.setState({showComments:!this.state.showComments})
	}
	async loadImages(){
		const postId=this.props.post.url.split("/")[5]
		const url = process.env.REACT_APP_API_URL +'images/?post='+postId
		await fetch(url,{
			method:'GET',
			headers:{'Content-Type':'application/json'},
		}).then(res=>res.json()).then(result=>{
			if(result.length){
				let image=[]
				result.forEach(img=>image.push({url:img.image}))
				alert(JSON.stringify(image))
				this.setState({images:image})
		}}).catch(err=>alert(JSON.stringify(err)))

	}
	async loadComments(){
		const postId=this.props.post.url.split("/")[5]
		const url = process.env.REACT_APP_API_URL +'comments/?post='+postId
		await fetch(url,{
			method:'GET',
			headers:{'Content-Type':'application/json'},
		}).then(res=>res.json()).then(result=>{
			if(result.length){
				this.setState({comments:result})
			}
			else{
				this.setState({noComments:true})
			}
		}).catch(err=>alert(JSON.stringify(err)))
	}
	async like(){
		if(this.state.liked){
		}else{
		const body={post:this.props.post.url,user:this.props.user}
		alert(JSON.stringify(body))
		const url = process.env.REAPT_APP_API_URL +'postsl'
		await fetch(url,{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify(body)
		}).then(res=>res.json()).then(result=>{
			alert("pls")
			alert(JSON.stringify(result))
			{/*this.setState({liked:!this.state.liked})
			*/}
			}).catch(function(err){alert(JSON.stringify(err))})
		}
	}
	render(){
		const post=this.props.post
		let comments
		if(this.state.noComments){
		 comments = "There looks like you have no comments"
		}else{
		 comments = this.state.comments.map(comment=><Comment comment={comment}/>) 
		}
		return(
			<div className="post-container">
			<UserThumb profile={post.user} />
			<hr/>
			<div className="post-text">

			{post.text}

			</div>
			{this.state.images.length &&
<SimpleImageSlider
        width={400}
        height={300}
	showNavs={true}
	showBullets={true}
        images={this.state.images}
      />}
			<div className="post-lower">
			<button className="like" onClick={this.like}>^</button>
			{post.likes}			
			<AddComment post={post.url} user ={this.props.user} />
			<button className="comment" onClick={this.handleClick}>
			{this.state.showComments?"Hide":"Show"}
			</button>
			</div>
			<div className="comment-section"/>
			{this.state.showComments?comments:"Comments"}
			</div>
		)
	}
}
