<template>
  <div id="todoList">
    <div class="header">
      <h1>Задачи</h1>
      <button id="sortingButton" @click="sortingTasks"></button>
    </div>
    <textarea
      id="editTextarea"
      placeholder="Enter a title for this card..."
      @keydown.enter="addingTasks"
    ></textarea>
    <button id="AddCard" @click="addingTasks">Add Card</button>
    <TodoUl v-bind:currentPage="currentPage" />
    <div class="buttonsDiv">
      <button
        id="nextPage"
        @click="toTheNextPage"
        :disabled="currentPage > calculatePages - 1"
      ></button>
      <button
        id="prevPage"
        @click="toThePrevPage"
        :disabled="currentPage === 1"
      ></button>
    </div>
  </div>
</template>

<script>
import store from "../store/index.js";
import { mapMutations } from "vuex";
import TodoUl from "./TodoUl";
export default {
  name: "TodoList",
  components: { TodoUl },
  computed: {
    calculatePages() {
      let allAmountOfTasks = this.$store.state.tasks.length;
      let limitedAmount = this.size;
      return Math.ceil(allAmountOfTasks / limitedAmount);
    }
  },
  data() {
    return {
      currentPage: parseInt(this.$route.params.pageNumber || 1)
    };
  },
  props: {
    size: {
      type: Number,
      default: 10
    }
  },
  methods: {
    ...mapMutations(["addTask"]),
    async addingTasks(event) {
      event.preventDefault();
      await store.dispatch("addingRecords");
      this.currentPage = 1;
      await this.$router.push("/");
    },
    sortingTasks() {
      store.commit("sortingTask");
    },
    async toTheNextPage() {
      this.currentPage++;
      await this.$router
        .push({
          name: "pagination",
          params: { pageNumber: `${this.currentPage}` }
        })
        .catch(() => {});
    },
    async toThePrevPage() {
      this.currentPage--;
      await this.$router
        .push({
          name: "pagination",
          params: { pageNumber: `${this.currentPage}` }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped></style>
