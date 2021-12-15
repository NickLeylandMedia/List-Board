/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import "../styles/ListForm.scss";

/* Image Imports */

/* Component Imports */

/*Component Interfaces */
type Props = {
  newHandler: (e: any) => void;
};

/* Component/Functions */
const ListForm: React.FC<Props> = ({ newHandler }) => {
  //Logic to hide the form
  const hideForm = () => {
    let targ = document.querySelector(".ListForm") as HTMLElement;
    targ.style.display = "none";
  };

  //Function Return Statement
  return (
    <div className="ListForm card">
      <form action="">
        <h2>Add New List</h2>

        <label htmlFor="listName">List Name</label>
        <input type="text" id="listName" />
        <div className="listOptions">
          <div className="option">
            <label htmlFor="check">Checklist</label>
            <input type="radio" name="listType" id="check" />
          </div>
          <div className="option">
            <label htmlFor="todo">To Do List</label>
            <input type="radio" name="listType" id="todo" />
          </div>
        </div>
        <button className="addButton btn btn-success" onClick={newHandler}>
          Add List
        </button>
      </form>
      <button className="closeOut" onClick={hideForm}>
        DONE
      </button>
    </div>
  );
};

/* Export Statement */
export default ListForm;
