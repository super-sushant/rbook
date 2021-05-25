import React,{useState,useContext,useRef} from 'react'
import {userContext} from '../../userContext'
import {Redirect,useLocation} from 'react-router-dom'
export default function Thread(props){
        const [thread,setThread] =useState([])
	const location=useLocation()
	let msgto=location.msgto?location.msgto:0
	const myref=useRef(null)
        const {header}=useContext(userContext)
	let uuid=props.match.params.id
        async function loadData(){
		let url=""
		if(msgto){
		url = process.env.REACT_APP_MSG_URL+`message/thread/${msgto}/send/`
                await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',...header},body:JSON.stringify({subject:'1',message:'__'})})
                .then(res=>res.json())
                .then(res=>{if(res.uuid){
			uuid=res.uuid
			msgto=0
		}})
		}else{
                 url = process.env.REACT_APP_MSG_URL+'message/thread/'+uuid+'/'
                await fetch(url,{headers:{...header}})
                .then(res=>res.json())
                .then(res=>{if(res.messages && res.messages!==thread){setThread(res.messages)}})
                }}
        if(!thread.length){loadData()}
	const sendMsg=(e)=>{
		e.preventDefault();
		const body=new FormData(myref.current)
		body.append('subject','hi')
		const url = process.env.REACT_APP_MSG_URL+'message/thread/'+uuid+'/'+localStorage.getItem('id')+'/send/'
                fetch(url,{method:'POST',headers:{...header},body:body})
                .then(res=>res.json())
		.then(res=>{if(res.uuid){
			alert(JSON.stringify(res))
			let temp=thread
			temp.push(res)
			setThread([...temp])}
		})
		}
        return(<div style={{'bottom':'0px'}}>
		<MsgList thread={thread}/>
		<form ref={myref} onSubmit={sendMsg}>
		<textarea name='message' className="new-msg" placeholder="Enter a New msg (´,,•ω•,,)♡">
		</textarea>
		<input type='submit'/>
		</form>
		</div>)
}
function MsgList(props){
	const thread=props.thread
        let msgs=thread.length?thread.map(thread=><Msg msg={thread} />):"this convoversation seems empty"
	return(<div>{msgs}</div>)}

function Msg(props){
	const msg=props.msg
	return(<div className={(msg.sender.is_user)?"mymsg":"notmymsg"}>
		{msg.content}
		</div>
	)
}

