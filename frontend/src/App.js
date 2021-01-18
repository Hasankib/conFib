import React from "react";
import { useState } from 'react';
import "./App.css";
import { Chart } from 'react-charts'
import fibackground from "./img/fibon.jpg";
import fib from "./img/spiral.jpg";
var socket = new WebSocket("ws://localhost:8080/ws");

/*let connect = () => {
    console.log("Attempting Connection...");

    socket.onopen = () => {
        console.log("Successfully Connected");
    };
    socket.onmessage = (msg) => {
        console.log("yo");
        console.log("messageeeeeeeeeeeeeeee: ", msg);
        recieve(msg);
        x = msg.data;
        change = true
    };
    socket.onclose = (event) => {
        console.log("Socket Closed Connection: ", event);
    };
    socket.onerror = (error) => {
        console.log("Scoket Error: ", error)
    };
};

let sendMsg = msg => {
    change = false
    console.log("sending msg: ",msg);
    socket.send(msg);
};*/

function App(){
  const [dataset, setDataset] = useState([]); 
  const [stateHome, setStateHome] = useState(true);
  const [seq, setSeq] = useState(2);
  const [qconnect,setqConnect] = useState(true);
  var a = []

  let connect = () => {
    console.log("Attempting Connection...");

    socket.onopen = () => {
        console.log("Successfully Connected");
    };
    socket.onmessage = (msg) => {
        a = [];
        console.log("yo");
        var holder = (msg.data).split(",")
        var i;
        var tempy = [];
        var temparr = []

        for (i = 0; i < holder.length; i++) {
          holder[i] = parseInt(holder[i]);
        }

        for (i = 0; i < holder.length; i++) {
          if(i%2 == 0){
            tempy.push(holder[i]);
          }else{
            tempy.push(holder[i]);
            temparr.push(tempy);
            tempy = [];
          }
        }

        a = JSON.stringify(temparr);
        console.log(a[0]);
        setDataset(a);
        setStateHome(false);
    };
    socket.onclose = (event) => {
        console.log("Socket Closed Connection: ", event);
    };
    socket.onerror = (error) => {
        console.log("Scoket Error: ", error)
    };
};

  if(qconnect === true){
    connect();
    setqConnect(false);
  }

  let sendMsg = msg => {
      console.log("sending msg: ",msg);
      socket.send(msg);
  };


  const send = (e) =>{
    sendMsg(seq);
  }

  const goHome = (e) =>{
    setDataset([]);
    setSeq(2);
    setStateHome(true);
  }



  const handleSequenceChange = (e) => {
    setSeq(e.target.value);
  }

    return (
      <header>
        {stateHome ? <div className="App-header">
        <div className="title">Fast-Fibonacci Grapher</div>
        <p>Using GoLang's ultra fast concurrency, and React's friendly UI,
           explore the speed of calculating large fibonacci sequences in minimal time.</p>
           <p>
             
           </p>
        <img src={fib} className="App-logo"/>
        <p> </p>
        <p> </p>
        <form>
          Sequence Length Input
        <br />
        <input
          type="number"
          name="startingCommunity"
          onChange={handleSequenceChange}
          placeholder = "Sequence length >= 2"
        />
        <br />
        </form>
        <button className="button" onClick ={send}>Calculate</button>
        </div> : null}
        { !stateHome ? <header className="App-header" style={{backgroundImage: `url(${fibackground})`,backgroundSize: 'cover'}}>
        <div className="App">
        <button className="button" onClick ={goHome}>Go Back</button></div>
        <p>{dataset}</p>
      </header> : null}
      </header>
      
    );
}

export default App;