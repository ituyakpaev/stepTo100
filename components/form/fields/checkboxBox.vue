<template>
    <label class="checkbox" :class="{ disabled: disabled, readonly: readonly, error: error}">
        <div class="checkbox-input">
            <input class="checkbox-input__input" type="checkbox" v-model="valueMirror" :disabled="disabled">
            <div class="checkbox-input__emit"></div>
        </div>
        <div class="checkbox-label">
            {{ label }}
        </div>
    </label>
</template>

<script>
    export default {
        name: "checkboxBox",
        props: {
            label: String, // label
            readonly: Boolean, // can redact?
            disabled: Boolean,
            error: Boolean, // err?
            value: {
                required: true
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
        }
    }
</script>

<style scoped lang="scss">
</style>
