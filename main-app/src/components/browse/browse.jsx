import React from 'react'
import {userContext} from '../../userContext'
import {Link} from 'react-router-dom'
class Browse extends React.Component{
	constructor(props){
		super(props)
		this.state={cats:[],coms:[],comcatid:0}
		this.loadCat=this.loadCat.bind(this)
		this.handleStateChange=this.handleStateChange.bind(this)
	}
	componentDidMount(){this.loadCat();}
	async loadCat(){
		const url=process.env.REACT_APP_API_URL+'cat/'
		await fetch(url)
		.then(res=>res.json()).then(res=>this.setState({cats:res})).catch(err=>alert(JSON.stringify(err)))
	}
	handleStateChange(value,arg){
		this.setState({coms:value,comcatid:arg})}
	render(){
		const cat = this.state.cats.map(cat=><Cat cat={cat} coms={cat.id===this.state.comcatid?this.state.coms:[]} handle={this.handleStateChange}/>)
		return(<div>help{cat}</div>)
	}
}

function Cat(props){
	const cat=props.cat
	const loadCom=(e)=>{
		e.preventDefault()
		const url=process.env.REACT_APP_API_URL+'com/?category='+cat.id
		fetch(url)
		.then(res=>res.json()).then(res=>props.handle(res,cat.id))
	}
	let coms=props.coms.map(com=><Com com={com}/>)
	return(
		<div>{cat.name}
		<img alt="" src={cat.pic}/>
		<button onClick={loadCom}>{'>'}</button>
		HEHEH
		{coms}
		</div>
		)
}
export function Com(props){
	const com=props.com
	let {user,header} =React.useContext(userContext)
	let [joined,changeJ]=React.useState(null)
	if(user.community && joined==null){
	changeJ(user.community.includes(process.env.REACT_APP_API_URL+'com/'+com.id+'/'))}
	const handleJoin=(e)=>{
		e.preventDefault()
		let value=process.env.REACT_APP_API_URL+'com/'+com.id+'/'
		if(joined){const index =user.community.indexOf(value);if(index > -1){user.community.splice(index, 1);}}
		else{user.community.push(value)}
		let data={
			user:user.user,
			community:user.community,
			starred:user.starred
			}
		fetch(user.url,{
			method:'PUT',
			headers:{'Content-Type':'application/json',...header},
			body:JSON.stringify(data)
		})
		.then(res=>res.json())
		.then(res=>res.url?changeJ(!joined):alert(JSON.stringify(res)))
	}

	return(
		<div><Link to={`/home/0/${com.id}`}>
		{com.name}
		<img alt='' src={com.pic}/>
		</Link>
		{user?<button onClick={handleJoin}>{joined?'Joined':'Join'}</button>:""}
		</div>
		)
}
export default Browse
