import React, { useState, useContext } from "react";
import "./advice.css";
import { advContext } from "../Context";
function Advice() {
  const { advices, setAdvices } = useContext(advContext);
  const [amount, setAmount] = useState(0);
  const fetchAdvices = async () => {
    try {
      await fetch("https://api.adviceslip.com/advice").then((res) => {
        res.json().then((adv) => {
          setAdvices((advices) => [...advices, [adv.slip.id, adv.slip.advice]]);
        });
      });
    } catch (e) {
      console.error("Error: ", e);
    }
  };
  function Delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  //api store cache for 2 seconds so fetch waits 2100ms
  async function RunAdvices(amount) {
    if (amount > 5 && amount < 20) {
      setAdvices([]);
      for (let i = 0; i < amount; i++) {
        await Delay(2100);
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
            min="5"
            max="20"
            type="number"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          ></input>
          <button onClick={() => RunAdvices(amount)} class="btn btn-primary">
            Get Advices
          </button>
        </div>
        <div className="col-md-8 adviceColumn">
          <ul class="list-group">
            {advices.length !== 0 ? (
              advices.map((adv) => (
                <li className="list-group-item" key={adv[0]}>
                  {adv[1]}
                </li>
              ))
            ) : (
              <li className="list-group-item">Empty</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Advice;
