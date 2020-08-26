<template>
    <label class="select" :class="{readonly: readonly, disabled: disabled, error: error}">
        {{ label }}
        <div class="select__inner">
            <input class="select__input" type="hidden" :readonly="readonly" :disabled="disabled" v-model="valueMirror">
            <div class='select-control__open' @click.self="dropdownOpen">
                {{ valueTitle || placeholder }}
            </div> <!-- input imitator for select -->
            <div class="select-control">
                <div class="select-control__inner" v-show="opened">
                    <div class="select-control__search">
                        <input v-model="searchInSelect" class="select-control__search-input" placeholder="Найти">
                    </div>
                    <ul class="select-control__list">
                        <li class="select-control__list-item" @click="removeValue" v-if="emptyRow">
                            ...
                        </li>
                        <li class="select-control__list-item" v-for="item in rowsFilter" :key="item.value || item.title" :class="{selected: value === (item.value || item.title)}" @click="addData(item.value || item.title)">
                            {{ item.title }}
                        </li>
                    </ul>
                </div>
            </div> <!-- select list -->
        </div>
    </label>
</template>

<script>
    // if widget has no value option, then title is used instead
    /* SAMPLE of rows
        {
            title: 'HelloWorld', - name for client
            value: 'hw1' - v-model value
        }
     */

    export default {
        name: "selectBox.vue",
        props: {
            rows: {
                type: Array
            }, // for multiselect and select
            placeholder: {
                type: String,
                default: "Выбрать"
            }, // for multyselect and select
            label: String, // label
            readonly: Boolean, // can redact?
            disabled: Boolean,
            error: Boolean, // err?
            value: {
                required: true
            },
            emptyRow: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                searchInSelect: '',
                opened: false
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
            },

            valueTitle () {
                let q = this.rows.find((e) => {
                    return (e.value || e.title) === this.valueMirror
                })
                if (q) {
                    return q.title
                } else {
                    return null
                }
            },

            rowsFilter: function() {
                let s = this.searchInSelect.toLowerCase()
                return this.rows.filter(e => {
                    return e.title.toLowerCase().indexOf(s) !== -1
                })
            }
        },
        methods: {
            removeValue () {
                this.valueMirror = ''
                this.opened = false
            },
            addData (value) {
                try {
                    this.valueMirror = value
                    this.opened = false
                } catch (err) {
                    console.log(err)
                }
            },
            dropdownOpen() {
                this.opened = true
                this.$emit('open')
            }
        },
        created () {
            let self = this
            window.addEventListener('click', function(e) {
                if (!self.$el.contains(e.target)) {
                    self.opened = false
                }
            })
        }
    }
</script>

<style scoped lang="scss">
</style>
