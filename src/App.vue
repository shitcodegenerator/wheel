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
    <LuckyWheelModal v-model="showGameModal" />

    <!-- Winner Modal -->
    <div
      v-if="showWinnerModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
    >
      <div class="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 class="text-2xl font-bold mb-4">恭喜中獎！</h2>
        <p class="text-xl mb-6">您獲得了：{{ winningPrize?.name }}</p>
        <button
          @click="showWinnerModal = false"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          關閉
        </button>
      </div>
    </div>
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
      prizes: [],
      isSpinning: false,
      showWinnerModal: false,
      showGameModal: true,
      winningPrize: null,
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
