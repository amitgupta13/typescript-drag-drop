import { autobind } from "../decorators/autobind";
import { Draggable } from "../models/drag-drop";
import { Project } from "../models/project";
import { Component } from "./base-component";

// ProjectItem class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    return this.project.people === 1
      ? "1 person"
      : `${this.project.people} persons`;
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  // learn more about drag and drop here https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @autobind
  dragEndHandler(_: DragEvent) {
    console.log("Dragend");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("p")!.textContent = this.project.description;
    this.element.querySelector("h3")!.textContent = `${this.persons} assigned`;
  }
}
