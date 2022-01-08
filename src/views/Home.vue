<template>
<div class="home">
    <Navbar />
    <!-- <CardSlider :uid="user.uid"/> -->
    <Bottombar :uid="user.uid" v-if="user"/>
    <CardSlider :uid="user.uid" :docs="docNote" :category="'quick-note'" v-if="docNote.length && user"/>
    <CardSlider :uid="user.uid" :docs="docArt" :category="'art'" v-if="docArt.length && user"/>
    <CardSlider :uid="user.uid" :docs="docQuote" :category="'quote'" v-if="docQuote.length && user"/>
    <CardSlider :uid="user.uid" :docs="docGourmet" :category="'gourmet'" v-if="docGourmet.length && user"/>
</div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import CardSlider from '../components/card/CardSlider.vue';
import Bottombar from '../components/Bottombar.vue'
import getUser from '../composables/getUser'
import getCollection from '../composables/getCollection'
import getDocument from '../composables/getDocument'

export default {
    components: { Navbar, Bottombar, CardSlider },
    setup() {
       const user = getUser()
    //    console.log('uid retrieved', user.value.uid)
       const { documents: docNote } = getCollection(`users/${user.value.uid}/quick-note`)
       const { documents: docArt } = getCollection(`users/${user.value.uid}/art`)
       const { documents: docQuote } = getCollection(`users/${user.value.uid}/quote`)
       const { documents: docGourmet } = getCollection(`users/${user.value.uid}/gourmet`)


       return { user, docNote, docArt, docQuote, docGourmet }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/main';
// #app {
//     background-color: main.$main;
//     color: main.$bg-white
// }

</style>
