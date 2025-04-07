<template>
  <div
    id="app"
    class="min-h-screen bg-gray-100 flex items-center justify-center"
  >
    <!-- 主页面内容 -->
    <div class="relative">
      <button @click="showGameModal = true">
        <img src="./assets/prize_wheel.gif" alt="wheel" />
      </button>
    </div>

    <!-- 游戏弹窗 -->
    <LuckyWheelModal
      :value="showGameModal"
      :showWinningPopup="showWinningPopup"
      :prize="winningPrize"
    />

    <!-- 添加中奖弹窗 -->
    <WinningPopup :value="showWinningPopup" :prize="winningPrize" />
  </div>
</template>

<script>
import LuckyWheelModal from "./components/LuckyWheelModal.vue";
import WinningPopup from "./components/WinningPopup.vue"; // 引入弹窗组件

export default {
  name: "App",
  components: {
    LuckyWheelModal,
    WinningPopup,
  },
  data() {
    return {
      prizes: [],
      isSpinning: false,
      showGameModal: true,
      winningPrize: {
        prize_id: 1,
        prize_name: "測試文案Ａ",
        prize_amount: 0,
        icon: "https://images.1138403.com/mcs-images/ticket/gtppbdtf4/3195047_1739618674360.png",
      },
      showWinningPopup: false,
    };
  },

  methods: {},
};
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
