import React from 'react'
import {userContext} from '../../userContext'
export default function Profile(props){
	let profile=props.profile
	let {user,header} =React.useContext(userContext)
	let [joined,changeJ]=React.useState(0)
	
        if(user.starred && joined === 0){changeJ(user.starred.includes(profile.user))}
        const handleJoin=(e)=>{
                e.preventDefault()
                let value=profile.user
                if(joined){const index =user.starred.indexOf(value);if(index > -1){user.starred.splice(index, 1);}}
                else{user.starred.push(value)}
                let data={user:user.user,community:user.community,starred:user.starred}
                fetch(user.url,{method:'PUT',headers:{'Content-Type':'application/json',...header},body:JSON.stringify(data)}).then(res=>res.json()).then(res=>res.url?changeJ(!joined):alert(JSON.stringify(res)))
        }
	return(
		<>		
		<div>
			<img className="dp-full" alt=''  src={profile.dp} onError={(e) => {
			
			e.target.src = process.env.REACT_APP_DP_URL+'1.jpg'
			e.target.onerror=null;}}/>
		</div>
		<div className="username">{profile.user.username}</div>
		<div className="name">{profile.user.first_name+profile.user.last_name}</div>
		<button onClick={handleJoin}>{joined?'Following':'Follow?'}</button>
		</>
		);
}
