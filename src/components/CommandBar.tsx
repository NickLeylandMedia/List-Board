/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import "../styles/CommandBar.scss";

/* Image Imports */

/* Component Imports */

/* Component Interfaces */
type Props = {
  clearAllHandler: () => void;
  resetAllHandler: () => void;
};

/* Component/Functions */
const CommandBar: React.FC<Props> = ({ clearAllHandler, resetAllHandler }) => {
  //Logic to show list form
  const showForm = () => {
    let targ = document.querySelector(".ListForm") as HTMLElement;
    targ.style.display = "flex";
  };

  //Function return statement
  return (
    <div className="CommandBar">
      <div className="commandsCont">
        <button className="commandButton btn btn-primary" onClick={showForm}>
          Add List
        </button>
        <button
          className="commandButton btn btn-yellow"
          onClick={clearAllHandler}
        >
          Clear Finished Tasks
        </button>
        <button className="commandButton btn" onClick={resetAllHandler}>
          Reset Checklists
        </button>
      </div>
    </div>
  );
};

/* Export Statement */
export default CommandBar;
