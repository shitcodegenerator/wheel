<template>
  <div class="fixed inset-0 z-50 bg-black/80">
    <div class="ticket-popup-wrap">
      <CloseBtn @close="closePopup" />
      <div class="ticket-content-wrapper">
        <div class="header-wrap">
          <div class="header-title">幸运大转盘</div>
        </div>
        <div class="ticket-popup-wrapper">
          <div class="item-name">幸运大转盘抽奖</div>
          <div class="content-wrapper">
            <CountdownTimer :time-left="timeLeft" />

            <div class="ticket-game-wrap">
              <div class="prize-wheel-wrapper">
                <div class="wheel_container">
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
                              {{
                                prize.prize_amount
                                  ? `${prize.prize_amount}元`
                                  : prize.prize_name
                              }}
                              <div class="prize_item">
                                <img
                                  v-if="prize.icon"
                                  class="icon"
                                  :src="prize.icon"
                                  :alt="prize.prize_name"
                                />
                                <span v-else class="icon icon-MONEY" />
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <span
                      class="start_wheel"
                      :class="{ disabled: isSpinning }"
                      @click="startSpin"
                    />
                  </div>
                  <div
                    class="claim-btn"
                    :class="{ disabled: isSpinning }"
                    @click="startSpin"
                  >
                    {{ isSpinning ? "抽奖中..." : "开始抽奖" }}
                  </div>
                </div>
              </div>
            </div>
            <ProgressBar :progress="75" />
            <span>{{
              winnerPrize
                ? `${winnerPrize.prize_name} - ${winnerPrize.prize_amount}元`
                : "空"
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加中奖弹窗 -->
    <WinningPopup
      :value="showWinningPopup"
      :prize="winnerPrize"
      @input="showWinningPopup = $event"
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
      showWinningPopup: false,
      winnerPrize: null,
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
  },
  mounted() {
    const amount = this.$route?.query?.amount
      ? parseInt(this.$route.query.amount)
      : 8;
    const validAmounts = [4, 8, 12];
    this.loadPrizeList(validAmounts.includes(amount) ? amount : 8);
    this.timer = setInterval(this.updateTimer, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
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
        const winner = await getWinnerPrize(this.prizeList.length);

        const winningIndex = this.prizeList.findIndex(
          (p) => p.prize_id === winner.prize_id
        );

        this.winnerPrize = this.prizeList[winningIndex];
        const anglePerPrize = 360 / this.prizeList.length;

        const targetDegree = anglePerPrize * winningIndex;
        const totalRotation = 360 * 5 - targetDegree;

        gsap.to(this.$data, {
          currentRotation: totalRotation,
          duration: 5,
          ease: "power2.out",
          onComplete: () => {
            this.isSpinning = false;
            this.currentRotation = this.currentRotation % 360;
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
};
</script>

<style scoped lang="scss">
.ticket-popup-wrap {
  position: fixed;
  inset: 0;
  z-index: 100013;
  color: #fff;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: rgba(0, 0, 0, 0.8);
  }
}

.ticket-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .header-wrap {
    position: relative;
    padding-top: 1.12rem;
    display: flex;
    justify-content: center;
    background: url(../assets/header-title-top.png) no-repeat top/4.06rem
      1.12rem;
    z-index: -1;
  }
}

.header-title {
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
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 0.8rem;
    height: 0.65rem;
    background-repeat: no-repeat;
    background-size: contain;
  }
  &::before {
    left: -0.7rem;
    background-image: url(../assets/header-title-left.png);
  }
  &::after {
    right: -0.7rem;
    background-image: url(../assets/header-title-right.png);
  }
}

.ticket-popup-wrapper {
  margin-top: 0.08rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  overflow: hidden;
}

.item-name {
  width: 50vw;
  margin: auto;
  padding: 0 0.15rem;
  font-size: 0.25rem;
  color: #fff;
  background: url(../assets/ticket-default.png) no-repeat 50% / cover;
  border-radius: 0.14rem;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-word;
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  width: 100%;
  padding-bottom: 0.2rem;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.ticket-game-wrap {
  width: 100%;
}

.prize-wheel-wrapper {
  width: 100%;
  display: inline-block;
  text-align: center;
}

.wheel_container {
  position: relative;
}

.start_wheel {
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 50%;
  width: 0.9rem;
  height: 1.22rem;
  margin-top: -10px;
  transform: translate(-50%, -50%);
  background: url(../assets/goBtn.png) center/contain no-repeat;
  cursor: pointer;
  transition: transform 0.2s ease;
  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}

.wheel_bg {
  position: relative;
  width: 6.9rem;
  height: 6.45rem;
  margin: 0 auto;
  background: url(../assets/ticket-type-wheel.png) center/contain no-repeat;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  &::before {
    background: url(../assets/ticket-type-wheel-bg.png) center/contain no-repeat;
    animation: spinWheel 2s infinite linear;
  }
  &::after {
    background: url(../assets/ticket-type-wheel-bg2.png) center/contain
      no-repeat;
    animation: pointShow 2s infinite linear;
  }
}

.wheel_content {
  position: relative;
  top: 1.1rem;
  left: 1.05rem;
  width: 69%;
  height: 63%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  ul {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: url(../assets/wheel.png) center/contain no-repeat;

    li {
      position: absolute;
      width: 88%;
      height: 88%;
      display: flex;
      justify-content: center;
      border-radius: 50%;
    }
  }

  // 輪盤背景圖片
  &.number_4 ul {
    background-image: url(../assets/wheel_4.png);
  }
  &.number_12 ul {
    background-image: url(../assets/wheel_12.png);
  }

  // 獎品項目樣式
  .rewardItem {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 25%;
    word-break: break-word;
    white-space: break-spaces;
    text-overflow: ellipsis;

    .prize_message {
      display: flex;
      align-items: center;
      height: 100%;
      color: #000;
      font-size: 0.18rem;

      div.prize_item {
        order: -1;
        max-width: 0.4rem;
        height: 0.32rem;
      }
    }
  }

  // 4格輪盤旋轉角度
  &.number_4 {
    ul {
      @for $i from 1 through 4 {
        li:nth-child(#{$i}) {
          transform: rotate(#{($i - 1) * 90}deg);
        }
      }

      .prize_message {
        transform: rotate(90deg);
        width: 2rem;
        justify-content: center;
      }
    }
  }

  // 8格輪盤旋轉角度
  &.number_8 {
    ul {
      @for $i from 1 through 8 {
        li:nth-child(#{$i}) {
          transform: rotate(#{($i - 1) * 45}deg);
        }
      }

      .prize_message {
        transform: rotate(90deg);
        width: 1.25rem;
      }
    }
  }

  // 12格輪盤旋轉角度
  &.number_12 {
    ul {
      @for $i from 0 through 11 {
        li.item-#{$i} {
          transform: rotate(#{$i * 30}deg);
        }
      }

      li .rewardItem .prize_message {
        transform: rotate(90deg);
        width: 1rem;
      }
    }
  }
}

@keyframes pointShow {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
}

.icon {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
}

.icon.icon-MONEY {
  background-image: url(../assets/money.png);
  width: 20px;
  background-position: center;
}

.claim-btn {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  font-size: 0.28rem;
  min-width: 3.52rem;
  color: #d63000;
  background: linear-gradient(180deg, #fff, #f7c163 50%, #f2b03e);
  border-radius: 100px;
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

@keyframes spinWheel {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
