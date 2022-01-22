<template>
<div class="not-found">
    <img src="@/assets/image/not-found.svg" alt="">
    <BackPage :goBack="'Home'"/>
</div>
</template>

<script>
import BackPage from "../components/BackPage.vue";
export default {
    components: { BackPage }
}
</script>

<style lang="scss" scoped>
@use '../assets/css/main';

.not-found {
    margin: 70px auto;
}

img {
    max-width: 300px;
    margin: 0 auto;
}

@media (min-width: 744px) {
    img {
        max-width: 400px;
    }
}
.back {
    color: main.$bg-white;
}
</style>