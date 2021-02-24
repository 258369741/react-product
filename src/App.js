import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from "./page/Home";
import Editeproduct from "./page/Editproduct";
import Addproduct from "./page/Addproduct";
import Menu from "./component/Menu";

const App = () =>{
  return (
  <Router>
    <Menu/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/home" component={Home}/>
      <Route path="/add" component={Addproduct}/>
      <Route path="/edit/:id" component={Editeproduct}/>

    </Switch>
    </Router>
  );

}

export default App;