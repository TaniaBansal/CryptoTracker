import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CoinList } from '../config/app';
import { CryptoState } from '../CrytoContext';

const CoinTable = () => {

   // It contains all of our coins
   const[coins, setCoins] = useState([]);
   const[loading, setLoading] = useState(false);
   const { currency } = CryptoState();

   // fetchCoins function is to fetch coins
   
   const fetchCoins = async () => {
   
    setLoading(true);

    // data will store whatever we are going to get from coinList api. 
    // CoinList api take currency as prop bcoz of its api setup
    
       const { data } = await axios.get(CoinList(currency));

       // setCoins to data that is fetched
       setCoins(data);

       //Since data has been fetched or loaded therefore
       setLoading(false);
   };

   console.log(coins);

   useEffect(() =>{
    // Everytime currency changes call this useState
    fetchCoins();

   }, [currency]);

  return (
    <div>CoinTannble</div>
  )
}

export default CoinTable