import Vue from 'vue'

import modal from "../components/regular/modal";
import tableBox from "../components/regular/tableBox";

const components = { modal, tableBox }

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
