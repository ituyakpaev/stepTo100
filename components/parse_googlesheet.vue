<template>

</template>

<script>
    export default {
        name: "parse_googlesheet",
        methods: {
          parse() {
            // link to get a value of googleSheet = https://spreadsheets.google.com/feeds/cells/14Nh2kefMiRo33jburDnbjIIjgGVurHJsrP5MDXoyB7c/1/public/full?alt=json
            let googleSheet = []
            let cellsMatcher = {
              '1': 'name',
              '5': 'city',
              '6': 'EGERate',
              '2': 'subject',
              '8': 'completionYear',
              '9': 'beforeRate',
              '7': 'wentTo'
            }
            let result = []

            let rows = []

            googleSheet.feed.entry.map(key => {
              let column = key.gs$cell.col
              let row = Number(key.gs$cell.row)
              if (rows[row - 1]) {
                rows[row - 1].push(key)
              } else {
                rows.push([])
                rows[row - 1].push(key)
              }
            })

            rows.map(row => {
              result.push({
                name: '',
                social: {},
                city: '',
                subject: '',
                beforeRate: '',
                EGERate: '',
                wentTo: '',
                completionYear: '',
              })

              row.map(cell => {
                let value = cell.gs$cell.$t
                let row = Number(cell.gs$cell.row)
                let column = cell.gs$cell.col

                if( column === "3") {
                  result[row - 1].social.vk = value
                } else if (column === "4") {
                  result[row - 1].social.instagram = value
                } else {
                  result[row - 1][cellsMatcher[column]] = value
                }
              })
            })

            googleSheet.feed.entry.map(key => {
              let column = key.gs$cell.col
              let row = Number(key.gs$cell.row)
              let value = key.gs$cell.$t
              try {
                if (column === "1") {
                  result.push({
                    name: value,
                    social: {},
                    city: '',
                    subject: '',
                    beforeRate: '',
                    EGERate: '',
                    wentTo: '',
                    completionYear: '',
                  })
                } else if( column === "3") {
                  result[row - 1].social.vk = value
                } else if (column === "4") {
                  result[row - 1].social.instagram = value
                } else {
                  result[row - 1][cellsMatcher[column]] = value
                }
              } catch(err) {
                console.log(err)
                console.log(result)
                console.log(row - 1)
                console.log(result[row - 1])
                console.log(key)
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
