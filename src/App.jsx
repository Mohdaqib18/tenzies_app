import React from "react";
import Die from "./Die"
import { nanoid } from "nanoid";
import Confetti  from "react-confetti"
export default function App(){
  
  const [diceArray , setDiceArray] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect( () => {
    const allHeld = diceArray.every( die => die.isHeld);
    const firstValue = diceArray[0].value;
    const allSameValue =  diceArray.every( die => die.value === firstValue)

    if (allHeld && allSameValue){
      setTenzies(true);
      console.log("You won");
    }
  }, [diceArray])
;
  function allNewDice(){
    const array = []

    for(let i = 0; i < 10 ; i++){
      const randomNumber = Math.ceil(Math.random() * 6);
      array.push({value: randomNumber, isHeld: false, id:nanoid()});
    }

    return array;
  }


  function handleClick(){

    if(!tenzies)
    {setDiceArray(prevState => prevState.map( die =>{
      return die.isHeld ? die : {...die, value:Math.ceil(Math.random() *6)}
    }))}
    else{
      setTenzies(false);
      setDiceArray(allNewDice())
    }
  }


  function toggleHeld(id){
     setDiceArray(prevState => {return (prevState.map( die => {return die.id === id ? {...die, isHeld: !die.isHeld} : die}))}

      
     )
  }

 
  const diceElements = diceArray.map( dice => <Die toggleHeld={() => toggleHeld(dice.id)}key={dice.id} value={dice.value} isHeld={dice.isHeld} /> )


  return(
    <main>
     { tenzies && <Confetti />}

<h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
     
            {diceElements}
 
            </div>

            <button onClick={handleClick} className="button">{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}