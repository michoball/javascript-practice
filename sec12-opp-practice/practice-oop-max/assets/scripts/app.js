class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);

    return clonedElement;
  }

  static moveElement(elementId, newDestinatiomSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinatiomSelector);
    destinationElement.append(element);
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }

    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      //this.element.parentElement.removeChild(this.element)
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(claseNotifierFunction) {
    super();
    this.closeNotifier = claseNotifierFunction;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = "DUMMY";
    tooltipElement.addEventListener("click", this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectFunction;
    this.connectMoreInfohButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }

    const toolTip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    });
    toolTip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfohButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler);
  }

  connectSwitchButton(type) {
    const ProjectItemElement = document.getElementById(this.id);
    let swithBtn = ProjectItemElement.querySelector("button:last-of-type");
    swithBtn = DOMHelper.clearEventListeners(swithBtn);
    swithBtn.textContent = type === "active" ? "Finish" : "Activate";
    swithBtn.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListFn, type) {
    this.updateProjectListsHandler = updateProjectListFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
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
    //   const projectIndex = this.projects.findIndex(p => p.id === projectId)
    //   this.projects.splice(projectIndex,1)
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList("active");
    const finishedProjectsList = new ProjectList("finished");
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
