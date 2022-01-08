<template>
<div class="back" @click="handleClick">
  <span class="material-icons back">arrow_back_ios_new</span>
  <p class="back__description">戻る</p>
</div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {

    setup() {
        const router = useRouter()
        const handleClick = () => {
            router.go(-1)
        }

        return { handleClick }
    }

}
</script>

<style lang="scss">
@use '../assets/sass/main';

.back {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: main.$main;

    &__description {
        line-height: 24px;
    }
}
.material-icons.back {
    margin-right: 8px;
}
</style>