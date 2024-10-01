import "react-multi-carousel/lib/styles.css";
import "../styles/home.css";
import { Button, Carousel as AntdCarousel, Popover, Tooltip } from "antd";
import { default as ReactCarousel } from "react-multi-carousel";
import { useEffect, useRef, useState } from "react";
import Populars from "./Populars.jsx";
import CryptoList from "./CryptoList.jsx";
import data from "../data/activity.json";
import timeData from "../data/time-down.json";
import imgData from "../data/image.json";
import CountdownT from "./Countdown.jsx";

const noticeData = [
  {
    title: "LOL (LOL) - Kickstarter Oylama Sonucu ve Listelenme Planı",
    link: "#",
  },
  {
    title:
      "[İlk Listeleme] MEXC, WUKONG (WUKONG) Projesini Değerlendirme Bölgesinde Listeleyecek",
    link: "#",
  },
  {
    title:
      "MEXC CATDOG, NEIRO, SUNWUKONG, SUNCAT, CVP, TRUMP, BCCOIN, MAGA, NPC, VISTA ve LRDS USDT-M Vadeli İşlemleri Alım Satım Hizmetini Yeniden Başlattı (7 Eylül)",
    link: "#",
  },
  {
    title:
      "MEXC USDT Spot Piyasası için Sistem Yükseltmesini Tamamladı (7 Eylül)",
    link: "#",
  },
  {
    title: "USDT Spot Emir İptali Bildirimi (7 Eylül)",
    link: "#",
  },
  {
    title:
      "MEXC, NEIROETH USDT-M Vadeli İşlemleri Fonlama Oranı Uzlaşma Sıklığı Düzenlemesi (6 Eylül)",
    link: "#",
  },
  {
    title: "QTK Yatırma ve Alım Satım İşlemleri Yeniden Etkinleştirilecek",
    link: "#",
  },
  {
    title: "MEXC, Optimism (OP) Ağ Yükseltmesini Destekleyecek",
    link: "#",
  },
  {
    title:
      "[İlk Listeleme] MEXC Kickstarter - LOL (LOL) Projesi için Oy Kullanın, 362.500 LOL Airdrop Kazanın!",
    link: "#",
  },
  {
    title:
      "MEXC, SNT USDT-M Vadeli İşlemlerinin Maksimum Kaldıraç Çarpanını Düşürecek (6 Eylül)",
    link: "#",
  },
  {
    title:
      "MEXC, QUICK USDT-M Vadeli İşlemleri Fonlama Oranı Uzlaşma Sıklığı Düzenlemesi (6 Eylül)",
    link: "#",
  },
  {
    title: "ADA Yatırma ve Çekme İşlemleri Askıya Alındı",
    link: "#",
  },
  {
    title:
      "MEXC İşlem Kopyalama, QUICK USDT-M Vadeli İşlemlerini Destekleyecek",
    link: "#",
  },
  {
    title:
      "Voting Result and Listing Arrangement for Kickstarter - Covasart (CO)",
    link: "#",
  },
  {
    title:
      'MEXC Vadeli İşlemler "15-200x Vadeli Kaldıraç Yarışması" Başlıyor - BIGTIME, APE, ADA, FLOKI, SAGA, APT, BSW ve DOGE USDT-M Sürekli Vadeli İşlemi Yaparak 20.000 USDT Bonus Kazanın! (6 - 11 Eylül)',
    link: "#",
  },
  {
    title: "Playahh App (PLAH) - Kickstarter Oylama Sonucu ve Listelenme Planı",
    link: "#",
  },
];

const communitySocialData = [
  {
    icon: "https://public.mocortech.com/banner/F20230822155229778s0suWntyOovsxl.png",
    links: [
      {
        name: "MEXC Official",
        link: "#",
      },
      {
        name: "MEXC Türkiye",
        link: "#",
      },
      {
        name: "MEXC Việt Nam",
        link: "#",
      },
      {
        name: "MEXC Korea",
        link: "#",
      },
    ],
  },
  {
    icon: "https://public.mocortech.com/banner/F202308221552408392lb9SGdeK5017S.png",
    links: [
      {
        name: "MEXC Official",
        link: "#",
      },
      {
        name: "MEXC Korea",
        link: "#",
      },
      {
        name: "MEXC Türkiye",
        link: "#",
      },
      {
        name: "MEXC DACH🇩🇪🇨🇭🇦🇹",
        link: "#",
      },
    ],
  },
  {
    icon: "https://public.mocortech.com/banner/F202307241212107880YTsQlvnBAvjuQ.jpeg",
    links: [
      {
        name: "MEXC Official",
        link: "#",
      },
      {
        name: "MEXC Türkiye",
        link: "#",
      },
      {
        name: "MEXC Việt Nam",
        link: "#",
      },
      {
        name: "MEXC Русский",
        link: "#",
      },
    ],
  },
  {
    icon: "https://public.mocortech.com/banner/F20230822155305528L9mV2FVnwudz35.png",
    links: [
      {
        name: "MEXC Korea",
        link: "#",
      },
      {
        name: "MEXC Türkiye",
        link: "#",
      },
    ],
  },
  {
    icon: "https://public.mocortech.com/banner/F20230822155318715TXC1ahjCQHGjfH.png",
    link: "#",
  },
  {
    icon: "https://public.mocortech.com/banner/F20230724121158714sGf4sSd41CbTGD.jpeg",
    links: [
      {
        name: "MEXC Türkiye",
        link: "#",
      },
      {
        name: "MEXC Việt Nam",
        link: "#",
      },
    ],
  },
  {
    icon: "https://public.mocortech.com/banner/F20230822155337560uFg55xz4kjrKc6.png",
    link: "#",
  },
  {
    icon: "https://public.mocortech.com/banner/F20230822155349228BGxdO9lZYpFFYV.png",
    link: "#",
  },
  {
    icon: "https://public.mocortech.com/banner/F202308221554012327aWtAh2tFavbYb.png",
    link: "#",
  },
  {
    icon: "https://public.mocortech.com/banner/F202308221554114182thJcamotY7rP5.png",
    link: "#",
  },
];
const addClass = (element, className) => {
  if (element.current) {
    element.current.classList.add(className);
  }
};

