<template>
  <div class="table">
    <div class="table__manage" v-if="showManage">
      <button class="table__manage-addnew" @click="$emit('add')" v-if="1 !== 1">
        Добавить
      </button>
      <input type="text" class="table__manage-search" placeholder="Поиск" v-model='search'
             @keyup.enter="$emit('search:enter')"
             @change="$emit('search:change')"
             @input="$emit('search:input', search)">
      <button class="table__manage-addnew" @click="$emit('search:submit')">
        Поиск
      </button>
    </div>
    <div class="table__inner">
      <div class="table__row-header" v-if="showHeader">
        <div class="table__cell-header" :class="key" v-for="(item, key) in headers" :key="key"
             @click="$emit('sort',{ key: key, title: item.title })">
          {{ item.title }}
        </div>
      </div>
      <div class="table__row loading" v-if="isLoading && !isError">
        <div class="table__cell" :class="key" v-for="(item, key) in headers" :key="key">
                  <span class="loader">
                    {{ item.title }}
                  </span>
        </div>
      </div>

      <div class="table__body" v-if="!isLoading && !isError && data.length > 0">
        <div class="table__row" v-for="(row, index) in data" @click='$emit("open", row, index)' :key="row.link" v-if="tableVersion === 'desktop'">
          <div class="table__cell" :class="key" v-for="(item, key) in headers" :key="key">
            {{ row[key] | td(item.type, index) }}
          </div>
        </div>
        <div class="table__row" v-for="(row, index) in data" @click='$emit("open", row, index)' :key="row.link" v-if="tableVersion === 'mobile'">
          <div v-for="key in mobileTable.columns" :key="key">
            {{ row[key] }}
          </div>
          <div>
            <div v-for="key in mobileTable.data" :key="key">
              {{ headers[key].title }}: {{ row[key] }}
            </div>
          </div>

        </div>
      </div>
      <div class="table__body-empty" v-if="!isLoading && !isError && data.length === 0">
        Таблица пуста.
      </div>
      <div class="table__body-empty-error" v-if="isError">
        Ошибка. Попробуйте зайти позже.<br>
        {{ errorLog.join('; ') }}
      </div>
    </div>
    <div class="table__footer">
      <div class="table__footer-numeric">
        {{ skip }}-{{ Number(skip) + Number(limit) }} из {{ total }}
      </div>
      <div class="table__pagination" v-if="total >= limit">
        <div class="in-one-row" v-if="(total / limit) < 7">
          <router-link class="table__pagination-page" v-for="page in (total / limit)"
                       :key="page"
                       :class="{active: skip === (page - 1) * limit }"
                       tag="div"
                       :to="{ path: linkNav, query: { limit: limit, skip: limit * (page - 1) }}"
          >
            {{ page }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tableBox",
    props: {
      emitTarget: String,
      linkNav: String,
      isLoading: Boolean,
      isError: Boolean,
      errorLog: {
        type: Array,
        default: () => []
      },
      headers: {
        type: Object,
        required: true
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      showManage: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        required: true
      },

      skip: Number,
      limit: Number,
      total: Number,
      mobileColumns: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        search: ''
      }
    },
    computed: {
      tableVersion() {
        if (this.$breakPoint.current === 'exsm' || this.$breakPoint.current === 'sm' || this.$breakPoint.current === 'md') {
          return 'mobile'
        } else {
          return 'desktop'
        }
      },

      mobileTable() {
        let model = {
          columns: [],
          data: []
        }
        Object.keys(this.headers).map(key => {
          if (this.mobileColumns.indexOf(key) === -1) {
            model.data.push(key)
          } else {
            model.columns.push(key)
          }
        })
        return model
      }
    },
    filters: {
      td(value, type, index) {
        if (typeof type === 'function') {
          if (typeof type() === 'boolean') {
            return value ? 'Да' : 'Нет'
          } else {
            return value
          }
        } else if (type) {
          if (type === 'index') {
            return Number(index) + 1
          } else {
            return value
          }
        } else {
          return value
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .table__cell, .table__cell-header {
    &.index {
      width: 80px;
    }
  }

  .table__row-header {
    background: #43525e; //rgba(0,0,0,.9);
    color: white
  }
</style>
