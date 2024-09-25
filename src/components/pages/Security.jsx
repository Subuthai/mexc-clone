import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircleFilled } from '@ant-design/icons';
import { Modal, Input, Button, message } from 'antd';
import '../styles/security.css';

const Security = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);

  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
  const [showEmailCodeInput, setShowEmailCodeInput] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [showPhoneVerificationModal, setShowPhoneVerificationModal] = useState(false);
  const [showPhoneCodeInput, setShowPhoneCodeInput] = useState(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('');
  const [newPhone, setNewPhone] = useState('');

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
        
        setUserData(data.userData);
        setIsEmailVerified(data.userData.email_verification || false);
        setIsMobileVerified(data.userData.phone_verification || false);
      } catch (error) {
        console.error('Kullanıcı verilerini çekerken hata:', error);
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

  const fetchUserData = async () => {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      const response = await axios.post('http://localhost:3001/api/user-data', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      setUserData(data.userData);
      setIsEmailVerified(data.verified_primary || false);
      setIsMobileVerified(data.verified_advanced || false);
      console.log('Kullanıcı verileri güncellendi:', data.userData);
    } catch (error) {
      console.error('Kullanıcı verilerini çekerken hata:', error);
    }
  };

  const handleAddEmail = async () => {
    try {
      const checkResponse = await axios.post('http://localhost:3001/api/add-email', {
        uid: userData.uid,
        email: newEmail,
      });

      if (checkResponse.status === 200) {
        setShowEmailVerificationModal(false);
        setShowEmailCodeInput(true);
        message.success('Doğrulama e-postası gönderildi.');
      }
    } catch (error) {
      console.error('E-posta doğrulama kodu gönderme hatası:', error);
      message.error('E-posta gönderme hatası oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleVerifyEmailCode = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/verify-added-email', {
        uid: userData.uid,
        email: newEmail,
        code: emailVerificationCode,
      });

      if (response.status === 200) {
        setIsEmailVerified(true);
        setShowEmailCodeInput(false);
        fetchUserData();
        message.success('E-posta doğrulandı.');
      } else {
        message.error('Geçersiz doğrulama kodu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('E-posta doğrulama hatası:', error);
      message.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleAddPhone = async () => {
    try {
      await axios.post('http://localhost:3001/api/add-phone', {
        uid: userData.uid,
        phone: newPhone,
      });

      setShowPhoneVerificationModal(false);
      setShowPhoneCodeInput(true);
      message.success('Doğrulama SMS’i gönderildi');
    } catch (error) {
      console.error('Telefon doğrulama kodu gönderme hatası:', error);
      message.error('SMS gönderme hatası oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleVerifyPhoneCode = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/verify-added-phone', {
        uid: userData.uid,
        phone: newPhone,
        code: phoneVerificationCode,
      });

      if (response.status === 200) {
        setIsMobileVerified(true);
        setShowPhoneCodeInput(false);
        setNewPhone('');
        fetchUserData();
        message.success('Telefon doğrulandı.');
      } else {
        message.error('Geçersiz doğrulama kodu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Telefon doğrulama hatası:', error);
      message.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="security-container">
      <div className="security-sidebar">
      <ul>
              <li onClick={() => {window.location.href = 'http://localhost:5173/user'}}><svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 25" data-icon="OverviewSelected"><path d="M3 16.0823C3 14.9777 3.89543 14.0823 5 14.0823H8C9.10457 14.0823 10 14.9777 10 16.0823V19.0823C10 20.1868 9.10457 21.0823 8 21.0823H5C3.89543 21.0823 3 20.1868 3 19.0823V16.0823Z" fill="currentColor"></path><path d="M3 5.08228C3 3.97771 3.89543 3.08228 5 3.08228H10C11.1046 3.08228 12 3.97771 12 5.08228V12.0823H5C3.89543 12.0823 3 11.1868 3 10.0823V5.08228Z" fill="currentColor"></path><path d="M12 12.0823H19C20.1046 12.0823 21 12.9777 21 14.0823V19.0823C21 20.1868 20.1046 21.0823 19 21.0823H14C12.8954 21.0823 12 20.1868 12 19.0823V12.0823Z" fill="currentColor"></path><path d="M13.9141 6.62524C13.9141 4.66852 15.5003 3.08228 17.457 3.08228C19.4138 3.08228 21 4.66852 21 6.62524C21 8.58197 19.4138 10.1682 17.457 10.1682C15.5003 10.1682 13.9141 8.58197 13.9141 6.62524Z" fill="currentColor"></path></svg>Profil</li>
              <li className='active'><svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 25" data-icon="Security"><path d="M16.7553 9.23412C17.1455 8.84328 17.145 8.21012 16.7542 7.81991C16.3633 7.4297 15.7301 7.43022 15.3399 7.82106L10.9289 12.2393L8.66102 9.96638C8.27093 9.57542 7.63777 9.57472 7.24681 9.9648C6.85585 10.3549 6.85514 10.9881 7.24523 11.379L10.2208 14.3612C10.4083 14.5492 10.6629 14.6549 10.9285 14.6549C11.194 14.6549 11.4487 14.5494 11.6363 14.3614L16.7553 9.23412Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M18.4982 18.3339L12 22.0822L5.50035 18.3303C3.95315 17.4372 3 15.7864 3 14V4.08228C3 2.97771 3.89543 2.08228 5 2.08228H19C20.1046 2.08228 21 2.97771 21 4.08228V14.0028C21 15.7898 20.0462 17.441 18.4982 18.3339ZM19 4.08228V14.0028C19 15.075 18.4277 16.0657 17.4989 16.6015L12.0004 19.7731L6.50021 16.5982C5.57189 16.0623 5 15.0719 5 14V4.08228H19Z" fill="currentColor"></path></svg>Güvenlik</li>
              <li onClick={() => {window.location.href = 'http://localhost:5173/idauth'}}><svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 25" data-icon="Identification"><path d="M3 7.58228C3 6.47771 3.89543 5.58228 5 5.58228H19C20.1046 5.58228 21 6.47771 21 7.58228V17.5823C21 18.6868 20.1046 19.5823 19 19.5823H5C3.89543 19.5823 3 18.6868 3 17.5823V7.58228Z" stroke="currentColor" stroke-width="2"></path><path d="M5 14.5823C5 13.4777 5.89543 12.5823 7 12.5823H11C12.1046 12.5823 13 13.4777 13 14.5823V14.8823C13 15.2689 12.6866 15.5823 12.3 15.5823H5.7C5.3134 15.5823 5 15.2689 5 14.8823V14.5823Z" fill="currentColor"></path><path d="M9.00005 11.5862C9.96765 11.5862 10.752 10.8018 10.752 9.83423C10.752 8.86666 9.96765 8.08228 9.00005 8.08228C8.03245 8.08228 7.24805 8.86666 7.24805 9.83423C7.24805 10.8018 8.03245 11.5862 9.00005 11.5862Z" fill="currentColor"></path></svg>Kimlik Doğrulama</li>
              <li><svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 25" data-icon="Referral"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.0526 9.4507C11.041 9.4507 11.8421 8.64952 11.8421 7.66122C11.8421 6.67292 11.041 5.87175 10.0526 5.87175C9.06431 5.87175 8.26316 6.67292 8.26316 7.66122C8.26316 8.64952 9.06431 9.4507 10.0526 9.4507ZM10.0526 11.2402C12.0292 11.2402 13.6316 9.63782 13.6316 7.66122C13.6316 5.68462 12.0292 4.08228 10.0526 4.08228C8.07603 4.08228 6.47368 5.68462 6.47368 7.66122C6.47368 9.63782 8.07603 11.2402 10.0526 11.2402ZM6.47368 14.8191C4.99124 14.8191 3.78947 16.0208 3.78947 17.5033V19.2928H16.3158V17.5033C16.3158 16.0208 15.1141 14.8191 13.6316 14.8191H6.47368ZM2 17.5033C2 15.0326 4.00294 13.0296 6.47368 13.0296H13.6316C16.1023 13.0296 18.1053 15.0326 18.1053 17.5033V19.2928C18.1053 20.2811 17.3041 21.0823 16.3158 21.0823H3.78947C2.80117 21.0823 2 20.2811 2 19.2928V17.5033Z" fill="currentColor"></path><path d="M15.5 9.58228H21.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><path d="M18.5 12.5823L18.5 6.58228" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>Davet</li>
              <li><svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 25" data-icon="TradingFees"><path d="M6.45609 4.76045C6.48247 4.70244 6.52 4.67394 6.5654 4.65869C6.62119 4.63995 6.67961 4.64585 6.71679 4.66276L11.8262 6.98658L5.44727 6.97855L6.45609 4.76045ZM7.3792 3.20632C6.57145 2.83894 5.45135 3.10488 4.99965 4.09804L3.67733 7.00542H2.58706C2.06719 7.00542 1.64575 7.42686 1.64575 7.94673V12.0824C2.72919 12.1068 3.6 12.9927 3.6 14.0819C3.6 15.1712 2.72919 16.0571 1.64575 16.0814V19.2424C1.64575 19.7622 2.06719 20.1837 2.58706 20.1837H21.4131C21.933 20.1837 22.3544 19.7622 22.3544 19.2424V16.0781C21.3084 16.0133 20.48 15.1443 20.48 14.0819C20.48 13.0195 21.3084 12.1506 22.3544 12.0858V7.94673C22.3544 7.42686 21.933 7.00542 21.4131 7.00542H15.7323L7.3792 3.20632ZM3.24575 8.60542H20.7544V10.9219C19.6372 11.533 18.88 12.7187 18.88 14.0819C18.88 15.4451 19.6372 16.6309 20.7544 17.242V18.5837H3.24575V17.2845C4.40641 16.6869 5.2 15.4772 5.2 14.0819C5.2 12.6867 4.40641 11.4769 3.24575 10.8794V8.60542ZM10.8 11.482C10.8 12.0343 10.3523 12.482 9.8 12.482C9.24771 12.482 8.8 12.0343 8.8 11.482C8.8 10.9297 9.24771 10.482 9.8 10.482C10.3523 10.482 10.8 10.9297 10.8 11.482ZM13.8 16.482C14.3523 16.482 14.8 16.0343 14.8 15.482C14.8 14.9297 14.3523 14.482 13.8 14.482C13.2477 14.482 12.8 14.9297 12.8 15.482C12.8 16.0343 13.2477 16.482 13.8 16.482ZM9.02627 15.9178C8.90131 15.7928 8.90131 15.5902 9.02627 15.4652L13.7832 10.7083C13.9082 10.5833 14.1108 10.5833 14.2358 10.7083L14.6318 11.1042C14.7567 11.2292 14.7567 11.4318 14.6318 11.5568L9.8748 16.3138C9.74983 16.4387 9.54722 16.4387 9.42225 16.3138L9.02627 15.9178Z" fill="currentColor"></path></svg>İşlem Geçmişi</li>
              <li><svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 25" data-icon="AddressManagement"><path d="M17.3553 13.6126L14.107 16.8609C13.9663 17.0016 13.7755 17.0806 13.5766 17.0806C13.3776 17.0806 13.1868 17.0015 13.0462 16.8608L11.4695 15.2833C11.1767 14.9903 11.1768 14.5155 11.4698 14.2226C11.7628 13.9298 12.2377 13.9299 12.5305 14.2229L13.5768 15.2698L16.2947 12.5519C16.5876 12.2591 17.0624 12.2591 17.3553 12.5519C17.6482 12.8448 17.6482 13.3197 17.3553 13.6126Z" fill="currentColor"></path><path d="M7 11.8323C7 11.4181 7.33579 11.0823 7.75 11.0823H11.2933C11.7075 11.0823 12.0433 11.4181 12.0433 11.8323C12.0433 12.2465 11.7075 12.5823 11.2933 12.5823H7.75C7.33579 12.5823 7 12.2465 7 11.8323Z" fill="currentColor"></path><path d="M7.75 8.08228L13.2933 8.08227C13.7075 8.08227 14.0433 8.41806 14.0433 8.83227C14.0433 9.24649 13.7075 9.58227 13.2933 9.58227L7.75 9.58228C7.33579 9.58228 7 9.24649 7 8.83228C7 8.41806 7.33579 8.08228 7.75 8.08228Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.08228C3 3.97771 3.89543 3.08228 5 3.08228H19C20.1046 3.08228 21 3.97771 21 5.08228V19.0823C21 20.1868 20.1046 21.0823 19 21.0823H5C3.89543 21.0823 3 20.1868 3 19.0823V5.08228ZM5 5.08228L5 19.0823H19V5.08228H5Z" fill="currentColor"></path></svg>Çekim Adresleri/Kişileri</li>
              <li><svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 25" data-icon="SubAccountManagement"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.80835 10.7286L4.53394 12.003L5.80835 13.2774L7.08276 12.003L5.80835 10.7286ZM6.22448 8.64788C5.99466 8.41806 5.62204 8.41806 5.39222 8.64788L2.45327 11.5868C2.22344 11.8167 2.22344 12.1893 2.45327 12.4191L5.39222 15.3581C5.62204 15.5879 5.99466 15.5879 6.22448 15.3581L9.16343 12.4191C9.39326 12.1893 9.39326 11.8167 9.16343 11.5868L6.22448 8.64788Z" fill="currentColor"></path><path d="M18.9877 5.34778H18.4877V5.84778V7.05748V7.55748H18.9877H20.1974H20.6974V7.05748V5.84778V5.34778H20.1974H18.9877ZM17.7222 4.67078C17.7222 4.6219 17.7618 4.58228 17.8107 4.58228H21.3744C21.4233 4.58228 21.4629 4.6219 21.4629 4.67078V8.23449C21.4629 8.28337 21.4233 8.32299 21.3744 8.32299H17.8107C17.7618 8.32299 17.7222 8.28337 17.7222 8.23449V4.67078Z" fill="currentColor" stroke="currentColor"></path><path d="M17.222 15.9301C17.222 15.605 17.4855 15.3416 17.8105 15.3416H21.3743C21.6993 15.3416 21.9628 15.605 21.9628 15.9301V19.4938C21.9628 19.8188 21.6993 20.0823 21.3743 20.0823H17.8105C17.4855 20.0823 17.222 19.8188 17.222 19.4938V15.9301Z" fill="currentColor"></path><path d="M15.6136 6.33636H12.7796C11.6751 6.33636 10.7796 7.2318 10.7796 8.33636V15.5823C10.7796 16.6868 11.6751 17.5823 12.7796 17.5823H15.6193" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>Alt Hesap Yönetimi</li>
              <li><svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 25" data-icon="APIManagement"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.3154 6.08215L16.3101 6.08215V18.7313L13.3154 18.7313C9.8224 18.7313 6.99079 15.8997 6.99078 12.4067C6.99078 8.91377 9.8224 6.08215 13.3154 6.08215ZM5.09706 11.073C4.99011 11.0452 4.87793 11.0305 4.7623 11.0305H3.73539C3.00119 11.0305 2.40601 11.6256 2.40601 12.3598C2.40601 13.094 3.00119 13.6892 3.7354 13.6892H4.7623C4.87288 13.6892 4.98032 13.6757 5.08304 13.6503C5.68332 17.658 9.14044 20.7313 13.3154 20.7313H16.9807C17.7149 20.7313 18.3101 20.1361 18.3101 19.4019V17.3601H20.6706C21.4048 17.3601 22 16.765 22 16.0308C22 15.2965 21.4048 14.7014 20.6706 14.7014H18.3101V10.7005H20.6706C21.4048 10.7005 22 10.1053 22 9.37115C22 8.63695 21.4048 8.04176 20.6706 8.04176H18.3101V5.41154C18.3101 4.67734 17.7149 4.08215 16.9807 4.08215H13.3154C9.17183 4.08215 5.73535 7.10946 5.09706 11.073Z" fill="currentColor"></path></svg>API Yönetimi</li>
              <li><svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 25" data-icon="Settings"><path d="M14.4717 11.1487C14.4717 12.3462 13.5009 13.317 12.3033 13.317C11.1058 13.317 10.135 12.3462 10.135 11.1487C10.135 9.95117 11.1058 8.98037 12.3033 8.98037C13.5009 8.98037 14.4717 9.95117 14.4717 11.1487Z" stroke="currentColor" stroke-width="2"></path><path d="M7.67034 4.1772C7.82054 3.91705 8.09811 3.75679 8.39851 3.75679L16.2751 3.75679C16.5755 3.75679 16.8531 3.91705 17.0033 4.1772L20.9415 10.9985C21.0917 11.2587 21.0917 11.5792 20.9415 11.8393L17.0033 18.6606C16.8531 18.9208 16.5755 19.0811 16.2751 19.0811L16.2751 20.0811L16.2751 19.081L8.39851 19.0811C8.09811 19.0811 7.82054 18.9208 7.67034 18.6606L3.73205 11.8393C3.58186 11.5792 3.58186 11.2587 3.73205 10.9985L7.67034 4.1772Z" stroke="currentColor" stroke-width="2"></path></svg>Ayarlar</li>
        </ul>
      </div>

      <div className="security-main-content">
        <h1>Güvenlik</h1>
        <div className="security-profile">
          <div className="security-verify">
          <div className="security-verify-icon">
            <svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" data-icon="EmailOutlined"><path d="M9.1364 9.3636C8.78492 9.01213 8.21508 9.01213 7.8636 9.3636C7.51213 9.71508 7.51213 10.2849 7.8636 10.6364L10.6151 13.3879C11.4352 14.208 12.7648 14.208 13.5849 13.3879L16.3364 10.6364C16.6879 10.2849 16.6879 9.71508 16.3364 9.3636C15.9849 9.01213 15.4151 9.01213 15.0636 9.3636L12.3121 12.1151C12.195 12.2322 12.005 12.2322 11.8879 12.1151L9.1364 9.3636Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7ZM4 7H20V17H4V7Z"></path></svg>
            </div>
            <div className="security-verify-info">
              <h3>E-posta Doğrulaması</h3>
              <p>Giriş yapma, şifre kurtarma ve çekim onayı için e-posta adresinizi hesabınıza bağlayabilirsiniz.</p>
            </div>
            <div className="security-verify-status">
              {isEmailVerified && userData.email ? (
                <span className="email-verified">{userData.email}</span>
              ) : (
                <>
                  <span className="not-verified">E-posta doğrulanmadı</span>
                  <Button className="action-button" onClick={() => setShowEmailVerificationModal(true)}>E-posta Ekle</Button>
                  {showEmailCodeInput && (
                    <>
                      <Input
                        placeholder="Doğrulama kodunu girin"
                        value={emailVerificationCode}
                        onChange={(e) => setEmailVerificationCode(e.target.value)}
                      />
                      <Button className="action-button" onClick={handleVerifyEmailCode}>Doğrula</Button>
                    </>
                  )}
                  <Modal
                    title="E-posta Ekle"
                    open={showEmailVerificationModal}
                    onOk={handleAddEmail}
                    onCancel={() => {
                      setShowEmailVerificationModal(false);
                      setShowEmailCodeInput(false);
                      setNewEmail('');
                    }}
                    okText="Doğrulama Kodu Gönder"
                    cancelText="İptal"
                  >
                    <Input
                      placeholder="E-posta adresinizi girin"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </Modal>
                </>
              )}
            </div>
          </div>

          <div className="separator"></div>

          <div className="security-verify">
          <div className="security-verify-icon">
            <svg focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" data-icon="MobileOutlined"><path d="M11 16C10.4477 16 10 16.4477 10 17C10 17.5523 10.4477 18 11 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H11Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM6 4H18V20H6V4Z"></path></svg>
            </div>
            <div className="security-verify-info">
              <h3>Telefon Doğrulaması</h3>
              <p>Cep telefonu numaranızı hesabınıza bağlayarak varlıklarınızı çekme, şifre değiştirme ve güvenlik ayarlarıyla ilgili onaylar için SMS doğrulama kodları alabilirsiniz.</p>
            </div>
            <div className="security-verify-status">
              {isMobileVerified && userData.phone ? (
                <span className="phone-verified">{userData.phone}</span>
              ) : (
                <>
                  <span className="not-verified">Telefon doğrulanmadı</span>
                  <Button className="action-button" onClick={() => setShowPhoneVerificationModal(true)}>Telefon Ekle</Button>
                  {showPhoneCodeInput && (
                    <>
                      <Input
                        placeholder="Doğrulama kodunu girin"
                        value={phoneVerificationCode}
                        onChange={(e) => setPhoneVerificationCode(e.target.value)}
                      />
                      <Button className="action-button" onClick={handleVerifyPhoneCode}>Doğrula</Button>
                    </>
                  )}
                  <Modal
                    title="Telefon Ekle"
                    open={showPhoneVerificationModal}
                    onOk={handleAddPhone}
                    onCancel={() => {
                      setShowPhoneVerificationModal(false);
                      setShowPhoneCodeInput(false);
                      setNewPhone('');
                    }}
                    okText="Doğrulama Kodu Gönder"
                    cancelText="İptal"
                  >
                    <Input
                      placeholder="Telefon numaranızı girin"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                    />
                  </Modal>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Security;