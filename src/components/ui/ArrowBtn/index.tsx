import s from "./styles.module.scss";

type TArrowBtnProps = {
  direction?: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
};

export const ArrowBtn = ({ direction = "right", disabled, onClick, ...props }: TArrowBtnProps) => {
  return (
    <button className={`${s.main} ${s[direction]}`} type="button" onClick={onClick} disabled={disabled} {...props}>
      <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.50012 0.750001L7.75012 7L1.50012 13.25" strokeWidth="2"/>
      </svg>
      <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.58386 1.04178L4.70886 4.16678L1.58386 7.29178" stroke="#42567A" strokeWidth="2"/>
      </svg>
    </button>
  );
};