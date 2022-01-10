<template>
<div class="home">
    <Navbar />
    <Bottombar :uid="user.uid" v-if="user"/>
    <div v-for="(category, idx) in categories" :key="category">
        <CardSlider :uid="user.uid" :category="category"/>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import CardSlider from '@/components/card/CardSlider.vue';
import Bottombar from '@/components/Bottombar.vue'
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'

export default {
    components: { Navbar, Bottombar, CardSlider },
    setup() {
        const user = getUser()
        const categories = ["quick-note", "art", "quote", "gourmet"]
        // const documentsList = []

        // categories.forEach(category => {
        //     const { documents } = getCollection(`users/${user.value.uid}/${category}`)
        //     documentsList.push(documents)
        // })

       return { user, categories }
    }
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/main';


</style>
