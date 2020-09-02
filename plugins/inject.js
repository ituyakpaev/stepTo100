import Vue from 'vue'

export default (context, inject) => {

  inject('breakPoint', new Vue({
    name: 'breakPoint',
    data() {
      return {
        current: "",
        currentIndex: 0,
        passed: [],
        prevented: [],
        width: [
          {
            key: 'exsm',
            width: 576
          },
          {
            key: 'sm',
            width: 767
          },
          {
            key: 'md',
            width: 992
          },
          {
            key: 'lg',
            width: 1200
          },
          {
            key: 'wd',
            width: 1300
          },
          {
            key: 'exwd',
            width: 999000
          }
        ]
      }
    },
    methods: {
      reload() {
        if (typeof window !== "undefined") {
          let w = window.screen.width

          this.current = null

          let getStrap = w => {
            let r = null
            this.width.map((point, index) => {
              if (w < point.width && !r) {
                r = point
              }
            })
            return r
            /*if (w < 576) {
              return 'exsm'
            } else if (w < 767) {
              return 'sm'
            } else if (w < 992) {
              return 'md'
            } else if (w < 1200) {
              return 'lg'
            } else if (w < 1300) {
              return 'wd'
            } else {
              return 'exwd'
            }*/
          }

          this.current = getStrap(w).key

          /*this.width.map((point, index) => {
            if (index <= currentIndex) {
              this.passed.push(point.key)
            } else if (index > currentIndex) {
              this.prevented.push(point.key)
            }
          })*/
        } else {
          return false
        }
      }
    },
    created() {
      if (typeof window !== "undefined") {
        this.reload()

        window.addEventListener('resize', () => {
          this.reload()
        })
      }
    }
  }))

  const basePath = '/'

  inject('basePath', basePath)
}
