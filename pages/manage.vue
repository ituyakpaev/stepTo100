<template>
  <div class="holder">
    <div class="manage">
      <div class="manage__form">
        <input-box v-for="(input, key) in model" :key="key" v-model.trim="input.value" :label="input.label" :error-text="input.error"/>
        <input-box v-model.trim="increased" label="Повысил балл на" :disabled="true"/>
      </div>
      <div class="manage__buttons">
        <button @click="save" class="button-classic">
          Добавить
        </button>
        <button @click="getResult" class="button-classic">
          Получить результат
        </button>
      </div>
    </div>
    <table-box :headers="table.headers" :data="table.rows" :show_manage='false' style="max-width: 100%;"
      @open="deleteRow"/>
    <modal :show="modal.showed" @close="modal.showed = false">
      Скопируйте результат и отправьте нам.
      <textarea :value="modal.result" style="margin-top: 20px; height: 300px;" />
    </modal>
  </div>
</template>

<script>
  import TableBox from "../components/regular/tableBox";
  import InputBox from "../components/form/fields/inputBox";
  export default {
    name: "manage",
    components: { InputBox, TableBox },
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

          vk: {
            label: 'Ссылка на ВК',
            value: '',
            error: ''
          },
          instagram: {
            label: 'Ссылка на Инстаграм',
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
              type: 'index',
              mobile_show: true
            },
            name: {
              title: 'Имя',
              mobile_show: true
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
              title: 'Поступил'
            }
          },
          rows: []
        },
        modal: {
          showed: false,
          result: ''
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
            if (key !== 'vk' && key !== 'instagram') {
              res[key] = this.model[key].value
            }
          })

          res.social = {}

          if (this.model.vk.value) {
            res.social.vk = this.model.vk.value
          }
          if (this.model.instagram.value) {
            res.social.instagram = this.model.instagram.value
          }
          return res
        }
      },

      increased() {
        console.log(Number(this.model.EGERate.value || 0))
        console.log(Number(this.model.beforeRate.value || 0))
        return Number(this.model.EGERate.value || 0) - Number(this.model.beforeRate.value || 0)
      }
    },
    methods: {
      validate() {
        return true
        Object.keys(this.student).map(key => {
          if (this.student[key]) {
            this.model[key].error = 'Поле не заполнено'
          } else {
            this.model[key].error = ''
          }
        })

        return Object.keys(this.model).map(key => {
          return !!(this.model[key].error)
        }).indexOf(true) !== -1
      },

      save() {
        if (this.validate()) {
          this.table.rows.push(this.student)

          this.student = {
            name: '',
            city: '',
            completionYear: '',
            subject: '',
            beforeRate: '',
            vk: '',
            instagram: '',
            EGERate: '',
            increased: '',
            wentTo: ''
          }
        }
      },

      getResult() {
        this.modal.showed = true
        this.modal.result = JSON.stringify(this.table.rows)
      },

      deleteRow(data, index) {
        console.log(data)
        console.log(index)
        if (confirm('Точно хотите удалить строку?')) {
          this.table.rows.splice(index, 1)
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

    &__buttons {
      margin-bottom: 20px;
    }
  }

</style>
