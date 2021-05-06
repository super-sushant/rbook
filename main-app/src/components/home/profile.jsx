import React from 'react'

export default function Profile(props){
	const profile=props.profile
	return(
		<>		
		<div>
			<img className="dp-full" alt=''  src={profile.dp} onError={(e) => {
			
			e.target.src = process.env.REACT_APP_DP_URL+'1.jpg'
			e.target.onerror=null;}}/>
		</div>
		<div className="username">{profile.user.username}</div>
		<div className="name">{profile.user.first_name+profile.user.last_name}</div>
		</>
		);
}
