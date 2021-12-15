/* Library Imports */
//React
import React, { useEffect, useState } from "react";

/* Stylesheet Imports */
import "./styles/App.scss";

/* Image Imports */

/* Component Imports */
import CommandBar from "./components/CommandBar";
import ListDisplay from "./components/ListDisplay";
import ListForm from "./components/ListForm";

/* Component/Functions */
const App = () => {
  /* Logic for loading from Local Storage */
  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("lists") || "false");
    if (localData === "false") {
      setLists([]);
    } else {
      setLists(localData);
    }
  }, []);

  //Array/State to store lists
  const [lists, setLists] = useState([] as any[]);

  /* Logic for adding a new list */
  const newHandler = (e: any): void => {
    e.preventDefault();
    let proxyList: any[];
    if (lists.length) {
      proxyList = [...lists];
      console.log(proxyList);
    } else {
      proxyList = [];
      console.log(proxyList);
    }

    const formData = e.target.form;
    let newList;
    let check;
    if (formData[1].checked === true) {
      check = true;
    } else {
      check = false;
    }

    let List = (Name: string, Type: string, Items: any[]) => {
      return { Name: Name, Type: Type, Items: [] };
    };

    if (check) {
      newList = List(formData[0].value, "Check", []);
    } else {
      newList = List(formData[0].value, "Todo", []);
    }

    proxyList.push(newList);
    setLists(proxyList);
    localStorage.setItem("lists", JSON.stringify(proxyList));
  };

  /* Logic for toggling task completion */
  const toggleHandler = (e: React.MouseEvent): void => {
    const proxyList = [...lists];
    const target = e.target as HTMLElement;
    if (target.tagName === "DIV") {
      const titleElem = target.parentElement?.parentElement?.firstChild
        ?.firstChild as HTMLElement;
      const titleTerm = titleElem.innerHTML;
      const titleIndex = proxyList.findIndex((list) => {
        return list.Name === titleTerm;
      });
      const taskElem = target.firstChild as HTMLElement;
      const taskTerm = taskElem.innerHTML;
      const taskIndex = proxyList[titleIndex].Items.findIndex((task: any) => {
        return task.Task === taskTerm;
      });
      if (proxyList[titleIndex].Items[taskIndex].Completed === false) {
        proxyList[titleIndex].Items[taskIndex].Completed = true;
        setLists(proxyList);
        localStorage.setItem("lists", JSON.stringify(proxyList));
      } else {
        proxyList[titleIndex].Items[taskIndex].Completed = false;
        setLists(proxyList);
        localStorage.setItem("lists", JSON.stringify(proxyList));
      }
    } else {
      const titleElem = target.parentElement?.parentElement?.parentElement
        ?.firstChild?.firstChild as HTMLElement;
      const titleTerm = titleElem.innerHTML;
      const titleIndex = lists.findIndex((list: any) => {
        return list.Name === titleTerm;
      });

      if (target.tagName === "IMG") {
        const curTarg = target.previousSibling as HTMLElement;
        const taskTerm = curTarg.innerHTML;
        const taskIndex = proxyList[titleIndex].Items.findIndex((task: any) => {
          return task.Task === taskTerm;
        });
        if (proxyList[titleIndex].Items[taskIndex].Completed === false) {
          proxyList[titleIndex].Items[taskIndex].Completed = true;
          setLists(proxyList);
          localStorage.setItem("lists", JSON.stringify(proxyList));
        } else {
          proxyList[titleIndex].Items[taskIndex].Completed = false;
          setLists(proxyList);
          localStorage.setItem("lists", JSON.stringify(proxyList));
        }
      } else {
        const taskTerm = target.innerHTML;
        const taskIndex = proxyList[titleIndex].Items.findIndex((task: any) => {
          return task.Task === taskTerm;
        });
        if (proxyList[titleIndex].Items[taskIndex].Completed === false) {
          proxyList[titleIndex].Items[taskIndex].Completed = true;
          setLists(proxyList);
          localStorage.setItem("lists", JSON.stringify(proxyList));
        } else {
          proxyList[titleIndex].Items[taskIndex].Completed = false;
          setLists(proxyList);
          localStorage.setItem("lists", JSON.stringify(proxyList));
        }
      }
    }
  };

  /* Logic for resetting individual checklists */
  const indivResetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const proxyList = [...lists];
    const target = e.target as HTMLElement;
    const titleElem = target.parentElement?.parentElement?.parentElement
      ?.firstChild?.firstChild as HTMLElement;
    const titleTerm = titleElem.innerHTML;
    const titleIndex = proxyList.findIndex((list) => {
      return list.Name === titleTerm;
    });

    for (let i: number = 0; i < proxyList[titleIndex].Items.length; i++) {
      proxyList[titleIndex].Items[i].Completed = false;
    }
    setLists(proxyList);
    localStorage.setItem("lists", JSON.stringify(proxyList));
  };

  /* Logic for adding items to a list */
  const addToListHandler = (e: any) => {
    e.preventDefault();
    const proxyList = [...lists];
    const target = e.target as HTMLElement;
    const listElem = target.parentElement?.parentElement?.parentElement
      ?.firstChild?.firstChild as HTMLElement;
    const listTerm = listElem.innerHTML;
    const listIndex = proxyList.findIndex((list) => list.Name === listTerm);
    const inputElem = target.previousSibling as HTMLInputElement;
    let inputText = inputElem.value;
    if (inputText === "") {
      return window.alert("Please input a task.");
    }
    let Item = (Task: string, Completed: boolean) => {
      return { Task: Task, Completed: Completed };
    };
    let newItem = Item(inputText, false);
    proxyList[listIndex].Items.push(newItem);
    setLists(proxyList);
    localStorage.setItem("lists", JSON.stringify(proxyList));
    inputElem.value = "";
  };

  /* Logic for clearing completed tasks from an individual list */
  const indivClearHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const proxyList = [...lists];
    const target = e.target as HTMLElement;
    const titleElem = target.parentElement?.parentElement?.parentElement
      ?.firstChild?.firstChild as HTMLElement;
    const titleTerm = titleElem.innerHTML;
    const titleIndex = proxyList.findIndex((list) => {
      return list.Name === titleTerm;
    });
    const newArr = proxyList[titleIndex].Items.filter((task: any) => {
      return task.Completed === false;
    });
    proxyList[titleIndex].Items = newArr;
    setLists(proxyList);
    localStorage.setItem("lists", JSON.stringify(proxyList));
  };

  /* Logic for deleting an individual list */
  const indivDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const proxyList = [...lists];
    const target = e.target as HTMLElement;
    const titleElem = target.parentElement?.parentElement?.parentElement
      ?.firstChild?.firstChild as HTMLElement;
    const titleTerm = titleElem.innerHTML;
    const titleIndex = proxyList.findIndex((list) => {
      return list.Name === titleTerm;
    });
    if (target.innerHTML === "Delete List") {
      console.log("Step 1");
      target.innerHTML = "Confirm?";
    } else {
      console.log("del");
      proxyList.splice(titleIndex, 1);
      setLists(proxyList);
      localStorage.setItem("lists", JSON.stringify(proxyList));
    }
  };

  //Logic to clear all completed tasks from all checklists
  const clearAllHandler = () => {
    const proxyList = [...lists];
    for (let i: number = 0; i < proxyList.length; i++) {
      if (proxyList[i].Type === "Todo") {
        const delList = proxyList[i].Items.filter(
          (task: any) => task.Completed === false
        );
        proxyList[i].Items = delList;
      }
    }
    setLists(proxyList);
    localStorage.setItem("lists", JSON.stringify(proxyList));
  };

  //Logic to reset all checklists
  const resetAllHandler = () => {
    const proxyList = [...lists];
    for (let i: number = 0; i < proxyList.length; i++) {
      if (proxyList[i].Type === "Check") {
        for (let j: number = 0; j < proxyList[i].Items.length; j++) {
          proxyList[i].Items[j].Completed = false;
        }
      }
    }
    setLists(proxyList);
    localStorage.setItem("lists", JSON.stringify(proxyList));
  };

  //Function Return Statement
  return (
    <div className="App">
      <React.Fragment>
        <ListForm newHandler={newHandler} />
        <CommandBar
          clearAllHandler={clearAllHandler}
          resetAllHandler={resetAllHandler}
        />
        <ListDisplay
          lists={lists}
          toggleHandler={toggleHandler}
          indivClearHandler={indivClearHandler}
          indivDeleteHandler={indivDeleteHandler}
          indivResetHandler={indivResetHandler}
          addToListHandler={addToListHandler}
        />
      </React.Fragment>
    </div>
  );
};

/* Export Statement */
export default App;
