<template>
  <div id="editList">
    <h1>Редактирование задачи</h1>
    <textarea
      id="editingTextarea"
      placeholder="Enter a title for this card..."
    ></textarea>
    <button id="saveButton" @click="saveTheEditedTask">Edit</button>
  </div>
</template>

<script>
import store from "../store/index.js";
import router from "./../router.js";
export default {
  name: "EditTask",
  mounted() {
    let textarea = document.getElementById("editingTextarea");
    for (let task of store.state.tasks) {
      if (task.id === this.$route.params.id) {
        textarea.value = task.text;
      }
    }
  },
  methods: {
    async saveTheEditedTask() {
      await store.dispatch("editingTasks", this.$route.params.id);
      await router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: "Roboto", sans-serif;
  vertical-align: baseline;
}

#editList {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-radius: 5px;
  margin: 30px;
  width: 350px;
  min-height: 400px;
  background: #e0e3e6;

  h1 {
    margin: 5px 0 5px 5px;
    font-size: 18px;
    font-weight: bold;
    color: #243849;
  }

  textarea {
    box-sizing: border-box;
    align-self: center;
    margin: 0 0 15px 0;
    width: 100%;
    min-height: 120px;
    resize: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 18px;
    font-weight: 500;
    text-align: justify;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  }

  #saveButton {
    margin: 0 0 5px 0;
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    padding: 10px;
    height: 65px;
    width: 115px;
    background-color: #7ca65c;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.61);
  }
}
</style>
