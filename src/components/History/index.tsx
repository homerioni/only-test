import { HistorySlider } from "../HistorySlider";
import { ArrowBtn } from "../ui/ArrowBtn";
import {useEffect, useRef, useState} from "react";
import { getTwoDigitNumber, numberAnimation, sliderShowAnimation } from "./utils";
import { mokDataYears } from "./constants";
import { CirclePagination } from "../CirclePagination";
import s from './styles.module.scss';

export const History = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedRange, setSelectedRange] = useState(mokDataYears[0]);
  const yearFromRef = useRef<HTMLSpanElement>(null);
  const yearToRef = useRef<HTMLSpanElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newData = mokDataYears[selectedIndex];

    if (!yearFromRef.current || !yearToRef.current) return;

    numberAnimation({ ref: yearFromRef, to: newData.dates.from });
    numberAnimation({ ref: yearToRef, to: newData.dates.to });
    const timeline = sliderShowAnimation({ ref: sliderRef });

    const timeout = setTimeout(() => {
      setSelectedRange(newData);
    }, 300);

    return () => {
      timeline.kill();
      clearTimeout(timeout);
    };
  }, [selectedIndex]);

  return (
    <div className={`${s.main} container`}>
      <h1 className={s.title}>
        Исторические<br/>
        даты
      </h1>
      <div className={s.datesWrapper}>
        <CirclePagination
          items={mokDataYears.map((range) => range.name)}
          onClick={(index) => setSelectedIndex(index)}
          length={mokDataYears.length}
          selectedIndex={selectedIndex}
        />
        <p className={s.dates}>
          <span ref={yearFromRef}>{mokDataYears[0].dates.from}</span>
          <span ref={yearToRef}>{mokDataYears[0].dates.to}</span>
        </p>
      </div>
      <div className={s.controlBox}>
        <div className={s.control}>
          <div className={s.pagination}>
            {getTwoDigitNumber(selectedIndex + 1)}/{getTwoDigitNumber(mokDataYears.length)}
          </div>
          <div className={s.navigation}>
            <ArrowBtn
              direction="left"
              onClick={() => setSelectedIndex((prev) => prev - 1)}
              disabled={selectedIndex === 0}
            />
            <ArrowBtn
              direction="right"
              onClick={() => setSelectedIndex((prev) => prev + 1)}
              disabled={selectedIndex === mokDataYears.length - 1}
            />
          </div>
        </div>
        <div className={s.dotPagination}>
          {mokDataYears.map((_, i) => <span key={i} className={`${s.dot} ${selectedIndex === i ? s.active : ''}`} />)}
        </div>
      </div>
      <HistorySlider ref={sliderRef} title={selectedRange.name} slides={selectedRange.facts}/>
    </div>
  );
};