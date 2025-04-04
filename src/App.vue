<template>
  <div
    id="app"
    class="min-h-screen bg-gray-100 flex items-center justify-center"
  >
    <!-- 主页面内容 -->
    <div class="relative">
      <button
        @click="showGameModal = true"
        class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-orange-600 focus:outline-none transform transition-transform active:scale-95"
      >
        打开转盘游戏
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
import axios from "axios";
import gsap from "gsap";
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
  async mounted() {
    // 預設載入4個獎項
    await this.loadPrizes(4);
  },
  methods: {
    async loadPrizes(count) {
      try {
        const response = await axios.get(
          `http://localhost:3000/prizes/${count}`
        );
        this.prizes = response.data;
      } catch (error) {
        console.error("Error loading prizes:", error);
      }
    },
    getSliceStyle(index) {
      const rotate = (360 / this.prizes.length) * index;
      const backgroundColor = index % 2 === 0 ? "#4F46E5" : "#7C3AED";
      return {
        transform: `rotate(${rotate}deg)`,
        backgroundColor,
      };
    },
    async startSpin() {
      if (this.isSpinning) return;

      this.isSpinning = true;

      try {
        // 模擬API請求獲取中獎結果
        // eslint-disable-next-line no-unused-vars
        const response = await axios.get(
          `http://localhost:3000/prizes/${this.prizes.length}`
        );
        const winningIndex = Math.floor(Math.random() * this.prizes.length);
        this.winningPrize = this.prizes[winningIndex];

        // 計算旋轉角度
        const baseRotations = 5; // 基本旋轉圈數
        const targetDegree = 360 - (360 / this.prizes.length) * winningIndex;
        const totalRotation = baseRotations * 360 + targetDegree;

        // 使用GSAP執行動畫
        gsap.to(this.$refs.wheel, {
          rotation: totalRotation,
          duration: 3,
          ease: "power2.out",
          onComplete: () => {
            this.isSpinning = false;
            this.showWinnerModal = true;
          },
        });
      } catch (error) {
        console.error("Error spinning wheel:", error);
        this.isSpinning = false;
      }
    },
  },
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
