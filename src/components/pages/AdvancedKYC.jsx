import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Upload, message } from 'antd';
import { CameraOutlined, UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import driver_front from '/src/assets/driving_front_dark.png';
import driver_back from '/src/assets/driving_back_dark.png';
import card_front from '/src/assets/card_front_dark.png';  
import card_back from '/src/assets/card_back_dark.png';  
import selfie_image from '/src/assets/selfie_dark.png';  
import '../styles/advancedkyc.css';

const AdvancedKYC = () => {
  const [selectedCountry, setSelectedCountry] = useState('Türkiye');
  const [selectedIDType, setSelectedIDType] = useState('Kimlik Kartı');
  const [buttonText, setButtonText] = useState('Devam Et');

  const [uploadedFront, setUploadedFront] = useState(null);
  const [uploadedBack, setUploadedBack] = useState(null);
  const [uploadedSelfie, setUploadedSelfie] = useState(null);

  const [isAdvancedVerified, setIsAdvancedVerified] = useState(false);
  const [userData, setUserData] = useState(null)


  const navigate = useNavigate();
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
        if (data.verified_advanced) {
          navigate('/idauth', { state: { verified: true } });
        }
        setUserData(data);
  
        setIsAdvancedVerified(data.verified_advanced || false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAdvancedVerified(false);
      }
    };
    fetchUserData();
  }, [navigate]); 

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleIDType = (event) => {
    setSelectedIDType(event.target.value);
  };

  const handleButtonClick = async () => {
    if (!uploadedFront || !uploadedBack || !uploadedSelfie) {
      message.warning('Lütfen önce kimlik belgelerinin ve selfie fotoğrafını yükleyin.');
      return;
    }
  
    setButtonText('Doğrulanıyor...');
  
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
  
      const response = await fetch('http://localhost:3001/api/start-verification', { 
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verificationType: 'advanced' })
      });
  
      if (response.ok) {
        message.success('Doğrulama işlemi başlatıldı!');
  
        const delay = Math.floor(Math.random() * 30000) + 60000;
  
        setTimeout(async () => {
            const userId = getUserIdFromToken(token);
            console.log(token);
          
            const checkResponse = await fetch(`http://localhost:3001/api/check-verification?userId=${userId}&verificationType=advanced`);
            const checkData = await checkResponse.json();
          
            if (checkData.verified_advanced) {
              message.success('Kimlik doğrulama başarıyla tamamlandı!');
            } else {
              message.error('Kimlik doğrulama başarısız oldu. Lütfen tekrar deneyin.');
            }
          
            setButtonText('Doğrula');
          }, delay);
          
      } else {
        message.error('Doğrulama isteği gönderilemedi. Lütfen tekrar deneyin.');
        setButtonText('Doğrula');
      }
    } catch (error) {
      console.error('Doğrulama hatası:', error);
      message.error('Bir hata oluştu. Lütfen tekrar deneyin.');
      setButtonText('Doğrula');
    }
  };
  

  const handleUpload = (setImage) => (info) => {
    const file = info.file.originFileObj;
    setImage(URL.createObjectURL(file));
  };

  const handleRemove = (setImage) => () => {
    setImage(null);
  };

  return (
    <div className="advanced-id-auth-container">
      <h2>Gelişmiş Kimlik Doğrulama</h2>

      <div className="advanced-form-group">
        <label>Bölge Seç:</label>
        <select className="advanced-select-content" value={selectedCountry} onChange={handleCountryChange}>
          <option value="Türkiye">Türkiye</option>
        </select>
      </div>

      <div className="advanced-form-group">
        <label>Kimlik Türü Seç:</label>
        <select className="advanced-select-content" value={selectedIDType} onChange={handleIDType}>
          <option value="Kimlik Kartı">Kimlik Kartı</option>
          <option value="Sürücü Belgesi">Sürücü Belgesi</option>
        </select>
      </div>

      <div className="advanced-upload-container">
        <div className="advanced-upload-box">
          <div className="advanced-dashed-border">
            {uploadedFront ? (
              <div className="advanced-image-preview">
                <img src={uploadedFront} alt="Kimlik Ön Yüzü" />
                <CloseCircleOutlined className="advanced-remove-icon" onClick={handleRemove(setUploadedFront)} />
              </div>
            ) : (
              <>
                <Upload onChange={handleUpload(setUploadedFront)}>
                  <Button icon={<CameraOutlined />}>Kimlik kartınızın ön yüzünün fotoğrafını çekin</Button>
                </Upload>
                <Upload onChange={handleUpload(setUploadedFront)}>
                  <Button icon={<UploadOutlined />}>Kimlik kartınızın ön yüzünün fotoğrafını yükleyin</Button>
                </Upload>
              </>
            )}
          </div>
        </div>

        <div className="advanced-upload-box">
          <div className="advanced-dashed-border">
            {uploadedBack ? (
              <div className="advanced-image-preview">
                <img src={uploadedBack} alt="Kimlik Arka Yüzü" />
                <CloseCircleOutlined className="advanced-remove-icon" onClick={handleRemove(setUploadedBack)} />
              </div>
            ) : (
              <>
                <Upload onChange={handleUpload(setUploadedBack)}>
                  <Button icon={<CameraOutlined />}>Kimlik kartınızın arka yüzünün fotoğrafını çekin</Button>
                </Upload>
                <Upload onChange={handleUpload(setUploadedBack)}>
                  <Button icon={<UploadOutlined />}>Kimlik kartınızın arka yüzünün fotoğrafını yükleyin</Button>
                </Upload>
              </>
            )}
          </div>
        </div>

        <div className="advanced-upload-box">
          <div className="advanced-dashed-border">
            {uploadedSelfie ? (
              <div className="advanced-image-preview">
                <img src={uploadedSelfie} alt="Selfie Yükle" />
                <CloseCircleOutlined className="advanced-remove-icon" onClick={handleRemove(setUploadedSelfie)} />
              </div>
            ) : (
              <>
                <Upload onChange={handleUpload(setUploadedSelfie)}>
                  <Button icon={<CameraOutlined />}>Selfie çekin</Button>
                </Upload>
                <Upload onChange={handleUpload(setUploadedSelfie)}>
                  <Button icon={<UploadOutlined />}>Selfie yükleyin</Button>
                </Upload>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="advanced-id-examples">
        {selectedIDType === 'Kimlik Kartı' && (
          <>
            <img src={card_front} alt="Kimlik Ön Yüzü" className="advanced-id-example" />
            <img src={card_back} alt="Kimlik Arka Yüzü" className="advanced-id-example" />
          </>
        )}
        {selectedIDType === 'Sürücü Belgesi' && (
          <>
            <img src={driver_front} alt="Ehliyet Ön Yüzü" className="advanced-id-example" />
            <img src={driver_back} alt="Ehliyet Arka Yüzü" className="advanced-id-example" />
          </>
        )}
        <img src={selfie_image} alt="Selfie Örneği" className="advanced-id-example" />
      </div>

      <div className="advanced-box-actions">
        <Button className="advanced-auth-btn" onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </div>

      <p className="advanced-review-time">
        Tahmini İnceleme Süresi: <span>24 saat</span>
      </p>
    </div>
  );
};

export default AdvancedKYC;
