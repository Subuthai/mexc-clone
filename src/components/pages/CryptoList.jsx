import '../styles/cryptolist.css'
import { Button, Table, Tabs } from "antd";
import { useEffect, useState } from "react";
import { addCommasToNumber } from "../utils.js";

const COINS = ["BTC_USDT", "ETH_USDT", "XRP_USDT", "LTC_USDT", "ADA_USDT", "DOGE_USDT"];

const columns = [
  {
    title: 'Coin İsimleri',
    dataIndex: 'symbol',
    key: 'symbol',
    width: 300,
    render: (symbol) => (
      <>
        <div className='currency'>
          <div className='hot-list_title'>
            {symbol.replace('_USDT', '')} / USDT
          </div>
        </div>
      </>
    )
  },
  {
    title: 'Market Fiyatı',
    dataIndex: 'last', 
    key: 'price',
    width: 300,
    render: (price) => (
      <>
        <div>{addCommasToNumber(price)}</div>
      </>
    )
  },
  {
    title: 'Değişim',
    dataIndex: 'change_rate', 
    key: 'change_rate',
    render: (change_rate) => (
      <>
        <div className={`hot-list_change ${change_rate.startsWith('-') ? 'down-rate' : 'up-rate'}`}>
          {change_rate}%
        </div>
      </>
    )
  },
  {
    title: 'Eylem',
    dataIndex: 'symbol', 
    key: 'action',
    width: '150px',
    render: (symbol) => (
      <Button className='trade-button'
        onClick={() => window.location.href = `http://localhost:5173/exchange`}>Al Sat Yap</Button>
    ),
  },
];

export default function CryptoList() {
  const [tableData, setTableData] = useState([]);

  const fetchCryptoData = async () => {
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://www.mexc.com/open/api/v2/market/ticker');
      
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API'den gelen yanıt JSON formatında değil");
      }

      const data = await response.json();

      if (!data || !data.data || data.data.length === 0) {
        throw new Error("API'den veri alınamadı.");
      }

      const filteredData = data.data.filter(item => COINS.includes(item.symbol));

      setTableData(filteredData); 

    } catch (error) {
      console.error('Veri çekerken hata oluştu:', error.message);
    }
  }

  useEffect(() => {
    fetchCryptoData();

    const interval = setInterval(fetchCryptoData, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='market-list'>
      <div className='home-container'>
        <h2>Popüler Coinler</h2>
        <Table columns={columns} dataSource={tableData} bordered={false} pagination={false} rowKey="symbol" /> 
      </div>
    </div>
  );
}