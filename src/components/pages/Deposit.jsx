import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import '../styles/deposit.css';
import { Modal, Button, List } from 'antd';

const Deposit = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [depositAddress, setDepositAddress] = useState('');
  const [qrCodeSrc, setQrCodeSrc] = useState('');
  const [isCryptoModalVisible, setIsCryptoModalVisible] = useState(false);
  const [isNetworkModalVisible, setIsNetworkModalVisible] = useState(false);
  const [cryptoSearch, setCryptoSearch] = useState('');
  const [networkSearch, setNetworkSearch] = useState('');
  const [showQrCode, setShowQrCode] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const cryptoNetworks = {
    USDT: {
      networks: {
        TRC20: '',
        BSC: '',
        TON: '',
        ARB: '',
        ERC20: '',
        OP: '',
        AVAX: '',
        MATIC: '',
        SOL: '',
      },
    },
    USDC: {
      networks: {
        SOL: '',
        ARB: '',
        ERC20: '',
        BSC: '',
        MATIC: '',
        OP: '',
        AVAX: '',
      },
    },
    BNB: {
      networks: {
        BSC: '',
      },
    },
    ETH: {
      networks: {
        ERC20: '',
        ARB: '',
        OP: '',
        BSC: '',
      },
    },
    TONCOIN: {
      networks: {
        TON: '',
      },
    },
    BTC: {
      networks: {
        BTC: '',
        BSC: '',
      },
    },
    OP: {
      networks: {
        OP: '',
      },
    },
    ARB: {
      networks: {
        ARB: '',
        ERC20: '',
      },
    },
    AVAX: {
      networks: {
        'AVAX c-chain': '',
      },
    },
    SOLANA: {
      networks: {
        SOL: '',
      },
    },
    LTC: {
      networks: {
        LTC: '',
      },
    },
    XRP: {
      networks: {
        XRP: '',
      },
    },
  };

  const cryptoDescriptions = {
    USDT: 'Tether',
    USDC: 'USD Coin',
    BNB: 'Binance Coin',
    ETH: 'Ethereum',
    TONCOIN: 'Toncoin',
    BTC: 'Bitcoin',
    OP: 'Optimism',
    ARB: 'Arbitrum',
    AVAX: 'Avalanche',
    SOLANA: 'Solana',
    LTC: 'Litecoin',
    XRP: 'XRP',
  };
  
  const cryptoLogos = {
    USDT: '/usdt.png',
    USDC: '/usdc.png',
    BNB: '/bnb.png',
    ETH: '/eth.png',
    TONCOIN: '/toncoin.png',
    BTC: '/btc.png',
    OP: '/op.png',
    ARB: '/arb.png',
    AVAX: '/avax.png',
    SOLANA: '/solana.png',
    LTC: '/ltc.png',
    XRP: '/xrp.png',
  };

  const handleCryptoChange = (crypto) => {
    setSelectedCrypto(crypto);
    setSelectedNetwork('');
    setQrCodeSrc('');
    setIsCryptoModalVisible(false);
  };

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network);
    setIsNetworkModalVisible(false);
  };

  useEffect(() => {
    if (selectedCrypto && selectedNetwork) {
      const address = cryptoNetworks[selectedCrypto]?.networks[selectedNetwork];
      setDepositAddress(address || '');

      if (address) {
        QRCode.toDataURL(address, { width: 150, margin: 1 }, (err, url) => {
          if (err) {
            console.error('QR kod oluşturma hatası:', err);
            return;
          }
          setQrCodeSrc(url);
        });
      } else {
        setQrCodeSrc('');
      }
    }
  }, [selectedCrypto, selectedNetwork]);

  const handleShowAddress = () => {
    setShowAddress(true);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress)
      .then(() => {
        alert('Cüzdan adresi kopyalandı!');
      })
      .catch(err => {
        console.error('Cüzdan adresini kopyalarken bir hata oluştu:', err);
      });
  };

  const getNetworkDescription = (network) => { 
    const descriptions = { 
      TRC20: 'Tron(TRC20)',
      BSC: 'BNB Smart Chain(BEP20)',
      TON: 'Toncoin(TON)',
      ERC20: 'Ethereum(ERC20)',
      OP: 'Optimism(OP)',
      AVAX: 'Avalanche(AVAX)',
      MATIC: 'Polygon(MATIC)',
      SOL: 'Solana(SOL)',
      ARB: 'Arbitrum(ARB)',
      XRP: 'Ripple(XRP)',
      BTC: 'Bitcoin(BTC)',
      LTC: 'Litecoin(LTC)',
    };
    return descriptions[network] || network;
  };

  const getNetworkTime = (network) => {
    const times = {
      TRC20: '1dk 9sn',
      BSC: '2dk 46sn',
      TON: '2dk 8sn',
      ERC20: '1dk 9sn',
      OP: '3dk 15sn',
      AVAX: '1dk 26sn',
      MATIC: '10dk 21sn',
      SOL: '',
      ARB: '0dk 27sn',
      XRP: '1dk 47sn',
      BTC: '13dk 28sn',
      LTC: '8dk 24sn',
    };
    return times[network];
  };
  
  const getNetworkConfirmation = (network) => {
    const confirmations = {
      TRC20: '2',
      BSC: '12',
      TON: '10',
      ERC20: '12',
      OP: '50',
      AVAX: '30',
      MATIC: '250',
      SOL: '31',
      ARB: '12',
      XRP: '4',
      BTC: '3',
      LTC: '5',
    };
    return confirmations[network];
  };

