import React from 'react';
import '../styles/test.css';

const Test = () => {
  return (
    <div className="deposit-page-container">
      <div className="header">
        <button className="back-button">←</button>
        <h2>Yatırma</h2>
        <a href="/" className="help-link">Nasıl Varlık Yatırılır?</a>
      </div>

      <div className="steps-container">
        <div className="steps">
          <div className="step">
            <div className="step-circle">1</div>
            <div className="step-content">
              <h3>Tokeni Seçin ve Cüzdan Adresini Kopyalayın</h3>
              <p>Yatırmak istediğiniz tokeni ve ağı seçin. Bu sayfada gösterilen cüzdan adresini kopyalayın.</p>
            </div>
          </div>
          <div className="step-divider"></div>

          <div className="step">
            <div className="step-circle">2</div>
            <div className="step-content">
              <h3>Cüzdan Adresine Çekin</h3>
              <p>Kopyalanan cüzdan adresini diğer borsa platformlarına yapıştırın ve çekim başvurusu gerçekleştirin.</p>
            </div>
          </div>
          <div className="step-divider"></div>

          <div className="step">
            <div className="step-circle">3</div>
            <div className="step-content">
              <h3>Transfer Onayı</h3>
              <p>Blok zinciri ağında transferin onaylanmasını bekleyin.</p>
            </div>
          </div>
          <div className="step-divider"></div>

          <div className="step">
            <div className="step-circle">4</div>
            <div className="step-content">
              <h3>Yatırma Başarılı</h3>
              <p>MEXC, blok zinciri ağı transferi onaylandıktan sonra varlığı cüzdan adresinize gönderecektir.</p>
            </div>
          </div>
        </div>

        <button className="close-button">✕</button>
      </div>

      <div className="deposit-details-container">
        <div className="left-section">
          <div className="deposit-selection">
            <div className="selection-item">
              <div className="selection-label">
                <span className="check-icon">✔</span> Kripto Seç
              </div>
              <select>
                <option>USDT Tether</option>
              </select>
            </div>
            <div className="selection-item">
              <div className="selection-label">
                <span className="check-icon">✔</span> Ağ
              </div>
              <select>
                <option>TRX Tron(TRC20)</option>
              </select>
            </div>
            <div className="selection-item">
              <div className="selection-label">
                <span className="check-icon">✔</span> Yatırma Adresi
              </div>
              <div className="address-box">
                <img src="QR_CODE_PLACEHOLDER" alt="QR Code" className="qr-code"/>
                <p className="address-text">TCNSS...pDrpmoxmx</p>
                <button className="copy-button">📋</button>
              </div>
              <p className="verify-address">Yatırma adresinin güvenlik doğrulaması</p>
              <div className="address-details">
                <p>Minimum yatırma miktarı: 0.01 USDT</p>
                <p>2 ağ onayı, 20 ağ onayı</p>
                <p>Sözleşme Adresi: Son haneleri jLj6t</p>
              </div>
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="reminder-box">
            <h4>Hatırlatma</h4>
            <p>Bu adres yalnızca USDT varlıklarının yatırılmasını destekler...</p>
          </div>
          <div className="faq-box">
            <h4>Yatırma SSS <a href="/">Daha Fazla Görüntüle</a></h4>
            <ul>
              <li>MEXC'de Nasıl Varlık Yatırılır?</li>
              <li>Yatırdığınız varlıklar hesabınıza ulaşmadı mı? <a href="/">İade için başvur</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
