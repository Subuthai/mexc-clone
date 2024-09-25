import React, { useState, useEffect, useRef  } from 'react';
import { Button, Select, InputNumber, Checkbox } from 'antd';
import '../styles/Exchange.css';

const { Option } = Select;

export default function Exchange() {
  const [activeTab, setActiveTab] = useState('aç');
  const [activeOrder, setActiveOrder] = useState('piyasa');
  const [leverage, setLeverage] = useState(20);
  const [position, setPosition] = useState(null);
  const [longTP, setLongTP] = useState(false);
  const [shortTP, setShortTP] = useState(false);
  const container = useRef(null);
  useEffect(() => {
    if (container.current) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "interval": "240",
          "timezone": "Europe/Istanbul",
          "theme": "dark",
          "style": "1",
          "locale": "tr",
          "backgroundColor": "#16171a",
          "allow_symbol_change": true,
          "calendar": false
        }
      `;
      container.current.appendChild(script);
    }
  }, []);

  return (
    <div className='main-container'>
      <div className="tradingview-widget-container" ref={container} style={{ height: '100%', width: '100%' }}></div>
      <div className="exchange-container">
        <div className="header">
          <div className="toggle-buttons">
            <Button
              className={activeTab === 'aç' ? 'active-tab' : ''}
              onClick={() => setActiveTab('aç')}
            >
              Aç
            </Button>
            <Button
              className={activeTab === 'kapat' ? 'active-tab' : ''}
              onClick={() => setActiveTab('kapat')}
            >
              Kapat
            </Button>
          </div>
          <div className="leverage-section">
            <Button className="isolation-type">İzole</Button>
            <Button className="leverage-button">{leverage}X</Button>
          </div>
        </div>

        <div className="market-type">
          <Button
            className={activeOrder === 'limit' ? 'active' : ''}
            onClick={() => setActiveOrder('limit')}
          >
            Limit
          </Button>
          <Button
            className={activeOrder === 'piyasa' ? 'active' : ''}
            onClick={() => setActiveOrder('piyasa')}
          >
            Piyasa
          </Button>
          <Button
            className={activeOrder === 'tetikleme' ? 'active' : ''}
            onClick={() => setActiveOrder('tetikleme')}
          >
            Tetikleme Emri
          </Button>
        </div>

        <div className="available-balance">
          Kullanılabilir: <span>0,0000 USDT</span>
        </div>

        <div className="amount-input">
          <InputNumber
            min={0}
            placeholder="Miktar (USDT)"
            style={{ width: '100%', background: "#282a30", border: "none"}}
          />
            <div className="slider-section">
              <input type="range" min="0" max="100" step="25" className="slider-bar" />
            </div>
        </div>

        <div className="buy-sell-info">
          <div>Al: 0 USDT</div>
          <div>Sat: 0 USDT</div>
        </div>

        <div className="positions-info">
          <div>Long Al: 0 USDT</div>
          <div>Short Sat: 0 USDT</div>
        </div>

        <div className="mtl-checkbox">
        <Checkbox>MTL</Checkbox>
      </div>

<div className="separator-line"></div>

<div className="tp-sl-checkboxes">
  <label>
    <input type="checkbox" /> Long TP/SL
  </label>
  <label>
    <input type="checkbox" /> Short TP/SL
  </label>
</div>



        <div className="action-buttons">
          <Button className="long-button" onClick={() => setPosition('long')}>Long Aç</Button>
          <Button className="short-button" onClick={() => setPosition('short')}>Short Aç</Button>
        </div>

        <div className="margin-info">
          Marjin: 0 USDT
        </div>
        <div className="fee-info">
          <div>İşlem ücreti seviyesi</div>
          <div>Piyasa Yapıcı %0 / Piyasa Alıcı %0,02</div>
        </div>
      </div>
    </div>
  );
}
