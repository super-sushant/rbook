import React from 'react';
import Profile from './profile.jsx'
import Feed from '../post/feed.jsx'
export default class Home extends React.Component{
    constructor(props){
	super(props)
	this.loadData = this.loadData.bind(this);
	this.state ={profile:{user:{url:'',username:"",first_name:"",last_name:""},dp:"",dob:""},id:this.props.id?this.props.id:localStorage.getItem("id")}
	}
    componentDidMount(){
		this.loadData();
	}
    async loadData(){
                const url =process.env.REACT_APP_API_URL +'users/?user='+this.state.id
		const token =localStorage.getItem('token')
                await fetch(url,{
                        method:'GET',
                        headers: { 'Content-Type': 'application/json','Authorization':`Bearer ${token}`}
                        }).then(res =>res.json()).then(result=>{
                this.setState({profile:result[0]})
			}).catch(err=>alert(JSON.stringify('pls')))
        }
    render(){
	return(<div>
	    <div>
		Home Page
		<Profile profile={this.state.profile} />
		<Feed id={1} user={this.state.profile.user.url}/>
	    </div>
	    </div>
	);
    }
}
