import React, { useState } from "react";
import App from "./App";

export const advContext = React.createContext();
function Context() {
  const [advices, setAdvices] = useState([]);
  return (
    <div>
      <advContext.Provider value={{ advices, setAdvices }}>
        <App />
      </advContext.Provider>
    </div>
  );
}

export default Context;
