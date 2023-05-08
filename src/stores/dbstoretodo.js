import { defineStore } from "pinia";
import { uid } from "quasar";
import { LocalStorage } from "quasar";
export default defineStore("useDbTodo", {
  state: () => ({
    tasks: [],
  }),

  getters: {},

  actions: {
    insertTodo(title) {
      // db에 넣기 return id

      if (this.tasks) {
        this.tasks.unshift({
          id: uid(),
          title,
          done: "N",
        });
      } else {
        this.tasks = [];
        this.tasks.push({
          id: uid(),
          title,
          done: "N",
        });
      }

      LocalStorage.set("DbTodo", this.tasks);
    },
    listTodo() {
      this.tasks = LocalStorage.getItem("DbTodo");
    },
    removeTodo(id) {
      const idx = this.tasks.findIndex((task) => task.id == id);
      this.tasks.splice(idx, 1);
      LocalStorage.set("DbTodo", this.tasks);
    },
    editTodo(item) {
      const idx = this.tasks.findIndex((task) => task == item);
      item.done = "N";
      this.tasks.splice(idx, 1, item);
      LocalStorage.set("DbTodo", this.tasks);
    },
    resetTodo() {
      const todoItems = [];
      for (let i = 1; i <= 100; i++) {
        const newTodo = {
          id: uid(),
          title: `Todo__${i}`,
          done: "N",
        };
        todoItems.push(newTodo);
      }

      // 로컬 스토리지에 추가된 todo 아이템을 저장
      LocalStorage.set("DbTodo", todoItems);
    },
  },
});
