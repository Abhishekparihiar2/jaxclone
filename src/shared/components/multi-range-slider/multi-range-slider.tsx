import {
  ChangeEvent,
  FC,
  useCallback,
} from "react";
import classnames from "classnames";
import "./multi-range-slider.css";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  onChange: (min: number, max: number) => void;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  minVal,
  maxVal,
  onChange,
}) => {

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const handleMinChange = (value: number) => {
    onChange(value, maxVal);
  };
  const handleMaxChange = (value: number) => {
    onChange(minVal, value);
  };

  return (
    <>
      <div className="range-slider-wrapper">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          handleMinChange(value);
        }}
        className={classnames("slider-range-input", "thumb thumb--zindex-3", {
          "thumb--zindex-5": minVal > max - 1,
        })}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.max(+event.target.value, minVal + 1);
          handleMaxChange(value);
        }}
        className="thumb thumb--zindex-4 slider-range-input"
      />

      <div className="slider__track"></div>
      <div
        className="slider__range"
        style={{
          left: `${getPercent(minVal)}%`,
          width: `${getPercent(maxVal) - getPercent(minVal)}%`,
        }}
      ></div>
      <div className="buble odometer-buble left-bubble">{minVal}</div>
        <div className="buble odometer-buble right-bubble">{ maxVal }</div>
        </div>
    </>
  );
};

export default MultiRangeSlider;
