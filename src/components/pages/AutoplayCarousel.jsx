import CarouselItem from "./CarouselItem.jsx";
import './styles/AutoplayCarousel.css';

export default function AutoplayCarousel({data}) {
    return (
        <div className="carousel-container1">
            <div className="carousel-track1">
                {data.map((item, index) => {
                    return (
                        <CarouselItem
                           item={item}
                           index={index}
                        ></CarouselItem>
                    );
                })}
                {data.map((item,index) => {
                    return (
                        <CarouselItem index={index}
                            item={item}
                        ></CarouselItem>
                    );
                })}
            </div>
        </div>
    );
}