import React, { useEffect, useState } from 'react';
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from '@material-ui/core';
//data
import {fetchAPI} from '../services/API';
//style
import styles from '../styles/Market.module.css'
//component 
import Loader from '../components/Loader';

const Market = () => {

    //state
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    //change the Material-ui style
    const useStyles = makeStyles({
        pagination: {
          "& .MuiPaginationItem-root": {
            backgroundColor:"#42e06d",
            color: "#fff"
          },
        },
      });
    const classes = useStyles();

    //loaded data 
    useEffect(()=> {
        const getCoin = async () => {
            const response = await fetchAPI('https://api.bitpin.org/v1/mkt/markets/')
            setCoins(response.results);
        }
        getCoin();
    },[])

    //searchBox
    const searchedCoins = coins.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.currency1.code.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <div className={styles.Market}>
            {coins.length?
                <div className={styles.MarketBox}>
                    <div>
                        <h4>All Markets</h4>
                        <input type="text" value={search} onChange={(event)=>setSearch(event.target.value)} placeholder="search"/>
                    </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Change</th>
                                    <th>Cap</th>
                                    <th>
                                        <p>Change</p>
                                        <p>MarketCap</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchedCoins.length?
                                    searchedCoins.slice((page - 1) * 20, (page - 1) * 20 + 20).map(item => <tr key={item.id}>
                                        <td><a href={`https://bitpin.ir/coin/${item.currency1.code}`} target="_blank" rel="noreferrer"><img src={item.currency1.image} alt={item.title + "Pic"}/><h2>{item.title}</h2><h3>{item.code.toUpperCase()}</h3></a></td>
                                        <td>{(+item.price).toLocaleString()} {item.currency2.code === "IRT"? "IRT" : "USDT"}</td>
                                        {/* view price change with dynamic color */}
                                        <td><span className={(+item.price_info.change) > 0 ? styles.GreenChange : styles.RedChange}>{(+item.price_info.change).toFixed(2)}%</span></td>
                                        {/* View Market Cap based on M, B, T */}
                                        <td>${(+item.market_cap) > 1e12 ? ((+item.market_cap)*(1e-12)).toFixed(2) +"T" : (+item.market_cap)>1e9 ? ((+item.market_cap)*(1e-9)).toFixed(2) +"B" : ((+item.market_cap)*(1e-6)).toFixed(2) +"M"}</td>
                                        <td>
                                            {/* view price change with dynamic color */}
                                            <p className={(+item.price_info.change) > 0 ? styles.GreenChange : styles.RedChange}>{(+item.price_info.change).toFixed(2)}%</p>
                                            {/* View Market Cap based on M, B, T */}
                                            <p>${(+item.market_cap) > 1e12 ? ((+item.market_cap)*(1e-12)).toFixed(2) +"T" : (+item.market_cap)>1e9 ? ((+item.market_cap)*(1e-9)).toFixed(2) +"B" : ((+item.market_cap)*(1e-6)).toFixed(2) +"M"}</p>
                                        </td>
                                    </tr>)
                                    //if nothing received
                                    :<p className={styles.Nothing}>No Result Found!</p>
                                }
                            </tbody>
                        </table>
                        {/* Pagination using material-ui */}
                        <Pagination
                            count={(searchedCoins?.length / 20).toFixed(0)}
                            style={{
                                padding: 20,
                                width: "auto",
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                            }}
                            classes={{ ul: classes.pagination }}
                            onChange={(_, value) => {
                                setPage(value);
                                window.scroll(0,20);
                            }}
                        />
                </div>
                //if nothing received
                :<Loader/>}
        </div>      
    )}

export default Market;