import React, { useState } from "react";
import "./style.css";

const Table = ({ columns, rows }) => {
  const [currentIndex, setIndex] = useState(0);
  const [step, setStep] = useState(5);

  const currentPageRows = rows.slice(currentIndex, Math.min(currentIndex + step,rows.length));

  const updatePage = (type, isDisabled) => {
    if (isDisabled) return;
    switch (type) {
      case "next":
        return setIndex(Math.min(currentIndex + step,rows.length));
      case "prev":
        return setIndex(Math.max(currentIndex - step,0));
      case "first":
        return setIndex(0);
      case "last":
        return setIndex(rows.length - (rows.length%step));
      default:
        return;
    }
  };

  const updateStep = (step,isDisabled) => {
    if(isDisabled) return;
    setStep(step)
  };

  // Disable logic
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + step >= rows.length;
  const isFirstDisabled = currentIndex === 0;
  const isLastDisabled = currentIndex + step >= rows.length;

  const isReduceStepDisabled = step<=5;
  const isIncreaseStepDisabled = step>= 10;

  return (
    <div className="table-wrapper">
      <table>
        {/* Table Header */}
        <thead>
          <tr>
            {columns.map((column, columnIndex) => (
              <th key={columnIndex}>{column}</th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {currentPageRows.map((row, rowIndex) => (
            <tr key={rowIndex} colSpan={columns.length}>
              {row.map((columnVal, columnIndex) => (
                <td key={columnIndex}>{columnVal}</td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* Table Footer */}
        <tfoot>
          <tr>
            <td colSpan="2" className="table-footer__section1">
              <div className="table-footer-text">
                Total rows per page: 
                <img
                    src="https://img.icons8.com/?size=100&id=11206&format=png&color=4caf50"
                    onClick={() => updateStep(step-1,isReduceStepDisabled)}
                    alt="minus"
                    className={`table-footer-items ${isReduceStepDisabled? "disabled" : ""}`}
                  />
                {step}
                <img
                    src="https://img.icons8.com/?size=100&id=11255&format=png&color=4caf50"
                    onClick={() => updateStep(step+1,isIncreaseStepDisabled)}
                    alt="plus"
                    className={`table-footer-items ${isIncreaseStepDisabled? "disabled" : ""}`}
                  />
              </div>
              <div>
                Page No :  {Math.floor(currentIndex/step+1)} / {Math.ceil(rows.length/step)}
              </div>
            </td>
            <td colSpan="3">
              <div className="table-footer">
                <img
                  src="https://img.icons8.com/?size=100&id=80000&format=png&color=4caf50"
                  onClick={() => updatePage("first", isFirstDisabled)}
                  alt="First"
                  className={`table-footer-items ${isFirstDisabled ? "disabled" : ""}`}
                />
                <img
                  src="https://img.icons8.com/?size=100&id=39776&format=png&color=FFFFFF"
                  onClick={() => updatePage("prev", isPrevDisabled)}
                  alt="Previous"
                  className={`table-footer-items ${isPrevDisabled ? "disabled" : ""}`}
                />
                <img
                  src="https://img.icons8.com/?size=100&id=39777&format=png&color=FFFFFF"
                  onClick={() => updatePage("next", isNextDisabled)}
                  alt="Next"
                  className={`table-footer-items ${isNextDisabled ? "disabled" : ""}`}
                />
                <img
                  src="https://img.icons8.com/?size=100&id=84729&format=png&color=4caf50"
                  onClick={() => updatePage("last", isLastDisabled)}
                  alt="Last"
                  className={`table-footer-items ${isLastDisabled ? "disabled" : ""}`}
                />
              </div>
            </td>
          </tr>
          <tr>
          <td colSpan="3" className="table-footer__section1--mob">
              <div className="table-footer-text">
                <span>Total rows per page: </span>
                <img
                    src="https://img.icons8.com/?size=100&id=11206&format=png&color=4caf50"
                    onClick={() => updateStep(step-1,isReduceStepDisabled)}
                    alt="minus"
                    className={`table-footer-items ${isReduceStepDisabled? "disabled" : ""}`}
                  />
                {step}
                <img
                    src="https://img.icons8.com/?size=100&id=11255&format=png&color=4caf50"
                    onClick={() => updateStep(step+1,isIncreaseStepDisabled)}
                    alt="plus"
                    className={`table-footer-items ${isIncreaseStepDisabled? "disabled" : ""}`}
                  />
              </div>
              <div>
                Page No :  {Math.floor(currentIndex/step+1)} / {Math.ceil(rows.length/step)}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
