import React, { Component } from "react";
export default class SignUp extends Component {
	constructor(){
		super()
		this.state={ email:"",password1:"",password2:"",username:""}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	async handleSubmit(e){
		e.preventDefault()
		const url = 'http://localhost:8000/sasta/registration/'
		await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify(this.state)
		}).then(response=>response.json()).then(result=>{
		if(result.token){
			alert(JSON.stringify(result))
			localStorage.setItem("accessToken",result.token)
			localStorage.setItem("username",this.state.username)*/}
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
        if (redirectToReferrer) {
            return(<p><h1>Verify Account using link in Email </h1>
                <h5 className="forgot-password text-right">
                    Already Verified <a href="/sign-in">sign in?</a>
                </h5></p>)
        }
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
	);
    }
}
