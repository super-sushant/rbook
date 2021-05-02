import React from 'react';
import Profile from './profile.jsx'
import Feed from '../post/feed.jsx'
export default class Home extends React.Component{
    constructor(){
	super()
	this.state ={profile:{user:{username:"",first_name:"",last_name:""},dp:"",dob:""}}
	this.loadData = this.loadData.bind(this);
	}
    componentDidMount(){
		this.loadData();
	}
    async loadData(){
                const url =process.env.REACT_APP_API_URL +'users/1/'
		const token =localStorage.getItem('accessToken')
                await fetch(url,{
                        method:'GET',
                        headers: { 'Content-Type': 'application/json'}
                        }).then(res =>res.json()).then(result=>{
                this.setState({profile:result})
			}).catch(err=>alert(JSON.stringify(err)))
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
