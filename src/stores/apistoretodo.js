import { defineStore } from "pinia";
import todoApi from "src/apis/todoApi";
export default defineStore("useDbTodo", {
  state: () => ({
    tasks: [],
  }),

  getters: {},

  actions: {
    async addDbTask(payload) {
      //저장
      const result = await todoApi.create(payload);
      if (result.status == 200) {
        if (result.data.id) {
          // front
          this.tasks.unshift({
            id: result.data.id,
            title: payload.title,
            done: "N",
          });
          this.totalCount++;
        }
      }
    },

    //목록가져오기
    async fetchData() {
      const len = 5;
      const lastId = this.tasks.length
        ? this.tasks[this.tasks.length - 1].id
        : 0;

      const payload = {
        lastId,
        len,
      };
      if (this.tasks.length > 0 && this.tasks.length == this.totalCount) {
        console.log("fetchData 호출안함", this.tasks.length, this.totalCount);
        return false;
      }
      const result = await todoApi.list(payload);

      if (result.data.list) {
        this.tasks = [...this.tasks, ...result.data.list];
        this.totalCount = result.data.totalCount;
      }
    },

    //수정
    async editDBTodo(item) {
      //배열에서 수정하되 done은 'n'으로
      const idx = this.tasks.findIndex((task) => task == item);
      item.done = "N";
      this.tasks.splice(idx, 1, item);
      await todoApi.update(item);
    },

    //삭제
    async removeDBItem(item) {
      // 배열 안 오브젝트일때 idx
      const idx = this.tasks.findIndex((task) => task.id == item.id);
      //삭제 array.splice(시작 index, 제거 index, 추가 요소)
      this.tasks.splice(idx, 1);
      await todoApi.remove(item);
    },

    //더미리스트 만들기
    async resetDb() {
      const payload = {
        title: "todo_",
        done: "N",
        len: 100,
      };
      const result = await todoApi.reset(payload);
      if (result.status == 200) {
        console.log(result.status);
        this.fetchData();
      }
    },
  },
});
