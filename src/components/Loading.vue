<template>
    <div class="loading">
        <h2 class="loading__description">Preparing</h2>
        <span class="loading__circle"></span>
        <span class="loading__circle"></span>
        <span class="loading__circle"></span>
        <img src="@/assets/image/preparing.svg" alt="loading">
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/css/main';

$circle-width : 6px;
.loading {
    &__description {
        margin: 1rem auto;
        text-align: center;
        // position: relative;
        display: inline-block;
    }

    &__circle {
        // position: absolute;
        width: $circle-width;
        height: $circle-width;
        background: main.$bg-white;
        border-radius: 50%;
        margin: 0 3px;
        display: inline-block;

        &:nth-child(2) {
            animation: loading 1.5s ease infinite;
        }
        &:nth-child(3) {
            animation: loading 1.5s ease infinite 0.2s;
        }
        &:nth-child(4) {
            animation: loading 1.5s ease infinite 0.4s;
        }
    }
}

img {
    margin: 0 auto;
    max-width: 150px;
    height: auto;
}
@keyframes loading {
    100% {
        opacity: 0;
    }
}
</style>
