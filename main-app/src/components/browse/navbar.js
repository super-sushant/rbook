import React from 'react'
import {Link,Redirect,useHistory} from 'react-router-dom'
import {userContext} from '../../userContext'
export default function NavBar(props){
	const [searchtext,setSeachtext]=React.useState("")
	const [users,setusers]=React.useState([''])
	const {user,logout}=React.useContext(userContext)
	const history = useHistory()
	const loadData=()=>{
		if(searchtext!==''){
		const url =process.env.REACT_APP_API_URL+'us/?search='+searchtext
		fetch(url).then(res=>res.json()).then(result=>setusers(result))}
	}
	const userlist=searchtext===''?'':users.map(user=><UserList user={user}/>)
	const handleClick=(e)=>{
		if(Object.keys(user).length){
		alert(JSON.stringify(user))
			logout()}
		else{
		alert("yeehaw")}
	}
	React.useEffect( () => {loadData()})
	return(
		<div>
<div class="header"></div>
  <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu"/>
  <label for="openSidebarMenu" class="sidebarIconToggle">
    <div class="spinner diagonal part-1"></div>
    <div class="spinner horizontal"></div>
    <div class="spinner diagonal part-2"></div>
  </label>
  <div id="sidebarMenu">
    <ul class="sidebarMenuInner">
      <li>Rohit Kandari <span>Chutiya Hai</span></li>
      <li>Company</li>
      <li>NICE</li>
      <li>Twitter</li>
      <li></li>
      <li>Linkedin</li>
    </ul>
  </div>
			<input type='text' name='query' placeholder="Enter Something @@" onChange={(e)=>setSeachtext(e.target.value)}/>
			{Object.keys(user).length?
			<button onClick={logout}>Sign-out</button>:
			<Link to="/sign-in" className="btn btn-primary">{Object.keys(user).length?'LogOut':'Login'}</Link>}
			<div className='search-list' style={{'position':'fixed','z-index':'3','background-color':'cyan'}}>
			{userlist}
			</div>
<div class="topnav">
  <Link  to="/home/0/0">Home</Link>
  <Link to="/browse">Browse</Link>
  <Link to={`/home/${localStorage.getItem('id')}/0`}>Account</Link>
  <Link to="/threads">Thread</Link>
  <Link to="#about">About</Link>
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
