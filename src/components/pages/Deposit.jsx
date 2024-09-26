import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import '../styles/deposit.css';

const Deposit = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('USDT');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [depositAddress, setDepositAddress] = useState('');
  const [qrCodeSrc, setQrCodeSrc] = useState('');

  const cryptoNetworks = {
    USDT: {
      networks: {
        TRC20: '',
        BEP20: '',
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
        BEP20: '',
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

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
    setSelectedNetwork('');
    setQrCodeSrc('');
  };

  const handleNetworkChange = (event) => {
    setSelectedNetwork(event.target.value);
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

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress)
      .then(() => {
        alert('Cüzdan adresi kopyalandı!');
      })
      .catch(err => {
        console.error('Cüzdan adresini kopyalarken bir hata oluştu:', err);
      });
  };

  return (
    <div className="deposit-container">
      <div className="deposit-header">
        <h2>Yatırma</h2>
      </div>
      <div className="deposit-steps-container">
        <img src="src/assets/deposit.png" alt="" />
      </div>
      <div className="deposit-content-container">
        <div className="deposit-content">
          <div className="crypto-selection">
            <h3>Kripto Seç</h3>
            <select value={selectedCrypto} onChange={handleCryptoChange}>
              {Object.keys(cryptoNetworks).map((crypto) => (
                <option key={crypto} value={crypto}>
                  {crypto}
                </option>
              ))}
            </select>
            <select value={selectedNetwork} onChange={handleNetworkChange}>
              <option value="">Ağ Seç</option>
              {Object.keys(cryptoNetworks[selectedCrypto]?.networks || {}).map((network) => (
                <option key={network} value={network}>
                  {network}
                </option>
              ))}
            </select>
            {selectedNetwork && depositAddress && (
              <div className="deposit-address">
                <input type="text" value={depositAddress} readOnly />
                <button onClick={handleCopyAddress}>Kopyala</button>
              </div>
            )}
          </div>

          {selectedNetwork && qrCodeSrc && (
            <div className="qr-code-container">
              <h3>Karekod ile Yatır</h3>
              <img src={qrCodeSrc} alt="QR Kod" />
            </div>
          )}

          <div className="faq-links">
            <p href="#">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</p>
          </div>
          <div className="faq-questions">
            <img src="src/assets/depositfaq.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
