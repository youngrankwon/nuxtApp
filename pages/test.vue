<template>
    <v-card>
        <v-card-title>title</v-card-title>
        <v-card-text>
            <v-textarea v-model="txt"></v-textarea>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="test">test</v-btn>
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
        this.db = this.$firebase.firestore();
    },
    methods: {
        async test() {
            const r = await this.$axios.get('/api')
            this.txt = r.data
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
        write() {
            this.db.collection("users").add({
                first: "Ada",
                last: "Lovelace",
                born: 1815
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    this.txt = docRef.id
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        },
        read() {
            this.db.collection("users").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.txt = JSON.stringify(doc.data())
                    console.log(`${doc.id} => ${doc.data()}`);
                });
            });
        }
    }
}
</script>

<style>
</style>