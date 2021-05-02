import React from 'react'

export default function Profile(props){
	const profile=props.profile
	return(
		<>		
		<div>
			<img className="dp-full" alt = {profile.dp} src={profile.dp}/>
		</div>
		<div className="username">{profile.user.username}</div>
		<div className="name">{profile.user.first_name+profile.user.last_name}</div>
		</>
		);
}
