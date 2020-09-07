<template>
  <ul id="todoUl">
    <Loader v-if="this.loading === false"></Loader>

    <ListItem
      v-bind:currentPage="currentPage"
      v-bind:text="list.text"
      v-bind:timestamp="list.timestamp"
      v-bind:isDone="list.isDone"
      v-bind:key="list.timestamp"
      v-bind:id="list.id"
      v-for="list of paginationPages"
    ></ListItem>
  </ul>
</template>

<script>
import store from "../store/index.js";
import Loader from "./loader";
import ListItem from "./ListItem";
export default {
  name: "TodoUl",
  data: function() {
    return {
      loading: false
    };
  },
  computed: {
    paginationPages() {
      const start = (this.currentPage - 1) * this.size,
        end = start + this.size;
      return this.$store.state.tasks.slice(start, end);
    }
  },
  components: { ListItem, Loader },
  async mounted() {
    await store.dispatch("downloadTasks");
    setTimeout(() => (this.loading = true), 1000);
  },
  props: {
    currentPage: Number,
    size: {
      default: 10
    }
  }
};
</script>

<style scoped></style>
