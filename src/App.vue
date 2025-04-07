<template>
  <div id="app">
    <button class="float-btn" @click="showGameModal = true">
      <img src="./assets/prize_wheel.gif" alt="wheel" />
    </button>

    <!-- 游戏弹窗 -->
    <LuckyWheelModal
      v-show="showGameModal"
      :value="showGameModal"
      @close="showGameModal = false"
    />
  </div>
</template>

<script>
import LuckyWheelModal from "./components/LuckyWheelModal.vue";

export default {
  name: "App",
  components: {
    LuckyWheelModal,
  },
  data() {
    return {
      showGameModal: false,
      winningPrize: {
        prize_id: 1,
        prize_name: "測試文案Ａ",
        prize_amount: 0,
        icon: "https://images.1138403.com/mcs-images/ticket/gtppbdtf4/3195047_1739618674360.png",
      },
    };
  },

  methods: {},
};
</script>

<style lang="scss">
@import "tailwindcss/base";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #3b3b3b;
  height: 100vh;
  position: relative;
}

.float-btn {
  position: fixed;
  bottom: 50%;
  right: 20px;
  img {
    height: 100px;
  }
}
</style>
