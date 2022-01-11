<template>
    <div class="container">
        <div class="bottom-bar">
            <!-- {{user}} -->
            <router-link :to="{name: 'Create', params: {uid: uid}}">
                <div class="circle">
                    <span class="material-icons add">add</span>
                </div>
            </router-link>
        </div>

    </div>
</template>

<script>

export default {

    props:["uid"]

}
</script>

<style lang="scss" scoped>
@use 'src/assets/sass/main.scss';
$line-height : 56px;
$circle-width : 56px;

.bottom-bar {
    z-index: 100;
    background-color: rgba($color: main.$main, $alpha: 0.7);
    height: $line-height;
    width: 100vw;
    position: fixed;
    bottom: 0;
    right: 0;
    overflow: visible;
    &::before {
        @include main.overlay()
    }
}
.circle {
    display: inline-block;
    height: $circle-width;
    width: $circle-width;
    border-radius: 50%;
    // bottom 指定してないのになんで上手く揃ったんだろ、要復習
    // bottom: $line-height;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: main.$bg-white;
    position: relative;
    text-align: center;
    line-height: $circle-width;
    // border: 2px solid main.$accent;
    // 要復習 真ん中になった
    box-sizing: content-box;
    // box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;

    // &::before {
    //     content: '';
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     height: $circle-width + 2;
    //     width: $circle-width + 2;
    //     border-radius: 50%;
    //     transform: translateX(-100%);
    //     background: main.$main;
    //     transition: all 0.2s linear;
    //     z-index: -1;
    // }

    &:hover, &:active {
        top: -2px;
        box-shadow: 0 5px 5px rgba(0,0,0,0.8);
    }
}
.material-icons.add {
    color: main.$accent;
    font-size: 46px;
    z-index: 100;
    transition: all 0.2s linear;
}
</style>
