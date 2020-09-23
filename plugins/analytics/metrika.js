import Vue from 'vue'

export default (app, inject) => {
  let metrika = {
    install(Vue, options) {
      if (typeof window !== 'undefined') {
        (function (m, e, t, r, i, k, a) {
          m[i] = m[i] || function () {
            (m[i].a = m[i].a || []).push(arguments)
          };
          m[i].l = 1 * new Date();
          k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
        })
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        const id = options.id
        const router = options.router

        ym(id, 'init', {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
        })

        router.afterEach( to => {
          console.info(`Yandex Metrika: page hitted ${to.fullPath}`)
          ym(id, 'hit', to.fullPath)
        })

        inject('metrika', {
          reachGoal(tag) {
            console.info(`Yandex Metrika: target emitted ${tag}`)
            ym( id, 'reachGoal', tag)
          }
        })
      }
    }
  }

  Vue.use(metrika, {
    id: 66959329,
    router: app.app.router
  })
}
