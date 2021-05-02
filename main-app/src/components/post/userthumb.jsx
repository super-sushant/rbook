import React from 'react'

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
		await fetch(this.props.profile,{
	                method:'GET',
	                headers:{'Content-Type':'application/json'},
	        }).then(res=>res.json()).then(result=>{
	                this.setState({profile:result})
		})

	}

	render(){
	const profile=this.state.profile
	return( <div className="dp-full">
                        <img className = "dp-thumb" alt="no_dp?" src={process.env.REACT_APP_DEFAULT_DP}/>
		<div>
		<div className="username">{"@"+profile.username}</div>
                <div className="name">{profile.first_name+profile.last_name}</div>
                </div>
		</div>
	)}
}
