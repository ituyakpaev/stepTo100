<template>
    <header class="holder header">
      <div class="header__inner">
        <div class="header__logo" >
          <div class="header__logo-img" :style="{ backgroundImage: `url(${ $basePath }svg/logo.svg)`}" />
          <div class="header__logo-text">
            <div>
              онлайн школа
            </div>
            <div>
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

    &__inner {
      position: relative;
      padding: 15px 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
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

      &-img {
        height: 70px;
        width: 70px;
        margin-right: 25px;
      }

      &-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
    }

    &__text {
      height: 70px;
      display: flex;
      align-items: center;
    }
  }
</style>
