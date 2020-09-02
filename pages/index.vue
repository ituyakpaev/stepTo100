<template>
  <div>
    <main-screen />
    <div class="holder results">
      <h2 class="results__title">
        Таблица с результатами учеников
      </h2>
      <div class="results__table">
        <table-box :headers="table.headers" :data="rows" :showManage="true" :mobile-columns="table.mobileColumns"
                   @search:input="updateSearchString" class="results__table-inner"/>
      </div>
    </div>
  </div>
</template>

<script>
  import MainScreen from "../components/pages/index/main-screen";
  export default {
    components: {MainScreen},
    data() {
      return {
        show: false,
        table: {
          headers: {
            index: {
              title: '№',
              type: 'index'
            },
            name: {
              title: 'Имя'
            },
            city: {
              title: 'Город'
            },
            completionYear: {
              title: 'Год сдачи'
            },
            subject: {
              title: 'Предмет'
            },
            beforeRate: {
              title: 'Балл до курса'
            },
            EGERate: {
              title: 'Балл на ЕГЭ',
              type: Number
            },
            increased: {
              title: 'Повысил балл на',
              type: Number
            },
            wentTo: {
              title: 'Поступил',
              type: Boolean
            }
          },
          rows: [
            {
              name: 'Игорь Туякпаев',
              city: 'Санкт-Петербург',
              completionYear: 2018,
              subject: 'Английский язык',
              beforeRate: 51,
              EGERate: 69,
              increased: 18,
              wentTo: 'МГУ'
            }
          ],
          searchIndex: [ 'name', 'city', 'wentTo', 'subject'],
          mobileColumns: ['name', 'index']
        },
        searchString: ''
      }
    },
    methods: {
      sort(key) {

      },

      updateSearchString(up) {
        this.searchString = up
      }
    },
    computed: {
      rows() {
        let search = this.searchString.toLowerCase()

        if (search && String(search).length > 2) {
          let result = []
          this.table.rows.map(row => {
            console.log(row)
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
    }
  }
</script>

<style scoped lang="scss">
  .results {
    margin: 50px 0;

    &__title {
      margin-bottom: 30px;
    }

    &__table {
      &-inner {
        max-width: 100%;
      }
    }
  }
</style>
