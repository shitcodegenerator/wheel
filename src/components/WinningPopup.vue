<template>
  <div v-if="value" @click="closePopup" class="popup-mask">
    <div class="prize-popup">
      <div class="prize-content">
        <h3 class="title">Congratulations!</h3>
        <p v-if="prize" class="prize-text">
          You've won:
          <span class="prize-name"
            >{{ prize.prize_name }}
            <span v-if="prize.prize_amount"> {{ prize.prize_amount }}元 </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WinningPopup",
  props: {
    value: {
      // 控制弹窗显示/隐藏
      type: Boolean,
      required: true,
    },
    prize: {
      // 中奖信息
      type: Object,
      default: null,
    },
  },
  methods: {
    closePopup() {
      this.$emit("input", false);
    },
  },
};
</script>

<style scoped>
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999999;
}

.prize-popup {
  background-image: url("../assets/pize_bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 80vw;
  max-width: 450px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prize-popup:before {
  content: "";
  display: block;
  padding-top: 100%; /* 保持宽高比为1:1，可根据实际图片调整 */
}

.prize-content {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  text-align: center;
}

.title {
  font-size: 0.5rem;
  font-weight: bold;
  color: #c52016;
}

.prize-text {
  font-size: 0.2rem;
  color: #333;
}

.prize-name {
  display: block;
  font-weight: bold;
  color: #c52016;
  font-size: 0.45rem;
}

.prize-amount {
  display: block;
  margin-top: 0.3rem;
  font-weight: bold;
  color: #ff3300;
  font-size: 0.45rem;
}
</style>