const removeClass = (element, className) => {
  if (element.current) {
    element.current.classList.remove(className);
  }
};

export default function Homepage() {
  const topVideo = useRef(null);
  const bottomVideo = useRef(null);
  const elementRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(false);
  const contacRef = useRef(null);
  const [pinTab, setPintab] = useState(false);
  const [time, setTime] = useState(timeData);

  const handlePinBar = () => {
    setPintab((prevState) => !prevState);
    if (pinTab) {
      contacRef.current.classList.remove("sidebar_expandWrapper__4TpDm");
    } else {
      contacRef.current.classList.add("sidebar_expandWrapper__4TpDm");
    }
  };
  const handleScrollTop = () => {
    document.body.scrollTop = 0;
  };
  const handleScroll = () => {
    const scrollPosition = document.body.scrollTop;
    if (scrollPosition > 100) {
      setScrollTop(true);
    } else {
      setScrollTop(false);
    }
    addClass(elementRef, "banner-bottom-bar_isScroll__ErFdi");
    setTimeout(() => {
      removeClass(elementRef, "banner-bottom-bar_isScroll__ErFdi");
    }, 1000);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
  
    if (topVideo.current) {
      topVideo.current.play();
    }
  
    if (bottomVideo.current) {
      bottomVideo.current.play();
    }
  
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <div
        className="banner-bottom-bar_bottomBar__IuLsX banner-bottom-bar_isScrollStop__j6DKa"
        ref={elementRef}
      >
        <div
          className="banner-bottom-bar_barInfo__bCyyu"
          onClick={() => (window.location.href = "/exchange")}
        >
          <svg
            className="sc-gEvEer hSTeNi mx-icon"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-icon="IconMarket"
          >
            <path
              d="M21 5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5ZM13.7353 7H17C17.5523 7 18 7.44772 18 8C18 8.55228 17.5523 9 17 9H14.8897L10.2686 17H7C6.44772 17 6 16.5523 6 16C6 15.4477 6.44772 15 7 15H9.1142L13.7353 7Z"
              fill="currentColor"
            ></path>
          </svg>
          <div>Market</div>
        </div>
        <div
          className="banner-bottom-bar_barInfo__bCyyu"
          onClick={() => (window.location.href = "/exchange")}
        >
          <svg
            className="sc-gEvEer hSTeNi mx-icon"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-icon="IconTrade"
          >
            <path
              d="M7.0002 4C7.0002 3.44772 6.55249 3 6.0002 3C5.44792 3 5.0002 3.44772 5.0002 4V12.9994H1.95985C1.57501 12.9994 1.3343 13.416 1.52663 13.7493L5.56378 20.7462C5.7561 21.0796 6.23712 21.0798 6.42973 20.7466L10.4747 13.7497C10.6674 13.4164 10.4266 12.9994 10.0416 12.9994H7.0002V4Z"
              fill="currentColor"
            ></path>
            <path
              d="M22.4669 10.2498C22.6596 10.5831 22.4159 11 22.0309 11H19.0002V19.9996C19.0002 20.5519 18.5525 20.9996 18.0002 20.9996C17.4479 20.9996 17.0002 20.5519 17.0002 19.9996V11H13.9699C13.5851 11 13.3402 10.5835 13.5325 10.2502L17.5628 3.26513C17.7551 2.9318 18.2362 2.9316 18.4288 3.26476L22.4669 10.2498Z"
              fill="currentColor"
            ></path>
          </svg>
          <div>Al-Sat Yap</div>
        </div>
        <div
          className="banner-bottom-bar_barInfo__bCyyu"
          onClick={() => (window.location.href = "/exchange")}
        >
          <svg
            className="sc-gEvEer hSTeNi mx-icon"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-icon="IconFutures"
          >
            <path
              d="M10 10.0001L12.0001 8L14.0001 10.0001L12.0001 12.0002L10 10.0001Z"
              fill="currentColor"
            ></path>
            <path
              d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V7L15 2H6ZM16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10ZM8 17H16C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19H8C7.44772 19 7 18.5523 7 18C7 17.4477 7.44772 17 8 17Z"
              fill="currentColor"
            ></path>
          </svg>
          <div>Vadeli İşlemler</div>
        </div>
        <div
          className="banner-bottom-bar_barInfo__bCyyu"
          onClick={() => (window.location.href = "/wallet")}
        >
          <svg
            className="sc-gEvEer hSTeNi mx-icon"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-icon="IconWallet"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 5C21 3.89543 20.1046 3 19 3H6C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H19C20.1046 21 21 20.1046 21 19V9.25056C21 8.5602 20.4404 8.00056 19.75 8.00056H6.5C5.67157 8.00056 5 7.32898 5 6.50056C5 5.67213 5.67157 5.00056 6.5 5.00056C7.93983 5.00056 9.37966 5.0007 10.8195 5.00083C14.213 5.00116 17.6065 5.00149 21 5ZM19.0312 14.5C19.0312 15.3284 18.3597 16 17.5312 16C16.7028 16 16.0312 15.3284 16.0312 14.5C16.0312 13.6716 16.7028 13 17.5312 13C18.3597 13 19.0312 13.6716 19.0312 14.5Z"
              fill="currentColor"
            ></path>
          </svg>
          <div>Cüzdanlar</div>
        </div>
      </div>
      <div className="banner-wrapper">
        <div className="banner-img-wrapper">
          <div className="banner-img-content">
            <div className="video-player_video-player-content__background">
              <video
                src="/public/background-home.mp4"
                ref={topVideo}
                muted
                preload="auto"
                loop
              ></video>
            </div>
            <div className="banner-background-shadowBox">
              <p className="banner-background-shadowBox__inner"></p>
            </div>
          </div>
        </div>
        <div className="banner-content-wrapper">
          <div className="home-container">
            <div className="banner-content">
              <div className="banner-content-box">
                <div className="banner-content-box__title">
                  <h1>
                    En Fazla İşlem Çifti
                    <br />
                    En Düşük İşlem Ücretleri
                  </h1>
                </div>
                <p className="banner-content-box__desc">
                  Piyasa Yapıcı <strong>0%</strong>⠀|⠀Piyasa Alıcı <strong>%0,01-%0,02</strong>
                </p>
              </div>
              <div className="banner-content-action">
                {!isLoggedIn && (
                  <Button
                    type="primary"
                    className="banner-content-action__btn login-btn"
                    onClick={() => {
                      window.location.href = "/login";
                    }}
                  >
                    Kayıt Ol
                  </Button>
                )}
                <Popover
                  className="banner-content-action__btn social-btn social-btn-qr"
                  overlayStyle={{ width: "176px" }}
                  placement="bottom"
                  content={
                    <div>
                      <p className="banner-content-action-btn__title">
                        Uygulamayı indirmek için tarayın
                      </p>
                      <div className="qr-img">
                        <img src="./qr-1.png" alt="" />
                      </div>
                    </div>
                  }
                >
                  <Button
                    icon={
                      <svg
                        focusable="true"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        style={{ fontSize: "18px" }}
                        viewBox="0 0 1024 1024"
                        data-icon="QrcodeOutlined"
                      >
                        <path d="M708.928 708.928h157.568V551.36H1024v236.352h-157.504v78.72h-157.568v-78.72H551.36V551.36h157.568v157.568zM0 551.36h472.64V1024H0V551.36z m157.568 157.568v157.568h157.504v-157.568H157.568zM0 0h472.64v472.64H0V0z m157.568 157.568v157.504h157.504V157.568H157.568zM551.36 0H1024v472.64H551.36V0z m157.568 157.568v157.504h157.568V157.568h-157.568z m157.568 708.928H1024V1024h-157.504v-157.504z m-315.136 0h157.568V1024H551.36v-157.504z"></path>
                      </svg>
                    }
                  >
                    İndir
                  </Button>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bonus-container">
        {/* Bonus Item 1 */}
        <div className="bonus-card">
          <div className="bonus-icon">
            <img
              src="https://static.mocortech.com/www/static/images/new-home/mobility/mobility_bouns.png"
              alt="Bonus Icon 1"
            />
          </div>
          <div className="bonus-content">
            <h3>8,000 USDT Bonus Kazanmak İçin Hesap Açın</h3>
            <p>Hemen Alın</p>
          </div>
        </div>

        {/* Bonus Item 2 */}
        <div className="bonus-card">
          <div className="bonus-icon">
            <img
              src="https://static.mocortech.com/www/static/images/new-home/mobility/mobility_upcoin.png"
              alt="Bonus Icon 2"
            />
          </div>
          <div className="bonus-content">
            <h3>Küresel Olarak En Popüler Tokenler</h3>
            <p>2,968 Spot, 472 Vadeli İşlemler</p>
          </div>
        </div>

        {/* Bonus Item 3 */}
        <div className="bonus-card">
          <div className="bonus-icon">
            <img
              src="https://static.mocortech.com/www/static/images/new-home/mobility/mobility_mx.png"
              alt="Bonus Icon 3"
            />
          </div>
          <div className="bonus-content">
            <h3>Airdrop Kazançlarında Dünya Çapında 1 Numara</h3>
            <p>Günlük Token Hediyesi, APY %66,50</p>
          </div>
        </div>
      </div>

      <div className="notice-wrapper">
        <div className="home-container">
          <div className="notice-content">
            <span>
              <svg
                className="speaker-icon"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="0 0 16 12"
                data-icon="HomeTrumpet"
                style={{ color: "var(--title)", fontSize: "16px" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0H5L3 3H0V6V9H3L5 12H8V0ZM16 6C16 9.31371 13.3137 12 10 12V11C12.7614 11 15 8.76142 15 6C15 3.23858 12.7614 1 10 1V0C13.3137 0 16 2.68629 16 6ZM13 6C13 7.65685 11.6569 9 10 9V8C11.1046 8 12 7.10457 12 6C12 4.89543 11.1046 4 10 4V3C11.6569 3 13 4.34315 13 6Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <div className="notice-wrapper-slider">
              <AntdCarousel autoplay dotPosition="right" dots={false}>
                {noticeData.map((item, index) => {
                  return (
                    <div key={index}>
                      <a className="notice-content-item" href={item.link}>
                        {item.title}
                      </a>
                    </div>
                  );
                })}
              </AntdCarousel>
            </div>
            <a className="notice-content-more" href="#">
              <span>Daha Fazla Görüntüle</span>
              <svg
                className="sc-gEvEer hSTeNi mx-icon iconfont iconic_arrow1 notices_arrow__hcJeo"
                focusable="false"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                viewBox="0 0 1024 1024"
                data-icon="ArrowRightOutlined"
              >
                <path d="M128 469.333333h604.586667l-152.746667-153.173333L640 256l256 256-256 256-60.16-60.16L732.586667 554.666667H128z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="activity-banner-wrapper">
        <div className="home-container">
          <ReactCarousel
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            showDots
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 4,
                partialVisibilityGutter: 40,
              },
              tablet: {
                breakpoint: {
                  max: 1200,
                  min: 464,
                },
                items: 3,
                partialVisibilityGutter: 30,
              },
              custom: {
                breakpoint: {
                  max: 950,
                  min: 464,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
              mobile: {
                breakpoint: {
                  max: 650,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {data.map((item, index) => {
              return (
                <a
                  className="activity-banner__item"
                  key={index}
                  style={{ backgroundImage: `url(${item.image})` }}
                  href={item.link}
                ></a>
              );
            })}
          </ReactCarousel>
        </div>
      </div>
      <CryptoList />
      <Populars />
      <div className="why-choose-mexc_why-choose-wrapper__ud1w8">
        <div className="why-choose-mexc_why-choose__SUZms home-container">
          <h2>Neden MEXC?</h2>
          <div className="why-choose-container">
            <div className="video-player_video-player__e0dtZ">
              <div className="video-player_video-player-content__Kmbbl">
                <video
                  src="https://learn.mocortech.com/learnvideo/Frontpage-Video-TR.mp4"
                  ref={bottomVideo}
                  muted
                  preload="auto"
                  loop
                ></video>
              </div>
              <div className="video-player_specs-tab__lYN2b">
                <div
                  className="video-player_specs-tab-content__61jqd"
                  data-theme="dark"
                >
                  <div className="video-player_specs-tab-item__sIc2t">
                    <svg
                      className="sc-gEvEer hSTeNi mx-icon"
                      focusable="false"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      viewBox="0 0 48 48"
                      data-icon="IconFee"
                    >
                      <path
                        d="M35.812 21.5126V23.0126H37.312H37.9946C39.1712 23.0126 39.977 23.6562 40.3171 24.4211C40.6508 25.1718 40.5586 26.065 39.7986 26.7731L25.8041 39.8117C24.819 40.7294 23.181 40.7294 22.1959 39.8117L8.20135 26.7731C7.44143 26.065 7.3492 25.1718 7.68295 24.4211C8.02303 23.6562 8.82876 23.0126 10.0054 23.0126H11.3287H12.8287V21.5126V9.72438C12.8287 8.59408 13.8451 7.5 15.3261 7.5H33.3146C34.7956 7.5 35.812 8.59408 35.812 9.72438V21.5126Z"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="3"
                      ></path>
                      <path
                        d="M22.5 16.5C22.5 15.6716 23.1716 15 24 15C24.8284 15 25.5 15.6716 25.5 16.5V29.5C25.5 30.3284 24.8284 31 24 31C23.1716 31 22.5 30.3284 22.5 29.5V16.5Z"
                        fill="currentColor"
                      ></path>
                      <rect
                        x="6"
                        y="39"
                        width="36"
                        height="3"
                        rx="1.5"
                        fill="currentColor"
                      ></rect>
                    </svg>
                    <label>Piyasadaki En Uygun İşlem Ücreti</label>
                  </div>
                  <div className="video-player_specs-tab-item__sIc2t">
                    <svg
                      className="sc-gEvEer hSTeNi mx-icon icon-liquidity"
                      focusable="false"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      viewBox="0 0 48 48"
                      data-icon="IconLiquidity"
                    >
                      <rect
                        x="7.5"
                        y="7.5"
                        width="33"
                        height="33"
                        rx="2.5"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="3"
                      ></rect>
                      <path
                        d="M16.6977 29H24.5V40.5H10C8.61929 40.5 7.5 39.3807 7.5 38V21.5H15.1977V27.5V29H16.6977Z"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="3"
                      ></path>
                      <path
                        d="M24.5 24V40.5H38C39.3807 40.5 40.5 39.3807 40.5 38V14.5H31.5571V22.5V24H30.0571H24.5Z"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="3"
                      ></path>
                    </svg>
                    <label>Piyasadaki En İyi Likidite Oranı</label>
                  </div>
                  <div className="video-player_specs-tab-item__sIc2t video-player_specs-tab-item__active__rBx_j">
                    <svg
                      className="sc-gEvEer hSTeNi mx-icon"
                      focusable="false"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      viewBox="0 0 48 48"
                      data-icon="IconSecurity"
                    >
                      <path
                        d="M8.01953 10.7604L23.9038 7.54981C23.9688 7.53668 24.0357 7.5366 24.1006 7.54955L39.9742 10.7143C40.2229 10.7639 40.3951 10.9918 40.3749 11.2446L38.7981 30.9021C38.7853 31.061 38.6976 31.2043 38.5618 31.2879L24.2577 40.093C24.0975 40.1916 23.8955 40.192 23.7349 40.0939L9.42155 31.3482L8.63946 32.6281L9.42155 31.3482C9.2849 31.2647 9.1965 31.1208 9.18381 30.9611L7.62016 11.2901C7.60012 11.0379 7.77158 10.8105 8.01953 10.7604Z"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="3"
                      ></path>
                      <path
                        d="M32.6178 19.9447C33.2036 19.3589 33.2036 18.4091 32.6178 17.8234C32.032 17.2376 31.0823 17.2376 30.4965 17.8234L23.2641 25.0558C23.0688 25.251 22.7522 25.251 22.557 25.0558L19.0216 21.5204C18.4358 20.9346 17.486 20.9346 16.9003 21.5204C16.3145 22.1062 16.3145 23.0559 16.9003 23.6417L22.2035 28.945C22.5941 29.3355 23.2273 29.3355 23.6178 28.945L32.6178 19.9447Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <label>Dünya Standartlarında Güvenlik Sistemi</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Button
            type="primary"
            className="section-main-btn"
            onClick={() => (window.location.href = "/login")}
          >
            Al-Sat Yapmaya Başla
          </Button>
        </div>
      </div>
      <div className="products_productsContWrap__4ogse home-container">
        <h2>Ürünlerimizi Keşfedin</h2>
        <ul className="products_productsCont__QZKeW">
          <li>
            <div className="products_webCont__QX7YI">
              <img
                src="./product-future_2x.png"
                alt="mexc"
                loading="lazy"
                width="200"
                height="200"
              />
              <div className="products_rightPart__zRAWS">
                <h3>Vadeli İşlemler</h3>
                <p>No. 1 Likidite, Yapıcı Ücreti.</p>
                <p className="products_des__CFIiD">
                  Yeni ve yüksek kaliteli kripto projelerini iyi likidite ile
                  verimli bir şekilde başlatıyoruz.
                </p>
                <aside>
                  <button
                    type="button"
                    className="ant-btn ant-btn-text products_productsLink__7krbH"
                  >
                    <span>Daha Fazla Bilgi</span>
                    <svg
                      className="sc-gEvEer hSTeNi mx-icon"
                      focusable="false"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      viewBox="0 0 1024 1024"
                      data-icon="ArrowRightOutlined"
                    >
                      <path d="M128 469.333333h604.586667l-152.746667-153.173333L640 256l256 256-256 256-60.16-60.16L732.586667 554.666667H128z"></path>
                    </svg>
                  </button>
                </aside>
              </div>
            </div>
          </li>
          <li>
            <div className="products_webCont__QX7YI">
              <img
                src="./product-spot_2x.png"
                alt="mexc"
                loading="lazy"
                width="200"
                height="200"
              />
              <div className="products_rightPart__zRAWS">
                <h3>Spot</h3>
                <p>Yüzlerce Token, Hızlı Listeleme</p>
                <p className="products_des__CFIiD">
                  Birinci sınıf borsalar arasında listelenen kripto para miktarı
                  bakımından en üst sıralardayız.
                </p>
                <aside>
                  <button
                    type="button"
                    className="ant-btn ant-btn-text products_productsLink__7krbH"
                  >
                    <span>Daha Fazla Bilgi</span>
                    <svg
                      className="sc-gEvEer hSTeNi mx-icon"
                      focusable="false"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      viewBox="0 0 1024 1024"
                      data-icon="ArrowRightOutlined"
                    >
                      <path d="M128 469.333333h604.586667l-152.746667-153.173333L640 256l256 256-256 256-60.16-60.16L732.586667 554.666667H128z"></path>
                    </svg>
                  </button>
                </aside>
              </div>
            </div>
          </li>
        </ul>
        <div className="products_loginBtn__rFbKX">
          <Button
            onClick={() => {
              window.location.href = "/login";
            }}
            type="primary"
            className="section-main-btn "
          >
            Al - Sat Yapmaya Başla
          </Button>
        </div>
      </div>
      <div className="community_community__EJdFT">
        <div className="rtl-img community_community-bg__HcGIb">
          <div className="community_community-bg-content__bhtGF">
            <div className="community_community-mask__i7dO_">
              <img loading="lazy" src="./community_bg.jpg" />
            </div>
          </div>
        </div>
        <div className="community_community-body__Jgr43 home-container">
          <h2>Hemen MEXC Topluluğuna Katılın</h2>
          <p>Daima yanınızda</p>
          <div className="community_communityBigBtn__MD3tR">
            <div>
              <Button
                className="main-community-entry_main-community-btn__kHsAS main-community-entry_main-community-twitter__7wyjw"
                icon={
                  <svg
                    className="sc-gEvEer hSTeNi mx-icon"
                    focusable="false"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    viewBox="0 0 28 25"
                    data-icon="NewTwitterOutLined"
                  >
                    <path
                      d="M19.9192 23.7976L2.44947 1.20238H8.08076L25.5505 23.7976H19.9192Z"
                      stroke="currentColor"
                      strokeWidth="2.40475"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.9785 0H26.1935L16.7546 10.9771L14.7319 8.4275L21.9785 0ZM10.6648 13.1575L0.48172 25H4.69677L12.6875 15.7071L10.6648 13.1575Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                }
              >
                X
              </Button>
            </div>
            <div>
              <Button
                className="main-community-entry_main-community-btn__kHsAS main-community-btn main-community-entry_main-community-telegram__rwQzp"
                icon={
                  <svg
                    className="sc-gEvEer hSTeNi mx-icon"
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
                }
              >
                Telegram
              </Button>
            </div>
          </div>
          <div className="community_otherMedia__K3_H_">
            {communitySocialData.map((item, index) => (
              <div key={index} className="media-menu_mediaItem__KFU_G">
                <Popover
                  overlayClassName={`${item.link ? "hidden" : "sshow"}`}
                  content={
                    <div>
                      <div className="media-menu_mediumMenu__qS4Rr">
                        <div className="media-menu_mediumMenu-body__LzXV5">
                          <div className="media-menu_mediumMenu-content__q_4RL">
                            <ul>
                              {item.links &&
                                item.links.map((item, index) => {
                                  return (
                                    <li key={index}>
                                      <a
                                        href={item.link}
                                        target="_blank"
                                        title="MEXC Official"
                                        rel="noopener noreferrer"
                                      >
                                        {item.name}
                                      </a>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <div
                    className="media-menu_mediaItemContent__dTapB"
                    onClick={() => {
                      if (item.link) {
                        window.location.href = item.link;
                      }
                    }}
                    style={{ backgroundImage: `url(${item.icon})` }}
                  ></div>
                </Popover>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="download_home-download__0ReTU home-container">
        <h2>MEXC Uygulaması Her Anında Yanında</h2>
        <p>iOS, Android & Windows.</p>
        <div className="download_downloadContent__w4yWM">
          <div className="download_device__cW4OQ">
            <img
              className="download_deviceLogo__mGXRx"
              src="https://static.mocortech.com/www/static/images/new-home/imh_iPhone_light.png"
              alt="mexc"
              loading="lazy"
            />
          </div>
          <div className="download_downloadInfoWrapper__9S0v_">
            <div className="download_downloadInfoGroup__ITmEa">
              <div className="download_downloadInfo__WX6Ki">
                <img src="./portfolio.svg?v=1001" alt="mexc" loading="lazy" />
                <div className="download_contRight___VlGG">
                  <h5>Portföyünüzü Kolayca Yönetin</h5>
                  <p>
                    Güçlü özellikler, yüksek yürütme hızı ve düşük ücretlerle
                    tek noktadan hizmet platformumuz aracılığıyla profesyonel
                    bir yatırımcı olun.
                  </p>
                </div>
              </div>
              <div className="download_downloadInfo__WX6Ki">
                <img src="./mobile_apps.svg?v=1001" alt="mexc" loading="lazy" />
                <div className="download_contRight___VlGG">
                  <h5>Çoklu Platform Uygulama Desteği</h5>
                  <p>
                    MEXC Uygulaması ile tüm favori tokenlarınızı zahmetsizce,
                    her zaman ve her yerde satın alın ve takas edin.
                  </p>
                </div>
              </div>
            </div>
            <div className="download_downloadGroup__V_bnp">
              <a href="#" className="download_www">
                <svg
                  className="sc-gEvEer hSTeNi mx-icon iconfont iconios1 download_appStore__b4QwE"
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
                <span style={{ marginInlineStart: "10px" }}>App Store</span>
              </a>
              <a href="#" className="download_www">
                <svg
                  className="sc-gEvEer hSTeNi mx-icon iconfont iconGooglePlaylogo1 download_googleplay__Wm4mF"
                  focusable="false"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="0 0 1024 1024"
                  data-icon="GooglePlayOutlined"
                >
                  <path d="M168.30464 102.4l417.01376 409.6-416.9728 409.6a40.63232 40.63232 0 0 1-18.18624-14.78656 39.56736 39.56736 0 0 1-6.79936-22.20032V139.38688a39.7312 39.7312 0 0 1 6.79936-22.15936 40.79616 40.79616 0 0 1 18.14528-14.82752z m445.97248 438.02624l94.28992 92.5696-447.93856 254.64832 353.64864-347.21792z m130.99008-128.6144l114.97472 65.41312a39.64928 39.64928 0 0 1 0 69.55008l-115.01568 65.37216-101.9904-100.1472 102.03136-100.1472zM260.62848 136.3968L708.608 390.9632l-94.28992 92.5696L260.62848 136.3968z"></path>
                </svg>
                <span style={{ marginInlineStart: "6px" }}>Google Play</span>
              </a>
              <a href="#" className="download_www">
                <svg
                  className="sc-gEvEer hSTeNi mx-icon iconfont icondo-windows1"
                  focusable="false"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="0 0 1024 1024"
                  data-icon="WindowsOutlined"
                >
                  <path d="M125.5424 242.3296v221.7984L368.64 455.0656V191.7952l-243.0464 50.4832z m345.3952-78.7968V450.048l428.8512-15.8208V74.496l-428.8512 89.088zM125.5424 560.128v221.7984l243.0464 50.5344v-263.2192l-243.0464-9.1136z m345.3952 14.1312v286.464l428.8512 89.0368v-359.68l-428.8512-15.8208z"></path>
                </svg>
                <span style={{ marginInlineStart: "10px" }}>Windows</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`scroll-top-wrapper ${scrollTop ? "active" : ""}`}
        onClick={handleScrollTop}
      >
        <Tooltip placement="left" title={<div>En Üste Dön</div>}>
          <div className="sidebar_btn__5nhuP sidebar_toTop__ocJY_">
            <svg
              className="sc-gEvEer hSTeNi mx-icon iconfont iconzhiding"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-icon="VerticalAlignTopOutlined"
            >
              <path d="M1.67973 0.5383C1.16679 0.5383 0.750977 0.954115 0.750977 1.46705C0.750977 1.97998 1.16679 2.3958 1.67973 2.3958H14.3214C14.8344 2.3958 15.2502 1.97998 15.2502 1.46705C15.2502 0.954114 14.8344 0.5383 14.3214 0.5383H1.67973Z"></path>
              <path d="M8.65399 4.07351C8.29206 3.7152 7.70909 3.7152 7.34716 4.07351L2.068 9.29988C1.70348 9.66075 1.70053 10.2488 2.0614 10.6133C2.42227 10.9778 3.01032 10.9808 3.37483 10.6199L7.07183 6.95989V14.533C7.07183 15.0459 7.48764 15.4617 8.00057 15.4617C8.51351 15.4617 8.92932 15.0459 8.92932 14.533V6.95989L12.6263 10.6199C12.9908 10.9808 13.5789 10.9778 13.9397 10.6133C14.3006 10.2488 14.2977 9.66075 13.9331 9.29988L8.65399 4.07351Z"></path>
            </svg>
          </div>
        </Tooltip>
      </div>
      <div
        className="sidebar_wrapper__LNgtQ sidebar_floatWrapper__SOb5e"
        ref={contacRef}
      >
        <Tooltip
          placement="top"
          title={<div>{pinTab ? "Gizle" : "Sabitle"}</div>}
        >
          <div className="iconfont sidebar_btn__5nhuP" onClick={handlePinBar}>
            <svg
              className="sc-gEvEer hSTeNi mx-icon"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="0 0 1024 1024"
              data-icon="PushpinVerticalOutlined"
            >
              <path d="M736.042683 524.815065h-93.120125l3.3745-286.912829H694.905924V84.121459H242.763123v153.499569l3.776226 0.241036 48.287485 3.213809v283.85971l-96.735661 3.334327-3.896744 0.16069V682.050687h4.017262l537.911338-3.454845h3.977089V524.774892h-4.017262z m-145.746253 56.643389h100.069988v40.493998H254.292664v-40.53417h97.137387v-3.977089l3.495018-392.084739v-4.097607H306.316202V140.724676h332.06685v40.252962l-47.805414-3.173636-4.258297-0.281209V581.418282h4.017262z"></path>
              <path d="M494.765947 1023.959827h4.017262V672.369086H441.617576V1024h53.108199z"></path>
            </svg>
          </div>
        </Tooltip>

        <Tooltip placement="top" title={<div>API Belgeleri</div>}>
          <a
            className="sidebar_btn__5nhuP"
            href="https://mexcdevelop.github.io/apidocs/spot_v3_en/#introduction"
            rel="nofollow noopener noreferrer"
          >
            <svg
              className="sc-gEvEer hSTeNi mx-icon iconfont iconapi"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-icon="ApiOutlined"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.97192 3.23804L11.2291 3.23804L11.2291 12.762H8.97193C6.34197 12.762 4.20996 10.63 4.20996 8C4.20996 5.37004 6.34196 3.23804 8.97192 3.23804ZM2.78991 6.9967C2.70945 6.97583 2.62507 6.96472 2.53809 6.96472H1.76562C1.21334 6.96472 0.765625 7.41244 0.765625 7.96472C0.765625 8.51701 1.21334 8.96472 1.76562 8.96472H2.53809C2.62127 8.96472 2.70209 8.95457 2.77936 8.93542C3.23091 11.9501 5.83144 14.262 8.97193 14.262H11.7291C12.2814 14.262 12.7291 13.8142 12.7291 13.262V11.7261H14.5047C15.057 11.7261 15.5047 11.2784 15.5047 10.7261C15.5047 10.1738 15.057 9.72607 14.5047 9.72607H12.7291V6.71655L14.5047 6.71655C15.057 6.71655 15.5047 6.26884 15.5047 5.71655C15.5047 5.16427 15.057 4.71655 14.5047 4.71655L12.7291 4.71655V2.73804C12.7291 2.18575 12.2814 1.73804 11.7291 1.73804H8.97192C5.85505 1.73804 3.27004 4.01526 2.78991 6.9967Z"
              ></path>
            </svg>
          </a>
        </Tooltip>
        <Popover
          placement="topRight"
          overlayClassName="mediaTT"
          content={
            <div className="media_mediaMenu__VC0K1">
              <ul className="media_ul_2__J7ulA">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Official"
                    rel="noopener noreferrer"
                  >
                    MEXC Official
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC 港臺交流群"
                    rel="noopener noreferrer"
                  >
                    MEXC 港臺交流群
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC EN"
                    rel="noopener noreferrer"
                  >
                    MEXC EN
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC 日本コミュニティ"
                    rel="noopener noreferrer"
                  >
                    MEXC 日本コミュニティ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Korea"
                    rel="noopener noreferrer"
                  >
                    MEXC Korea
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Türkiye"
                    rel="noopener noreferrer"
                  >
                    MEXC Türkiye
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Việt Nam"
                    rel="noopener noreferrer"
                  >
                    MEXC Việt Nam
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Русский"
                    rel="noopener noreferrer"
                  >
                    MEXC Русский
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Español"
                    rel="noopener noreferrer"
                  >
                    MEXC Español
                  </a>
                </li>
              </ul>
              <ul className="media_ul_2__J7ulA">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Malaysian"
                    rel="noopener noreferrer"
                  >
                    MEXC Malaysian
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Português"
                    rel="noopener noreferrer"
                  >
                    MEXC Português
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Filipino"
                    rel="noopener noreferrer"
                  >
                    MEXC Filipino
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Bengali"
                    rel="noopener noreferrer"
                  >
                    MEXC Bengali
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Indonesian"
                    rel="noopener noreferrer"
                  >
                    MEXC Indonesian
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC DACH"
                    rel="noopener noreferrer"
                  >
                    MEXC DACH
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC فارسی"
                    rel="noopener noreferrer"
                  >
                    MEXC فارسی
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Україна"
                    rel="noopener noreferrer"
                  >
                    MEXC Україна
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    title="MEXC Futures"
                    rel="noopener noreferrer"
                  >
                    MEXC Futures
                  </a>
                </li>
              </ul>
            </div>
          }
          arrow={false}
        >
          <div className="sidebar_btn__5nhuP">
            <svg
              className="sc-gEvEer hSTeNi mx-icon iconfont icontelegram-line"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-icon="TelegramOutlined"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.7573 1.14981C15.9432 1.30162 16.0321 1.54231 15.9895 1.7785L13.7061 14.4557C13.666 14.6783 13.5148 14.865 13.3054 14.9503C13.0959 15.0357 12.8573 15.0079 12.673 14.8768L8.56055 11.9496L6.67217 13.8314C6.5083 13.9947 6.27094 14.0603 6.04643 14.0045C5.82193 13.9486 5.64301 13.7794 5.57476 13.5583L4.36475 9.63955L0.424149 8.12923C0.170169 8.03189 0.00182325 7.78882 1.47091e-05 7.51683C-0.00179377 7.24484 0.163305 6.99955 0.415968 6.89884L15.0949 1.04781C15.3178 0.958948 15.5714 0.997996 15.7573 1.14981ZM5.68409 9.43453L6.51438 12.1235L7.48167 11.1596L6.78906 10.642C6.49684 10.4236 6.437 10.0097 6.65539 9.71745C6.87379 9.42523 7.28772 9.36539 7.57994 9.58379L8.87859 10.5544L12.5906 13.1965L14.4784 2.71573L2.47478 7.50037L4.83475 8.40488L9.4915 5.57143C9.80315 5.3818 10.2095 5.48072 10.3992 5.79237C10.5888 6.10402 10.4899 6.51039 10.1782 6.70002L5.68409 9.43453Z"
              ></path>
            </svg>
          </div>
        </Popover>
        <div className="popover_wrapper__4Xcve">
          <div className="popover_topRight__I3e4f popover_overlay__8GEVa component-popover-overlay">
            <div className="popover_overlayInner__e_vvb"></div>
          </div>
        </div>
        <Tooltip placement="top" title={<div>Talep Oluştur</div>}>
          <a
            className="sidebar_btn__5nhuP"
            href="#"
            rel="nofollow noopener noreferrer"
          >
            <svg
              className="sc-gEvEer hSTeNi mx-icon iconfont iconyijian"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-icon="FeedbackOutlined"
            >
              <path d="M4.93262 6.13333C4.93262 5.72831 5.26095 5.39999 5.66595 5.39999H10.0659C10.471 5.39999 10.7993 5.72831 10.7993 6.13333C10.7993 6.53834 10.471 6.86666 10.0659 6.86666H5.66595C5.26095 6.86666 4.93262 6.53834 4.93262 6.13333Z"></path>
              <path d="M5.66595 8.33333C5.26095 8.33333 4.93262 8.66164 4.93262 9.06666C4.93262 9.47168 5.26095 9.79999 5.66595 9.79999H8.59928C9.0043 9.79999 9.33262 9.47168 9.33262 9.06666C9.33262 8.66164 9.0043 8.33333 8.59928 8.33333H5.66595Z"></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.7333 4.67898V14.2C13.7333 15.01 13.0767 15.6667 12.2667 15.6667H3.46667C2.65665 15.6667 2 15.01 2 14.2V2.46667C2 1.65665 2.65665 1 3.46667 1H10.0667L13.7333 4.67898ZM3.46667 14.2V2.46667H9.4577L12.2667 5.28505V14.2H3.46667Z"
              ></path>
            </svg>
          </a>
        </Tooltip>

        <div className="sidebar_btn__5nhuP">
          <svg
            className="sc-gEvEer hSTeNi mx-icon iconfont iconkefu-en"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 16 16"
            data-icon="CustomerServiceFilled"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.08153 5.81175C2.59605 3.01066 5.05016 0.888184 8 0.888184C10.9498 0.888184 13.404 3.01066 13.9185 5.81175H14.9059C15.5101 5.81175 16 6.30161 16 6.90588V10.1883C16 10.7925 15.5101 11.2824 14.9059 11.2824H13.4176C12.7215 12.7103 11.474 13.8138 9.96435 14.3265C9.8153 14.9979 9.21628 15.5 8.5 15.5C7.67157 15.5 7 14.8284 7 14C7 13.1716 7.67157 12.5 8.5 12.5C9.04586 12.5 9.52362 12.7916 9.78603 13.2275C11.6096 12.5296 12.9236 10.7634 12.9236 8.66875V6.90588C12.9236 4.18667 10.7192 1.98231 8 1.98231C5.28079 1.98231 3.07643 4.18667 3.07643 6.90588V11.0824C3.07643 11.1928 2.98689 11.2824 2.87643 11.2824L1.09413 11.2824C0.489857 11.2824 0 10.7925 0 10.1883V6.90588C0 6.30161 0.489857 5.81175 1.09413 5.81175H2.08153ZM14.0177 10.1883H14.9059V6.90588L14.0177 6.90588V10.1883ZM1.9823 10.1883L1.9823 6.90588L1.09413 6.90588V10.1883H1.9823Z"
            ></path>
            <path d="M4.91492 8.46662C5.06214 8.233 5.37088 8.16296 5.6045 8.31018C6.29787 8.74713 7.11864 9 8 9C8.88115 9 9.70167 8.74707 10.395 8.31017C10.6286 8.16296 10.9373 8.233 11.0846 8.46663C11.2318 8.70025 11.1617 9.00899 10.9281 9.15621C10.08 9.69066 9.07543 10 8 10C6.92448 10 5.91966 9.69079 5.07135 9.1562C4.83773 9.00898 4.76769 8.70024 4.91492 8.46662Z"></path>
          </svg>
        </div>
        <div className="sidebar_more__AJ7D9">
          <svg
            className="sc-gEvEer hSTeNi mx-icon iconfont iconCustomer"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            viewBox="0 0 16 16"
            data-icon="CustomerServiceFilled"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.08153 5.81175C2.59605 3.01066 5.05016 0.888184 8 0.888184C10.9498 0.888184 13.404 3.01066 13.9185 5.81175H14.9059C15.5101 5.81175 16 6.30161 16 6.90588V10.1883C16 10.7925 15.5101 11.2824 14.9059 11.2824H13.4176C12.7215 12.7103 11.474 13.8138 9.96435 14.3265C9.8153 14.9979 9.21628 15.5 8.5 15.5C7.67157 15.5 7 14.8284 7 14C7 13.1716 7.67157 12.5 8.5 12.5C9.04586 12.5 9.52362 12.7916 9.78603 13.2275C11.6096 12.5296 12.9236 10.7634 12.9236 8.66875V6.90588C12.9236 4.18667 10.7192 1.98231 8 1.98231C5.28079 1.98231 3.07643 4.18667 3.07643 6.90588V11.0824C3.07643 11.1928 2.98689 11.2824 2.87643 11.2824L1.09413 11.2824C0.489857 11.2824 0 10.7925 0 10.1883V6.90588C0 6.30161 0.489857 5.81175 1.09413 5.81175H2.08153ZM14.0177 10.1883H14.9059V6.90588L14.0177 6.90588V10.1883ZM1.9823 10.1883L1.9823 6.90588L1.09413 6.90588V10.1883H1.9823Z"
            ></path>
            <path d="M4.91492 8.46662C5.06214 8.233 5.37088 8.16296 5.6045 8.31018C6.29787 8.74713 7.11864 9 8 9C8.88115 9 9.70167 8.74707 10.395 8.31017C10.6286 8.16296 10.9373 8.233 11.0846 8.46663C11.2318 8.70025 11.1617 9.00899 10.9281 9.15621C10.08 9.69066 9.07543 10 8 10C6.92448 10 5.91966 9.69079 5.07135 9.1562C4.83773 9.00898 4.76769 8.70024 4.91492 8.46662Z"></path>
          </svg>
        </div>
      </div>
    </>
  );
}
