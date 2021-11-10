import React, {useState,useContext}from 'react'
import App from './App';

export const advContext= React.createContext();
function Context() {
    return (
        <div>
            <advContext.Provider value={{}}>
                <App/>
            </advContext.Provider>
        </div>
    )
}

export default Context
