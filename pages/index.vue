<template>
  <div>
    <main-screen />
    <div class="holder results">
      <h2 class="results__title">
        Таблица с результатами учеников
      </h2>
      <div class="results__table">
        <table-box :headers="table.headers" :data="rows" :showManage="true" :show_footer="false"
                   @search:input="updateSearchString" class="results__table-inner"
                  @sort="sort_rows" :sort="table.sort"
                  @open:social="openSocial"/>
      </div>
    </div>
  </div>
</template>

<script>
  import MainScreen from "../components/pages/index/main-screen";
  import students from "../middleware/students";

  export default {
    components: {MainScreen},
    data() {
      return {
        show: false,
        table: {
          headers: {
            index: {
              title: '№',
              type: 'index',
              sort_name: 'По номеру',
              mobile_show: true,
              width: 60
            },
            name: {
              title: 'Имя',
              sort_name: 'По имени',
              mobile_show: true
            },
            city: {
              title: 'Город',
              sort_name: 'По городу',
            },
            completionYear: {
              title: 'Год сдачи',
              sort_name: 'По году сдачи',
              width: 100
            },
            subject: {
              title: 'Предмет',
              sort_name: 'По предмету',
            },
            beforeRate: {
              title: 'Балл до курса',
              sort_name: 'По баллу до курса',
              width: 100
            },
            EGERate: {
              title: 'Балл на ЕГЭ',
              sort_name: 'По баллу на ЕГЭ',
              type: Number,
              width: 100,
              mobile_show: true
            },
            increased: {
              title: 'Повысил балл на',
              sort_name: 'По повышению балла',
              type: Number,
              width: 100
            },
            wentTo: {
              title: 'Поступил',
              sort_name: 'По ВУЗ-у',
            }
          },
          rows: [],
          searchIndex: [ 'name', 'city', 'wentTo', 'subject'],
          sort: ''
        },
        searchString: ''
      }
    },
    methods: {
      sort_rows(data) {
        if (this.table.sort === data) {
          this.table.rows.reverse()
        } else {
          if (data === 'beforeRate' || data === 'EGERate') {
            this.table.rows.sort((prev, next) => {
              let getNumber = e => +/\d+/.exec(e) || 0
              return getNumber(prev[data]) - getNumber(next[data])
            }).reverse()
          } else if (data === 'increased') {
            this.table.rows.sort((prev, next) => {
              let getNumber = e => +/\d+/.exec(e) || 0
              return getNumber(Number(prev.beforeRate) ? (prev.EGERate - prev.beforeRate) : '') - getNumber(Number(next.beforeRate) ? (next.EGERate - next.beforeRate) : '')
            }).reverse()
          } else {
            this.table.rows.sort((prev, next) => {
              if (prev[data] > next[data]) return 1
              if (prev[data] < next[data] || ('!@#$%^&*()_+').indexOf(prev[data][0]) !== -1 || !prev[data]) return - 1
              if (prev[data] === next[data]) return 0
            })
          }

          //result = result.reverse()
        }
        this.table.sort = data

      },

      updateSearchString(up) {
        this.searchString = up
      },

      openSocial(link) {
        if (link) {
          let win = window.open()
          win.opener = null
          win.location = link
        }
      }
    },
    computed: {
      rows() {
        let search = this.searchString.toLowerCase()

        if (search && String(search).length > 2) {
          let result = []
          this.table.rows.map(row => {
            this.table.searchIndex.map(key => {

              if (row[key].toLowerCase().indexOf(search) !== -1) {
                result.push(row)
              }

            })
          })
          return result
        } else {
          return this.table.rows
        }
      }
    },
    created() {
      this.table.rows = students

      this.sort_rows('EGERate')
    }
  }
</script>

<style lang="scss">
  .results {
    margin: 50px 0;

    @include media(exsm) {
      margin: 20px 0 50px 0;
    }

    &__title {
      margin-bottom: 30px;
    }

    &__table {
      margin: 0 auto 150px;

      @include media(exsm) {
        font-size: 14px;
      }
      &-inner {
        max-width: 100%;
      }
    }
  }

  .social {
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    border-radius: 50%;
    transition: all .2s;
    cursor: pointer;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);;

    &:hover {
      background-color: white;
      box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);;
    }

    &__svg {
      height: 16px;
      width: 16px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
</style>
