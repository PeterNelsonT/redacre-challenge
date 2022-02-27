import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";

const StyledSlider = styled.div`
  position: absolute;
  width: 150px;
  bottom: 15px;
  left: 15px;
  .MuiSlider-root {
    color: #52af77;
    height: 8px;
    .MuiSlider-track {
      border: none;
    }
    .MuiSlider-thumb {
      height: 20px;
      width: 20px;
      background-color: #fff;
      border: 2px solid currentColor;
      box-shadow: none !important;
    }
    .MuiSlider-valueLabel {
      display: none;
      line-height: 1.2;
      font-size: 12px;
      background: unset;
      padding: 5px 7.5px;
      background-color: #52af77;
      transform-origin: bottom left;
    }
  }
`;

export const Timeline = ({ totalPoints, currentPoint, sliderChange }) => {
  return (
    <StyledSlider>
      <Slider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        value={currentPoint}
        max={totalPoints}
        onChange={sliderChange}
      />
    </StyledSlider>
  );
};
