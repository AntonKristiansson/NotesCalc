import React, {useState} from 'react';
import './Calculator.css';

const Calculator = () => {

  const Draggable = require('react-draggable');
  const [calculation, setCalculation] = useState("")  


const updateCalculation = (input: string) => {


  if ((input == "+" || input == "/" || input == "*") && (calculation.slice(-2, -1) == "/" || calculation.slice(-2, -1) == "*" || calculation.slice(-2, -1) == "+" || calculation.slice(-2, -1) == "-") && (calculation.slice(-1) == "/" || calculation.slice(-1) == "*" || calculation.slice(-1) == "+" || calculation.slice(-1) == "-")) {
    setCalculation(calculation.slice(0, -2) + input)
    console.log("1")  
  } else if ((input == "+" || input == "/" || input == "*") && (calculation.slice(-1) == "/" || calculation.slice(-1) == "*" || calculation.slice(-1) == "+" || calculation.slice(-1) == "-")) {
    setCalculation(calculation.slice(0, -1) + input)
    console.log("2")   
  } else if (input == "-" && (calculation.slice(-1) == "-" || calculation.slice(-1) == "+")) {
    setCalculation(calculation.slice(0, -1) + input)
    console.log("3")  
  } else if ((input == "+" || input == "/" || input == "*") && calculation == "") {
    return
  } else {
    setCalculation(calculation + input)
  }   
}

const calculate = () => {
  setCalculation(eval(calculation).toString())  
}

const clear = () => {
  setCalculation("")
}

const erase = () => {
  setCalculation(calculation.slice(0, -1))
}


  return (
    
    <div className="App">

      <Draggable handle=".dragpoint">    
        <div className="calculator">
          <div className='dragpoint'><span className="material-icons">drag_handle</span></div>          
          <div className="calc_output">{calculation ? calculation : "0"}</div>
          <div className="calculator_keys">
            <button className="calc_key calc_operator" onClick={ () => {updateCalculation("+")} }>+</button>
            <button className="calc_key calc_operator" onClick={ () => {updateCalculation("-")} }>-</button>
            <button className="calc_key calc_operator" onClick={ () => {updateCalculation("*")} }>x</button>
            <button className="calc_key calc_operator" onClick={ () => {updateCalculation("/")} }>÷</button>
            <button className="calc_key" onClick={ () => {updateCalculation("7")} }>7</button>
            <button className="calc_key" onClick={ () => {updateCalculation("8")} }>8</button>
            <button className="calc_key" onClick={ () => {updateCalculation("9")} }>9</button>
            <button className="calc_key" onClick={ () => {updateCalculation("4")} }>4</button>
            <button className="calc_key" onClick={ () => {updateCalculation("5")} }>5</button>
            <button className="calc_key" onClick={ () => {updateCalculation("6")} }>6</button>
            <button className="calc_key" onClick={ () => {updateCalculation("1")} }>1</button>
            <button className="calc_key" onClick={ () => {updateCalculation("2")} }>2</button>
            <button className="calc_key" onClick={ () => {updateCalculation("3")} }>3</button>
            <button className="calc_key" onClick={ () => {updateCalculation("0")} }>0</button>
            <button className="calc_key" onClick={ () => {updateCalculation(".")} }>.</button>
            <button className="calc_key" onClick={clear}>AC</button>
            <button className="calc_key" onClick={erase}> <img width={40} height={40} src="https://cdn-icons-png.flaticon.com/512/159/159805.png"></img></button>
            <button className="calc_key calc_sum" onClick={calculate}>=</button>
          </div>
        </div>
      </Draggable>

      
      
    </div>
    
  );
}

export default Calculator;


