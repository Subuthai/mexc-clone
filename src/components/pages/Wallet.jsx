import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/wallet.css';
import noDataSvg from '/src/assets/no-data-dark.svg';

const Wallet = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

        const response = await axios.post('http://localhost:3001/api/user-data', {}, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        const data = response.data;
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      finally {
        setIsLoading(false); 
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (!userData) {
    return <div>Kullanıcı verileri bulunamadı.</div>;
  }

  const chartData = [
    { name: 'Spot', value: userData ? userData.spotBalance : 0 },
    { name: 'Vadeli İşlem', value: userData ? userData.futuresBalance : 0 },
    { name: 'İtibari Para', value: userData ? userData.fiatBalance : 0 },
    { name: 'İşlem Kopyalama', value: userData ? userData.copyTradeBalance : 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="wallet-container">
      <div className="sidebar">
        <ul>
          <li><svg  focusable="false" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24" data-icon="WalletOutlinedActive"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 6C5 5.44772 5.44772 5 6 5H16C16.5523 5 17 4.55228 17 4C17 3.44772 16.5523 3 16 3H6C4.34315 3 3 4.34315 3 6V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7H6C5.44772 7 5 6.55228 5 6ZM18 14C18 14.6904 17.4404 15.25 16.75 15.25C16.0596 15.25 15.5 14.6904 15.5 14C15.5 13.3096 16.0596 12.75 16.75 12.75C17.4404 12.75 18 13.3096 18 14Z" fill="currentColor"></path></svg>Cüzdan Özeti</li> 
          <li className='spot' data-label="Yapıcı %0 / Alıcı %0,02" onClick={() => {window.location.href = 'http://localhost:5173/exchange'}}><svg  focusable="false" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24" data-icon="SpotOutlined"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.8891 10.9394L13.0607 8.11101C12.4749 7.52523 11.5251 7.52523 10.9393 8.11101L8.11091 10.9394C7.52513 11.5252 7.52513 12.475 8.11091 13.0608L10.9393 15.8892C11.5251 16.475 12.4749 16.475 13.0607 15.8892L15.8891 13.0608C16.4749 12.475 16.4749 11.5252 15.8891 10.9394ZM9.87868 12.0001L12 9.87878L14.1213 12.0001L12 14.1214L9.87868 12.0001Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"></path></svg>Spot</li> 
          <li className='futures' data-label="Yapıcı %0 / Alıcı %0,02" onClick={() => {window.location.href = 'http://localhost:5173/exchange'}}><svg  focusable="false" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24" data-icon="FuturesOutlined"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 17C8 16.4477 8.44772 16 9 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10ZM10 10L12.0001 12.0001L14.0001 10L12.0001 7.99994L10 10Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M20 7L20 20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20L4 4C4 2.89543 4.89543 2 6 2L15 2L20 7ZM6 20H18L18 7.82843L14.1716 4L6 4L6 20Z" fill="currentColor"></path></svg>Vadeli İşlem</li>
          <li><svg  focusable="false" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24" data-icon="FiatOutlined"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.7 6.5C12.8657 6.5 13 6.63431 13 6.8V8.08751C13.5752 8.19393 14.0386 8.3974 14.3901 8.69792C14.9382 9.16321 15.226 9.78422 15.2534 10.561L13.5151 10.636C13.4407 10.2014 13.2802 9.88997 13.0336 9.70155C12.7908 9.50928 12.4248 9.41315 11.9354 9.41315C11.4304 9.41315 11.035 9.51505 10.7492 9.71885C10.5652 9.84959 10.4732 10.0246 10.4732 10.2437C10.4732 10.4437 10.5593 10.6148 10.7315 10.7571C10.9508 10.9378 11.4832 11.1262 12.3289 11.3223C13.1745 11.5185 13.7989 11.7223 14.2022 11.9338C14.6093 12.1414 14.9265 12.4279 15.1535 12.7932C15.3845 13.1546 15.5 13.6026 15.5 14.1371C15.5 14.6216 15.363 15.0754 15.0889 15.4984C14.8149 15.9213 14.4273 16.2367 13.9262 16.4443C13.6539 16.555 13.3451 16.6357 13 16.6863V17.7685C13 17.9342 12.8657 18.0685 12.7 18.0685H11.3C11.1343 18.0685 11 17.9342 11 17.7685V16.659C10.4088 16.5469 9.92386 16.3311 9.5453 16.0117C8.96197 15.5157 8.61353 14.7947 8.5 13.8487L10.1913 13.6872C10.2931 14.2448 10.4986 14.6543 10.8079 14.9158C11.1211 15.1773 11.5419 15.308 12.0705 15.308C12.6303 15.308 13.0512 15.1926 13.3331 14.9619C13.6188 14.7274 13.7617 14.4544 13.7617 14.1429C13.7617 13.9429 13.7011 13.7737 13.5797 13.6353C13.4622 13.493 13.2548 13.37 12.9572 13.2661C12.7536 13.1969 12.2897 13.0739 11.5654 12.897C10.6337 12.6701 9.97987 12.3913 9.60403 12.0606C9.0755 11.5954 8.81124 11.0282 8.81124 10.3591C8.81124 9.92842 8.93456 9.52659 9.18121 9.15359C9.43177 8.77675 9.78999 8.49028 10.2559 8.29417C10.4817 8.19988 10.7298 8.12826 11 8.0793V6.8C11 6.63431 11.1343 6.5 11.3 6.5H12.7Z" fill="currentColor"></path></svg>İtibari Para</li>
          <li><svg  focusable="false" width="1em" height="1em" aria-hidden="true" viewBox="0 0 24 24" data-icon="CopyTradeOutlined"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C7 14.5523 7.44772 15 8 15H15C15.5523 15 16 14.5523 16 14C16 13.4477 15.5523 13 15 13H14.5V11C14.5 10.4477 14.0523 10 13.5 10C12.9477 10 12.5 10.4477 12.5 11V13H11V10C11 9.44771 10.5523 9 10 9C9.44771 9 9 9.44772 9 10V13H8C7.44772 13 7 13.4477 7 14Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 3C6.25329 3 2 7.25329 2 12.5C2 17.7467 6.25329 22 11.5 22C13.6754 22 15.68 21.2688 17.2815 20.0388C17.3043 20.0673 17.329 20.0949 17.3554 20.1213L18.7696 21.5355C19.1601 21.9261 19.7933 21.9261 20.1838 21.5355C20.5743 21.145 20.5743 20.5118 20.1838 20.1213L18.7696 18.7071C18.7556 18.6931 18.7413 18.6796 18.7267 18.6667C20.1442 17.0072 21 14.8535 21 12.5C21 7.25329 16.7467 3 11.5 3ZM4 12.5C4 8.35786 7.35786 5 11.5 5C15.6421 5 19 8.35786 19 12.5C19 16.6421 15.6421 20 11.5 20C7.35786 20 4 16.6421 4 12.5Z" fill="currentColor"></path></svg>İşlem Kopyalama</li>
          <li><svg  focusable="false" width="1em" height="1em" aria-hidden="true" viewBox="0 0 20 20" data-icon="HistoryOutlined"><g id="HistoryOutlined"><g id="Union"><path d="M6.66659 7.5013C6.66659 7.04106 7.03968 6.66797 7.49992 6.66797H12.4999C12.9602 6.66797 13.3333 7.04106 13.3333 7.5013C13.3333 7.96154 12.9602 8.33464 12.4999 8.33464H7.49992C7.03968 8.33464 6.66659 7.96154 6.66659 7.5013Z" fill="currentColor"></path><path d="M7.49992 10.0013C7.03968 10.0013 6.66659 10.3744 6.66659 10.8346C6.66659 11.2949 7.03968 11.668 7.49992 11.668H10.8333C11.2935 11.668 11.6666 11.2949 11.6666 10.8346C11.6666 10.3744 11.2935 10.0013 10.8333 10.0013H7.49992Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16.6666 5.84862L16.6666 16.668C16.6666 17.5884 15.9204 18.3346 14.9999 18.3346H4.99992C4.07944 18.3346 3.33325 17.5884 3.33325 16.668L3.33325 3.33464C3.33325 2.41416 4.07944 1.66797 4.99992 1.66797L12.4999 1.66797L16.6666 5.84862ZM4.99992 16.668L4.99992 3.33464L11.8079 3.33464L14.9999 6.53734L14.9999 16.668H4.99992Z" fill="currentColor"></path></g></g></svg>Fonlama Geçmişi</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="balance-section">
          <div className="balance-header">
            <div className="balance-title">
              <h2 className='estimated-balance'>Tahmini Bakiye</h2>
              <svg  focusable="false" width="1em" height="1em" fill="#6E7583" aria-hidden="true" viewBox="0 0 1024 1024" data-icon="EyeFilled"><path d="M378.94053807 503.95578476a130.64915101 130.64915101 0 1 0 261.29830205 0 130.64915101 130.64915101 0 0 0-261.29830205 0z m637.10184727-30.12419915C905.47603376 240.88220762 738.32278873 123.65857446 514.24978618 123.65857446 290.06582896 123.65857446 123.02353863 240.88220762 12.34623236 473.9425403a70.34527536 70.34527536 0 0 0 0 60.08196627c110.62182893 232.94937797 277.77507395 350.17301114 501.84807649 350.17301112 224.12847988 0 391.22624756-117.22363318 501.79259915-350.28396582 8.98733013-18.86229781 8.98733013-40.83132702 0-60.08196626z m-506.50817359 235.39038121a205.26618207 205.26618207 0 1 1 0-410.58784147 205.26618207 205.26618207 0 0 1 0 410.58784147z"></path></svg>
            </div>
            <div className="balance-actions">
              <button className='deposit-button' data-label="Yatırma" onClick={() => {window.location.href = 'http://localhost:5173/deposit'}}> <svg focusable="false" width="1.5em" height="1.5em" aria-hidden="true" viewBox="0 0 24 24" data-icon="DepoitOutlined"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C11.4477 2 11 2.44772 11 3V12.4769L9.67576 11.2629C9.26866 10.8897 8.63609 10.9171 8.26288 11.3242C7.88967 11.7314 7.91715 12.3639 8.32425 12.7371L10.6485 14.8679C11.4132 15.5689 12.5869 15.5689 13.3515 14.8679L15.6758 12.7371C16.0829 12.3639 16.1103 11.7314 15.7371 11.3242C15.3639 10.9171 14.7314 10.8897 14.3242 11.2629L13 12.4769V3C13 2.44772 12.5523 2 12 2Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.62711 8.88995C4.84206 8.38122 4.6039 7.79455 4.09516 7.5796C3.58643 7.36464 2.99976 7.6028 2.78481 8.11154C2.27911 9.3084 2 10.6233 2 12.0009C2 17.5237 6.47715 22.0009 12 22.0009C17.5228 22.0009 22 17.5237 22 12.0009C22 10.6233 21.7209 9.3084 21.2152 8.11154C21.0002 7.6028 20.4136 7.36464 19.9048 7.5796C19.3961 7.79455 19.1579 8.38122 19.3729 8.88995C19.7764 9.84494 20 10.8955 20 12.0009C20 16.4191 16.4183 20.0009 12 20.0009C7.58172 20.0009 4 16.4191 4 12.0009C4 10.8955 4.22361 9.84494 4.62711 8.88995Z" fill="currentColor"></path></svg></button>
              <button className='withdraw-button' data-label="Çekim"><svg focusable="false" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" data-icon="WithdrawOutlined"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.09516 7.57955C4.6039 7.7945 4.84206 8.38117 4.62711 8.8899C4.22361 9.84489 4 10.8955 4 12.0008C4 16.4191 7.58172 20.0008 12 20.0008C16.4183 20.0008 20 16.4191 20 12.0008C20 10.8955 19.7764 9.84489 19.3729 8.8899C19.1579 8.38117 19.3961 7.7945 19.9048 7.57955C20.4136 7.36459 21.0002 7.60275 21.2152 8.11149C21.7209 9.30835 22 10.6233 22 12.0008C22 17.5237 17.5228 22.0008 12 22.0008C6.47715 22.0008 2 17.5237 2 12.0008C2 10.6233 2.27911 9.30835 2.78481 8.11149C2.99976 7.60275 3.58643 7.36459 4.09516 7.57955Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.7492C11.4477 15.7492 11 15.3015 11 14.7492V5.27234L9.67576 6.48634C9.26866 6.85955 8.63609 6.83207 8.26288 6.42497C7.88967 6.01787 7.91715 5.3853 8.32425 5.01209L10.6485 2.88134C11.4132 2.18034 12.5869 2.18034 13.3515 2.88134L15.6758 5.01209C16.0829 5.3853 16.1103 6.01787 15.7371 6.42497C15.3639 6.83207 14.7314 6.85955 14.3242 6.48634L13 5.27233V14.7492C13 15.3015 12.5523 15.7492 12 15.7492Z" fill="currentColor"></path></svg></button>
              <button className='transfer-button' data-label="Transfer"><svg focusable="false" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" data-icon="TransferOutlined"><g id="TransferOutlined"><g id="Union"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.9507 3.3103C15.5693 2.91081 14.9363 2.89608 14.5368 3.27742C14.1373 3.65876 14.1226 4.29176 14.504 4.69126L17.6631 8.00078H4.00005C3.44776 8.00078 3.00005 8.44849 3.00005 9.00078C3.00005 9.55306 3.44776 10.0008 4.00005 10.0008H20C20.4003 10.0008 20.762 9.76214 20.9194 9.39418C21.0769 9.02622 20.9998 8.59981 20.7234 8.3103L15.9507 3.3103Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.0493 20.6897C8.43064 21.0892 9.06363 21.1039 9.46313 20.7225C9.86263 20.3412 9.87735 19.7082 9.49601 19.3087L6.33692 15.9992H19.9999C20.5522 15.9992 20.9999 15.5515 20.9999 14.9992C20.9999 14.4469 20.5522 13.9992 19.9999 13.9992H3.99993C3.59969 13.9992 3.23801 14.2378 3.08056 14.6058C2.92311 14.9738 3.00022 15.4002 3.27657 15.6897L8.0493 20.6897Z" fill="currentColor"></path></g></g></svg></button>
              <button className="more-actions-button" data-label="Daha fazla"><svg focusable="false" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" data-icon="MoreOutlined"><g id="MoreOutlined"><g id="Vector"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 11.1716 2.67157 10.5 3.5 10.5C4.32843 10.5 5 11.1716 5 12C5 12.8284 4.32843 13.5 3.5 13.5C2.67157 13.5 2 12.8284 2 12Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19 12C19 11.1716 19.6716 10.5 20.5 10.5C21.3284 10.5 22 11.1716 22 12C22 12.8284 21.3284 13.5 20.5 13.5C19.6716 13.5 19 12.8284 19 12Z" fill="currentColor"></path></g></g></svg></button>
            </div>
          </div>
          <div className="balance-content">
            <div className="balance-details">
              <p className="balance-amount">
                0 USDT
                <h2 className="estimated-value">≈ 0.00 USD</h2>
              </p>
            </div>
          </div>
        </div>

        <div className="chart-and-transactions">
          <div className="asset-trend-section">
            <h3 className='titles'>Varlık Trendi</h3>
            <div className="chart-container">
            <div className="no-data-container">
                  <img src={noDataSvg} alt="Veri Yok" />
                  <p className="no-data-text">Kayıt bulunamadı</p>
                </div>
            </div>
          </div>

          <div className="recent-transactions-section">
            <h3 className='titles'>Son İşlemler</h3>
            <div className="chart-container">
            <div className="no-data-container">
                  <img src={noDataSvg} alt="Veri Yok" />
                  <p className="no-data-text">Kayıt bulunamadı</p>
                </div>
            </div>
            <button className="view-all-button">Tümünü Görüntüle &gt;</button>
          </div>
        </div>

        <div className="content-sections">
          <div className="asset-distribution-section">
            <h3 className='titles'>Varlık Dağılımı</h3>
            <div className="asset-list">
                {chartData.map((entry, index) => (
                    <div key={entry.name} className="asset-item">
                    <span className="asset-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="asset-name">{entry.name}</span>
                    <div className="asset-value-container">
                        <span className="asset-value">0 USDT</span>
                    </div>
                    <span className="asset-percentage">%0</span>
                    <span className="asset-actions">...</span>
                    </div>
                ))}
            </div>
            <a href="#" className="proof-of-reserves">Rezerv Kanıtı (POR) &gt;</a>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Wallet;