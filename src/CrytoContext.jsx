import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const Crypto =  createContext();


const CrytoContext = ({children}) => {

    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");

    useEffect(() => {
        if(currency === "INR") setSymbol("₹");
        else if(currency === "USD") setSymbol("$");
    }, [currency]);

  return (
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
        {children}
    </Crypto.Provider>
  )
}

export default CrytoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}