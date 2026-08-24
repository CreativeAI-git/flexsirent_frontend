import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NoRecord from "../others/NoRecord";

const CustomSwiper = ({
    data = [],
    renderSlide,
    swiperProps = {},
    navigation = false,
    className = "mySwiper",
}) => {
    if (!data?.length) return null;

    const defaultBreakpoints = {
        0: {
            slidesPerView: 1,
        },
        576: {
            slidesPerView: 1.2,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
        1400: {
            slidesPerView: 4,
        },
    };

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={30}
                className={className}
                breakpoints={defaultBreakpoints}
                navigation={navigation}
                {...swiperProps} // allows override
            >
                {data?.length > 0 ? (
                    data.map((item, index) => (
                        <SwiperSlide key={index}>{renderSlide(item, index)}</SwiperSlide>
                    ))
                ) : (
                    <NoRecord />
                )}
            </Swiper>
        </>
    );
};

export default CustomSwiper;