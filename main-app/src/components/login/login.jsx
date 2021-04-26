import React, { Component } from "react";
import { Redirect } from 'react-router-dom';


export default class Login extends Component {
	constructor(){
		super()
		this.state={username:"",password:""} 
		this.handleSubmit=this.handleSubmit.bind(this)
	}
        async handleSubmit(e){
		e.preventDefault()
                const url = 'http://localhost:8000/sasta//login/'
                await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        body: JSON.stringify(this.state)
                }).then(response=>response.json()).then(result=>{
		if(result.token){
			localStorage.setItem("accessToken",result.token)
			{/*localStorage.setItem("refreshToken",result.data.tokenAuth.refreshToken)
			localStorage.setItem("username",result.data.tokenAuth.user.username)*/}
			this.setState({login:true})
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
	const redirectToReferrer = this.state.login;
	if (redirectToReferrer) {
		return <Redirect to="/home" />
        }
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="text" id = "username" onChange={handleChange} className="form-control" placeholder="Enter email or user-name" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id = "password" onChange={handleChange} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a><br></br>
                    New User ? <a href="/sign-up">Sign Up</a>
                </p>
            </form>
        );
    }
}