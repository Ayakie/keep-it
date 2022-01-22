<template>
  <div class="content">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
</script>

<style>
/* to right */
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* to left */
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.slide-right-enter-active, .slide-right-leave-active,
.slide-left-enter-active, .slide-left-leave-active {
  transition: all 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
</style>
