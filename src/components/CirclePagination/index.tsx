import s from './styles.module.scss';

type TCirclePaginationProps = {
  items: string[];
  onClick: (index: number) => void;
  length: number;
  selectedIndex: number;
};

export const CirclePagination = ({ items, onClick, length, selectedIndex }: TCirclePaginationProps) => {
  const marginAngle = 360 / length;
  const circleAngle = selectedIndex * marginAngle;

  return (
    <div className={s.main} style={{ transform: `translate(-50%, -50%) rotate(-${circleAngle}deg)` }}>
      <div className={s.content}>
        {items.map((name, index) => {
          const deg = marginAngle / 2 + marginAngle * index;

          return (
            <button
              key={index}
              type="button"
              className={`${s.item} ${selectedIndex === index ? s.active : ''}`}
              onClick={() => onClick(index)}
              style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-26.5rem) rotate(${deg * -1 + circleAngle}deg)` }}
            >
              <p className={s.index}>{index + 1}</p>
              <p className={s.name}>{name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};