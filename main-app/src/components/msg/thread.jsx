import React,{useState,useContext,useRef} from 'react'
import {userContext} from '../../userContext'

export default function Thread(props){
        const [thread,setThread] =useState([])
	const uuid=props.match.params.id
	const myref=useRef(null)
        const {header}=useContext(userContext)
        async function loadData(){
                const url = process.env.REACT_APP_MSG_URL+'message/thread/'+uuid+'/'
                await fetch(url,{headers:{...header}})
                .then(res=>res.json())
                .then(res=>{if(res.messages && res.messages!==thread){setThread(res.messages)}})
                }
        if(!thread.length){loadData()}
	const sendMsg=(e)=>{
		e.preventDefault();
		const body=new FormData(myref.current)
		body.append('subject','hi')
                const url = process.env.REACT_APP_MSG_URL+'message/thread/'+uuid+'/'+localStorage.getItem('id')+'/send/'
                fetch(url,{method:'POST',headers:{...header},body:body})
                .then(res=>res.json())
		.then(res=>{if(res.uuid){
			
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
	return(<div>
		{msgs}</div>)}

function Msg(props){
	const msg=props.msg
	return(<div className={(msg.sender.is_user)?"mymsg":"notmymsg"}>
		{msg.content}
		</div>
	)
}
