import React from 'react';
import Jumbotron from './components/Jumbotron'
import { Input, FormBtn } from './components/Form'
import "./App.css"

const App = () => (
    <div className="content">
      <Jumbotron/>
      <div className="card border-secondary mb-3">
        <div className="card-header bg-secondary text-white">
          <div className="card-title">
            Search Panel
          </div>
        </div>
        <div className="card-body">
          <Input/>
          <Input/>
          <Input/>
          <FormBtn>Search</FormBtn>
        </div>
        
      </div>
      
      <div className="card border-secondary mb-3">
        <div className="card-header bg-secondary text-white">
          <div className="card-title">
            Top Article
          </div>
        </div>
        <div className="card-body">
        </div>
        
      </div>
      

      
    </div>
);

export default App;