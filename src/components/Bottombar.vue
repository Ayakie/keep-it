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
import { useRouter } from 'vue-router'

export default {
    props:["uid"],
    setup() {
        const router = useRouter()
        
        // const createData = () => {
        //     router.push({ name: 'Create' })
        // }

        return {  }
    }
}
</script>

<style lang="scss" scoped>
@use 'src/assets/sass/main.scss';
$line-height : 56px;
$circle-width : 56px;

// .container {
//     position: relative;
//     bottom: 0;
//     width: 100vw;
// }
.bottom-bar {
    z-index: 100;
    background-color: rgba($color: main.$main, $alpha: 0.7);
    height: $line-height;
    width: 100vw;
    position: fixed;
    bottom: 0;
    right: 0;
    &::before {
        @include main.overlay()
    }
}
.circle {
    display: inline-block;
    height: $circle-width;
    width: $circle-width;
    border-radius: 50%;
    // なんで上手く揃ったんだろ、要復習
    // bottom: $line-height;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: main.$bg-white;
    position: fixed;
    text-align: center;
    line-height: $circle-width;
    border: 2px solid main.$accent;
    // 要復習 真ん中になった
    box-sizing: content-box;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.8);
    cursor: pointer;
}
.material-icons.add {
    color: main.$accent;
    font-size: 46px;
}
</style>
