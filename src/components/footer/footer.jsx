import './footer.css';
import {Button, Popover} from "antd";
import {useState} from "react";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const socialIcons = [
    {
        icon: 'https://public.mocortech.com/banner/F20230822155201934UfZdMHFm2nifuh.png',
        links: [
            {
                name: 'MEXC Official',
                link: '#'
            },
            {
                name: 'MEXC 港臺交流群',
                link: '#'
            },
            {
                name: 'MEXC EN',
                link: '#'
            },
            {
                name: 'MEXC 日本コミュニティ',
                link: '#'
            },
            {
                name: 'MEXC Korea',
                link: '#'
            },
            {
                name: 'MEXC Türkiye',
                link: '#'
            },
            {
                name: 'MEXC Việt Nam',
                link: '#'
            },
            {
                name: 'MEXC Русский',
                link: '#'
            },
            {
                name: 'MEXC Español',
                link: '#'
            },
            {
                name: 'MEXC Malaysian',
                link: '#'
            },
            {
                name: 'MEXC Português',
                link: '#'
            },
            {
                name: 'MEXC Filipino',
                link: '#'
            },
            {
                name: 'MEXC Bengali',
                link: '#'
            },
            {
                name: 'MEXC Indonesian',
                link: '#'
            },
            {
                name: 'MEXC DACH',
                link: '#'
            },
            {
                name: 'MEXC فارسی',
                link: '#'
            },
            {
                name: 'MEXC Україна',
                link: '#'
            },
            {
                name: 'MEXC Futures',
                link: '#'
            }
        ]
    },
    {
        icon: 'https://public.mocortech.com/banner/F20230809152906655hpY3SsIldymI9c.png',
        links: [
            {
                name: 'MEXC Official',
                link: '#'
            },
            {
                name: 'MEXC 華語',
                link: '#'
            },
            {
                name: 'MEXC EN',
                link: '#'
            },
            {
                name: 'MEXC 日本',
                link: '#'
            },
            {
                name: 'MEXC Korea',
                link: '#'
            },
            {
                name: 'MEXC Türkiye',
                link: '#'
            },
            {
                name: 'MEXC Việt Nam',
                link: '#'
            },
            {
                name: 'MEXC Deutsch',
                link: '#'
            },
            {
                name: 'MEXC Русский',
                link: '#'
            },
            {
                name: 'MEXC Україна',
                link: '#'
            }
        ]

    },
    {
        icon: 'https://public.mocortech.com/banner/F20230822155229778s0suWntyOovsxl.png',
        links: [
            {
                name: 'MEXC Official',
                link: '#'
            },
            {
                name: 'MEXC Türkiye',
                link: '#'
            },
            {
                name: 'MEXC Việt Nam',
                link: '#'
            },
            {
                name: 'MEXC Korea',
                link: '#'
            }
        ]
    }
    ,
    {
        icon: 'https://public.mocortech.com/banner/F202308221552408392lb9SGdeK5017S.png',
        links: [
            {
                name: 'MEXC Official',
                link: '#'
            },
            {
                name: 'MEXC Korea',
                link: '#'
            },
            {
                name: 'MEXC Türkiye',
                link: '#'
            },
            {
                name: 'MEXC DACH🇩🇪🇨🇭🇦🇹',
                link: '#'
            }
        ]
    },
    {
        icon: 'https://public.mocortech.com/banner/F202307241212107880YTsQlvnBAvjuQ.jpeg',
        links: [
            {
                name: 'MEXC Official',
                link: '#'
            },
            {
                name: 'MEXC Türkiye',
                link: '#'
            },
            {
                name: 'MEXC Việt Nam',
                link: '#'
            },
            {
                name: 'MEXC Русский',
                link: '#'
            }
        ]
    },
    {
        icon: 'https://public.mocortech.com/banner/F20230822155305528L9mV2FVnwudz35.png',
        links: [
            {
                name: 'MEXC Korea',
                link: '#'
            },
            {
                name: 'MEXC Türkiye',
                link: '#'
            }
        ]
    },
    {
        icon: 'https://public.mocortech.com/banner/F20230822155318715TXC1ahjCQHGjfH.png',
        link: '#'
    },
    {
        icon: 'https://public.mocortech.com/banner/F20230724121158714sGf4sSd41CbTGD.jpeg',
        links: [
            {
                name: 'MEXC Türkiye',
                link: '#'
            },
            {
                name: 'MEXC Việt Nam',
                link: '#'
            }
        ]
    },
    {
        icon: 'https://public.mocortech.com/banner/F20230822155337560uFg55xz4kjrKc6.png',
        link: '#'
    },
    {
        icon: 'https://public.mocortech.com/banner/F20230822155349228BGxdO9lZYpFFYV.png',
        link: '#'
    },
    {
        icon: 'https://public.mocortech.com/banner/F202308221554012327aWtAh2tFavbYb.png',
        link: '#'
    },
    {
        icon: 'https://public.mocortech.com/banner/F202308221554114182thJcamotY7rP5.png',
        link: '#'
    },
    {
        icon: 'https://public.mocortech.com/banner/F20230822155423011Atz46YQN6jCsMV.png',
        link:'#'
    },
    {
        icon: 'https://public.mocortech.com/banner/F202308221554336896AKIJa9lD2f3HN.png',
        link:'#'
    },
    {
        icon: 'https://public.mocortech.com/banner/F20230822155443043RJqBoi5IsZJ6Tx.png',
        link:'#'
    }
]
export default function FooterPage() {
    const [show, setShow] = useState([false, false, false, false]);
    const handleClick = event => {

        setShow((prev) => {
            const prevShow = [...prev];
            prevShow[Number(event.target.dataset.id) - 1] = !prevShow[Number(event.target.dataset.id) - 1];
            return prevShow;
        })

    };

    return (
        <div className='footer-wrapper'>
            <div className='footer-content'>
                <dl className='footer-content-dl'>
                    <dt className='footer-content__title'><span>Hakkımızda</span>
                        {!show[0] && <svg onClick={handleClick} data-id='1'
                                          className="sc-aXZVg ktFCMi mx-icon footer_toggleBtn__3F0ol" focusable="false"
                                          width="1em"
                                          height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024"
                                          data-icon="PlusOutlined">
                            <path d="M80 512A48 48 0 0 1 128 464h768a48 48 0 0 1 0 96H128A48 48 0 0 1 80 512z"></path>
                            <path d="M512 944a48 48 0 0 1-48-48V128a48 48 0 0 1 96 0v768a48 48 0 0 1-48 48z"></path>
                        </svg>}
                        {show[0] && <svg onClick={handleClick} data-id='1'
                                         className="sc-aXZVg ktFCMi mx-icon iconfont footer_toggleBtn__3F0ol footer_toggleBtnOpen__GhJzW"
                                         focusable="false" width="1em" height="1em" fill="currentColor"
                                         aria-hidden="true"
                                         viewBox="0 0 1024 1024" data-icon="MinusOutlined">
                            <path d="M80 512A48 48 0 0 1 128 464h768a48 48 0 0 1 0 96H128A48 48 0 0 1 80 512z"></path>
                        </svg>}
                    </dt>
                    <div className={`footer-content__body ${show[0] ? 'active' : ''}`} data-id='1'>
                        <dd><a href="#">Hakkında</a></dd>
                        <dd><a href="#">Kullanıcı Sözleşmesi</a></dd>
                        <dd><a href="#">Gizlilik Politikası</a></dd>
                        <dd><a href="#">Risk Açıklaması</a></dd>
                        <dd><a href="#">M-Ventures</a></dd>
                        <dd><a rel="nofollow noopener noreferrer" target="_blank" href="#">MEXC
                            Blog</a></dd>
                    </div>
                </dl>
                <dl className="footer-content-dl">
                    <dt className='footer-content__title'><span>Hizmetler</span>
                        {!show[1] && <svg onClick={handleClick} data-id='2'
                                          className="sc-aXZVg ktFCMi mx-icon footer_toggleBtn__3F0ol" focusable="false"
                                          width="1em"
                                          height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024"
                                          data-icon="PlusOutlined">
                            <path d="M80 512A48 48 0 0 1 128 464h768a48 48 0 0 1 0 96H128A48 48 0 0 1 80 512z"></path>
                            <path d="M512 944a48 48 0 0 1-48-48V128a48 48 0 0 1 96 0v768a48 48 0 0 1-48 48z"></path>
                        </svg>}
                        {show[1] && <svg onClick={handleClick} data-id='2'
                                         className="sc-aXZVg ktFCMi mx-icon iconfont footer_toggleBtn__3F0ol footer_toggleBtnOpen__GhJzW"
                                         focusable="false" width="1em" height="1em" fill="currentColor"
                                         aria-hidden="true"
                                         viewBox="0 0 1024 1024" data-icon="MinusOutlined">
                            <path d="M80 512A48 48 0 0 1 128 464h768a48 48 0 0 1 0 96H128A48 48 0 0 1 80 512z"></path>
                        </svg>}
                    </dt>
                    <div className={`footer-content__body ${show[1] ? 'active' : ''}`} data-id='2'>
                        <dd><a href="http://localhost:5173/exchange">Kripto Al</a></dd>
                        <dd><a href="#">Uygulamayı İndir</a></dd>
                        <dd><a href="#">İşlem Ücretleri</a></dd>
                        <dd><a href="http://localhost:5173/user">Davet Programı</a></dd>
                        <dd><a target="_blank" rel="noopener noreferrer"
                               href="#">Ajansları Programı</a>
                        </dd>
                        <dd><a href="#">API</a></dd>
                        <dd><a href="#">Kurumsal Hizmetler</a></dd>
                        <dd><a href="#">Nasıl Satın Alınır</a></dd>
                        <dd><a href="http://localhost:5173/exchange">Kripto Bilgileri</a></dd>
                        <dd><a href="http://localhost:5173/exchange">Kripto Fiyatı</a></dd>
                    </div>
                </dl>
                <dl className="footer-content-dl">
                    <dt className="footer-content__title"><span>Kullanıcı Destek</span>
                        {!show[2] && <svg onClick={handleClick} data-id='3'
                                          className="sc-aXZVg ktFCMi mx-icon footer_toggleBtn__3F0ol" focusable="false"
                                          width="1em"
                                          height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024"
                                          data-icon="PlusOutlined">
                            <path d="M80 512A48 48 0 0 1 128 464h768a48 48 0 0 1 0 96H128A48 48 0 0 1 80 512z"></path>
                            <path d="M512 944a48 48 0 0 1-48-48V128a48 48 0 0 1 96 0v768a48 48 0 0 1-48 48z"></path>
                        </svg>}
                        {show[2] && <svg onClick={handleClick} data-id='3'
                                         className="sc-aXZVg ktFCMi mx-icon iconfont footer_toggleBtn__3F0ol footer_toggleBtnOpen__GhJzW"
                                         focusable="false" width="1em" height="1em" fill="currentColor"
                                         aria-hidden="true"
                                         viewBox="0 0 1024 1024" data-icon="MinusOutlined">
                            <path d="M80 512A48 48 0 0 1 128 464h768a48 48 0 0 1 0 96H128A48 48 0 0 1 80 512z"></path>
                        </svg>}
                    </dt>
                    <div className={`footer-content__body ${show[2] ? 'active' : ''}`} data-id='3'>
                        <dd><a>Canlı Destek</a></dd>
                        <dd><a target="_blank" rel="noopener noreferrer" href="#">Yardım Merkezi</a></dd>
                        <dd><a target="_blank" rel="noopener noreferrer"
                               href="#">Duyurular</a></dd>
                        <dd><a href="#">Akademi</a></dd>
                        <dd><a href="#">VIP Avantajları</a></dd>
                        <dd><a target="_blank" rel="noopener noreferrer nofollow"
                               href="#">Talep Gönder</a></dd>
                        <dd><a target="_blank" rel="noopener noreferrer nofollow"
                               href="#">İyileştirme Önerileri</a></dd>
                        <dd><a target="_blank" rel="noopener noreferrer nofollow"
                               href="#">Anormal Varlıkları Bildir</a>
                        </dd>
                        <dd><a href="#">Adli Yardım</a></dd>
                        <dd><a href="#">MEXC Doğrulama</a></dd>
                    </div>
                </dl>
                <dl className="footer-content-dl">
                    <dt className="footer-content__title"><span>Bize Ulaşın</span>
                        {!show[3] && <svg onClick={handleClick} data-id='4'
                                          className="sc-aXZVg ktFCMi mx-icon footer_toggleBtn__3F0ol" focusable="false"
                                          width="1em"
                                          height="1em" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024"
                                          data-icon="PlusOutlined">
                            <path d="M80 512A48 48 0 0 1 128 464h768a48 48 0 0 1 0 96H128A48 48 0 0 1 80 512z"></path>
                            <path d="M512 944a48 48 0 0 1-48-48V128a48 48 0 0 1 96 0v768a48 48 0 0 1-48 48z"></path>
                        </svg>}
                        {show[3] && <svg onClick={handleClick} data-id='4'
                                         className="sc-aXZVg ktFCMi mx-icon iconfont footer_toggleBtn__3F0ol footer_toggleBtnOpen__GhJzW"
                                         focusable="false" width="1em" height="1em" fill="currentColor"
                                         aria-hidden="true"
                                         viewBox="0 0 1024 1024" data-icon="MinusOutlined">
                            <path d="M80 512A48 48 0 0 1 128 464h768a48 48 0 0 1 0 96H128A48 48 0 0 1 80 512z"></path>
                        </svg>}
                    </dt>
                    <div data-id='4' className={`footer-content__body ${show[3] ? 'active' : ''}`}>
                        <dd><a href="mailto:#">İş Birliği (İşletmeler)</a></dd>
                        <dd><a href="mailto:#">İş Birliği (Kurumsal)</a></dd>
                        <dd><a href="mailto:#">İş Birliği (Medya)</a></dd>
                        <dd><a target="_blank" rel="noopener noreferrer">Listeleme Başvurusu</a></dd>
                    </div>
                </dl>
                <dl className="footer-content-dl">
                    <dt className="footer-content__title"><span>Topluluk</span>
                    </dt>
                    <div className={`footer-content__body`}>
                        <div className="footer-media">
                            {socialIcons.map((item, index) => (
                                   <Popover key={index} overlayClassName={`${item.link ? 'hidden' : 'sshow'}`} content={(<div>
                                       <div className="media_mediumMenu__Yd4Cp">
                                           <div className="media_mediumMenu-body__gsxDx">
                                               <div className="media_mediumMenu-content__tIpYq">
                                                   {item.links && item.links.length > 10 ? (
                                                       <>
                                                           <ul>
                                                               {item.links.slice(0, 9).map((link, index) => (
                                                                   <li key={index}>
                                                                       <a href={link.link} target="_blank" title="m" rel="noopener noreferrer">
                                                                           {link.name}
                                                                       </a>
                                                                   </li>
                                                               ))}
                                                           </ul>
                                                           <ul>
                                                               {item.links.slice(9).map((link, index) => (
                                                                   <li key={index}>
                                                                       <a href={link.link} target="_blank" title="m" rel="noopener noreferrer">
                                                                           {link.name}
                                                                       </a>
                                                                   </li>
                                                               ))}
                                                           </ul>
                                                       </>
                                                   ) : (
                                                       <ul>
                                                           {item.links && item.links.map((link, index) => (
                                                               <li key={index}>
                                                                   <a href={link.link} target="_blank" title="m" rel="noopener noreferrer">
                                                                       {link.name}
                                                                   </a>
                                                               </li>
                                                           ))}
                                                       </ul>
                                                   )}

                                               </div>
                                           </div>
                                       </div>

                                   </div>)}>
                                       <div className="media_mediaItemContent__fW1w2" onClick={() => {
                                           if(item.link){
                                               window.location.href = item.link
                                           }
                                       }}
                                            style={{backgroundImage: `url(${item.icon})`}}></div>
                                   </Popover>

                            ))}


                        </div>
                    </div>
                </dl>
            </div>
            <p className="footer_copyRight__Axy8j">© 2024 MEXC.COM</p>

        </div>
    )
}
