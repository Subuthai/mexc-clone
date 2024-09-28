import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Login.css";
import Header from '../header/Header';

const Login = () => {
  const [isEmailOrPhoneExists, setIsEmailOrPhoneExists] = useState(null);
  const [isEmailOrPhoneDisabled, setIsEmailOrPhoneDisabled] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showConfirmPasswordInput, setShowConfirmPasswordInput] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonText, setButtonText] = useState("Devam Et");
  const [showContinueButton, setShowContinueButton] = useState(true);
  const [isVerificationMode, setIsVerificationMode] = useState(false);
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < codes.length - 1) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  const handleTabClick = (tab) => {
    setIsMobile(tab === "Mobil");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNext = async () => {
    if (!email) {
      alert("Lütfen e-posta ya da telefon numaranızı girin.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/check-email-or-phone', {
        emailOrPhone: email,
        isMobile,
      });
  
      if (response.data.exists) {
        setIsEmailOrPhoneExists(true);
        setShowPasswordInput(true);
        setShowConfirmPasswordInput(false);
        setShowContinueButton(true);
      } else {
        setIsEmailOrPhoneExists(false);
        setShowPasswordInput(true);
        setShowConfirmPasswordInput(true);
        setShowContinueButton(true);
      }
    } catch (error) {
      console.error('Kullanıcı kontrol hatası:', error);
      alert("Kullanıcı kontrolünde bir hata oluştu.");
      return;
    }
  
    if (!isEmailOrPhoneExists && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Şifreler eşleşmiyor!");
        return;
      }
      setShowPasswordInput(false);
      setShowConfirmPasswordInput(false);
      setShowContinueButton(false);
      setIsVerificationMode(true);
  
      try {
        if (isMobile) {
          await axios.post('http://localhost:3001/api/send-verification-code', { phoneNumber: email });
        } else {
          await axios.post('http://localhost:3001/api/send-email-verification', { email: email });
        }
      } catch (error) {
        console.error('Doğrulama kodu gönderme hatası:', error);
        alert("Doğrulama kodu gönderilemedi.");
      }
    }
  
    if (isEmailOrPhoneExists && showPasswordInput) {
      if (!password) {
        alert("Lütfen şifrenizi giriniz.");
        return;
      }
      await handleLogin();
    }
  };

  const handleVerifyCode = async () => {
    const verificationCode = codes.join("");
    try {
      const response = await axios.post(
        isMobile ? "http://localhost:3001/api/verify-code" : "http://localhost:3001/api/verify-email-code",
        isMobile
          ? { phoneNumber: email, code: verificationCode }
          : { email: email, code: verificationCode }
      );
  
      if (response.data.message === "Doğrulama başarılı") {
        setIsVerificationMode(false);
        if (!isEmailOrPhoneExists) {
          await handleRegister();
        } else {
          await handleLogin();
        }
      } else {
        setIsEmailOrPhoneDisabled(false);
        alert("Geçersiz doğrulama kodu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      setIsEmailOrPhoneDisabled(false);
      console.error("Doğrulama hatası:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleLoginOrRegister = async () => {
    if (isEmailOrPhoneExists) {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };

  const handleLogin = async () => {
    if (!password) {
      alert("Lütfen şifre alanını doldurunuz.");
      return;
    }

    if (!email) {
      alert("Lütfen e-posta veya telefon numarası alanını doldurunuz.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        emailOrPhone: email,
        password,
        isMobile,
      });

      if (response && response.data && response.data.token) {
        document.cookie = `token=${response.data.token}; max-age=${
          48 * 60 * 60
        }; path=/`;
        window.location.href = "/user";
      } else {
        alert("Giriş başarısız. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Login Error:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Giriş başarısız. Lütfen tekrar deneyin.");
      }
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const response = await axios.post(
        isMobile ? "http://localhost:3001/api/register-with-phone" : "http://localhost:3001/api/register-with-email",
        isMobile ? { phone: email, password } : { email, password }
      );

      document.cookie = `token=${response.data.token}; max-age=${
        48 * 60 * 60
      }; path=/`;
      window.location.href = "/user";
    } catch (error) {
      console.error("Register Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Kayıt başarısız. Lütfen tekrar deneyin.");
      }
    }
  };

  if (isVerificationMode) {
    const isButtonDisabled = codes.some((code) => code === "");
  
    const verificationType = isMobile ? "SMS" : "E-Posta";
    const communicationType = isMobile ? phoneNumber || email : email;
    const instructionText = isMobile
      ? "cep telefonunuza gönderilen 6 haneli doğrulama kodunu girin"
      : "e-posta adresinize gönderilen 6 haneli doğrulama kodunu girin";
  
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#16171a",
          color: "#fff",
          zIndex: 9999,
        }}
      >
        <Header />
  
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 60px)",
            marginTop: "60px",
          }}
        >
          <div style={{ width: "320px" }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#fff",
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              {verificationType} Doğrulama Kodu
            </h2>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#a0a0a0",
                textAlign: "left",
                marginBottom: "20px",
              }}
            >
              Lütfen{" "}
              <span style={{ color: "#fff", fontWeight: "600" }}>
                {communicationType}
              </span>{" "}
              {instructionText}
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-start",
                marginBottom: "20px",
              }}
            >
              {codes.map((code, index) => (
                <input
                  key={index}
                  id={`code-input-${index}`}
                  type="text"
                  value={code}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength="1"
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "24px",
                    textAlign: "center",
                    backgroundColor: "#2b2d33",
                    color: "#fff",
                    border: "2px solid #555",
                    borderRadius: "5px",
                    outline: "none",
                  }}
                />
              ))}
            </div>
            <button
              onClick={handleVerifyCode}
              disabled={isButtonDisabled}
              style={{
                width: "calc(50px * 6 + 50px)",
                height: "50px",
                marginBottom: "10px",
                backgroundColor: isButtonDisabled ? "#222429" : "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              Onayla
            </button>
            <p style={{ marginTop: "10px", textAlign: "center" }}>
              <a href="#" style={{ color: "#007bff", fontSize: "14px" }}>
                Doğrulama kodunu almadınız mı?
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">
          İlk giriş, hesap açma olarak kabul edilir
        </h1>

        <div className="login-tabs">
          <button
            className={!isMobile ? "active" : ""}
            onClick={() => handleTabClick("E-posta")}
          >
            E-posta
          </button>
          <button
            className={isMobile ? "active" : ""}
            onClick={() => handleTabClick("Mobil")}
          >
            Mobil
          </button>
          <button className="qr-login-button">
            <svg
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="0 0 20 20"
              data-icon="Qrcode"
            >
              <path
                d="M16.9231 13.8462H13.8462V10.7692H10.7692V15.3846H20V10.7692H16.9231V13.8462Z"
                fill="currentColor"
              ></path>
              <path
                d="M13.8462 16.9231H10.7692V20H13.8462V16.9231Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.23077 10.7692H0V20H9.23077V10.7692ZM3.07692 16.9231V13.8462H6.15385V16.9231H3.07692Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.23077 0H0V9.23077H9.23077V0ZM3.07692 6.15385V3.07692H6.15385V6.15385H3.07692Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 0H10.7692V9.23077H20V0ZM13.8462 6.15385V3.07692H16.9231V6.15385H13.8462Z"
                fill="currentColor"
              ></path>
              <path
                d="M20 16.9231H16.9231V20H20V16.9231Z"
                fill="currentColor"
              ></path>
            </svg>
            Karekod ile giriş
          </button>
        </div>

        <div className="login-form">
          <div className="input-field">
            <input
              type={isMobile ? "phone" : "email"}
              placeholder={
                isMobile ? "Telefon numarası" : `✉ E-posta/Alt Hesap`
              }
              value={email}
              onChange={handleEmailChange}
              disabled={isEmailOrPhoneDisabled}
            />
          </div>

          {showPasswordInput && (
            <div className="input-field">
              <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          )}

          {showConfirmPasswordInput && (
            <div className="input-field">
              <input
                type="password"
                placeholder="Şifreyi Onayla"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          )}

          <div className="login-actions">
            <label>
              <input type="checkbox" /> Davet Kodunu Girin (İsteğe Bağlı)
            </label>

            {showContinueButton && (
              <button className="continue-button" onClick={handleNext}>
                {buttonText}
              </button>
            )}
          </div>

          <p className="alternative-login">
            <span className="new-separator-line"></span>veya şu yöntemlerle
            giriş yapın
            <span className="new-separator-line"></span>
          </p>

          <div className="social-login">
          <button className="social-button">
              <svg
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="0 0 1024 1024"
                data-icon="Icongoogle1"
              >
                <path
                  d="M977.454545 565.434182a539.927273 539.927273 0 0 0-8.192-94.114909h-447.767272v178.269091h256.465454A214.946909 214.946909 0 0 1 683.101091 790.341818v115.805091h153.041454C925.789091 825.530182 977.454545 706.373818 977.454545 565.434182z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M521.588364 1018.042182c128.093091 0 235.985455-40.96 314.647272-111.802182L683.287273 790.434909c-42.635636 28.113455-97.373091 44.218182-161.605818 44.218182a281.879273 281.879273 0 0 1-163.560728-52.875636A284.858182 284.858182 0 0 1 255.069091 643.444364H97.28v119.342545c80.709818 156.392727 244.829091 255.255273 424.308364 255.255273z"
                  fill="#34A853"
                ></path>
                <path
                  d="M254.882909 643.444364a271.080727 271.080727 0 0 1 0-177.245091V346.949818H97.093818a452.701091 452.701091 0 0 0 0 415.837091l157.789091-119.342545z"
                  fill="#FBBC04"
                ></path>
                <path
                  d="M521.588364 274.990545a261.399273 261.399273 0 0 1 182.085818 69.53891l135.540363-132.189091A462.661818 462.661818 0 0 0 521.588364 91.694545C342.109091 91.694545 177.803636 190.370909 97.28 346.949818L255.069091 466.199273a284.858182 284.858182 0 0 1 102.958545-138.24 281.879273 281.879273 0 0 1 163.560728-52.968728z"
                  fill="#EA4335"
                ></path>
              </svg>
            </button>
            <button className="social-button">
              <svg
                className="apple-login"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="0 0 1024 1024"
                data-icon="AppleFilled"
              >
                <path d="M781.152 517.547c1.35 140.502 129.231 187.259 130.72 187.907-1.162 3.216-20.492 66.642-67.481 132.167-40.604 56.626-82.659 112.933-149.023 114.093-65.292 1.165-86.199-36.882-160.801-36.882-74.562 0-97.891 35.723-159.597 38.048-63.984 2.329-112.789-61.102-153.729-117.497-83.732-115.399-147.627-326.037-61.751-468.213 42.612-70.649 118.847-115.307 201.509-116.514 62.918-1.073 122.337 40.467 160.71 40.467 38.513 0 110.649-49.921 186.511-42.612 31.716 1.26 120.898 12.201 178.13 92.025-4.563 2.839-106.41 59.285-105.201 177.010v0zM514.026 237.942c-7.358-53.414 20.211-108.929 51.695-143.808 35.161-39.259 94.487-68.457 143.481-70.32 6.287 54.393-16.716 109.020-50.667 148.37-34.043 39.216-89.836 69.81-144.507 65.758v0zM514.026 237.942z"></path>
              </svg>
            </button>
            <button className="social-button">
              <svg
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="0 0 28 29"
                data-icon="Metamask"
              >
                <path
                  d="M15.6468 10.8244L12.3428 10.8295L11.0536 7.71594L15.6468 10.8244Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M11.0536 7.71598L16.9803 7.70361L15.6468 10.8244L11.0536 7.71598Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M12.3428 10.8296L4.02687 4.57495L11.0536 7.71597L12.3428 10.8296Z"
                  fill="#E4761B"
                ></path>
                <path
                  d="M23.9749 4.52209L15.6467 10.8244L16.9803 7.70359L23.9749 4.52209Z"
                  fill="#E2761B"
                ></path>
                <path
                  d="M7.40035 13.4927L3.63225 12.5111L3.43001 11.6323L7.40035 13.4927ZM3.76111 13.5668L3.63219 12.5111L7.40035 13.4927L3.76111 13.5668ZM4.28827 15.0917L7.40035 13.4927L9.01852 13.7802L4.28827 15.0917Z"
                  fill="#763D16"
                ></path>
                <path
                  d="M3.76111 13.5668L7.40035 13.4927L4.28827 15.0916L3.76111 13.5668ZM20.6391 13.4788L24.6145 11.6029L24.4106 12.4855L20.6391 13.4788ZM24.2799 13.5454L20.6391 13.4788L24.4106 12.4855L24.2799 13.5454ZM23.7495 15.0767L18.9995 13.7702L20.6391 13.4788L23.7495 15.0767Z"
                  fill="#763D16"
                ></path>
                <path
                  d="M24.2799 13.5454L23.7495 15.0766L20.6391 13.4788L24.2799 13.5454ZM7.56077 8.71387L7.40035 13.4927L3.43001 11.6323L7.56077 8.71387ZM9.01857 13.7801L7.40035 13.4927L7.56077 8.71387L9.01857 13.7801Z"
                  fill="#763D16"
                ></path>
                <path
                  d="M9.11284 23.4921L10.3478 22.8386L10.5638 22.7877L9.11284 23.4921ZM17.4792 22.7919L17.6699 22.843L18.8745 23.4992L17.4792 22.7919Z"
                  fill="#E2761B"
                ></path>
                <path
                  d="M24.6145 11.603L20.6391 13.4788L20.4466 8.68933L24.6145 11.603Z"
                  fill="#763D16"
                ></path>
                <path
                  d="M20.4466 8.68933L20.6391 13.4788L18.9994 13.7702L20.4466 8.68933Z"
                  fill="#763D16"
                ></path>
                <path
                  d="M9.11283 23.492L3.82824 25.4442L2.53342 20.1577L9.11283 23.492Z"
                  fill="#E4761B"
                ></path>
                <path
                  d="M2.93918 11.9501L3.43005 11.6323L3.63224 12.5111L2.93918 11.9501Z"
                  fill="#763D16"
                ></path>
                <path
                  d="M25.5317 20.1608L24.2356 25.4662L18.8745 23.4992L25.5317 20.1608Z"
                  fill="#E4761B"
                ></path>
                <path
                  d="M7.56076 8.71387L12.3427 10.8295L9.01856 13.7801L7.56076 8.71387ZM3.7611 13.5668L3.07533 12.897L3.63218 12.511L3.7611 13.5668ZM18.9994 13.7701L15.6467 10.8244L20.4466 8.6892L18.9994 13.7701ZM25.1058 11.9206L24.4106 12.4855L24.6145 11.6029L25.1058 11.9206ZM3.43 11.6323L2.81866 7.96289L7.56076 8.71387L3.43 11.6323ZM4.28826 15.0916L3.30546 13.8605L3.76104 13.5668L4.28826 15.0916Z"
                  fill="#763D16"
                ></path>
                <path
                  d="M24.2799 13.5455L24.4106 12.4856L24.9678 12.8717L24.2799 13.5455ZM20.4466 8.68934L25.2137 7.91724L24.6145 11.603L20.4466 8.68934Z"
                  fill="#763D16"
                ></path>
                <path
                  d="M7.54011 15.4302L2.53342 20.1577L4.2882 15.0917L7.54011 15.4302Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M23.7495 15.0767L24.2798 13.5454L24.7358 13.8393L23.7495 15.0767Z"
                  fill="#763D16"
                ></path>
                <path
                  d="M6.75185 19.5446L2.53348 20.1577L7.54011 15.4302L6.75185 19.5446Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M2.53348 20.1577L6.75185 19.5446L9.11289 23.492L2.53348 20.1577Z"
                  fill="#E4761B"
                ></path>
                <path
                  d="M20.4341 15.421L23.7495 15.0767L25.5317 20.1608L20.4341 15.421ZM20.4341 15.421L25.5317 20.1608L21.223 19.5449L20.4341 15.421Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M18.8745 23.4991L21.223 19.5449L25.5317 20.1607L18.8745 23.4991Z"
                  fill="#E4761B"
                ></path>
                <path
                  d="M4.28825 15.0917L9.0185 13.7802L7.5401 15.4303L4.28825 15.0917ZM23.7495 15.0768L20.4341 15.4211L18.9994 13.7703L23.7495 15.0768Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M9.01857 13.7802L12.3428 10.8296L12.5927 15.4564L9.01857 13.7802ZM12.5927 15.4564L7.54012 15.4302L9.01857 13.7802L12.5927 15.4564ZM18.9994 13.7702L20.4341 15.4211L15.348 15.4544L18.9994 13.7702ZM15.348 15.4544L15.6468 10.8245L18.9994 13.7702L15.348 15.4544Z"
                  fill="#E4761B"
                ></path>
                <path
                  d="M4.02687 4.57494L12.3427 10.8296L7.56076 8.71393L4.02687 4.57494ZM7.56076 8.71393L2.81873 7.96295L4.02681 4.57494L7.56076 8.71393ZM23.9749 4.52209L25.2136 7.91721L20.4466 8.68931L23.9749 4.52209ZM20.4466 8.68931L15.6467 10.8245L23.9749 4.52209L20.4466 8.68931Z"
                  fill="#763D16"
                ></path>
                <path
                  d="M12.3427 10.8295L15.6467 10.8245L15.348 15.4544L12.3427 10.8295Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M15.348 15.4544L12.5926 15.4564L12.3427 10.8296L15.348 15.4544Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M9.11283 23.4921L6.75185 19.5447L9.58877 19.4092L9.11283 23.4921ZM18.8745 23.4992L18.3566 19.4092L21.223 19.545L18.8745 23.4992ZM9.54776 17.3768L7.5401 15.4302L12.5926 15.4564L9.54776 17.3768Z"
                  fill="#CD6116"
                ></path>
                <path
                  d="M7.5401 15.4302L9.58877 19.4092L6.75185 19.5446L7.5401 15.4302Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M7.54012 15.4302L9.54777 17.3768L9.58878 19.4092L7.54012 15.4302Z"
                  fill="#E4751F"
                ></path>
                <path
                  d="M15.348 15.4543L20.4341 15.421L18.4046 17.3735L15.348 15.4543Z"
                  fill="#CD6116"
                ></path>
                <path
                  d="M21.223 19.545L18.3566 19.4092L20.4342 15.4211L21.223 19.545Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M20.4341 15.421L18.3566 19.4092L18.4046 17.3735L20.4341 15.421Z"
                  fill="#E4751F"
                ></path>
                <path
                  d="M10.1083 24.0684L9.11288 23.4919L11.9709 23.6968L10.1083 24.0684ZM15.8859 23.6998L18.8745 23.4991L17.8479 24.0749L15.8859 23.6998Z"
                  fill="#C0AD9E"
                ></path>
                <path
                  d="M12.5926 15.4563L11.3667 16.5286L9.54776 17.3767L12.5926 15.4563Z"
                  fill="#CD6116"
                ></path>
                <path
                  d="M11.9409 22.5656L11.9709 23.6969L9.11288 23.4921L11.9409 22.5656Z"
                  fill="#D7C1B3"
                ></path>
                <path
                  d="M18.4046 17.3735L16.5788 16.5259L15.348 15.4543L18.4046 17.3735Z"
                  fill="#CD6116"
                ></path>
                <path
                  d="M12.1963 20.4482L9.11284 23.492L9.58884 19.4092L12.1963 20.4482Z"
                  fill="#E4761B"
                ></path>
                <path
                  d="M9.11284 23.4921L12.1963 20.4481L11.9409 22.5655L9.11284 23.4921ZM15.8914 22.5677L18.8745 23.4991L15.886 23.6999L15.8914 22.5677Z"
                  fill="#D7C1B3"
                ></path>
                <path
                  d="M15.6328 20.4488L18.3566 19.4092L18.8745 23.4992L15.6328 20.4488Z"
                  fill="#E4761B"
                ></path>
                <path
                  d="M18.8745 23.4991L15.8914 22.5677L15.6328 20.4487L18.8745 23.4991Z"
                  fill="#D7C1B3"
                ></path>
                <path
                  d="M9.58883 19.4092L9.54776 17.3767L12.1047 17.9954L9.58883 19.4092Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M12.1047 17.9954L9.54776 17.3767L11.3667 16.5286L12.1047 17.9954Z"
                  fill="#233447"
                ></path>
                <path
                  d="M18.3566 19.4092L15.8273 17.9946L18.4046 17.3735L18.3566 19.4092Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M15.8273 17.9945L16.5789 16.5259L18.4046 17.3735L15.8273 17.9945Z"
                  fill="#233447"
                ></path>
                <path
                  d="M11.3667 16.5287L12.5927 15.4564L12.1047 17.9955L11.3667 16.5287ZM16.5789 16.526L15.8273 17.9946L15.348 15.4545L16.5789 16.526Z"
                  fill="#CD6116"
                ></path>
                <path
                  d="M12.6917 16.9154L12.5927 15.4565L15.348 15.4545L12.6917 16.9154Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M12.1047 17.9954L12.5926 15.4563L12.6917 16.9153L12.1047 17.9954Z"
                  fill="#E4751F"
                ></path>
                <path
                  d="M15.348 15.4543L15.2295 16.9142L12.6917 16.9154L15.348 15.4543Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M15.8273 17.9946L15.2295 16.9143L15.348 15.4545L15.8273 17.9946Z"
                  fill="#E2761B"
                ></path>
                <path
                  d="M11.9709 23.6969L12.1376 24.5546L10.1083 24.0685L11.9709 23.6969ZM17.8479 24.075L15.7131 24.558L15.886 23.6999L17.8479 24.075Z"
                  fill="#C0AD9E"
                ></path>
                <path
                  d="M12.1963 20.4481L9.58882 19.4092L12.1047 17.9954L12.1963 20.4481ZM15.8273 17.9945L18.3566 19.4091L15.6328 20.4488L15.8273 17.9945Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M12.6917 16.9153L12.6399 20.1395L12.1047 17.9954L12.6917 16.9153Z"
                  fill="#E4751F"
                ></path>
                <path
                  d="M12.1047 17.9955L12.6399 20.1395L12.1963 20.4481L12.1047 17.9955Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M15.2295 16.9142L15.8273 17.9945L15.1889 20.1398L15.2295 16.9142Z"
                  fill="#E4751F"
                ></path>
                <path
                  d="M15.6328 20.4488L15.1889 20.1398L15.8273 17.9945L15.6328 20.4488Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M12.6917 16.9153L15.2295 16.9142L15.1889 20.1398L12.6917 16.9153ZM15.1888 20.1398L12.6399 20.1395L12.6917 16.9153L15.1888 20.1398Z"
                  fill="#F6851B"
                ></path>
                <path
                  d="M12.1376 24.5546L11.9709 23.6969L11.9409 22.5656L12.1376 24.5546ZM15.8914 22.5678L15.886 23.6999L15.7131 24.5579L15.8914 22.5678Z"
                  fill="#C0AD9E"
                ></path>
                <path
                  d="M11.9409 22.5654L12.1648 22.2362L12.1376 24.5545L11.9409 22.5654ZM12.1376 24.5545L12.1648 22.2362L15.6556 22.238L12.1376 24.5545Z"
                  fill="#C0AD9E"
                ></path>
                <path
                  d="M15.6556 22.238L15.7131 24.5579L12.1376 24.5546L15.6556 22.238ZM15.7131 24.5578L15.6556 22.238L15.8914 22.5677L15.7131 24.5578Z"
                  fill="#C0AD9E"
                ></path>
                <path
                  d="M12.1648 22.2362L11.9409 22.5654L12.1963 20.448L12.1648 22.2362ZM15.6328 20.4487L15.8914 22.5676L15.6556 22.2379L15.6328 20.4487ZM12.6035 20.3319L12.6399 20.1394L15.1889 20.1398L12.6035 20.3319Z"
                  fill="#161616"
                ></path>
                <path
                  d="M12.1963 20.448L12.6399 20.1394L12.6035 20.3319L12.1963 20.448Z"
                  fill="#161616"
                ></path>
                <path
                  d="M15.1888 20.1398L15.2016 20.3324L12.6036 20.3319L15.1888 20.1398ZM15.2016 20.3324L15.1889 20.1398L15.6328 20.4487L15.2016 20.3324ZM12.1963 20.4481L12.3194 20.6521L12.1648 22.2362L12.1963 20.4481Z"
                  fill="#161616"
                ></path>
                <path
                  d="M12.6035 20.332L12.3194 20.6522L12.1963 20.4482L12.6035 20.332ZM15.6556 22.2381L15.4858 20.6529L15.6328 20.4488L15.6556 22.2381Z"
                  fill="#161616"
                ></path>
                <path
                  d="M15.6328 20.4488L15.4858 20.6529L15.2016 20.3325L15.6328 20.4488ZM15.6556 22.2381L12.1648 22.2363L12.3194 20.6522L15.6556 22.2381ZM12.3194 20.6522L15.4858 20.6529L15.6556 22.2381L12.3194 20.6522ZM12.3194 20.6522L12.6035 20.332L15.2016 20.3325L12.3194 20.6522Z"
                  fill="#161616"
                ></path>
                <path
                  d="M15.2015 20.3324L15.4858 20.6528L12.3194 20.6521L15.2015 20.3324Z"
                  fill="#161616"
                ></path>
              </svg>
            </button>
            <button className="social-button">
              <svg
                className="telegram-login"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="0 0 1024 1024"
                data-icon="TelegramFilled"
              >
                <path d="M417.28 795.733l11.947-180.48L756.907 320c14.506-13.227-2.987-19.627-22.187-8.107L330.24 567.467 155.307 512c-37.547-10.667-37.974-36.693 8.533-55.467l681.387-262.826c31.146-14.08 61.013 7.68 49.066 55.466L778.24 795.733c-8.107 38.827-31.573 48.214-64 30.294L537.6 695.467l-84.907 82.346c-9.813 9.814-17.92 17.92-35.413 17.92z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="separator-line"></div>
      
      <div className="bonus-info">
        <img
          src="https://static.mocortech.com/www/static/images/login/login-reward-8000-tr-TR.png"
          alt="Bonus Görseli"
          className="bonus-image"
        />
        <p className="bonus-text-large">
          <span className="highlight-text">8.000 USDT</span>'ye Kadar Bonus
          Kazanmak için
        </p>
        <p className="bonus-text-large">Hesap Açın</p>
      </div>
    </div>
  );
};

export default Login;