return (
  <div className="deposit-container">
    <div className="deposit-header">
      <h2>Yatırma</h2>
    </div>
    <div className="deposit-steps-container">
      <img src="src/assets/deposit.png" alt="Deposit Steps" />
    </div>
    <div className="deposit-content-container">
      <div className="deposit-content">
        <div className="step-indicator">
          <div className={`circle ${selectedCrypto ? 'active' : ''}`}>
            <i className="icon-check">
              <svg focusable="false" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024" data-icon="CheckOutlined">
                <path d="M993.84121865 83.1150891a67.9798559 67.9798559 0 0 1 14.95556829 94.96785871l-543.83884723 747.77841493a67.9798559 67.9798559 0 0 1-100.40624717 10.53687766l-339.89927951-305.90935157a67.9798559 67.9798559 0 0 1 90.95704719-101.01806587l283.81589841 255.40031864 499.44800132-686.73250434a67.9798559 67.9798559 0 0 1 94.9678587-14.95556831z"></path>
              </svg>
            </i>
          </div>
          <div className={`line ${selectedCrypto ? 'active' : ''}`}></div>
          <div className={`circle ${selectedNetwork ? 'active' : ''}`}>
            <i className="icon-check">
              <svg focusable="false" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024" data-icon="CheckOutlined">
                <path d="M993.84121865 83.1150891a67.9798559 67.9798559 0 0 1 14.95556829 94.96785871l-543.83884723 747.77841493a67.9798559 67.9798559 0 0 1-100.40624717 10.53687766l-339.89927951-305.90935157a67.9798559 67.9798559 0 0 1 90.95704719-101.01806587l283.81589841 255.40031864 499.44800132-686.73250434a67.9798559 67.9798559 0 0 1 94.9678587-14.95556831z"></path>
              </svg>
            </i>
          </div>
        </div>

        <div className="crypto-selection">
          <h3>Kripto Seç</h3>
          <div className="select-box" onClick={() => setIsCryptoModalVisible(true)}>
            <div className="crypto-info">
              <img src={cryptoLogos[selectedCrypto]} alt={selectedCrypto} className="crypto-icon" />
              <span className="crypto-name">{selectedCrypto}</span>
              <span className="crypto-description">{cryptoDescriptions[selectedCrypto]}</span>
            </div>
            <i className="icon">&#9660;</i>
          </div>
          <h3>Ağ</h3>
          <div
            className={`select-box ${!selectedCrypto ? 'disabled' : ''}`}
            onClick={() => selectedCrypto && setIsNetworkModalVisible(true)}
          >
            <span className='selected-network'>{selectedNetwork || 'Ağ Seç'}</span>
            <i className="icon">&#9660;</i>
          </div>

          {selectedNetwork && (
            <div className="deposit-placeholder">
              {!showQrCode ? (
                <a onClick={() => setShowQrCode(true)}>Adres oluşturmak için tıklayın</a>
              ) : (
                <div className="deposit-address-container">
                  <div className="qr-code">
                    <img src={qrCodeSrc} alt="QR Kod" />
                  </div>
                  <div className="crypto-address">
                      <p>{depositAddress}</p>
                      <button className="copy-button" onClick={handleCopyAddress}><svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" data-icon="CopyOutlined"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V14C3 14.7956 3.31607 15.5587 3.87868 16.1213C4.44129 16.6839 5.20435 17 6 17H7V18C7 19.6569 8.34315 21 10 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17V6C17 5.20435 16.6839 4.44129 16.1213 3.87868C15.5587 3.31607 14.7956 3 14 3H6ZM15 7V6C15 5.73478 14.8946 5.48043 14.7071 5.29289C14.5196 5.10536 14.2652 5 14 5H6C5.73478 5 5.48043 5.10536 5.29289 5.29289C5.10536 5.48043 5 5.73478 5 6V14C5 14.2652 5.10536 14.5196 5.29289 14.7071C5.48043 14.8946 5.73478 15 6 15H7V10C7 8.34315 8.34315 7 10 7H15ZM9 18C9 18.5523 9.44772 19 10 19H18C18.5523 19 19 18.5523 19 18V10C19 9.44772 18.5523 9 18 9H10C9.44772 9 9 9.44772 9 10V18Z"></path></svg></button>
                  </div>
                  <div className="deposit-info">
                    <a className="verify-link" href="#">Yatırma adresinin güvenlik doğrulaması</a>
                    <div className="info-row">
                      <span>Minimum yatırma miktarı</span>
                      <span>0 USDT</span>
                    </div>
                    <div className="info-row">
                      <span>Hesaba Aktarılmayı Bekleyen</span>
                      <span>{getNetworkConfirmation(selectedNetwork)} ağ onayı</span>
                    </div>
                    <div className="info-row">
                      <span>Başarıyla Hesaba Aktarıldı</span>
                      <span>{getNetworkConfirmation(selectedNetwork)} ağ onayı</span>
                    </div>
                    <div className="info-row">
                      <span>Sözleşme Adresi</span>
                      <a href="#">Son haneleri 97955</a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="faq-links">
          <p>⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</p>
        </div>
        <div className="faq-questions">
          <img src="src/assets/depositfaq.png" alt="FAQ" />
        </div>
      </div>
    </div>

    <Modal
      title="Yatırılacak Kripto Birimini Seç"
      visible={isCryptoModalVisible}
      onCancel={() => setIsCryptoModalVisible(false)}
      footer={null}
    >
      <div className="modal-content">
        <input
          type="text"
          className="search-input"
          placeholder="Ara"
          onChange={(e) => setCryptoSearch(e.target.value)}
        />
        <ul className="crypto-list">
          {Object.keys(cryptoNetworks)
            .filter((crypto) => crypto.toLowerCase().includes(cryptoSearch.toLowerCase()))
            .map((crypto) => (
              <li key={crypto} onClick={() => handleCryptoChange(crypto)}>
                <div className="crypto-info">
                  <img src={`public/${crypto}.png`} alt={crypto} className="crypto-icon" />
                  <div className="crypto-details">
                    <span className="crypto-name">{crypto}</span>
                    <span className="crypto-description">{cryptoDescriptions[crypto]}</span>
                  </div>
                </div>
                <span className="crypto-balance">0 ≈ 0,00 USD</span>
              </li>
            ))}
        </ul>
      </div>
    </Modal>

    <Modal
      title="Yatırma ağını seçin"
      visible={isNetworkModalVisible}
      onCancel={() => setIsNetworkModalVisible(false)}
      footer={null}
    >
      <div className="modal-content">
        <input
          type="text"
          className="search-input"
          placeholder="Ara"
          onChange={(e) => setNetworkSearch(e.target.value)}
        />
        <ul className="network-list">
          {Object.keys(cryptoNetworks[selectedCrypto]?.networks || {})
            .filter((network) => network.toLowerCase().includes(networkSearch.toLowerCase()))
            .map((network) => (
              <li key={network} className="network-item" onClick={() => handleNetworkChange(network)}>
                <div className="network-details">
                  <span className="network-name">{network}</span>
                  <span className="network-description">
                    {getNetworkDescription(network)}
                  </span>
                </div>
                <div className="network-info">
                  {getNetworkTime(network) && (
                    <div className="network-info-time">
                      Tahmini Teslimat ≈<span>{getNetworkTime(network)}</span>
                    </div>
                  )}

                  {getNetworkConfirmation(network) && (
                    <div className="network-info-confirm">
                      Yatırmanın Hesaba Aktarılması:<span>{getNetworkConfirmation(network)} onay</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Modal>
  </div>
);
};

export default Deposit;
