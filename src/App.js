import {useEffect, useState} from 'react'
import './App.css';
import axios from 'axios'
import Coins from './Coin';


function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect (() =>{
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=ngn&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then((res)=>{
        
          setCoins(res.data)
      })
      .catch((err) =>{
        console.log(err)
      })

  },[])

  const handleChange =(e) =>{
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <>
    <div className="coin-app">
      <div className='coin-search'>
          <h1 className='coin-text'>Search a Currency</h1>
          <form>
            <input type='text'
             placeholder='Search'
             onChange={handleChange}
              className='coin-input'>

            </input>
          </form>
      </div>
      {filteredCoins.map((coin) =>(
        <Coins key={coin.id} 
        priceChange={coin.price_change_percentage_24h}
        name={coin.name}
         image={coin.image}
         symbol={coin.symbol}
         marketcap={coin.market_cap}
         price={coin.current_price}
         volume={coin.total_volume}
         />
  ))}

    </div>
    </>
  );
}

export default App;
