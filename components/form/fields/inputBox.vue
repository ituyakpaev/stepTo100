<template>
    <label class="input-box" :class="{readonly: readonly, disabled: disabled, error: error || errorText}">
        {{ label }}
        <div class="input-box__inner">
            <input class="input-box__input" :type='type || "text"' :placeholder="placeholder" :readonly="readonly" :disabled="disabled" v-model="valueMirror">
            <div v-if="locale" class="input-box__locale">
                {{ $store.state.LANG.active }}
            </div>
        </div>
        {{ errorText }}
    </label>
</template>

<script>

    export default {
        name: "inputBox",
        props: {
            type: String,
            label: String, // label
            placeholder: String, // placeholder
            readonly: Boolean, // can redact?
            disabled: Boolean,
            error: Boolean, // err?
            errorText: String,
            value: {
                required: true
            },
            locale: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
            }
        },
        computed: {
            valueMirror: {
                get: function() {
                    return this.value
                },
                set: function(val) {
                    this.$emit('input', val)
                    return val
                }
            }
        },
        methods: {
            removeValue () {
                this.valueMirror = ''
            },
            addData (value) {
                try {
                    this.valueMirror = value
                    this.opened = false
                } catch (err) {
                    console.error(err)
                }
            }
        },
        created () {
        }
    }
</script>

<style scoped lang="scss">
</style>
