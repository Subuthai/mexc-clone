import ReactECharts from "echarts-for-react";

export default function CarouselItem({ item,index }) {
    return (
        <div className="carousel-card1">
            <a key={index} className="home-new-item new-list-item_home-new-item__MMsS4" target="_blank"
               href={item.link}>
                <div className="new-list-item_new-item-title__klJ1r">
                    <div className="coin-cover_coin-cover__NV_PX coin-cover">
                        <div className="ant-image">
                            <img alt='' loading="lazy" className="ant-image-img" src={item.avatar}/>
                        </div>
                    </div>
                    <span className="new-list-item_new-item-name__DAo_z">{item.name}</span></div>
                <div className="new-list-item_new-item-content__2p31j">
                    <div className="new-list-item_new-item-desc__hiZs1"><p
                        className="new-list-item_new-item-price__3wZ1V">{item.price}</p><p
                        className={`new-list-item_new-item-change__78_QS new-list-item_changeUp__s_DWJ ${item.operator==='+'?'down-rate':'up-rate'}`}>{item.rate}</p>
                    </div>
                    <div className="new-list-item_new-item-kline__zKLhh">
                        <div
                            className="suggestKline_kline__BsyCt new-list-item_new-item-kine__chart__Uhvs5"
                            _echarts_instance_="ec_1701930168657">
                            <div className='newnewnew'>
                                {/*<img src={`./${item.img}`} alt=""/>*/}
                                <ReactECharts  notMerge={true}  style={{ height: '150%' }} option={{
                                    globe:{
                                        width:'100%',
                                        height:'100%'
                                    },
                                    xAxis: {
                                        type: 'category',
                                        boundaryGap: false,
                                        show: false
                                    },
                                    yAxis: {
                                        type: 'value',
                                        boundaryGap: [0, '30%'],
                                        show: false
                                    },
                                    backgroundColor:'transparent',
                                    visualMap: {
                                        type: 'piecewise',
                                        show: false,
                                        dimension: 0,
                                        seriesIndex: 0,
                                        pieces: [
                                            {
                                                gt: 1,
                                                lt: 3,
                                                color: 'rgba(0, 0, 180, 0.4)'
                                            },
                                            {
                                                gt: 5,
                                                lt: 7,
                                                color: 'rgba(0, 0, 180, 0.4)'
                                            }
                                        ]
                                    },
                                    series: [
                                        {
                                            type: 'line',
                                            smooth: 0.6,
                                            symbol: 'none',
                                            lineStyle: {
                                                color: `${item.operator==='+'?'#0aa869':'#fe445c'}`,
                                                width: 1.3
                                            },
                                            data: item.data
                                        }
                                    ]
                                }} />
                            </div>
                            <div className=""></div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}