<template>
  <div v-if="true" class="fixed inset-0 z-50 bg-black/80">
    <div class="ticket-popup-wrap">
      <CloseBtn @click="$emit('update:modelValue', false)" />
      <div class="ticket-content-wrapper">
        <div class="header-wrap">
          <div class="header-title">幸运大转盘</div>
        </div>
        <div class="ticket-popup">
          <div class="ticket-popup-wrapper">
            <div class="item-name">幸运大转盘抽奖</div>
            <div class="content-wrapper">
              <CountdownTimer :timeLeft="timeLeft" />

              <div>
                <div class="ticket-game-wrap">
                  <div class="prize-wheel-wrapper">
                    <div class="wheel_container">
                      <div class="prize_wheel_root">
                        <div class="wheel_bg">
                          <div class="wheel_content" :class="wheelNumberClass">
                            <ul :style="rotateStyle">
                              <li
                                v-for="(prize, index) in prizeList"
                                :key="prize.prize_id"
                                :class="`item-${index}`"
                              >
                                <div
                                  class="rewardItem"
                                  :class="`item-${
                                    prize.prize_amount ? 'MONEY' : 'MERCHANDISE'
                                  }`"
                                >
                                  <div class="prize_message">
                                    <span>
                                      {{
                                        prize.prize_amount
                                          ? `${prize.prize_amount}元`
                                          : prize.prize_name
                                      }}
                                    </span>
                                    <div class="prize_item">
                                      <img
                                        v-if="prize.icon"
                                        class="icon"
                                        :src="prize.icon"
                                        :alt="prize.prize_name"
                                      />
                                      <span
                                        v-else
                                        class="icon icon-MONEY"
                                      ></span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <span
                            class="start_wheel"
                            @click="startSpin"
                            :class="{ disabled: isSpinning }"
                          ></span>
                        </div>
                        <div
                          class="claim-btn"
                          @click="startSpin"
                          :class="{ disabled: isSpinning }"
                        >
                          {{ isSpinning ? "抽奖中..." : "开始抽奖" }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ProgressBar :progress="75" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加中奖弹窗 -->
    <WinningPopup
      :value="showWinningPopup"
      @input="showWinningPopup = $event"
      :prize="winningPrize"
    />
  </div>
</template>

<script>
import gsap from "gsap";
import { getPrizeList, getWinnerPrize } from "../api/prizeList";
import CloseBtn from "./CloseBtn.vue";
import CountdownTimer from "./CountdownTimer.vue";
import WinningPopup from "./WinningPopup.vue";
import ProgressBar from "./ProgressBar.vue";

export default {
  name: "LuckyWheelModal",
  components: {
    CloseBtn,
    CountdownTimer,
    WinningPopup,
    ProgressBar,
  },
  props: {
    value: {
      // 對應 v-model 的 props
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isSpinning: false,
      currentRotation: 0,
      prizeList: [],
      wheel: null,
      showWinningPopup: false,
      winningPrize: null,
      timeLeft: {
        days: 4,
        hours: 23,
        minutes: 10,
        seconds: 31,
      },
      timer: null,
    };
  },
  computed: {
    wheelNumberClass() {
      const count = this.prizeList.length;
      return `number_${count}`;
    },
    rotateStyle() {
      return {
        transform: `rotate(${this.currentRotation}deg)`,
      };
    },
    modelValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    async loadPrizeList(count = 8) {
      try {
        const data = await getPrizeList(count);
        this.prizeList = data;
      } catch (error) {
        console.error("獲取獎品列表失敗:", error);
      }
    },
    async startSpin() {
      if (this.isSpinning) return;
      this.isSpinning = true;

      try {
        const winnerPrize = await getWinnerPrize();

        const winningIndex = this.prizeList.findIndex(
          (p) => p.prize_id === winnerPrize.prize_id
        );
        const anglePerPrize = 360 / this.prizeList.length;

        // 修改角度计算方式，确保顺时针旋转
        const targetDegree = anglePerPrize * winningIndex;
        const totalRotation = 360 * 5 - targetDegree;

        gsap.to(this.$data, {
          currentRotation: totalRotation,
          duration: 5,
          ease: "power2.out",
          onComplete: () => {
            this.isSpinning = false;
            this.currentRotation = this.currentRotation % 360;
            this.winningPrize = winnerPrize;
            this.showWinningPopup = true;
          },
        });
      } catch (error) {
        console.error("获取中奖信息失败:", error);
        this.isSpinning = false;
      }
    },

    updateTimer() {
      if (this.timeLeft.seconds > 0) {
        this.timeLeft.seconds--;
      } else if (this.timeLeft.minutes > 0) {
        this.timeLeft.minutes--;
        this.timeLeft.seconds = 59;
      } else if (this.timeLeft.hours > 0) {
        this.timeLeft.hours--;
        this.timeLeft.minutes = 59;
        this.timeLeft.seconds = 59;
      } else if (this.timeLeft.days > 0) {
        this.timeLeft.days--;
        this.timeLeft.hours = 23;
        this.timeLeft.minutes = 59;
        this.timeLeft.seconds = 59;
      }
    },
    closeModal() {
      this.$emit("input", false);
    },
  },
  mounted() {
    this.loadPrizeList(8);
    this.timer = setInterval(this.updateTimer, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped lang="scss">
.ticket-popup-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100013;
  color: #fff;
}

.ticket-popup-wrap:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.8);
}

.ticket-popup-wrap .arrow-btn {
  position: absolute;
  top: 0.52rem;
  left: 0.42rem;
  z-index: 1;
}

.ticket-popup-wrap .arrow-btn svg {
  width: 0.56rem;
  height: 0.56rem;
}

.ticket-popup-wrap .ticket-content-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ticket-popup-wrap .ticket-content-wrapper .header-wrap {
  position: relative;
  padding-top: 1.12rem;
  display: flex;
  justify-content: center;
  background: url(../assets/header-title-top.png) no-repeat top/4.06rem 1.12rem;
  z-index: -1;
}

.ticket-popup-wrap .ticket-content-wrapper .header-wrap .header-title {
  min-width: 2.46rem;
  height: 0.65rem;
  font-size: 0.36rem;
  position: relative;
  line-height: 0.58rem;
  color: #fff;
  text-shadow: 1px 1px #c63036, -1px 1px #c63036, 1px -1px #c63036,
    -1px -1px #c63036;
  text-align: center;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABBCAYAAAAQTc7lAAAALklEQVQYlWP472H8n4nBzoeBiYGBAUZcO8PAxHDvOorYMCX4ZBiYGBjZPzBQAABIhAfla0dJfAAAAABJRU5ErkJggg==)
    repeat-x left 0 / contain;
  margin-top: -0.25rem;
  padding: 0 0.1rem;
}

.ticket-popup-wrap .ticket-content-wrapper .header-wrap .header-title:before {
  position: absolute;
  content: "";
  width: 0.8rem;
  height: 0.65rem;
  left: -0.7rem;
  background: url(../assets/header-title-left.png) no-repeat 50% / contain;
}

.ticket-popup-wrap .ticket-content-wrapper .header-wrap .header-title:after {
  position: absolute;
  content: "";
  width: 0.8rem;
  height: 0.65rem;
  right: -0.7rem;
  background: url(../assets/header-title-right.png) no-repeat 50% / contain;
}

.ticket-popup-wrap .ticket-content-wrapper .ticket-popup {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  overflow: hidden;
}

.ticket-popup-wrap .ticket-content-wrapper .ticket-popup-list {
  width: 100%;
  margin: 0.4rem 0;
  padding-top: 0.18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.22rem;
  flex: 1 1 0%;
  overflow-y: auto;
}

.ticket-popup-wrapper {
  margin-top: 0.08rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden;
}

.ticket-popup-wrapper .banner-wrap {
  position: relative;
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
}

.ticket-popup-wrapper .banner-wrap .swiper-container {
  width: calc(100% - 2.68rem);
  display: flex;
  align-items: center;
  z-index: 0;
}

.ticket-popup-wrapper .banner-wrap .swiper-wrapper {
  display: flex;
  align-items: center;
}

.item-name {
  width: 50vw;
  border-radius: 0.14rem;
  padding: 0 0.15rem;
  background: url(../assets/ticket-default.png) no-repeat 50% / cover;
  font-size: 0.15rem;
  color: #fff;
  word-break: break-word;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.ticket-popup-wrapper .content-wrapper {
  flex: 1 1 0%;
  overflow-y: auto;
  width: 100%;
  padding: 0 0 0.2rem;
}

.ticket-condition-wrap {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.ticket-condition-wrap .info-text {
  font-size: 0.24rem;
  color: 0.24rem;
  margin-top: 0.3rem;
  text-align: center;
}

.ticket-condition-wrap .ticket-condition-list {
  overflow-y: scroll;
  max-height: calc(100vh - 0.73rem);
  height: calc(var(--vh, 1vh) * 100 - 3.73rem);
  margin-top: 0.5rem;
  display: flex;
  gap: 0.24rem;
  flex-direction: column;
  align-items: center;
}

.ticket-condition-wrap .ticket-condition-list .ticket-condition-item {
  display: flex;
  flex-direction: column;
  width: 5.8rem;
  background-color: #5f5f5f;
  border-radius: 0.13rem;
  padding: 0.3rem 0.43rem;
}

.ticket-condition-wrap .ticket-condition-list .ticket-condition-item .item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.1rem;
}

.ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .item-bottom {
  padding: 0;
  display: flex;
  flex-direction: column;
}

.ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .item-bottom
  .item-data {
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.24rem;
  padding: 0 0.2rem;
}

.ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .condition-title {
  flex: 1 1 0%;
  word-break: break-word;
  font-size: 0.24rem;
  line-height: 0.33rem;
}

.ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .condition-title
  .yellow {
  color: #fab00c;
}

.ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .condition-button {
  padding: 0 0.1rem;
  display: flex;
  align-items: center;
  justify-items: center;
  min-width: 1.5rem;
  height: 0.5rem;
  box-shadow: 0 0.03rem 0.06rem #00000029;
  border-radius: 0.25rem;
  max-width: 50%;
  justify-content: center;
  font-size: 0.24rem;
  background: transparent linear-gradient(179deg, #f5b819, #f2a11f 30%, #eb6a2d)
    0 0 no-repeat padding-box;
  text-align: center;
}

.ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .condition-button.done {
  background: transparent linear-gradient(180deg, #4a4949, #313131) 0 0
    no-repeat padding-box;
}

.invite-friends-link {
  border-radius: 0.08rem;
  background-image: linear-gradient(180deg, #f3f7fb 0, #e0e9f1);
  min-height: 2.3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.3rem 0.24rem;
}

.invite-friends-link .link-top-title {
  font-size: 0.34rem;
  font-weight: 600;
  color: #3b2987;
  display: flex;
}

.invite-friends-link .link-top-title .share {
  margin-left: 0.2rem;
}

.invite-friends-link .link-top-title .share svg {
  width: 0.2rem;
  height: 0.2rem;
}

.invite-friends-link .link-subtitle {
  font-size: 0.2rem;
  font-weight: 600;
  color: #666;
  margin-top: 0.25rem;
}

.invite-friends-link .invite-get-link {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.08rem;
  background-color: #fff;
  height: 0.4rem;
  margin-top: 0.1rem;
}

.invite-friends-link .invite-get-link .link-url {
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1 1 0%;
  font-size: 0.2rem;
  font-weight: 600;
  padding: 0 0.2rem;
}

.invite-friends-link .copy-container {
  font-size: 0.24rem;
  font-weight: 600;
  color: #fff;
  margin-top: 0.4rem;
  display: flex;
  width: 100%;
}

.invite-friends-link .copy-container span {
  min-width: 1.55rem;
  white-space: wrap;
  word-break: break-word;
}

.invite-friends-link .copy-container .link-copy {
  padding: 0.12rem;
  border-radius: 0.08rem;
  background-color: #428dfc;
  width: 50%;
  height: 100%;
  min-height: 0.78rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.04rem;
}

.invite-friends-link .copy-container .link-copy svg {
  margin-right: 0.2rem;
  min-width: 0.3rem;
  height: 0.3rem;
}

.invite-friends-link .copy-container .link-qrcode {
  margin-right: 0.2rem;
  padding: 0.12rem;
  border-radius: 0.08rem;
  background-image: linear-gradient(104deg, #6b73ff, #000dff);
  width: 50%;
  height: 100%;
  min-height: 0.78rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.invite-friends-link .copy-container .link-qrcode svg {
  margin-right: 0.2rem;
  min-width: 0.3rem;
  height: 0.3rem;
}

.icon-MONEY {
  background-image: url(../assets/money.png);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}

.ticket-game-wrap {
  width: 100%;
}

.ticket-game-wrap .prize-wheel-wrapper {
  width: 100%;
  display: inline-block;
  text-align: center;
}

.ticket-game-wrap .prize-wheel-wrapper .wheel_container {
  position: relative;
  height: auto;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .wheel_container
  .message_mask.messageOpen {
  top: 0;
  background: rgba(0, 0, 0, 0.8);
}

.ticket-game-wrap .prize-wheel-wrapper .prize_wheel_root {
  position: relative;
  width: inherit;
  height: inherit;
}

.prize_wheel_root .wheel_bg .start_wheel {
  content: "";
  position: absolute;
  background-image: url(../assets/goBtn.png);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 100;
  left: 50%;
  top: 50%;
  width: 0.9rem;
  height: 1.22rem;
  transform: translate(-50%, -50%);
  margin-top: -10px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}

.ticket-game-wrap .prize-wheel-wrapper .prize_wheel_root .wheel_bg {
  background: url(../assets/ticket-type-wheel.png) no-repeat 50% / contain;
  position: relative;
  width: 6.9rem;
  height: 6.45rem;
  margin: 0 auto;
}

.ticket-game-wrap .prize-wheel-wrapper .prize_wheel_root .wheel_bg:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 6.9rem;
  height: 6.45rem;
  background: url(../assets/ticket-type-wheel-bg.png) no-repeat 50% / contain;
  z-index: -1;
}

.ticket-game-wrap .prize-wheel-wrapper .prize_wheel_root .wheel_bg:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 6.9rem;
  height: 6.45rem;
  background: url(../assets/ticket-type-wheel-bg2.png) no-repeat 50% / contain;
  z-index: -1;
  animation: pointShow 2s infinite linear;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content {
  top: 1.1rem;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-0
  .rewardItem {
  height: 25%;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-0
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: row;
  transform: rotate(90deg);
  width: 1.25rem;
  color: #000;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-0
  .rewardItem
  .prize_message
  span {
  font-size: 0.18rem;
  height: auto;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-0
  .rewardItem
  .prize_message
  .prize_item {
  order: -1;
  max-width: 0.4rem;
  height: 0.32rem;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-1
  .rewardItem {
  height: 25%;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-1
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: row;
  transform: rotate(90deg);
  width: 1.25rem;
  color: #000;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-1
  .rewardItem
  .prize_message
  span {
  font-size: 0.18rem;
  height: auto;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-1
  .rewardItem
  .prize_message
  .prize_item {
  order: -1;
  max-width: 0.4rem;
  height: 0.32rem;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-2
  .rewardItem {
  height: 25%;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-2
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: row;
  transform: rotate(90deg);
  width: 1.25rem;
  color: #000;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-2
  .rewardItem
  .prize_message
  span {
  font-size: 0.18rem;
  height: auto;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-2
  .rewardItem
  .prize_message
  .prize_item {
  order: -1;
  max-width: 0.4rem;
  height: 0.32rem;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-3
  .rewardItem {
  height: 25%;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-3
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: row;
  transform: rotate(90deg);
  width: 1.25rem;
  color: #000;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-3
  .rewardItem
  .prize_message
  span {
  font-size: 0.18rem;
  height: auto;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-3
  .rewardItem
  .prize_message
  .prize_item {
  order: -1;
  max-width: 0.4rem;
  height: 0.32rem;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-4
  .rewardItem {
  height: 25%;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-4
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: row;
  transform: rotate(90deg);
  width: 1.25rem;
  color: #000;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-4
  .rewardItem
  .prize_message
  span {
  font-size: 0.18rem;
  height: auto;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-4
  .rewardItem
  .prize_message
  .prize_item {
  order: -1;
  max-width: 0.4rem;
  height: 0.32rem;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-5
  .rewardItem {
  height: 25%;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-5
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: row;
  transform: rotate(90deg);
  width: 1.25rem;
  color: #000;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-5
  .rewardItem
  .prize_message
  span {
  font-size: 0.18rem;
  height: auto;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-5
  .rewardItem
  .prize_message
  .prize_item {
  order: -1;
  max-width: 0.4rem;
  height: 0.32rem;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-6
  .rewardItem {
  height: 25%;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-6
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: row;
  transform: rotate(90deg);
  width: 1.25rem;
  color: #000;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-6
  .rewardItem
  .prize_message
  span {
  font-size: 0.18rem;
  height: auto;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-6
  .rewardItem
  .prize_message
  .prize_item {
  order: -1;
  max-width: 0.4rem;
  height: 0.32rem;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-7
  .rewardItem {
  height: 25%;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-7
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: row;
  transform: rotate(90deg);
  width: 1.25rem;
  color: #000;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-7
  .rewardItem
  .prize_message
  span {
  font-size: 0.18rem;
  height: auto;
}

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .wheel_content
  li.item-7
  .rewardItem
  .prize_message
  .prize_item {
  order: -1;
  max-width: 0.4rem;
  height: 0.32rem;
}

.ticket-game-wrap .prize-wheel-wrapper .prize_wheel_root .claim-btn {
  margin-top: -0.2rem;
}

.ticket-game-wrap .gift-code-wrapper {
  margin-top: 0;
}

.ticket-game-wrap .gift-code-wrapper .gift-code-wrap {
  position: relative;
}

.ticket-game-wrap .gift-code-wrapper .gift-code-wrap.cash-mask .cash-content {
  z-index: 100011;
}

.ticket-game-wrap .gift-code-wrapper .gift-code-wrap .cash-content {
  position: relative;
  z-index: auto;
}

.ticket-game-wrap
  .gift-code-wrapper
  .gift-code-wrap
  .cash-content
  .cash-box:before {
  top: 1rem;
}

.ticket-game-wrap .cash-voucher-wrapper {
  margin-top: -0.4rem;
}

.ticket-game-wrap .cash-voucher-wrapper .cash-voucher-wrap {
  position: relative;
}

.ticket-game-wrap
  .cash-voucher-wrapper
  .cash-voucher-wrap.cash-mask
  .cash-content {
  z-index: 100011;
}

.ticket-game-wrap .cash-voucher-wrapper .cash-voucher-wrap .cash-content {
  position: relative;
  z-index: auto;
}

.ticket-game-wrap
  .cash-voucher-wrapper
  .cash-voucher-wrap
  .cash-content
  .cash-box:before {
  top: 1rem;
}

.ticket-game-wrap .claim-btn {
  min-width: 3.52rem;
  margin-top: 0.1rem;
  font-size: 0.28rem;
  color: #d63000;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: transparent linear-gradient(180deg, #fff, #f7c163 50%, #f2b03e) 0
    0 no-repeat padding-box;
  height: 0.56rem;
  border-radius: 0.3rem;
}

.prize_wheel_root .wheel_bg .wheel_content {
  border-radius: 50%;
  width: 69%;
  position: relative;
  content: "";
  height: 63%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 1.1rem;
  left: 1.05rem;

  ul {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    content: "";
    position: relative;
    background-image: url(../assets/wheel.png);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }

  &.number_4 ul {
    background-image: url(../assets/wheel_4.png);
  }

  &.number_12 ul {
    background-image: url(../assets/wheel_12.png);
  }

  // 通用的奖品项样式
  ul li {
    text-align: center;
    width: 88%;
    height: 88%;
    border-radius: 50%;
    position: absolute;
    content: "";
    display: block;
    justify-content: center;

    .rewardItem {
      display: flex;
      flex-wrap: wrap;
      height: 25%;
      word-break: break-word;
      white-space: break-spaces;
      text-overflow: ellipsis;
      justify-content: center;

      .prize_message {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        position: relative;

        span {
          height: 0.7rem;
          color: #462f2f;
          font-size: 0.24rem;
          max-width: 1.4rem;
          display: -webkit-box !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
          overflow: hidden;
          line-height: 1.5;
        }

        div.prize_item {
          max-width: 0.5rem;
          width: 100%;
          height: 0.5rem;

          .icon {
            width: 100%;
            height: 100%;
            background-size: contain;
            background-repeat: no-repeat;
            display: block;
          }
        }
      }
    }
  }

  // 4个奖品项的旋转角度（90度递增）
  &.number_4 ul {
    li.item-0 {
      transform: rotate(0deg);
    }
    li.item-1 {
      transform: rotate(90deg);
    }
    li.item-2 {
      transform: rotate(180deg);
    }
    li.item-3 {
      transform: rotate(270deg);
    }

    li .rewardItem .prize_message {
      transform: rotate(90deg);
      width: 2rem; // 由于只有4个项目，可以给更大的空间
    }
  }

  // 8个奖品项的旋转角度（45度递增）
  &.number_8 ul {
    li.item-0 {
      transform: rotate(0deg);
    }
    li.item-1 {
      transform: rotate(45deg);
    }
    li.item-2 {
      transform: rotate(90deg);
    }
    li.item-3 {
      transform: rotate(135deg);
    }
    li.item-4 {
      transform: rotate(180deg);
    }
    li.item-5 {
      transform: rotate(225deg);
    }
    li.item-6 {
      transform: rotate(270deg);
    }
    li.item-7 {
      transform: rotate(315deg);
    }

    li .rewardItem .prize_message {
      transform: rotate(90deg);
      width: 1.25rem;
    }
  }

  // 12个奖品项的旋转角度（30度递增）
  &.number_12 ul {
    li.item-0 {
      transform: rotate(0deg);
    }
    li.item-1 {
      transform: rotate(30deg);
    }
    li.item-2 {
      transform: rotate(60deg);
    }
    li.item-3 {
      transform: rotate(90deg);
    }
    li.item-4 {
      transform: rotate(120deg);
    }
    li.item-5 {
      transform: rotate(150deg);
    }
    li.item-6 {
      transform: rotate(180deg);
    }
    li.item-7 {
      transform: rotate(210deg);
    }
    li.item-8 {
      transform: rotate(240deg);
    }
    li.item-9 {
      transform: rotate(270deg);
    }
    li.item-10 {
      transform: rotate(300deg);
    }
    li.item-11 {
      transform: rotate(330deg);
    }

    li .rewardItem .prize_message {
      transform: rotate(90deg);
      width: 1rem; // 由于项目更多，需要适当减小宽度

      span {
        font-size: 0.2rem; // 适当减小字体大小
        font-size: 0.18rem;
        height: auto;
      }
    }
  }

  &.number_0 ul {
    transition: all 2s linear;
    will-change: transform;
  }
}

@keyframes spinWheel {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}

@keyframes pointShow {
  0% {
    opacity: 1;
  }

  to {
    opacity: 0.8;
  }
}

.prize_wheel_root .wheel_bg .wheel_content ul li.item-0 {
  text-align: center;
  width: 88%;
  height: 88%;
  border-radius: 50%;
  position: absolute;
  content: "";
  display: block;
  justify-content: center;
  transform: rotate(0deg);
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-0
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  position: relative;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-0
  .rewardItem
  .prize_message
  span {
  height: 0.7rem;
  color: #462f2f;
  font-size: 0.24rem;
  max-width: 1.4rem;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5;
}

@supports (-webkit-line-clamp: 2) {
  .prize_wheel_root
    .wheel_bg
    .wheel_content
    ul
    li.item-0
    .rewardItem
    .prize_message
    span {
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-0
  .rewardItem
  .prize_message
  div.prize_item {
  max-width: 0.5rem;
  width: 100%;
  height: 0.5rem;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-0
  .rewardItem
  .prize_message
  div.prize_item
  .icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.prize_wheel_root .wheel_bg .wheel_content ul li.item-1 {
  text-align: center;
  width: 88%;
  height: 88%;
  border-radius: 50%;
  position: absolute;
  content: "";
  display: block;
  justify-content: center;
  transform: rotate(45deg);
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-1
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  position: relative;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-1
  .rewardItem
  .prize_message
  span {
  height: 0.7rem;
  color: #462f2f;
  font-size: 0.24rem;
  max-width: 1.4rem;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5;
}

@supports (-webkit-line-clamp: 2) {
  .prize_wheel_root
    .wheel_bg
    .wheel_content
    ul
    li.item-1
    .rewardItem
    .prize_message
    span {
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-1
  .rewardItem
  .prize_message
  div.prize_item {
  max-width: 0.5rem;
  width: 100%;
  height: 0.5rem;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-1
  .rewardItem
  .prize_message
  div.prize_item
  .icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.prize_wheel_root .wheel_bg .wheel_content ul li.item-2 {
  text-align: center;
  width: 88%;
  height: 88%;
  border-radius: 50%;
  position: absolute;
  content: "";
  display: block;
  justify-content: center;
  transform: rotate(90deg);
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-2
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  position: relative;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-2
  .rewardItem
  .prize_message
  span {
  height: 0.7rem;
  color: #462f2f;
  font-size: 0.24rem;
  max-width: 1.4rem;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5;
}

@supports (-webkit-line-clamp: 2) {
  .prize_wheel_root
    .wheel_bg
    .wheel_content
    ul
    li.item-2
    .rewardItem
    .prize_message
    span {
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-2
  .rewardItem
  .prize_message
  div.prize_item {
  max-width: 0.5rem;
  width: 100%;
  height: 0.5rem;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-2
  .rewardItem
  .prize_message
  div.prize_item
  .icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.prize_wheel_root .wheel_bg .wheel_content ul li.item-3 {
  text-align: center;
  width: 88%;
  height: 88%;
  border-radius: 50%;
  position: absolute;
  content: "";
  display: block;
  justify-content: center;
  transform: rotate(135deg);
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-3
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  position: relative;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-3
  .rewardItem
  .prize_message
  span {
  height: 0.7rem;
  color: #462f2f;
  font-size: 0.24rem;
  max-width: 1.4rem;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5;
}

@supports (-webkit-line-clamp: 2) {
  .prize_wheel_root
    .wheel_bg
    .wheel_content
    ul
    li.item-3
    .rewardItem
    .prize_message
    span {
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-3
  .rewardItem
  .prize_message
  div.prize_item {
  max-width: 0.5rem;
  width: 100%;
  height: 0.5rem;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-3
  .rewardItem
  .prize_message
  div.prize_item
  .icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.prize_wheel_root .wheel_bg .wheel_content ul li.item-4 {
  text-align: center;
  width: 88%;
  height: 88%;
  border-radius: 50%;
  position: absolute;
  content: "";
  display: block;
  justify-content: center;
  transform: rotate(180deg);
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-4
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  position: relative;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-4
  .rewardItem
  .prize_message
  span {
  height: 0.7rem;
  color: #462f2f;
  font-size: 0.24rem;
  max-width: 1.4rem;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5;
}

@supports (-webkit-line-clamp: 2) {
  .prize_wheel_root
    .wheel_bg
    .wheel_content
    ul
    li.item-4
    .rewardItem
    .prize_message
    span {
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-4
  .rewardItem
  .prize_message
  div.prize_item {
  max-width: 0.5rem;
  width: 100%;
  height: 0.5rem;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-4
  .rewardItem
  .prize_message
  div.prize_item
  .icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.prize_wheel_root .wheel_bg .wheel_content ul li.item-5 {
  text-align: center;
  width: 88%;
  height: 88%;
  border-radius: 50%;
  position: absolute;
  content: "";
  display: block;
  justify-content: center;
  transform: rotate(225deg);
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-5
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  position: relative;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-5
  .rewardItem
  .prize_message
  span {
  height: 0.7rem;
  color: #462f2f;
  font-size: 0.24rem;
  max-width: 1.4rem;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5;
}

@supports (-webkit-line-clamp: 2) {
  .prize_wheel_root
    .wheel_bg
    .wheel_content
    ul
    li.item-5
    .rewardItem
    .prize_message
    span {
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-5
  .rewardItem
  .prize_message
  div.prize_item {
  max-width: 0.5rem;
  width: 100%;
  height: 0.5rem;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-5
  .rewardItem
  .prize_message
  div.prize_item
  .icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.prize_wheel_root .wheel_bg .wheel_content ul li.item-6 {
  text-align: center;
  width: 88%;
  height: 88%;
  border-radius: 50%;
  position: absolute;
  content: "";
  display: block;
  justify-content: center;
  transform: rotate(270deg);
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-6
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  position: relative;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-6
  .rewardItem
  .prize_message
  span {
  height: 0.7rem;
  color: #462f2f;
  font-size: 0.24rem;
  max-width: 1.4rem;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5;
}

@supports (-webkit-line-clamp: 2) {
  .prize_wheel_root
    .wheel_bg
    .wheel_content
    ul
    li.item-6
    .rewardItem
    .prize_message
    span {
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-6
  .rewardItem
  .prize_message
  div.prize_item {
  max-width: 0.5rem;
  width: 100%;
  height: 0.5rem;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-6
  .rewardItem
  .prize_message
  div.prize_item
  .icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.prize_wheel_root .wheel_bg .wheel_content ul li.item-7 {
  text-align: center;
  width: 88%;
  height: 88%;
  border-radius: 50%;
  position: absolute;
  content: "";
  display: block;
  justify-content: center;
  transform: rotate(315deg);
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-7
  .rewardItem
  .prize_message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  position: relative;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-7
  .rewardItem
  .prize_message
  span {
  height: 0.7rem;
  color: #462f2f;
  font-size: 0.24rem;
  max-width: 1.4rem;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5;
}

@supports (-webkit-line-clamp: 2) {
  .prize_wheel_root
    .wheel_bg
    .wheel_content
    ul
    li.item-7
    .rewardItem
    .prize_message
    span {
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-7
  .rewardItem
  .prize_message
  div.prize_item {
  max-width: 0.5rem;
  width: 100%;
  height: 0.5rem;
}

.prize_wheel_root
  .wheel_bg
  .wheel_content
  ul
  li.item-7
  .rewardItem
  .prize_message
  div.prize_item
  .icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.claim-btn {
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;
    background: #999;

    &:hover {
      transform: none;
      filter: none;
    }
  }
}

.wheel_content {
  ul {
    transition: none; // 移除这个 transition，让 gsap 完全控制动画
    will-change: transform;
    transform-origin: center center;
  }
}

// 移除这个动画，因为它会影响整个转盘的旋转
@keyframes spinWheel {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.ticket-game-wrap .prize-wheel-wrapper .prize_wheel_root .wheel_bg:before {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 6.9rem;
  height: 6.45rem;
  background: url(../assets/ticket-type-wheel-bg.png) no-repeat 50% / contain;
  z-index: -1;
}

// 确保转盘的初始状态和过渡效果正确
.prize_wheel_root .wheel_bg .wheel_content {
  ul {
    position: relative;
    transform: rotate(0deg);
    // 让 GSAP 完全控制动画，移除默认的 transition
    transition: none;
  }
}
</style>
