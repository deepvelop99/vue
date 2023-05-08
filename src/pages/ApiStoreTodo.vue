<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        @keyup.enter="addTask"
        class="col"
        bg-color="white"
        filled
        aria-placeholder="Add task"
        dense
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add"></q-btn>
        </template>
      </q-input>
    </div>

    <!--reset btn-->
    <q-btn label="reset" @click="resetItem"></q-btn>
    <!--list-->
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="item in tasks"
        :key="item.title"
        @click="item.done = item.done == 'Y' ? 'N' : 'Y'"
        :class="{ 'done bg-blue-1': item.done == 'Y' }"
        v-ripple
        clickable
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="item.done"
            color="primary"
            class="no-pointer-event"
            true-value="Y"
            false-value="N"
            dense
          ></q-checkbox>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="item.done == 'Y'" side>
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="edit"
            @click.stop="openDialog(item)"
          >
          </q-btn>
        </q-item-section>
        <q-item-section v-if="item.done == 'Y'" side>
          <q-btn
            flat
            round
            dense
            color="red"
            icon="delete"
            @click.stop="removeItem(item)"
          ></q-btn>
        </q-item-section>
      </q-item>
      <!--https://quasar.dev/vue-directives/intersection#intersection-api  //observed element-->
      <div v-intersection="onIntersection" v-if="tasks.length"></div>
    </q-list>
    <!--no list-->
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">No tasks</div>
    </div>
    <DialogCustom
      ref="dialog"
      :edit-task="editTask"
      :origin="origin"
      @onInput="editItem"
    >
    </DialogCustom>
  </q-page>
</template>

<script>
import useTodoStore from "src/stores/apistoretodo";
import { mapActions, mapState } from "pinia";
import DialogCustom from "components/DialogCustom.vue";

export default {
  name: "Todo",
  title: "Store Todo list",
  components: { DialogCustom },
  data() {
    return {
      newTask: "",
      totalCount: 0,
      origin: null,
      editTask: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapState(useTodoStore, ["tasks"]),
  },
  methods: {
    ...mapActions(useTodoStore, [
      "addDbTask",
      "fetchData",
      "editDBTodo",
      "removeDBItem",
      "resetDb",
    ]),
    async addTask() {
      if (!this.newTask) {
        await this.$q.notify({
          message: `내용은 필수입력입니다`,
          icon: "warning",
          color: "red",
        });
      } else {
        const payload = {
          title: this.newTask,
        };
        this.addDbTask(payload);
        await this.fetchData();

        await this.$q.notify({
          message: `${this.newTask} 추가하셨습니다`,
          icon: "home",
          color: "primary",
        });
        this.newTask = "";
      }
    },

    async removeItem(item) {
      this.removeDBItem(item);
      await this.$q.notify({
        message: `${item.title} 삭제하셨습니다`,
        icon: "home",
        color: "primary",
      });
    },

    async editItem(item) {
      this.editDBTodo(item);
      await this.$q.notify({
        message: `${item.title} 수정하셨습니다`,
        icon: "home",
        color: "primary",
      });
    },
    async resetItem() {
      this.resetDb();
      window.location.reload();
      await this.$q.notify({
        message: "자동으로 Todo 1부터 100까지 생성되었습니다.",
        icon: "home",
        color: "primary",
      });
    },

    //intersection
    async onIntersection(entry) {
      if (entry.isIntersecting) {
        this.$q.loading.show();
        this.fetchData();
        this.$q.loading.hide();
      }
    },

    //다이얼로그 열기
    openDialog(item) {
      this.$refs.dialog.dialog = true;
      this.editTask = item;
      this.origin = this.editTask.title;
    },
  },
};
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-tasks {
  opacity: 0.5;
}
</style>
