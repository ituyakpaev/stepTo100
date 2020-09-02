<template>
    <div class="screen holder" >
      <div class="screen__inner" >
        <div class="screen__img" :style="{ backgroundImage: `linear-gradient(90deg, #0B0B0B 15.93%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0) 84.92%, #000000 99.48%)` }">
          <img :src="`${ $basePath }img/yulia.jpg`" class="screen__img-img">
        </div>
        <h1 class="screen__title">
          Школа <br> Юлии Стручковой
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
        <div class="screen_button">
          <button class="button">
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
        }
    }
</script>

<style scoped lang="scss">
  .screen {
    background-color: #0B0B0B;
    color: white;
    height: calc(100vh - 100px);
    min-height: 600px;

    &__inner {
      background-position: right center;
      background-size: contain;
      background-repeat: no-repeat;
      position: relative;
      height: 100%;
    }

    &__img {
      position: absolute;
      top: 0; right: 0; bottom: 0;

      &:after {
        background-image: linear-gradient(90deg, #0B0B0B 15.93%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0) 84.92%, #000000 99.48%);
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
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
    }

    &__pluses {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: baseline;
      padding-top: 30px;
      margin-bottom: 64px;
      height: 110px;
    }

    &__plus {
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      padding-right: 75px;
      max-width: 275px;

      &-title {
        font-family: Bebas;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        line-height: 32px;
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
      }
    }
  }
</style>
