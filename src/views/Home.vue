<template>
<div class="home-page">
    <Navbar />
    <Bottombar :uid="user.uid" v-if="user"/>
    <div class="block" v-for="(category, idx) in categories" :key="category">
        <CardSlider :uid="user.uid" :category="category" v-if="categories.length && user"/>
    </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import CardSlider from '@/components/card/CardSlider.vue';
import Bottombar from '@/components/Bottombar.vue'
import getUser from '@/composables/getUser'

export default {
    components: { Navbar, Bottombar, CardSlider },
    setup() {
        const user = getUser()
        const categories = ["quick-note", "art", "quote", "gourmet"]

       return { user, categories }
    }
}
</script>

<style lang="scss" scoped>
@use '@/assets/css/main';

html, div {
    overflow-y: auto;
}

// .block {
//     margin-top: 14px;
// }

</style>
