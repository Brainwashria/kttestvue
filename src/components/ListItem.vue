<template>
  <li
    :timestamp="timestamp"
    class="taskList"
    @mouseover="onMouseOver"
    @mouseleave="onMouseOut"
    :id="id"
  >
    <div class="firstColumn">
      <input type="checkbox" class="checkbox" @change="checkbox" />
      <span>{{ text }}</span>
    </div>
    <div id="tasksButtonsDiv">
      <button
        class="editButton tasksButtons"
        @click="routeToTheEditPage"
      ></button>

      <button class="deleteButton tasksButtons" @click="deleteTask"></button>
    </div>
  </li>
</template>

<script>
import EditTask from "./EditTask";
import store from "../store/index.js";

export default {
  name: "ListItem",

  props: {
    currentPage: {
      type: Number
    },
    size: {
      default: 10,
      type: Number
    },
    timestamp: {
      type: Number
    },
    text: {
      type: String
    },
    isDone: {
      type: Boolean
    },
    id: {
      type: String
    }
  },
  mounted() {
    let li = document.getElementsByClassName("taskList");

    for (let task of this.$store.state.tasks) {
      for (let list of li) {
        if (task.id === list.id) {
          list.childNodes[0].firstChild.checked = task.isDone;
          if (task.isDone === true) {
            list.classList.add("doneTaskList");
          }
        }
      }
      console.log(task);
    }
  },
  methods: {
    checkbox(event) {
      let li = event.target.closest("li");
      let id = li.id;
      let taskIsDone = event.target.checked;
      console.dir(li);
      if (taskIsDone === true) {
        li.classList.toggle("doneTaskList");
      } else {
        li.classList.toggle("doneTaskList");
      }
      store.dispatch("changingData", { id, taskIsDone });
    },
    async routeToTheEditPage(event) {
      let li = event.target.closest("li");
      let id = li.id;
      await this.$router.push({
        path: `task/${id}`,
        params: { id },
        name: "EditPage",
        component: EditTask
      });
    },
    onMouseOver(event) {
      let target = event.target;
      if (target.tagName !== "LI") return;
      let buttonsDiv = target.lastChild;
      buttonsDiv.style.display = "block";
    },
    onMouseOut(event) {
      let target = event.target;
      let buttonsDiv = target.lastChild;
      buttonsDiv.style.display = "none";
    },
    async deleteTask(event) {
      let li = event.target.closest("li");
      await store.dispatch("deleteTask", li.id);
    }
  }
};
</script>

<style scoped></style>
