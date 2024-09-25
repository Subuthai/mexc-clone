import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Upload, message } from 'antd';
import { CameraOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons';
import driver_front from '/src/assets/driving_front_dark.png';
import driver_back from '/src/assets/driving_back_dark.png';
import card_front from '/src/assets/card_front_dark.png';  
import card_back from '/src/assets/card_back_dark.png';  
import '../styles/primarykyc.css';

const PrimaryKYC = () => {
  const [selectedCountry, setSelectedCountry] = useState('Türkiye');
  const [selectedIDType, setSelectedIDType] = useState('Kimlik Kartı');
  const [buttonText, setButtonText] = useState('Devam Et');
  
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const [isPrimaryVerified, setIsPrimaryVerified] = useState(false);
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
        if (data.verified_primary) {
          navigate('/idauth', { state: { verified: true } });
        }
        setUserData(data);
  
        setIsPrimaryVerified(data.verified_primary || false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsPrimaryVerified(false);
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

  const handleImageUpload = (info, setImage) => {
    if (info.file.status === 'done') {
      setImage(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const handleImageRemove = (setImage) => {
    setImage(null);
  };

  const handleButtonClick = async () => {
    if (!frontImage || !backImage) {
      message.warning('Lütfen önce kimlik belgelerinin fotoğraflarını yükleyin.');
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
        body: JSON.stringify({ verificationType: 'primary' })
      });
  
      if (response.ok) {
        message.success('Doğrulama işlemi başlatıldı!');
  
        const delay = Math.floor(Math.random() * 30000) + 60000; 
  
        setTimeout(async () => {
          const userId = getUserIdFromToken(token);
          console.log(token);
        
          const checkResponse = await fetch(`http://localhost:3001/api/check-verification?userId=${userId}&verificationType=primary`);
          const checkData = await checkResponse.json();
        
          if (checkData.verified_primary) {
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

  return (
    <div className="id-auth-container">
      <h2>Kimlik Doğrulama</h2>

      <div className="form-group">
        <label>Bölge Seç:</label>
        <select className="select-content" value={selectedCountry} onChange={handleCountryChange}>
          <option value="Türkiye">Türkiye</option>
        </select>
      </div>

      <div className="form-group">
        <label>Kimlik Türü Seç:</label>
        <select className="select-content" value={selectedIDType} onChange={handleIDType}>
          <option value="Kimlik Kartı">Kimlik Kartı</option>
          <option value="Sürücü Belgesi">Sürücü Belgesi</option>
        </select>
      </div>

      <div className="upload-container">
        <div className="upload-section">
          {selectedIDType === 'Kimlik Kartı' && (
            <>
              <div className="upload-box">
                <div className="dashed-border">
                  {frontImage ? (
                    <div className="image-preview">
                      <img src={frontImage} alt="Kimlik Ön Yüz" />
                      <CloseOutlined className="remove-icon" onClick={() => handleImageRemove(setFrontImage)} />
                    </div>
                  ) : (
                    <>
                      <Upload
                        showUploadList={false}
                        customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                        onChange={(info) => handleImageUpload(info, setFrontImage)}
                      >
                        <Button icon={<CameraOutlined />}>Kimlik kartınızın ön yüzünün fotoğrafını çekin</Button>
                      </Upload>
                      <Upload
                        showUploadList={false}
                        customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                        onChange={(info) => handleImageUpload(info, setFrontImage)}
                      >
                        <Button icon={<UploadOutlined />}>Kimlik kartınızın ön yüzünün fotoğrafını yükleyin</Button>
                      </Upload>
                    </>
                  )}
                </div>
              </div>

              <div className="upload-box">
                <div className="dashed-border">
                  {backImage ? (
                    <div className="image-preview">
                      <img src={backImage} alt="Kimlik Arka Yüz" />
                      <CloseOutlined className="remove-icon" onClick={() => handleImageRemove(setBackImage)} />
                    </div>
                  ) : (
                    <>
                      <Upload
                        showUploadList={false}
                        customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                        onChange={(info) => handleImageUpload(info, setBackImage)}
                      >
                        <Button icon={<CameraOutlined />}>Kimlik kartınızın arka yüzünün fotoğrafını çekin</Button>
                      </Upload>
                      <Upload
                        showUploadList={false}
                        customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                        onChange={(info) => handleImageUpload(info, setBackImage)}
                      >
                        <Button icon={<UploadOutlined />}>Kimlik kartınızın arka yüzünün fotoğrafını yükleyin</Button>
                      </Upload>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {selectedIDType === 'Sürücü Belgesi' && (
            <>
              <div className="upload-box">
                <div className="dashed-border">
                  {frontImage ? (
                    <div className="image-preview">
                      <img src={frontImage} alt="Sürücü Belgesi Ön Yüz" />
                      <CloseOutlined className="remove-icon" onClick={() => handleImageRemove(setFrontImage)} />
                    </div>
                  ) : (
                    <>
                      <Upload
                        showUploadList={false}
                        customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                        onChange={(info) => handleImageUpload(info, setFrontImage)}
                      >
                        <Button icon={<CameraOutlined />}>Sürücü belgenizin ön yüzünün fotoğrafını çekin</Button>
                      </Upload>
                      <Upload
                        showUploadList={false}
                        customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                        onChange={(info) => handleImageUpload(info, setFrontImage)}
                      >
                        <Button icon={<UploadOutlined />}>Sürücü belgenizin ön yüzünün fotoğrafını yükleyin</Button>
                      </Upload>
                    </>
                  )}
                </div>
              </div>

              <div className="upload-box">
                <div className="dashed-border">
                  {backImage ? (
                    <div className="image-preview">
                      <img src={backImage} alt="Sürücü Belgesi Arka Yüz" />
                      <CloseOutlined className="remove-icon" onClick={() => handleImageRemove(setBackImage)} />
                    </div>
                  ) : (
                    <>
                      <Upload
                        showUploadList={false}
                        customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                        onChange={(info) => handleImageUpload(info, setBackImage)}
                      >
                        <Button icon={<CameraOutlined />}>Sürücü belgenizin arka yüzünün fotoğrafını çekin</Button>
                      </Upload>
                      <Upload
                        showUploadList={false}
                        customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                        onChange={(info) => handleImageUpload(info, setBackImage)}
                      >
                        <Button icon={<UploadOutlined />}>Sürücü belgenizin arka yüzünün fotoğrafını yükleyin</Button>
                      </Upload>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="id-examples">
          {selectedIDType === 'Kimlik Kartı' && (
            <>
              <img src={card_front} alt="Kimlik Ön Yüzü" className="id-example" />
              <img src={card_back} alt="Kimlik Arka Yüzü" className="id-example" />
            </>
          )}
          {selectedIDType === 'Sürücü Belgesi' && (
            <>
              <img src={driver_front} alt="Ehliyet Ön Yüzü" className="id-example" />
              <img src={driver_back} alt="Ehliyet Arka Yüzü" className="id-example" />
            </>
          )}
        </div>
      </div>

      <div className="box-actions">
      <Button 
          className="auth-btn" 
          onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </div>

      <p className="review-time">
        Tahmini İnceleme Süresi: <span>24 saat</span>
      </p>
    </div>
  );
};

export default PrimaryKYC;
