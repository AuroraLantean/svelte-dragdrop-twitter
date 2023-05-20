
export const ssr = false;

export function load() {
  // fetch data from API/Database ...
  //console.log("Calling task-manager/load!");
  return {
    appName: "Task Manager",
    content: "Board"
  }
}