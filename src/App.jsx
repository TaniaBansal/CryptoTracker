import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {

// Creating object for classes
const classes = useStyles();

  return (
  <BrowserRouter>
  
  <div className={classes.App}>
  <Header />
  <Routes>
    <Route path="/" exact element={<HomePage />}></Route>
    <Route path="/coin/:id" exact element={<CoinPage />}></Route>
  </Routes>
  </div>
 
  
  </BrowserRouter>
  )
}

export default App;
