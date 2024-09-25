import Dropdown from "./Dropdown";
import {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import image from '../../assets/feature-1.png';

const MenuItems = ({items, depthLevel}) => {

    return (
        <li
            className="submenu-item">

            {items.submenu ? (
                <>
                    <a className='submenu-item__link' href={items.url}>
                        {depthLevel === 1 && items.icon ?
                            <img className='submenu-item__icon' src={`./${items.icon}`} alt=""/> : ''}
                        <div className='submenu-item-content'>
                            <div className='submenu-item-content__title'>{items.title} {items.status === 'uncheck' &&
                                <i className='dot-icon'></i>}
                                {items.status === 'new' &&
                                    <i className='new-icon'>Yeni</i>}
                                {items.status === 'hot' &&  <span className='icon-hot'>Öne Çıkan</span>}
                            </div>
                            <span className='submenu-item-content__desc'>{items.content}</span>
                        </div>
                        <svg className="submenu-item-content__icon" focusable="false" width="1em" height="1em"
                             fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024" data-icon="RightOutlined">
                            <path
                                d="M350.08 801.92a48 48 0 0 1 0-67.84L572.16 512 350.08 289.92a48 48 0 0 1 67.84-67.84l256 256a48 48 0 0 1 0 67.84l-256 256a48 48 0 0 1-67.84 0z"></path>
                        </svg>

                    </a>
                    <Dropdown
                        depthLevel={depthLevel}
                        submenus={items.submenu}
                        dropdown={true}
                    />

                </>
            ) : (
                <a className='submenu-item__link' href={items.url}>
                    {depthLevel === 1 && items.icon ?
                        <img className='submenu-item__icon' src={`./${items.icon}`} alt=""/> : ''}
                    <div className='submenu-item-content'>
                        <div className={`submenu-item-content__title status-${items.status}`}>{items.title} {items.status === 'uncheck' &&
                            <i className='dot-icon'></i>}
                            {items.status === 'new' &&
                                <i className='new-icon'>Yeni</i>}
                            {items.status === 'hot' &&  <span className='icon-hot'>Öne Çıkan</span>}
                        </div>
                        <span className='submenu-item-content__desc'>{items.content}</span>
                    </div>
                </a>
            )}
        </li>
    );
};

export default MenuItems;