import './App.css';
/*import '../node_modules/bootstrap/dist/css/bootstrap.min.css';*/
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/login/login";
import SignUp from "./components/login/register";
import Home from "./components/home/home";
import Browse from "./components/browse/browse";
import NavBar from "./components/browse/navbar";

function App() {
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

      <div className="auth-wrapper">
        <div className="auth-inner">
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/browse" component={Browse} />
            <Route path="/home/:id/:com" component={Home} />
	</div>
      </div>
      </Switch>
</Router>
   </div>
  );
}
export default App;
