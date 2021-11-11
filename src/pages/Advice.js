import React, { useState, useContext } from "react";
import "./advice.css";
import { advContext } from "../Context";
import { Link } from "react-router-dom";
function Advice() {
  const { advices, setAdvices } = useContext(advContext);
  const [amount, setAmount] = useState(0);
  const arrayToCheck = [];
  const fetchAdvices = async () => {
    try {
      const res =await fetch("https://api.adviceslip.com/advice");
      const resJson = await res.json();
      if (arrayToCheck.find((x) => x.id === resJson.slip.id)) {    //preventing random collision
        alert("collision");
        await Delay(2200);
        fetchAdvices();
      } else{
        arrayToCheck.push(resJson.slip)
        setAdvices((advices) => [...advices, resJson.slip]);
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  function Delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  //api store cache for 2 seconds so fetch waits 2200ms
  async function RunAdvices(amount) {
    if (amount > 5 && amount < 20) {
      setAdvices([]);
      for (let i = 0; i < amount; i++) {
        await Delay(2200);
        fetchAdvices();
      }
    
    } else {
      alert("Amount has to be between 5 and 20");
    }
  }

  return (
    <div>
      <h1>Advice Book</h1>
      <div style={{ display: "flex", flexDirection: "row", width: "90%" }}>
        <div className="col-md-4 inputColumn">
          <p>Please enter advice number between 5-20 </p>

          <input
            min="6"
            max="19"
            type="number"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={amount}
            onChange={(e) => {
              setAmount(parseInt(e.target.value));
            }}
          ></input>
          <button
            onClick={() => RunAdvices(amount)}
            className="btn btn-primary"
          >
            Get Advices
          </button>
        </div>
        <div className="col-md-8 adviceColumn">
          <ul className="list-group">
            {advices.length !== 0 ? (
              advices.map((adv) => (
                <li className="list-group-item" key={adv.id}>
                  {adv.advice}
                </li>
              ))
            ) : (
              <li className="list-group-item">Empty</li>
            )}
          </ul>
          {advices.length === amount && advices.length !== 0 ? (
            <Link to="translate">
              <button className="btn btn-success" >Translate</button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Advice;
