<template>
    <div class="table">
        <div class="table__manage">
            <button class="table__addnew" @click="$emit('add')">
                Добавить
            </button>
            <input type="text" class="table__search" placeholder="Поиск" v-model='search'
                   @keyup.enter="$emit('search:enter')"
                   @change="$emit('search:change')"
                   @keyup="$emit('search:keyup')">
        </div>
        <div class="table__inner">
            <div class="table__row-header" v-if="showHeader">
                <div class="table__cell-header" v-for="(item, key) in headers" :key="key" @click="$emit('sort',{ key: key, title: item.title })">
                    {{ item.title }}
                </div>
            </div>
            <div class="table__row loading" v-if="isLoading && !isError">
                <div class="table__cell" v-for="(item, key) in headers" :key="key">
                  <span class="loader">
                    {{ item.title }}
                  </span>
                </div>
            </div>
            <div class="table__body" v-if="!isLoading && !isError && data.length > 0">
                <div class="table__row" v-for="(row, index) in data" @click.native='$emit("open", row, index)' :key="row.link" >
                    <div class="table__cell" v-for="(item, key) in headers" :key="key">
                        <span v-if="typeof(data[index][key]) === 'boolean'">
                            {{ data[index][key] ? 'Да' : 'Нет' }}
                        </span>
                        <span v-else>
                            {{ data[index][key] }}
                        </span>
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
            errorLog: Array,
            headers: Object,
            showHeader: {
              type: Boolean,
              default: true
            },
            data: Array,

            skip: Number,
            limit: Number,
            total: Number,
        },
        data () {
            return {
                search: ''
            }
        },
    }
</script>

<style scoped lang="scss">
  .table {
    width: max-content;

    &__manage {
      display: flex;
      height: 36px;

      &-addnew {
        width: 100px;
        outline: none;
        border-radius: 5px 0px 0px 5px;
        border: 1px solid #c4cdd5;
        background: linear-gradient(180deg, #fff, #f9fafb);
        flex-grow: 0;
        cursor: pointer;
      }
      &-search {
        border-radius: 0px 5px 5px 0px;
        outline: none;
        padding: 0px 20px;
        font-size: 14px;
        background: linear-gradient(180deg, #fff, #f9fafb);
        flex-grow: 1;
        border: 1px solid rgb(196, 196, 196);
        border-left: 0px;
      }
    }

    &__body {

      &-empty {
        text-align: left;
        padding: 15px 12px;
        opacity: .5;

        &-error {
          color: red
        }
      }
    }

    &__row {
      display: flex;

      &-header {
        display: flex;
        padding: 10px 0px;
        height: 36px;
        box-sizing: content-box;
        font-weight: 600;
      }

      &:hover {
        background-color: rgb(245,246,247);
      }
    }

    &__cell {
      cursor: pointer;
      display: flex;
      border-bottom: 1px solid #c4cdd5;
      text-align: left;
      align-items: center;
      height: 30px;
      padding: 12px 10px 12px 0;
      width: 200px;

      &-header {
        width: 200px;
        padding-right: 10px;
        text-align: left;
        display: flex;
        align-items: center;

        &:first-child {
          padding-left: 12px;
        }

        &:last-child {
          padding-right: 12px;
        }

      }

      &:hover {
        background-color: rgb(245,246,247);
      }

      &:first-child {
        padding-left: 12px;
      }

      &:last-child {
        padding-right: 12px;
      }

      &.loading {
        border-bottom: 0;
      }

      span {
        width: 100%;
        height: 22px;
        border-radius: 5px;
      }
    }

    &__header {

      .th {
        width: 200px;
        padding-right: 10px;
        text-align: left;
        display: flex;
        align-items: center;

        &:first-child {
          padding-left: 12px;
        }

        &:last-child {
          padding-right: 12px;
        }

      }
    }

    &__footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20px 12px 12px;
      color: rgb(173, 173, 173);
      font-weight: 500;
      font-size: 15px;

      &-numeric {

      }
    }

    &__pagination {
      & > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }

      &-page {
        height: 25px;
        width: 25px;
        cursor: pointer;
        box-sizing: content-box;

        &:hover {
          border-bottom: 3px solid rgb(219, 219, 219);
        }

        &.active {
          border-bottom: 3px solid #42b983;
        }
      }
    }
  }
</style>
