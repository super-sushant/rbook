import React from 'react';
import Profile from './profile.jsx'
import Feed from '../post/feed.jsx'
import {Com} from '../browse/browse.jsx'
export default class Home extends React.Component{
    constructor(props){
	super(props)
	this.loadData = this.loadData.bind(this);
	const id=this.props.match.params.id
	const com=this.props.match.params.com
	this.state ={profile:{user:{url:'',username:"",first_name:"",last_name:""},dp:"",dob:""},id:id,com:com}
	}
    componentDidMount(){
		this.loadData();
	}
    componentDidUpdate(nextProps) {
	if(nextProps.match.params.id!==this.state.id){
	     this.setState({ id: nextProps.match.params.id });
		this.loadData();}
	}
    async loadData(){
	if(this.state.id!=='0'){
	        const url =process.env.REACT_APP_API_URL +'users/?user='+this.state.id
		const token =localStorage.getItem('token')
                await fetch(url,{
                        method:'GET',
                        headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}
                        }).then(res =>res.json()).then(result=>{
                this.setState({profile:result[0]})
			})
        }else if(this.state.com!=="0"){
                const url =process.env.REACT_APP_API_URL +'com/'+this.state.com+'/'
                await fetch(url)
                .then(res =>res.json()).then(result=>this.setState({com:result}))
	}}
    render(){
	let user = process.env.REACT_APP_API_URL+'us/'+this.state.id+'/'
	return(<div>
		<div>
		Home Page
		{(this.state.com!=='0')?<Com com={this.state.com}/>:""}
		{(this.state.id!=='0')?<Profile profile={this.state.profile} />:""}
		<Feed id={this.state.id} user={user}  com={this.state.com.id}/>
		</div>
	    </div>
	);
    }
}

