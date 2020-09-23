<template>
    <header class="holder header">
      <div class="header__inner">
        <div class="header__logo" >
          <div class="header__logo-img" :style="{ backgroundImage: `url(${ $basePath }svg/logo.svg)`}" />
          <div class="header__logo-text" :style="{ backgroundImage: `url(${ $basePath }svg/logo_text.svg)`}" v-show="$breakPoint.current !== 'exsm'">
            <div style="display: none">
              онлайн школа
            </div>
            <div style="display: none">
              “Шаг к сотке”
            </div>
          </div>
        </div>
        <div class="header__text">
          “Шаг к сотке” Онлайн-школа подготовки к ЕГЭ с гарантией результата.
        </div>
      </div>
    </header>
</template>

<script>
    export default {
        name: "headerh"
    }
</script>

<style scoped lang="scss">
  .header {
    height: 100px;
    background: #FFFFFF;
    box-sizing: border-box;
    @include media(exsm) {
      height: 80px;
    }

    &__inner {
      position: relative;
      padding: 15px 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      @include media(large) {
        justify-content: space-between;
      }
      @include media(exsm) {
        padding: 5px 0;
      }
    }

    &__logo {
      position: absolute;
      left: 0px;
      top: 15px;
      bottom: 15px;
      height: 70px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex-shrink: 0;

      @include media(large) {
        position: relative;
        top: unset; bottom: unset;
      }

      @include media(exsm) {
        width: 45px;
        height: 45px;
      }

      &-img {
        height: 70px;
        width: 70px;
        margin-right: -5px;
        background-size: contain;
        background-repeat: no-repeat;

        @include media(medium) {
          margin-right: 15px;
        }

        @include media(exsm) {
          width: 45px;
          height: 45px;
          margin-right: 0px;
        }
      }

      &-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 170px;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;

        & > div {
          &:first-child {
            font-family: Montserrat;
            font-style: normal;
            font-weight: normal;
            font-size: 10px;
            line-height: 12px;
            letter-spacing: 0.05em;
            margin-bottom: 5px;
          }

          &:last-child {
            font-family: $font-title;
            font-style: normal;
            font-weight: 500;
            font-size: 22px;
            line-height: 22px;
          }
        }
      }
    }

    &__text {
      height: 70px;
      display: flex;
      align-items: center;
      font-family: Montserrat;
      font-size: 18px;

      @include media(large) {
        text-align: right;
        padding-left: 20px;
      }

      @include media(small) {
        font-size: 13px;
      }

      @include media(exsm) {
        font-size: 11px;
      }


    }
  }
</style>
