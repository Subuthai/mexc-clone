import '../styles/populars.css'
import { Button } from "antd";
import { useEffect, useState } from "react";

export default function Populars() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.livecoinwatch.com/static/lcw-widget.js";
        script.async = true; 
        script.defer = true; 
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className='new-list_home-new-list '>
            <h2>Popüler Olanlar</h2>
            <div className="new-list_home-new-view-markets home-container">
                <div className="livecoinwatch-widget-5" lcw-base="USD" lcw-color-tx="#999999" lcw-marquee-1="coins" lcw-marquee-2="movers" lcw-marquee-items="10"></div>
            </div>
            <div>
                <div className='new-list_home-new-list-footer__6RXpK'>
                    <Button type="primary" className='section-main-btn'
                        onClick={() => window.location.href = 'http://localhost:5173/login'}>Al-Sat Yapmaya Başla</Button>
                </div>

            </div>

        </div>
    )
}