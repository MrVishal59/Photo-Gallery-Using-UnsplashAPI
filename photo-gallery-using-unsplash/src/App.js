import './App.css';
import { PhotoResult } from './PhotoResult';
import React from 'react';
import { Switch,Route, Redirect } from 'react-router-dom';
import { Home } from './Home';
class App extends React.Component {
  constructor(){
    super();
    this.state={keyword:"",urls:[],count:1};
  }
  
  
render(){
  return (
    <div className="App ">
      <div className='container-fluid' id="header">
        <br/><br/>
        <div className='row justify-content-center'>
         
          <div className='col-4'>
            <button className='btn btn-dark' onClick={()=>window.location.href="/Home"}>Home</button>
          </div>
        </div>
        <div className='row justify-content-center'>
          
          <div className='col-4'>
            <h1 className='display-1'>Photo Gallery</h1>
          </div>
          
        </div> 
        <div className='row justify-content-center'>
            <div className='col-8'>
              <p className='lead'> This Gallery fetch images from UnSplash API.Hope you enjoy the images</p>
            </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-8'>
            <div className='row justify-content-center'>
              <div className='col-7' id="searchbox">
                <input type="search" className='form-control'  placeholder="Search Images" value={this.state.keyword} onChange={(e)=>{this.setState((prev)=>{return {...prev,keyword:e.target.value}});}} />
              </div>
              &nbsp;
              <div className='col-2' id="button">
                <button  className='btn btn-secondary'  onClick={()=>{window.location.href="/PhotoResult/"+this.state.keyword;}}>Submit</button>
              </div>
              
            </div>
           
          </div>
        </div>
      </div> 
      <br/><br/> 
      <Switch>
        <Route exact path="/"><Redirect to="/Home" /></Route>
        <Route path="/Home"><Home/></Route>
        <Route path="/PhotoResult/:keyword" ><PhotoResult /></Route>
        <Route exact path="/PhotoResult"><Redirect to="/Home" /></Route>
      </Switch>
  </div>
  );}

}

export default App;
