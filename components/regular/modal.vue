<template>
    <div class="modal">
        <transition name="opacity">
          <div class="modal__overlay" v-show="show"/>
        </transition>
        <transition name="down-open">
          <div class="modal__wrapper" v-show="show">
            <div class="modal__header">
              <div class="modal__header-title">
                {{ header }}
              </div>
              <div class="modal__header-close" @click="$emit('close')">
              </div>
            </div>
            <div class="modal__inner">
              <slot />
            </div>
          </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "modal",
        props: {
            show: {
                type: Boolean,
                default: false
            },
            header: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .modal {

        &__overlay {
            backdrop-filter: blur(2px);
            position: fixed;
            background-color: rgba(0,0,0,.2);
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            z-index: 1000;
        }

        &__wrapper {
            background-color: white;
            border-radius: 5px;
            position: fixed;
            right: 0; left: 0;
            margin: 0 auto;
            width: 600px;
            top: 15vh;
            z-index: 1001;
            border: 1px solid #c4cdd5;
        }

        &__header {
            border-bottom: 1px solid #c4cdd5;
            height: 50px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0 20px;
            align-items: center;

            &-title {

            }

            &-close {
                height: 20px;
                width: 20px;
                position: relative;
                cursor: pointer;

                &:hover::after,
                &:hover::before {
                    background-color: #222c95;
                }

                &::after, &::before {
                    transition: background-color .1s;
                    content: '';
                    display: block;
                    background-color: #c4cdd5;
                    position: absolute;
                    margin: auto 0;
                    top: 8px;
                }

                &::after {
                    height: 2px;
                    width: 20px;
                    transform: rotate(45deg);
                }

                &::before {
                    height: 2px;
                    width: 20px;
                    transform: rotate(-45deg);
                }
            }
        }

        &__inner {
            padding: 20px;
            display: flex;
          flex-direction: column;
        }
    }

    .opacity {
      &-enter-active, &-leave-active {
        transition: opacity .5s;
      }
      &-enter, &-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
      }
    }

    .down-open  {
      &-enter-active, &-leave-active {
        transition: all .5s;
      }
      &-enter, &-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
        transform: translateY(-50px);
      }
    }
</style>
