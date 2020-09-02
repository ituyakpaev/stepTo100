<template>
  <div class="holder">
    <div class="manage__form">
      <input-box v-for="(input, key) in model" :key="key" v-model="input.value" :label="input.label" :error-text="input.error"/>
      <button @click="save" class="button">
        Добавить
      </button>
    </div>
    <table-box :headers="table.headers" :data="table.rows"/>
  </div>
</template>

<script>
  import TableBox from "../components/regular/tableBox";
  import InputBox from "../components/form/fields/inputBox";
  export default {
    name: "manage",
    components: {InputBox, TableBox},
    data() {
      return {
        result: [],
        model: {
          name: {
            label: 'Имя ученика',
            placeholder: 'Иван Иванов',
            value: '',
            error: ''
          },
          city: {
            label: 'Город',
            value: '',
            error: ''
          },
          completionYear: {
            label: 'Год сдачи',
            value: '',
            error: ''
          },
          subject: {
            label: 'Предмет',
            value: '',
            error: ''
          },
          beforeRate: {
            label: 'Балл до обучения',
            value: '',
            error: ''
          },
          EGERate: {
            label: 'Балл при сдаче',
            value: '',
            error: ''
          },
          increased: {
            label: 'Повысил балл на',
            value: '',
            error: ''
          },
          wentTo: {
            label: 'Университет',
            value: '',
            error: ''
          }
        },
        table: {
          headers: {
            index: {
              title: 'Номер',
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
          rows: []
        }
      }
    },
    computed: {
      student: {
        set(data) {
          Object.keys(data).map(key => {
            if (this.model[key]) {
              this.model[key].value = data[key]
            }
          })
        },
        get() {
          let res = {}
          Object.keys(this.model).map(key => {
            res[key] = this.model[key].value
          })
          return res
        }
      },

      errors() {
        return Object.keys(this.model).map(key => {
          return !!(this.model[key].error)
        }).indexOf(true) !== -1
      }
    },
    methods: {
      validate() {
        Object.keys(this.student).map(key => {
          if (this.student[key]) {
            this.model[key].error = 'Поле не заполнено'
          } else {
            this.model[key].error = ''
          }
        })
      },
      save() {
        this.validate()

        if (this.errors) {
          this.table.rows.push(this.student)

          this.student = {
            name: '',
            city: '',
            completionYear: '',
            subject: '',
            beforeRate: '',
            EGERate: '',
            increased: '',
            wentTo: ''
          }
        }
      }
    },
    created() {
      if (typeof window !== 'undefined') {
        window.onbeforeunload = () => {
          localStorage.setItem('bufer_students', JSON.stringify(this.table.rows) )
          return "Данные могут не сохраниться"
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .manage {
    &__form {
      width: 650px;
      display: flex;
      flex-wrap: wrap;

      .input-box {
        margin-right: 10px;
      }
    }
  }

</style>
