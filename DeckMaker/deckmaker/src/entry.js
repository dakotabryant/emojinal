import React from 'react';
export default function Entry(props){

  let updateEntry = () =>{
    let entryData = {
      question:"",
      answer: "",
      wrongAnswers: ["",
        "",
        ""]
    };
    let dataNodes = document.getElementById(props.id).getElementsByClassName("entryData");
    for(let i=0;i<dataNodes.length;i++){
      switch(i){
        case 0:
          entryData.question = dataNodes[i].value;
          //console.log(updateEntry.question)
          break;
        case 1:
          entryData.answer = dataNodes[i].value;
          //console.log(updateEntry.answer)
          break;
          case 2:
            entryData.wrongAnswers[0] = dataNodes[i].value;
            //console.log(updateEntry.answer)
            break;
            case 3:
              entryData.wrongAnswers[1] = dataNodes[i].value;
              //console.log(updateEntry.answer)
              break;
              case 4:
                entryData.wrongAnswers[2] = dataNodes[i].value;
                //console.log(updateEntry.answer)
                break;
                default:
                break;
      }
    }
    props.updateState(entryData, props.id)
  }
  return (
    <div id={props.id} className="entry">
      <form onChange={()=>updateEntry()}>
        <label>Question</label>
          <input className="entryData" type="text" onChange={()=>{}} value = {props.values.question}></input>
        <label>Correct Answer</label>
          <input className="entryData" type="text" onChange={()=>{}} value = {props.values.answer}></input>
        <label>Wrong Answers</label>
          <input className="entryData" type="text" onChange={()=>{}} value = {props.values.wrongAnswers[0]}></input>
          <input className="entryData" type="text" onChange={()=>{}} value = {props.values.wrongAnswers[1]}></input>
          <input className="entryData" type="text" onChange={()=>{}} value = {props.values.wrongAnswers[2]}></input>
      </form>
    </div>
  )

}
