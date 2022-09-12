import { makeStyles } from '@material-ui/styles'
import axios from "axios";
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { TrendingCoins } from '../../config/app';
import { CryptoState } from "../../CrytoContext"
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) =>({
  carousel:{
    height : "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem:{
    display:"flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));


// It's basically a regex to display commas in price
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  const { currency } = CryptoState();
  const{ symbol } = CryptoState();

  // Fetch Trending coins list
  const fetchTrendingCoins = async () =>{
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  console.log(trending);

useEffect(() => {
  // Render fetchTrendingCoins function, the first time it renders and also everytime currency changes i want to fetch coins again therefore, pass currency also
  fetchTrendingCoins();
}, [currency]);

const items = trending.map((coin) => {

  // profit will be true if price change percentage is greater or equal to 0
  let profit = coin.price_change_percentage_24h >= 0;

  return (
    <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
    <img src={coin?.image}
    alt={coin.name}
    height="80"
    style={{marginBottom: 10}}
    />

    <span>{coin?.symbol}
       &nbsp;
       <span style={{
        color: profit > 0? "rgb(14,203,129)" : "red",
        fontWeight: 500,
       }}>
        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}
       </span>
    </span>
    <span style={{fontSize: 22, fontWeight: 500}}>
      {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
    </span>
    </Link>
  )
})

//if profit then display + and display percentage upto 2 decimal places. therefore, we used toFixed(2) 
// symbol represents ₹ or $

const responsive = {
  0: {
    items: 2,
  },
  512: {
    items: 4,
  },
};


  return (
    <div className={classes.carousel}>
      <AliceCarousel 
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
      ></AliceCarousel>
    </div>
  )
}

export default Carousel