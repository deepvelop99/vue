<template class="q-pa-md q-gutter-md">
  <q-card-section>Message: {{ msg }}</q-card-section>
  <q-separator />
  <q-card-section>Using text interpolation: {{ rawHtml }}</q-card-section>
  <q-card-section
    >Using v-html directive: <span v-html="rawHtml"></span
  ></q-card-section>
  <q-separator />
  <q-card-section>
    <q-btn
      unelevated
      color="primary"
      type="a"
      target="_blank"
      v-bind:id="linkId"
      v-bind:href="link.to"
      :title="link.title"
      :label="link.label"
    ></q-btn>
  </q-card-section>
  <q-separator />
  <q-card-section>
    <q-btn :disable="isButtonDisabled" label="버튼 보이기"></q-btn>
  </q-card-section>
  <q-separator />
  <q-card-section>
    {{ number + 1 }}
  </q-card-section>
  <q-separator />
  <q-card-section>{{ ok ? "YES" : "NO" }}</q-card-section>
  <q-separator />
  <q-card-section>
    {{ message.split("").reverse().join("") }}
  </q-card-section>
  <q-separator />
  <q-card-section :id="`list-${id}`"> list-{{ id }} </q-card-section>
  <q-separator />
  <q-card-section class="text-h6">
    {{ calculateDate() }}
  </q-card-section>
  <q-separator />
  <q-card-section v-if="!seen"> Now you see me </q-card-section>
  <q-card-section v-else> on no! </q-card-section>
  <q-separator />
  <q-btn @click="awesome = !awesome" label="toggle"></q-btn>
  <q-separator />
  <q-card-section v-if="awesome"> Vue is awesome! </q-card-section>
  <q-card-section v-else> on no! </q-card-section>
  <q-separator />
  <q-card-section v-if="type == 'A'"> A </q-card-section>
  <q-card-section v-else-if="type === 'B'"> B </q-card-section>
  <q-card-section v-else-if="type === 'C'"> C </q-card-section>
  <q-card-section v-else> Not A/B/C </q-card-section>
  <q-separator />
  <div class="q-pa-md row items-start">
    <q-btn @click="increment" label="카운트" color="primary"></q-btn>
    <q-btn @click="decrease" label="감소" color="primary"></q-btn>
    <q-card-section>methodCount is: {{ methodCount }}</q-card-section>
  </div>
  <q-separator />
  <q-card-section>
    <q-input
      v-model="inputData"
      outlined
      bottom-slots
      label="DebounceEx"
      counter
      :dense="true"
    />
  </q-card-section>
  <q-separator />
</template>
<script charset="UTF-8">
import { date } from "quasar";
const { addToDate } = date;
const newDate = addToDate(new Date(), { days: 7, months: 1 });
import { nextTick } from "vue";
import { debounce } from "lodash-es";
export default {
  title: "Vue Basic",
  name: "VueEx",
  data() {
    return {
      msg: "hello Vue",
      rawHtml: '<span style="color: red">빨간색이어야 합니다.</span>',
      linkId: "vue",
      link: {
        to: "http://vuejs.org",
        title: "뷰 공식 사이트",
        label: "Vuejs.org",
      },
      isButtonDisabled: true,
      ok: true,
      number: 1000,
      message:
        "지금까지 템플릿의 단순한 속성만 있었습니다. 그러나 Vue는 실제로 모든 데이터가 내에서 Javascript 강화의 모든 기능을 지원합니다.",
      id: "Hyunseo",
      seen: false,
      awesome: true,
      type: "B",
      methodCount: 1,
      obj: {
        nested: { count: 0 },
        arr: ["foo", "bar"],
      },
      inputData: "",
    };
  },
  watch: {
    inputData: debounce(function (newVal, oldVal) {
      // 처리로직 작성
      console.log(newVal, oldVal);
    }, 500),
  },
  methods: {
    calculateDate() {
      const timeStamp = Date.now();
      const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm:ss");
      return formattedString;
    },
    increment() {
      this.methodCount++;
    },
    decrease() {
      this.methodCount--;
      nextTick(() => {});
    },
    mutateDeeply() {
      this.obj.nested.count++;
      this.obj.arr.push("baz");
    },
    click: debounce(function () {}, 500),
  },
  mounted() {
    this.increment();
  },
};
</script>

<style></style>
