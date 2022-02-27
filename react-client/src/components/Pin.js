import React from "react";

const ICON = `M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z`;

const pinStyle = {
  fill: "#d00",
};

function Pin(props) {
  const { size = 20 } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 384 512" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
}

export default React.memo(Pin);
