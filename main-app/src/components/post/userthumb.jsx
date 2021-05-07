import React from 'react'
import {Link} from 'react-router-dom'
export default class UserThumb extends React.Component{
	constructor(props){
		super(props)
		this.state={profile:{}}	
		this.loadData=this.loadData.bind(this)
		}

	componentDidMount(){
		this.loadData()
		}
	async loadData(){
		const token =localStorage.getItem('token')
		await fetch(this.props.profile).then(res=>res.json()).then(result=>{
	                this.setState({profile:result})
		})

	}

	render(){
	const profile=this.state.profile
	return( <div className="dp-full">
                        <img className = "dp-thumb" alt="no_dp?" src={process.env.REACT_APP_DP_URL+profile.username+'.jpeg'}/>
		<div>
		<div className="username"><Link to={`/home/${profile.pk}/0`} className="link">{"@"+profile.username}</Link></div>
                <div className="name">{profile.first_name+profile.last_name}</div>
                </div>
		</div>
	)}
}
