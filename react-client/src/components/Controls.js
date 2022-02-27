import styled from "@emotion/styled";

export default function Controls({
  geoData,
  handleChangePath,
  handleChangeTimer,
  path,
  timer,
  setStart,
  start,
}) {
  return (
    <StyledControl>
      <div className="topContainer">
        <select value={path} onChange={handleChangePath} title="Choose Route">
          {!path && (
            <option value={""} disabled={geoData}>
              Choose Route
            </option>
          )}
          {geoData?.map((el) => {
            return (
              <option key={el.code} value={el.code}>
                {el.description}
              </option>
            );
          })}
        </select>
        {path && (
          <button onClick={() => setStart((pre) => !pre)}>
            {start ? "Stop" : "Start"}
          </button>
        )}
      </div>
      {path && !start && (
        <div className="bottomContainer">
          <div className="bottomItem">
            <label htmlFor="timer">Movement interval</label>
            <select
              name="timer"
              id="timer"
              value={timer}
              onChange={handleChangeTimer}
              title="Choose movement rate"
            >
              <option value={1}>1 Second</option>
              <option value={5}>5 Second</option>
              <option value={10}>10 Second</option>
            </select>
          </div>
        </div>
      )}
    </StyledControl>
  );
}

const StyledControl = styled.div`
  font-family: "Roboto";
  position: absolute;
  padding: 5px;
  box-shadow: 0 0 0 2px rgb(0 0 0 / 10%);
  border-radius: 4px;
  z-index: 1;
  background: white;
  top: 5px;
  left: 5px;
  display: flex;
  gap: 2.5px;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  font-family: "Roboto" !important;
  select {
    border: 1px solid #e5e5ea;
    color: #575757;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
    background: white;
    outline: none;
  }
  select:hover,
  select:focus {
    border-color: #3498ff;
  }
  .topContainer {
    display: flex;
    gap: 5px;
    select {
      width: 200px;
    }
    button {
      color: white;
      background: #3498ff;
      padding: 5px 7.5px;
      text-align: center;
      border-radius: 4px;
      border: 0px;
      width: 75px;
      cursor: pointer;
      outline: none;
      font-weight: 500;
    }
    button:hover {
      background: #2589f5;
    }
  }
  .bottomContainer {
    display: flex;
    flex-direction: column;
    padding: 5px;
    .bottomItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      select,
      .itemValue {
        width: 125px;
      }
    }
  }
`;
