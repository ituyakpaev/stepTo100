<template>
    <div class="screen holder" >
      <div class="screen__inner" >
        <div class="screen__img" >
          <img :src="`${ $basePath }img/yulia.jpg`" class="screen__img-img">
          <!-- <span :style="{ backgroundImage: `url(${ $basePath }svg/gradients/exwd.svg)` }" /> -->
        </div>
        <h1 class="screen__title">
          Школа <br v-if="$breakPoint.current !== 'sm' && $breakPoint.current !== 'exsm'"> Юлии Стручковой
        </h1>
        <div class="screen__pluses">
          <div class="screen__plus" v-for="plus in pluses" :key="plus.title">
            <div class="screen__plus-title">
              {{ plus.title }}
            </div>
            <div class="screen__plus-description">
              {{ plus.description }}
            </div>
          </div>
        </div>
        <div class="screen__button">
          <button class="button" @click="open">
            Записаться на новый поток курса
          </button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "main-screen",
        data() {
          return {
            pluses: [
              {
                title: '6293 ученика',
                description: 'Прошли курс'
              },
              {
                title: '88 баллов',
                description: 'Средний балл ЕГЭ'
              },
              {
                title: '89%',
                description: 'Поступили в запланированный вуз'
              }
            ]
          }
        },
        methods: {
          open() {
            this.$metrika.reachGoal('button_main_screen')

            let win = window.open()
            win.opener = null
            win.location = 'https://shagk100.ru/kurs-start-open?utm_source=site&utm_medium=tabl'
          }
        }
    }
</script>

<style scoped lang="scss">
  .screen {
    background-color: #0B0B0B;
    color: white;
    height: calc(100vh - 100px);
    min-height: 600px;
    overflow: hidden;

    @include media(small) {
      height: unset;
    }

    @include media(exsm) {
      min-height: unset;
    }

    &__inner {
      background-position: right center;
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      height: 100%;
    }

    &__img {
      position: absolute;
      top: 0; right: -55px; bottom: 0;

      @include media(large) {
        right: -430px;
        bottom: -24px;
      }

      @include media(small) {
        right: -400px;
        //234px;
        top: 120px;
        bottom: -120px;
      }

      @include media(exsm) {
        right: -278px;
        top: 125px;
        bottom: 0;
      }

      &:after {
        background-image: linear-gradient(90.09deg, #0B0B0B 15.73%, rgba(0, 0, 0, 0) 34.48%, rgba(11, 11, 11, 0) 78.77%, #0B0B0B 97.89%);
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;

        @include media(medium) {
          background-image: linear-gradient(90deg, #0B0B0B 15.42%, rgba(0, 0, 0, 0.15) 44.79%);
        }

        @include media(small) {
           background-image: linear-gradient(180deg, #0B0B0B 0%, rgba(0, 0, 0, 0) 29.69%); //linear-gradient(90deg, #0B0B0B 15.42%, rgba(0, 0, 0, 0) 44.79%)
        }

        @include media(exsm) {
          background-image: linear-gradient(180deg, #0B0B0B 0%, rgba(0, 0, 0, 0) 29.69%);
        }
      }

      &-img {
        max-height: 100%;
        object-fit: contain;
      }
    }
    &__title {
      font-family: Bebas;
      letter-spacing: 0.05em;
      font-size: 90px;
      position: relative;
      font-weight: 500;
      padding-top: 113px;

      @include media(medium) {
        font-size: 84px;
      }

      @include media(small) {
        padding-top: 45px;
      }

      @include media(exsm) {
        padding-top: 31px;
        text-align: center;
        font-size: 42px;
      }

      @include media(exexsm) {
        margin: 0 -20px;
        font-size: 42px;
      }
    }

    &__pluses {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: baseline;
      padding-top: 30px;
      margin-bottom: 64px;
      height: 110px;

      @include media(small) {
        flex-direction: column;
        width: 155px;
        height: unset;
      }

      @include media(exsm) {
        padding-top: 44px;
        margin-bottom: 20px;
      }
    }

    &__plus {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      padding-right: 75px;
      max-width: 275px;

      @include media(small) {
        padding-right: 0;
        padding-bottom: 27px;
      }

      &-title {
        font-family: Bebas;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        line-height: 32px;

        @include media(medium) {
          font-size: 30px;
        }

        @include media(small) {
          padding-top: 12px;
          padding-bottom: 5px;
          font-weight: normal;
        }
      }

      &:not(:last-child):after {
        content: '';
        border-top: 2px solid #EF504F;
        border-bottom: 2px solid #EF504F;
        transform: rotate(-65deg);
        width: 100px;
        height: 0px;
        position: absolute;
        right: 0;

        @include media(small) {
          display: none;
        }
      }

      &:before {
        @include media(small) {
          border-top: 1px solid #EF504F;
          border-bottom: 1px solid #EF504F;
          position: absolute;
          top: 0;
          content: '';
          width: 155px;
        }
      }
    }

    &__button {
      @include media(small) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding-bottom: 78px;
      }

      @include media(exsm) {
        padding-bottom: 18px;
      }
    }
  }
</style>
