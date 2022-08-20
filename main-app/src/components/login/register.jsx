import React, { Component } from "react";

import {Redirect} from 'react-router-dom'
export default class SignUp extends Component {
	constructor(props){
		super(props);
		this.myref=React.createRef(null)
		this.myref1 = React.createRef(null)
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={}
	}
	async handleSubmit(e){
		e.preventDefault()
		const url = 'http://localhost:8000/sasta/rest-auth/registration/'
		console.log(this.state);
		await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		}).then(response=>response.json()).then(result=>{
		if(result.detail){
			this.setState({signup:true})
		}else{
			var p=result
			for (var key in p) {
				if (p.hasOwnProperty(key)) {
					alert(key + " -> " + JSON.stringify(p[key][0]))
				}
			}
		}})
	}
    render() {
	const handleChange =(e)=>{
		this.setState({[e.target.id]:e.target.value})
	}
	const redirectToReferrer = this.state.signup;
	const handleSubmit=(e)=>{
		e.preventDefault()
		const url = 'http://localhost:8000/sasta/users/'
		const data = new FormData(this.myref.current)
	        data.append("user",`http://localhost:8000/sasta/us/${this.props.match.params.id}/`)
		data.append("community",["http://localhost:8000/sasta/com/1/"])
	        data.append('starred', ["http://localhost:8000/sasta/us/1/"])
		const url1=`http://localhost:8000/sasta/us/${this.props.match.params.id}/`
		fetch(url1).then(res=>res.json()).then(res1=>{
		  fetch(url1,{
			method:'PUT',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({...res1,...this.state}),
		  })
			.then(res=>res.json())
			.then(res=>{if(res.url){
		    fetch(url, {
			method: 'POST',
			body: data
			}).then(response=>response.json()).then(result=>{
			this.setState({gotohome:true})
		      })
		   }else{alert(JSON.strjngify(res))}})
		})
	}
        if (redirectToReferrer) {
            return(<p><h1>Verify Account using link in Email </h1>
                <h5 className="forgot-password text-right">
                    Already Verified <a href="/sign-in">sign in?</a>
                </h5></p>)
        }
	if(this.state.gotohome){
		return(
			<Redirect to={`/home/${this.props.match.params.id}/0`} />)}
		
	if(this.props.match.params.id==='0'){
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>User Name</label>
                    <input id = "username" type="text" onChange={handleChange} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" id = "email" onChange={handleChange} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id = "password1" className="form-control" onChange={handleChange} placeholder="Enter password" />
                </div>
		<div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" onChange={handleChange} id = "password2" className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick = {this.handleSubmit}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
		</form>
	);}
	else{return(
		<>
                <h3>Sign Up</h3>
            <form ref={this.myref1}>
                    <input required id='first_name' onChange={handleChange} type="text" placeholder="First Name" />
                    <input required id='last_name'  onChange={handleChange} type="text" placeholder="Last Name"  />
		</form>
            <form ref={this.myref}>
                    <input required name='dob'  id = "dob" type="date"/>
                    <input required name='dp' id = "dp" type="file" accept="image/png, image/jpeg"/>
                <button type="submit" className="btn btn-primary btn-block" onClick = {handleSubmit}>Sign Up</button>
		</form></>);}
    }
}
