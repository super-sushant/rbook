import './App.css';
/*import '../node_modules/bootstrap/dist/css/bootstrap.min.css';*/
import React from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/login/login";
import SignUp from "./components/login/register";
import Home from "./components/home/home";
import Browse from "./components/browse/browse";
import NavBar from "./components/browse/navbar.js";
import {userContext} from './userContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: {},id:localStorage.getItem('id'),token:localStorage.getItem('token')};
    this.logout = this.logout.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

}
  logout() {
    localStorage.clear();
    this.setState({user: {}});

  }
  handleLogin(value,token){
	this.setState({id:value,token:token},this.loadData)}
  componentDidMount() {
	this.loadData()}
  loadData(){
		const url=process.env.REACT_APP_API_URL+'users/?user='+this.state.id
                fetch(url).then(res=>res.json()).then(res=>{
                if(res.length===1){this.setState({user:res[0]})
                }})
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
<NavBar/>
<Router>
   <Switch>
      <userContext.Provider value={{user: this.state.user,header:header,logoutUser: this.logout}}>
      <div className="auth-wrapper">
        <div className="auth-inner">
            <Route exact path='/' component={(props)=><Login {...props} handle={this.handleLogin} />} />
            <Route path="/sign-up/:id" component={SignUp} />
            <Route path="/browse" component={Browse} />
            <Route path="/home/:id/:com" component={Home} />
	</div>
      </div>
      </userContext.Provider>
      </Switch>
</Router>
   </div>
  );
}
}
export default App;
