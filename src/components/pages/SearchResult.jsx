import React, {useEffect, useMemo, useState} from 'react';
import {Tabs} from "antd";
import {json} from "react-router-dom";
import {addCommasToNumber, randomDecimals, randomizeDecimalPlaces} from "../utils.js";



const itemsTab = (dataHotSearch) => (
    [
        {
            key: '1',
            label: 'En Çok Arananlar',
            children: (
                <div className='hot-search-wrapper'>
                    <div className='hot-search-content'>
                        {dataHotSearch && dataHotSearch.map((item, index) => {
                            return (<a key={index} className='hot-search__item' href={item.link}>
                                <div className='hot-search__info'>
                                    <div
                                        className={`hot-search__rank ${index <= 2 ? `hot-search__rank--top` : ''}`}> {index + 1}</div>
                                    <div className='hot-search-info-wrapper'>
                                        <div className='hot-search-info__name-market'>
                                            <span className='hot-search-info__name '>{item.name}</span>
                                            <span
                                                className='hot-search-info__name hot-search-info__market'>{item.market}</span>
                                        </div>
                                        <div className='hot-search-info__attr'>
                                            <span className='attr-tag'>Sürekli</span>
                                            <span className='attr-hot-fire'>
                                                    {(index + 1) <= 3 && Array(3 - index).fill(null).map((item, index) => {
                                                        return (<img key={index} src="./fire.svg" alt=""/>)
                                                    })}
                                                </span>
                                        </div>

                                    </div>
                                </div>
                                <div className='hot-search__price'>
                                    {addCommasToNumber(item.price)}
                                </div>
                                <div className='right-data'>
                                    <span className={item.operator === '+' ? `rate-up` : 'rate-down'}>{item.rate}</span>
                                    <span className='rate-icon'> <svg className="" focusable="false" width="1em"
                                                                      height="1em" fill="currentColor"
                                                                      aria-hidden="true" viewBox="0 0 1024 1024"
                                                                      data-icon="StarFilled"><path
                                        d="M908.096 353.088l-253.888-36.864-113.536-230.08a32.128 32.128 0 0 0-57.408 0L369.792 316.16l-253.888 36.864a32 32 0 0 0-17.728 54.656l183.68 179.072-43.392 252.864a32 32 0 0 0 46.4 33.728L512 753.984l227.072 119.424a32 32 0 0 0 46.4-33.728l-43.392-252.864 183.68-179.072a31.936 31.936 0 0 0-17.664-54.656z"></path></svg>
                               </span>
                                </div>
                            </a>)
                        })}
                    </div>
                </div>
            ),
        },
    ]
);

const SearchResult = ({dataHotSearch, eventsData}) => {
    const [dataHot, setDataHot] = useState([...dataHotSearch]);
    useEffect(() => {
        const interval = setInterval(() => {
            setDataHot((prevDataHot) => {
                return prevDataHot.map((item) => {
                    return {
                        ...item,
                        price: randomizeDecimalPlaces(item.price),
                        rate:randomDecimals(item.rate)
                    };
                });
            });

        }, 2000);
        return () => {
            clearInterval(interval)
        };
    }, []);
        return (

            <div>
                <div className='search-dropdown-site'>
                    <Tabs defaultActiveKey="1" items={itemsTab(dataHot, eventsData)}/>
                </div>
            </div>

        )

};

export default SearchResult;