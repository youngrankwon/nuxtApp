<template>
    <v-card>
        <v-card-title>title</v-card-title>
        <v-card-text>
            <v-textarea v-model="txt"></v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="test">test</v-btn>
            <v-btn @click="funcTest">funcTest</v-btn>
            <v-btn @click="hello">hello</v-btn>
            <v-btn @click="moment">moment</v-btn>
            <v-btn @click="dialogOpen">dialog</v-btn>
            <v-btn @click="write">write</v-btn>
            <v-btn @click="read">read</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>


export default {
    data() {
        return {
            txt: 'www',
            db: null
        }
    },
    mounted() {
        this.db = this.$firebase
    },
    methods: {
        async test() {
            const r = await this.$axios.get('/api')
            this.txt = r.data
        },
        async funcTest() {
            const { data } = await this.$axios.get(
                'http://localhost:5000/ran-vue-nuxt-test/us-central1/abc'
            )
            console.log(data)
            this.txt = data
        },
        
        async hello() {
            const r = await this.$axios.get('/api/hello')
            this.txt = r.data
        },
        moment() {
            // this.txt = moment().toDate().toLocaleTimeString()
            this.txt = this.$moment().toDate().toLocaleTimeString()
        },
        async dialogOpen() {
            const r = await this.$dialog.confirm({
                title: 'hello?',
                text: 'okok?'
            })
            this.txt = r ? 'YES' : 'NO'
        },
        async write() {
            try {
                const r = await this.db.collection("users").add({
                    first: "Ada",
                    last: "Lovelace",
                    born: 1815
                })
                this.txt = `Document written with ID: => ${r.id}`
            } catch (error) {
                await this.$dialog.notify.error(error.message)
            }
        },
        async read() {
            try {
                const rs = await this.db.collection("users").get()
                const ss = []
                rs.forEach(r => {
                    ss.push(`${r.id} => ${JSON.stringify(r.data())}`)
                })
                this.txt = ss.join('\n')
            } catch (e) {
                await this.$dialog.notify.error(e.message)
            }
        }
    }
}
</script>

<style>
</style>