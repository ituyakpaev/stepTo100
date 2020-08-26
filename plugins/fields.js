import Vue from 'vue'

import checkBox from "../components/form/fields/checkboxBox";
import inputBox from "../components/form/fields/inputBox";
import selectBox from "../components/form/fields/selectBox";

const components = { checkBox, inputBox, selectBox }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
