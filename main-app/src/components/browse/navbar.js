
import React from 'react'
import {Link} from 'react-router-dom'
export default function NavBar(props){
	const [searchtext,setSeachtext]=React.useState("")
	const [users,setusers]=React.useState([''])
	const loadData=()=>{
		if(searchtext!==''){
		const url =process.env.REACT_APP_API_URL+'us/?search='+searchtext
		fetch(url).then(res=>res.json()).then(result=>setusers(result))}
	}
	const userlist=searchtext===''?'':users.map(user=><UserList user={user}/>)
	React.useEffect( () => {loadData()})
	return(
		<div>
			<input type='text' name='query' placeholder="Enter Something @@" onChange={(e)=>setSeachtext(e.target.value)}/>
			<div className='search-list'>
			{userlist}
			</div>
<div class="topnav">
  <a class="active" href="/home/0/0">Home</a>
  <a href="/browse">Browse</a>
  <a href={`/home/${localStorage.getItem('id')}/0`}>Account</a>
  <a href="#news">News</a>
  <a href="#about">About</a>
</div>


		</div>
	)
    }
function UserList(props){
        const profile=props.user
        return( <div className="dp-full">
                        <img className = "dp-thumb" alt="no_dp?" src={process.env.REACT_APP_DEFAULT_DP}/>
                <div>
                <div className="username"><Link to={`/home/${profile.pk}/0`} className="link">{"@"+profile.username}</Link></div>
                <div className="name">{profile.first_name+profile.last_name}</div>
                </div>
                </div>
        )}
