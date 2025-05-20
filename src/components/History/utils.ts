import { gsap } from "gsap";
import {RefObject} from "react";

type TNumberAnimationProps = {
  ref: RefObject<HTMLElement | null>;
  to: number;
  onComplete?: () => void;
  duration?: number;
  snap?: number
};

export const numberAnimation = ({
  ref,
  onComplete,
  to,
  duration = 1,
  snap = 1
}: TNumberAnimationProps) => {
  gsap.to(ref.current, {
    innerText: to,
    duration,
    snap: { innerText: snap },
    ease: "circ",
    onUpdate: () => {
      if (ref.current) {
        ref.current.innerText = Math.floor(
          parseFloat(ref.current.innerText)
        ).toString();
      }
    },
    onComplete,
  });
};

type TSliderShowAnimationProps = {
  ref: RefObject<HTMLElement | null>;
  duration?: number;
  delay?: number;
  y?: number
};

export const sliderShowAnimation = ({
  ref,
}: TSliderShowAnimationProps) => {
  const tl = gsap.timeline();

  tl.to(ref.current, {
    opacity: 0,
    ease: 'power1',
    y: 20,
    duration: .3,
  }).to(ref.current, {
    y: 0,
    opacity: 1,
    ease: 'power1',
    duration: .3,
    delay: .4,
  });

  return tl;
};

export const getTwoDigitNumber = (num: number) => num < 10 ? `0${num}` : num;