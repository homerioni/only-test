import s from './styles.module.scss';
import {RefObject} from "react";

type TNavigationArrowProps = {
  direction?: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  ref?: RefObject<HTMLButtonElement | null>;
};

export const SliderNavigationArrow = ({ direction = "right", onClick, disabled, className, ref, ...props }: TNavigationArrowProps) => {
  return (
    <button
      className={`${s.main} ${s[direction]} ${className ?? ''}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6L1 11" strokeWidth="2"/>
      </svg>
    </button>
  );
};