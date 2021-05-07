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
		this.handleClick=this.handleClick.bind(this)
		this.handleStateChange = this.handleStateChange.bind(this);
		}
	componentDidMount(){
		this.loadImages()
		}
	handleStateChange(value){
		let comments = this.state.comments;
		comments.unshift(value);
		this.setState({ comments : comments ,noComments:false})
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
		const token =localStorage.getItem('token')
		await fetch(url,{
			method:'GET',
			headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},
		}).then(res=>res.json()).then(result=>{
			if(result.length){
				let image=[]
				result.forEach(img=>image.push({url:img.image}))
				this.setState({images:image})
		}}).catch(err=>alert(JSON.stringify(err)))

	}
	async loadComments(){
		const postId=this.props.post.url.split("/")[5]
		const token =localStorage.getItem('token')
		const url = process.env.REACT_APP_API_URL +'comments/?post='+postId
		await fetch(url,{
			method:'GET',
			headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},
		}).then(res=>res.json()).then(result=>{
			if(result.length){
				this.setState({comments:result})
			}
			else{
				this.setState({noComments:true})
			}
		}).catch(err=>alert(JSON.stringify(err)))
	}
	render(){
		const post=this.props.post
		let comments
		if(this.state.noComments){
		 comments = "There looks like you have no comments"
		}else{
		 comments = this.state.comments.map(comment=><Comment comment={comment} user={this.props.user}/>) 
		}
                const token =localStorage.getItem('token')
	const deletePost=(e)=>{
		e.preventDefault()
		fetch(post.url,{
			method:'DELETE',
			headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}})
		.then(res=>{if(res){this.props.handle(post,0)}})
		}
	const like=(e)=>{
                let url = process.env.REACT_APP_API_URL+'postsl/'
		let data={post:post.url,user:this.props.user}
                fetch(url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify(data)})
                .then(res=>res.json())
                .then(result=>{
                if(result.user){changeLike(1);
		this.setState({liked:true})
                }else{let b=2-3;changeLike(b);}
		this.setState({liked:false})
                })
        }
        const changeLike=(ive)=>{
                const url=post.url
                let data = {likes:post.likes,user:post.user}
		const token =localStorage.getItem('token')
                post.likes=post.likes+ive
                data.likes=data.likes+ive
                fetch(url,{method:'PUT',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify(data)})
                .then(res=>res.json())
        }
		return(
			<div className="post-container">
			<UserThumb profile={post.user} />
			{post.user===this.props.user?
			<button onClick={deletePost}>delete?</button>:""}
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
			<button className="like" onClick={like}>^</button>
			{post.likes}			
			<AddComment post={post.url} handle={this.handleStateChange}/>
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
