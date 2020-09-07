import Vue from "vue";
import VueRouter from "vue-router";
import EditTask from "./components/EditTask";
import TodoList from "./components/TodoList";
Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/task/:id",
      component: EditTask,
      name: "EditPage",
      props: {}
    },
    {
      path: "/",
      component: TodoList,
      name: "TodoList"
    },
    {
      path: "/page/:pageNumber",
      component: TodoList,
      name: "pagination",
      props: {}
    }
  ]
});
