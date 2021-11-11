import React, { useContext, useState } from "react";
import { advContext } from "../Context";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./translate.css";
function Translate() {
  const { advices } = useContext(advContext);
  const [translationState, setTranslationState] = useState(true);
  const [translated, setTranslated] = useState(advices);

  var translatedArray = [];
  const translateAdvices = async (index) => {
    try {
      const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
          q: translatedArray[index].advice,
          source: "en",
          target: "pl",
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) {
        var translated = await res.json();
        var merged = { ...translatedArray[index], ...translated };
        setTranslated((translated) => [...translated, merged]);
      } else {
        const errorResponse = await res.json();
        alert(errorResponse.error);
      }
    } catch (e) {
      alert("error occured, check logs, refresh page", e);
    }
  };
  function Delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  //there is 10 per minute limit in API if it's more than 10 it waits 6 sec
  async function runTranslate(amount) {
    setTranslationState(false);
    translatedArray = advices;
    console.log(translatedArray);
    translatedArray.sort((a, b) => (a.id > b.id ? 1 : -1));
    console.log(translatedArray);

    setTranslated([]);

    if (amount > 10) {
      alert(
        "It can take more than 1 minute to translate because of the request limit. Please be patient."
      );
    }
    for (let i = 0; i < amount; i++) {
      if (amount > 10) {
        await Delay(6001);
      }
      translateAdvices(i);
    }
    alert("finished");
    console.log(translated);
    setTranslationState(true);
  }
  return (
    <div>
      <h1>Translated</h1>
      <Link to="/">
        <button className="btn btn-secondary advicePageButton">Advice Page</button>
      </Link>
      <button
        className="btn btn-success"
        onClick={() => runTranslate(advices.length)}
      >
        Translate{" "}
      </button>
      <div className="listGroupTranslated">
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>English</th>
                <th></th>
                <th>Polish</th>
              </tr>
            </thead>
            <tbody>
              {translationState ? (
                translated.map((trn) => (
                  <tr key={trn.id}>
                    <td>{trn.id}</td>
                    <td colSpan="2">{trn.advice}</td>
                    <td colSpan="2">{trn.translatedText}</td>
                  </tr>
                ))
              ) : (
                <tr key="Loading...">
                  <td>Loading...</td>
                  <td colSpan="2">Loading...</td>
                  <td colSpan="2">Loading...</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Translate;
