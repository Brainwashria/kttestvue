import Vue from "vue";
import Vuex from "vuex";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/database";

Vue.use(Vuex);
Vue.use(firestorePlugin);

firebase.initializeApp({
  apiKey: "AIzaSyAJvunfADMFWyIUkKDe_58OE6NOkeltff8",
  authDomain: "kttest-5d25d.firebaseapp.com",
  databaseURL: "https://kttest-5d25d.firebaseio.com",
  projectId: "kttest-5d25d",
  storageBucket: "kttest-5d25d.appspot.com",
  messagingSenderId: "923870965029",
  appId: "1:923870965029:web:a68c980a4100a722673ecc"
});
const db = firebase.database();

export default new Vuex.Store({
  actions: {
    async changingData({ commit }, { id, taskIsDone }) {
      await db.ref(`tasks/${id}`).update({ isDone: taskIsDone });
      commit("changedData", { id, taskIsDone });
    },
    async downloadTasks({ commit }) {
      db.ref("/tasks")
        .once("value")
        .then(function(snapshot) {
          let tasks = [];
          for (let prop in snapshot.val()) {
            let obj = snapshot.val()[prop];
            obj.id = prop;
            tasks.push(obj);
          }
          commit("downloadTasks", tasks);
        });
    },
    async addingRecords({ commit }) {
      let text = document.getElementById("editTextarea").value.trim();
      if (!text) return;
      let timestamp = Date.now();
      let record = { text, timestamp, isDone: false };
      const { key } = await db.ref("/tasks").push(record);
      record.id = key;
      commit("addTask", record);
    },
    async deleteTask({ commit }, id) {
      await db.ref(`/tasks/${id}`).remove();
      commit("deleteTaskFromStore", id);
    },
    async editingTasks({ commit }, id) {
      let value = document.getElementById("editingTextarea").value;
      await db.ref(`/tasks/${id}`).update({ text: `${value}` });
      commit("saveTheEditedTask", id);
    }
  },
  mutations: {
    changedData(state, { taskIsDone, id }) {
      for (let task of state.tasks) {
        if (task.id === id) {
          task.isDone = taskIsDone;
        }
      }
    },
    downloadTasks(state, payload) {
      state.tasks = payload;
    },
    addTask(state, payload) {
      state.tasks.push(payload);
      document.getElementById("editTextarea").value = "";
    },
    saveTheEditedTask(state, id) {
      let textarea = document.getElementById("editingTextarea");
      let tasks = state.tasks;
      for (let task of tasks) {
        if (task.id === id) {
          task.text = textarea.value;
        }
      }
    },
    sortingTask(state) {
      return state.tasks.reverse();
    },
    deleteTaskFromStore(state, id) {
      let taskIndex = state.tasks.findIndex(task => task.id === id);
      state.tasks.splice(taskIndex, 1);
      return state.tasks;
    }
  },
  state: {
    tasks: []
  },
  getters: {
    tasksList(state) {
      return state.tasks;
    }
  }
});
