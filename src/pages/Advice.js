import React,{useState} from 'react'
import './advice.css';
function Advice() {
    const [advices, setAdvices] = useState([
        {
          slip: {
            id: 182,
            advice: "Most things look better when you put them in a circle.",
          },
        },
        {
          slip: {
            id: 158,
            advice: "Life can be a lot more interesting inside your head.",
          },
        },
        { slip: { id: 208, advice: "Play is the true mother of invention." } },
      ]);    
      return (
        <div>
      <h1>Advice Book</h1>
      <div style={{ display: "flex", flexDirection: "row", width:"90%"}}>
        <div className="col-md-4 inputColumn">
          <p>Please enter advice number between 5-20 </p>

          <input
            min="5"
            max="20"
            type="number"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"

          ></input>
          <button   class="btn btn-primary">
            Get Advices
          </button>
        </div>
        <div  className="col-md-8 adviceColumn">
          <ul class="list-group">

              {advices.length!==0?
              advices.map((adv)=>(
                    <li className="list-group-item" key={adv.slip.id}>{adv.slip.advice}</li>

              )): <li className="list-group-item">Empty</li>}
          </ul>
        </div>
      </div>
    </div>
    )
}

export default Advice
