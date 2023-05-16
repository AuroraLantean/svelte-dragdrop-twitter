import { writable } from "svelte/store";

/*function createStore() {
  // setTimeout(() => {
  //   taskList.set([1,2,3]);
  // }, 1000);
  const taskList = writable([], () => {
    //start function only runs once
    let i = 0;
    const id = setInterval(() => {
      console.log("Updating Value");
      taskList.update((list) => [...list, i++]);
    }, 2000);

    return function stop() {
      clearInterval(id);
    };
  });
  return taskList;
}*/
const DEFAUL_DATA = [
  {
    id: "l-1",
    text: "List 1",
    items: [
      { id: "t-1", text: "Task 1" },
      { id: "t-2", text: "Task 2" },
      { id: "t-3", text: "Task 3" }
    ]
  },
  {
    id: "l-2",
    text: "List 2",
    items: [
      { id: "t-4", text: "Task 4" },
      { id: "t-5", text: "Task 5" },
      { id: "t-6", text: "Task 6" }
    ]
  },
  {
    id: "l-3",
    text: "List 3",
    items: [
      { id: "t-7", text: "Task 7" },
      { id: "t-8", text: "Task 8" },
      { id: "t-9", text: "Task 9" }
    ]
  }
];
function createStore() {
  const taskList = writable(DEFAUL_DATA);
  const { subscribe, update } = taskList;
  //return taskList;
  //or
  //can limit methods to only subscribe or ...
  return {
    subscribe: subscribe,
    updateTask: (task, listIdx) => {
      /*const taskIdx = get(taskList)[listIdx].items.findIndex(item => item.id === task.id);

      if (taskIdx > -1) {
        taskList.update(list => {
          list[listIdx].items[taskIdx] = {...task};
          return list;
        })
      }
      ----------== */
      update((list) => {
        const taskIdx = list[listIdx].items.findIndex((item) => item.id === task.id);

        if (taskIdx > -1) {
          list[listIdx].items[taskIdx] = { ...task };
        }

        return list;
      });
    },
    addList: () => {
      update((list) => [
        ...list,
        {
          id: new Date().toISOString(),
          text: "New List",
          items: []
        }
      ]);
    },
    addTask: (listIdx) => {
      update((list) => {
        const { items } = list[listIdx];

        list[listIdx].items = [
          ...items,
          {
            id: new Date().toISOString(),
            text: "What to do?"
          }
        ];

        return list;
      });
    }
  };
}
export const taskListStore = createStore();
