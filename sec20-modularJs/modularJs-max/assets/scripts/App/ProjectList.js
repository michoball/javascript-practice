import { ProjectItem } from "./ProjectItem.js";
import { DOMHelper } from "../Utility/DOMHelper.js";
//import { moveElement, clearEventListeners } from "../Utility/DOMHelper.js";
// 이런식으로 원하는 function만 빼서 import 할 수 있다.
// import * as anyName from "~" 는 해당 파일안에 있는 모든 것을 anyName으로 가져올 수 있다.
// ex)  import * as DOM from "../Utility/DOMHelper.js"

//import { ProjectItem as PrjItem } from "./ProjectItem.js";
// ProjectItem 을 prjItem이라는 이름으로 바꿔서 가져온다는 뜻

export class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);

    list.addEventListener("dragenter", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        list.parentElement.classList.add("droppable");
        event.preventDefault();
      }
    });

    list.addEventListener("dragover", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
      }
    });

    list.addEventListener("dragleave", (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove("droppable");
      }
    });

    list.addEventListener("drop", (event) => {
      const prjId = event.dataTransfer.getData("text/plain");
      if (this.projects.find((p) => p.id === prjId)) {
        return;
      }
      document
        .getElementById(prjId)
        .querySelector("button:last-of-type")
        .click();
      list.parentElement.classList.remove("droppable");
      // event.preventDefault(); // not required
    });
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
