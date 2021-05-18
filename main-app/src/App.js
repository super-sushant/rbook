import './App.css';
/*import '../node_modules/bootstrap/dist/css/bootstrap.min.css';*/
import React from 'react'
import {Switch, Route} from "react-router-dom";
import Login from "./components/login/login";
import SignUp from "./components/login/register";
import Home from "./components/home/home";
import Threads from "./components/msg/threads";
import Thread from "./components/msg/thread";
import Browse from "./components/browse/browse";
import NavBar from "./components/browse/navbar.js";
import {userContext} from './userContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user:0,id:localStorage.getItem('id'),token:localStorage.getItem('token')};
    this.logout = this.logout.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

}
  logout() {
    const header=(typeof this.state.token === 'string')?{'Authorization':`Bearer ${this.state.token}`}:{}
    const url =	process.env.REACT_APP_API_URL+'rest-auth/logout/'
    fetch(url,{headers:{...header}}).then(res=>this.setState({user:0}))
    localStorage.clear()

  }
  handleLogin(value,token){
	this.setState({id:value,token:token},this.loadData)}
  componentDidMount() {
	this.loadData()}
  loadData(){
		const url=process.env.REACT_APP_API_URL+'users/?user='+this.state.id
                fetch(url).then(res=>res.json()).then(res=>{
                if(res.length){this.setState({user:res[0]});alert('Consider Yourself Logged In')
                }else{alert(JSON.stringify(res))}})
  }

  render() {
const header=(typeof this.state.token === 'string')?{'Authorization':`Bearer ${this.state.token}`}:{}

    return (
    <div className="App">
{/*      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
*/}
<userContext.Provider value={{user: this.state.user,header:header,logout: this.logout}}>
<NavBar/>
   <Switch>
      <div className="auth-wrapper">
        <div className="auth-inner">
            <Route exact path="/" component={(props)=><Login {...props} handle={this.handleLogin} />} />
            <Route  path="/sign-in" component={(props)=><Login {...props} handle={this.handleLogin} />} />
            <Route path="/sign-up/:id" component={SignUp} />
            <Route path="/browse" component={Browse} />
            <Route path="/threads" component={Threads} />
            <Route path="/msgs/:id" component={Thread} />
            <Route path="/home/:id/:com" component={Home} />
	</div>
      </div>
      </Switch>
    </userContext.Provider>
   </div>
  );
}
}
export default App;
