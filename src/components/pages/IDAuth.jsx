import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, message } from 'antd';
import { StarFilled } from '@ant-design/icons';
import '../styles/IDAuth.css';

const IDAuth = () => {
  const [isPrimaryVerified, setIsPrimaryVerified] = useState(false);
  const [isAdvancedVerified, setIsAdvancedVerified] = useState(false);
  const [userData, setUserData] = useState(null);

  const location = useLocation();

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

        setIsPrimaryVerified(data.verified_primary || false);
        setIsAdvancedVerified(data.verified_advanced || false);

        if (location.state && 'verified' in location.state) {
          const isVerified = location.state.verified;
          if (isVerified) {
            message.warning('Bu doğrulamayı zaten yaptınız!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsPrimaryVerified(false);
        setIsAdvancedVerified(false);
      }
    };

    fetchUserData();
    console.log('userData:', userData);
    console.log('isPrimaryVerified:', isPrimaryVerified);
    console.log('isAdvancedVerified:', isAdvancedVerified);
  }, [location.state]);

  const handlePrimaryKYCClick = () => {
    if (isPrimaryVerified) {
      message.warning('Bu doğrulamayı zaten yaptınız!');
      console.log('isPrimaryVerified:', isPrimaryVerified);
    } else {
      window.location.href = 'http://localhost:5173/PrimaryKYC';
    }
  };

  const handleAdvancedKYCClick = () => {
    if (isAdvancedVerified) {
      message.warning('Bu doğrulamayı zaten yaptınız!');
      console.log('isAdvancedVerified:', isAdvancedVerified);
    } else {
      window.location.href = 'http://localhost:5173/AdvancedKYC';
    }
  };

  return (
    <div className="id-auth-container">
      <h2>Kimlik Doğrulama</h2>
      <div className="auth-box-container">
        <div className="auth-box advanced-kyc">
          <div className="box-header">
            <h3>Gelişmiş KYC 
              <span className="recommended">
                <StarFilled style={{ color: "#dc9a16" }} /> Önerilen</span>
                <p>24 saatlik çekim limitinizi 200 BTC'ye yükseltin</p>
            </h3>
            <div className="box-actions">
            <Button className="auth-btn" onClick={handleAdvancedKYCClick}>Doğrula</Button>
          </div>
        </div>
          <hr className="box-divider" /> 
          <div className="box-content">
            <ul>
              <li>Resmi Kimlik Belgesi</li>
              <li>Yüz Doğrulaması</li>
            </ul>
          </div>
        </div>
        <div className="auth-box primary-kyc">
          <div className="box-header">
            <h3>Birincil KYC
            <p>24 saatlik çekim limitinizi 80 BTC'ye yükseltin</p>
            </h3>
            <div className="box-actions">
            <Button className="auth-btn" onClick={handlePrimaryKYCClick}>Doğrula</Button>
          </div>
          </div>
          <hr className="box-divider" />
          <div className="box-content">
            <ul>
              <li>Resmi Kimlik Belgesi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDAuth;