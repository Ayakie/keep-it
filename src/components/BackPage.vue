<template>
<div class="back" @click="handleClick">
  <span class="material-icons back">arrow_back_ios_new</span>
  <p class="back__description">戻る</p>
</div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    props:["goBack", "uid", "category"],

    setup(props) {
        const router = useRouter()
        const handleClick = () => {
            
            if (props.goBack === 'Home') {
                console.log(props.goBack)

                router.go(-1)

            } else if (props.goBack === 'ListView') {
                console.log(props.uid)
                router.push({name: 'ListView', params: {uid: props.uid, category: props.category}})

            }
        }

        return { handleClick }
    }

}
</script>

<style lang="scss">
@use '../assets/sass/main';

.material-icons.back {
    position: absolute;
    right: 51%;
    transform: translateX(-50%);
    transition: all 0.2s linear;
}

.back {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: main.$main;

    &__description {
        line-height: 24px;
    }

    &:hover .material-icons.back {
        right: 52%;
    }
}
</style>