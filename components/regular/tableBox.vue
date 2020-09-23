<template>
  <div class="table">
    <div class="table__manage" v-if="show_manage">
      <div class="table__manage-item">
        <select-box v-model="sort_processed" :rows="sort_values" placeholder="Сортировка"/>
      </div>
      <div class="table__manage-item">
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
    </div>
    <div class="table__inner">
      <div class="table__row-header" v-if="show_header">
        <div class="table__cell-header" :class="[key , {'sorted': sort === key} ]" :style="{width: `${ item.width || 200 }px`}"
             v-for="(item, key) in headers_processed" :key="key" @click="$emit('sort',key)">
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
        <transition-group name="list" tag="div" >
          <div class="table__row" v-for="(row, index) in data" @click='$emit("open", row, index)' :key="row.name + row.subject + row.EGERate">
            <div :class="[ key === 'unite_cell' ? 'table__cell-unite' : 'table__cell', key ]" :style="{width: `${ item.width || 200 }px`}"
                 v-for="(item, key) in headers_processed" :key="key" @click="$emit(`cell_click:${ key }`, row)">
              <span v-if="key === 'unite_cell'">
                <span v-for="(item,key ) in headers_for_unite">
                  {{ item.title }}: {{ row[key] | td(item.type, index) }} <br>
                </span>
              </span>
              <span v-else-if="key === 'name'" >
                <div> {{ row[key] | td(item.type, index) }} </div>
                <div>
                  <div v-for="(social, key) in row.social" v-if="row.social" @click="$emit('open:social', social)"
                       class="social">
                    <div class="social__svg" :style="{ backgroundImage: `url(${ $basePath }svg/social/${ key }.svg)` }"/>
                  </div>
                </div>
              </span>
              <span v-else-if="key === 'increased'" >
                {{ Number(row.beforeRate) ? (row.EGERate - row.beforeRate) : '' }}
              </span>
              <span v-else>
                {{ row[key] | td(item.type, index) }}
              </span>
            </div>
          </div>
        </transition-group>
      </div>
      <div class="table__body-empty" v-if="!isLoading && !isError && data.length === 0">
        Таблица пуста.
      </div>
      <div class="table__body-empty-error" v-if="isError">
        Ошибка. Попробуйте зайти позже.<br>
        {{ errorLog.join('; ') }}
      </div>
    </div>
    <div class="table__footer" v-if="show_footer">
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
      show_header: {
        type: Boolean,
        default: true
      },
      show_manage: {
        type: Boolean,
        default: true
      },
      show_footer: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        required: true
      },

      sort: String,

      skip: Number,
      limit: Number,
      total: Number,
    },
    data() {
      return {
        search: ''
      }
    },
    computed: {
      headers_processed() {
        let is_mobile = this.$breakPoint.current === 'exsm' || this.$breakPoint.current === 'sm' || this.$breakPoint.current === 'md'

        let unite_cell = {
          title: 'Данные',
          type: 'united_cells',
          width: 400
        }

        if (is_mobile) {
          let filtered_cells = Object.keys(this.headers).filter(key => this.headers[key].mobile_show)
          let headers_processed = {}

          filtered_cells.map(key => headers_processed[key] = this.headers[key])
          headers_processed['unite_cell'] = unite_cell

          console.log(headers_processed)

          return headers_processed
        } else {
          return this.headers
        }
      },

      headers_for_unite() {
        let keys = Object.keys(this.headers).filter(key => {
          return Object.keys(this.headers_processed).indexOf(key) === -1
        })
        let result = {}

        keys.map(key => {
          result[key] = this.headers[key]
        })

        return result
      },

      sort_processed: {
        get() {
          return this.sort
        },

        set(data) {
          this.$emit('sort', data)
        }
      },

      sort_values() {
        return Object.keys(this.headers).map(key => {
          return {
            title: this.headers[key].sort_name || this.headers[key].title,
            value: key
          }
        })
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
  .table__cell {
    &.name {
      span {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include media(large) {
          flex-direction: column;
          align-items: flex-start;
        }

        & > div:last-child {
          display: flex;

          @include media(large) {
            margin-top: 10px;
            margin-left: -5px;
          }
        }
      }
    }

    &.wentTo {
      padding-right: 0px;
    }
  }
  .table__cell, .table__cell-header {
    &.index {
      width: 80px;
    }

    &-unite {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      padding: 12px 0 12px 0;
      width: 400px;
    }

    &.unite_cell {
      width: 400px;
    }

    &.name {
      flex-grow: 1;
    }
  }

  .table__row-header {
    background: #43525e; //rgba(0,0,0,.9);
    color: white
  }

  .list {
    &-enter, &-leave-to /* .list-leave-active до версии 2.1.8 */ {
      opacity: 0;
      transform: translateY(30px);
      transition: all .3s;
    }

    &-move {
      transition: transform .3s;
    }
  }
</style>
