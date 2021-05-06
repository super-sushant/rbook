import React from 'react'
import {Link} from 'react-router-dom'
export default class Browse extends React.Component{
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
	return(
		<div><Link to={`/home/0/${com.id}`}>
		{com.name}
		<img alt='' src={com.pic}/>
		</Link>
		</div>
		)
}
