import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import {userContext} from '../../userContext'
export default function Threads(props){
	const [threads,setThreads] =useState(0)
	const [loaded,setloaded] =useState(false)
	const {user,header}=useContext(userContext)
	const loadData =()=>{
		fetch('http://localhost:8000/messages/inbox/',{headers:{...header}})
		.then(res=>res.json())
		.then(res=>{
		if(res.results.length){setThreads(res.results);setloaded(true)}
			})
		}
	const delThread=(e)=>{
		const uuid=e.target.id
		const url =process.env.REACT_APP_MSG_URL+'thread/'+uuid+'/delete'
		fetch(url,{method:'DELETE',headers:{...header}})
		.then(alert("SuccessFully Deleted"))
		}
	if(user){if(!loaded){loadData()}}
	const convos=threads?threads.map(thread=><Convo convo={thread} delThread={delThread} />):"Babe you need to talk More this isnt working"
	if(user){return(<div>{convos}</div>)}else{return(<div>Babe Try logging in first"</div>)}
}
function Convo(props){
	const c=props.convo
	return(
		<div style={{'display':'flex','flex-direction':'column'}}>
		<Link to={`/msgs/${c.uuid}`}>
		{c.subject}
		{c.sender.display_name}
		{c.last_message}
		{c.total_unread?<h1>.</h1>:""}
		<hr/>
		</Link>
<Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{"right":"0"}}>
    ^
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item id ={c.uuid} onClick={props.delThread}>Action</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>		</div>
		)
}	
