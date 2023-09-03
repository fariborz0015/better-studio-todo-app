import { DOING, DONE, TODO } from "../model";

export const colorDetective = {
  [TODO]: {
    info: "todoInfo",
    title: "todoTitle",
    action: "todoAction",
    background: "todoBackground",
  },
  [DONE]: {
    info: "doneInfo",
    title: "doneTitle",
    action: "doneAction",
    background: "doneBackground",
  },
  [DOING]: {
    info: "doingInfo",
    title: "doingTitle",
    action: "doingAction",
    background: "doingBackground",
  },
};
