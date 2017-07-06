import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import {saveAs} from "file-saver";
import Entry from './entry';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.entry = {question:"",
      answer: "",
      wrongAnswers: ["",
        "",
        ""]
    }
    this.state = {
      name: "",
      description: "",
      deck: []
    }

    this.handleFileDrop = this.handleFileDrop.bind(this);
  }

  makeNewEntry(){
    this.setState({...this.state, deck: [...this.state.deck, {...this.entry}]})
  }

  reset(){
    this.setState({
      name: "",
      description: "",
      deck: []
    });
  }

  handleDeckUpdate(d,i){
    //update state with entry data
    let s = {...this.state};
    s.deck[i] = d;
    this.setState({...this.state, deck: s.deck});
  }

  handleUpdateName(e){
    this.setState({...this.state, ...{name: e.target.value}})
  }

  handleUpdateDescription(e){
    this.setState({...this.state, ...{description: e.target.value}})
  }

  handleSave(){
    console.log(this.state);
    let blob = new Blob([JSON.stringify(this.state, null, 4)], {type: "application/json;charset=utf-8"});
    saveAs(blob, "result"+".json");
  }

  handleFileDrop(accepted,rejected){
    console.dir(accepted[0]);
    let self = this;
    let reader = new FileReader();
    reader.addEventListener("loadend", function() {
   // reader.result contains the contents of blob as a typed array
   console.log("load finished!  Setting state.");
   let data = JSON.parse(reader.result)
   self.setState(data);
   console.log(self.state)
});
reader.readAsText(accepted[0]);
  }

  render() {
    console.log(this.state)
    let entries = this.state.deck.map((el, index)=>{
      return <Entry values={this.state.deck[index]} updateState={(values,indexId)=>this.handleDeckUpdate(values, indexId)} id={index} key={index}></Entry>
    })

    return (
      <div className="App">

        <div className="App-header">
          <Dropzone id="dropzone" onDrop={(accepted, rejected)=>this.handleFileDrop(accepted, rejected)} style={{}}>
            <h1>Emojinal Deck Maker</h1>
            <h3>Drag a json deck onto this header to open a deck or left click to open file browser</h3>
          </Dropzone>
        </div>
        <div className = "main">
          <form>
          <label>Deck Name</label>
          <input onChange={(e)=>this.handleUpdateName(e)} value={this.state.name} type="text"></input>
          <label>Deck Description</label>
          <input onChange={(e)=>this.handleUpdateDescription(e)} value={this.state.description} type="text"></input>
          </form>
          <div className = "entries">{entries}</div>
          <button onClick={()=>this.makeNewEntry()} id="New">New Entry</button>
          <button onClick={()=>this.handleSave()} id="Save">Save</button>
          <button onClick={()=>this.reset()} id="Reset">Reset</button>
        </div>

      </div>
    );
  }
}

export default App;
