import React from "react";
import Home from "./Components/Home"
import Posts from "./Components/Posts"
import Nav from "./Components/Nav"
import Registration from "./Components/Registration"
import Login from "./Components/Login"


import {Routes, Route } from "react-router";

import './App.css';

const App=()=> {
  return (


    <>
    <div className="homepage">

<Nav/>
<Routes>
        
        <Route exact path="/Posts" element={ <Login />,<Posts/>  }/>
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Registration" element={<Registration />} />

        <Route
          path="*"
          render={() => {
            return <h1>404</h1>;
          }}
        />
      </Routes>
       </div> 
    </>
   
  
  
  );
}

export default App;