import {RefObject, useState} from "react";
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';
import { Controller } from "swiper/modules";
import { Swiper as SwiperCore } from 'swiper/types';
import { SliderNavigationArrow } from "../ui/SliderNavigationArrow";
import s from './styles.module.scss';

type THistorySlider = {
  ref: RefObject<HTMLDivElement | null>;
  title: string;
  slides: {
    year: number;
    description: string;
  }[];
};

const swiperBreakpointsProps: { [key: number]: SwiperProps } = {
  769: {
    spaceBetween: 80,
    slidesPerView: 3,
  },
  0: {
    spaceBetween: 25,
    slidesPerView: 1.5,
  }
} as const;

export const HistorySlider = ({ ref, title, slides }: THistorySlider) => {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [navigationState, setNavigationState] = useState<{ next: boolean; prev: boolean; }>({ next: false, prev: true });

  return (
    <div className={s.main} ref={ref}>
      <p className={s.title}>{title}</p>
      <div className={s.sliderWrapper}>
        <SliderNavigationArrow className={s.arrow} direction="left" onClick={() => swiper?.slidePrev()} disabled={navigationState.prev}/>
        <Swiper
          modules={[Controller]}
          key={slides[0].year}
          className={s.slider}
          onSwiper={setSwiper}
          onSlideChange={(slider: SwiperCore) => setNavigationState({ prev: slider.isBeginning, next: slider.isEnd })}
          controller={{ control: swiper }}
          breakpoints={swiperBreakpointsProps}
        >
          {slides.map((slide) => (
            <SwiperSlide>
              <div className={s.slide}>
                <p className={s.date}>{slide.year}</p>
                <p className={s.description}>{slide.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SliderNavigationArrow className={s.arrow} direction="right" onClick={() => swiper?.slideNext()} disabled={navigationState.next}/>
      </div>
    </div>
  );
};