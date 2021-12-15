/* Library Imports */
//React
import React from "react";

/* Stylesheet Imports */
import "../styles/ListDisplay.scss";

/* Image Imports */
import blank from "../img/blankBox.svg";
import checked from "../img/checkedBox.svg";

/* Component Imports */

/*Component Interfaces */
type Props = {
  lists: any[];
  toggleHandler: (e: React.MouseEvent) => void;
  indivClearHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  indivDeleteHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  indivResetHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
  addToListHandler: (e: any) => void;
};

/* Component/Functions */
const ListDisplay: React.FC<Props> = ({
  lists,
  toggleHandler,
  indivClearHandler,
  indivDeleteHandler,
  indivResetHandler,
  addToListHandler,
}) => {
  /* Logic for Rendering Lists */
  let renderedLists;
  if (lists.length) {
    renderedLists = lists.map(
      ({ Name, Type, Items }: { Name: string; Type: string; Items: any[] }) => {
        const compNumb = Items.filter((item) => item.Completed === true).length;
        const totNumb = Items.length;
        const renderedItems = Items.map(
          ({ Task, Completed }: { Task: string; Completed: boolean }) => {
            if (Completed) {
              return (
                <div
                  key={`${Name}${Task}`}
                  className="listItem"
                  onClick={toggleHandler}
                >
                  <p className="itemText">{Task}</p>
                  <img src={checked} alt="" className="itemimg" />
                </div>
              );
            } else {
              return (
                <div
                  key={`${Name}${Task}`}
                  className="listItem"
                  onClick={toggleHandler}
                >
                  <p className="itemText">{Task}</p>
                  <img src={blank} alt="" className="itemimg" />
                </div>
              );
            }
          }
        );
        if (Type === "Check") {
          return (
            <div key={`checklist${Name}`} className="list check card">
              <div className="wrapper">
                <div className="titleInfo">
                  <h5 className="listTitle">{Name}</h5>
                  <p className="listProg">{`${compNumb}/${totNumb}`}</p>
                </div>
                <div className="itemList">{renderedItems}</div>
                <div className="listInputCont">
                  <form action="">
                    <input
                      type="text"
                      className="listInput"
                      onSubmit={addToListHandler}
                    />
                    <button
                      className="listConfirmButton"
                      onClick={addToListHandler}
                    >
                      Add
                    </button>
                  </form>
                </div>
                <div className="bottomListBlock">
                  <p className="identifier">Checklist</p>
                  <div className="listActions">
                    <button
                      className="listAction btn btn-error"
                      onClick={indivDeleteHandler}
                    >
                      Delete List
                    </button>
                    <button
                      className="listAction btn"
                      onClick={indivResetHandler}
                    >
                      Reset List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={`todolist${Name}`} className="list todo card">
              <div className="wrapper">
                <div className="titleInfo">
                  <h5 className="listTitle">{Name}</h5>
                  <p className="listProg">{`${compNumb}/${totNumb}`}</p>
                </div>
                <div className="itemList">{renderedItems}</div>
                <div className="listInputCont">
                  <form className="listForm" action="">
                    <input
                      type="text"
                      className="listInput"
                      onSubmit={addToListHandler}
                    />
                    <button
                      className="listConfirmButton"
                      onClick={addToListHandler}
                    >
                      Add
                    </button>
                  </form>
                </div>
                <div className="bottomListBlock">
                  <p className="identifier">To-Do List</p>
                  <div className="listActions">
                    <button
                      className="listAction btn btn-error"
                      onClick={indivDeleteHandler}
                    >
                      Delete List
                    </button>
                    <button
                      className="listAction btn"
                      onClick={indivResetHandler}
                    >
                      Reset List
                    </button>
                    <button
                      className="listAction btn btn-yellow"
                      onClick={indivClearHandler}
                    >
                      Clear Finished
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }
    );
  } else {
    return (
      <div className="ListDisplay">
        <h2>Please create a list!</h2>
      </div>
    );
  }

  //Function Return Statement
  return <div className="ListDisplay">{renderedLists}</div>;
};

/* Export Statement */
export default ListDisplay;
