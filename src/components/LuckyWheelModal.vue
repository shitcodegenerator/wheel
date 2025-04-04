<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 bg-black/80">
    <div class="ticket-popup-wrap">
      <div class="close-btn" @click="$emit('update:modelValue', false)">
        <svg class="am-icon am-icon-ticket-popup-close_7da51bf2 am-icon-md">
          <symbol viewBox="0 0 56 56" id="ticket-popup-close_7da51bf2" class="">
            <g
              id="ticket-popup-close_7da51bf2_tickettask_btn_close_normal"
              transform="translate(-652 -52)"
              class=""
            >
              <g
                id="ticket-popup-close_7da51bf2_Group_639"
                data-name="Group 639"
                transform="translate(610)"
                class=""
              >
                <g
                  id="ticket-popup-close_7da51bf2_Ellipse_21"
                  data-name="Ellipse 21"
                  transform="translate(42 52)"
                  fill="none"
                  stroke="#fff"
                  stroke-width="4"
                  class=""
                >
                  <circle
                    cx="28"
                    cy="28"
                    r="28"
                    stroke="none"
                    class=""
                  ></circle>
                  <circle cx="28" cy="28" r="26" fill="none" class=""></circle>
                </g>
                <g
                  id="ticket-popup-close_7da51bf2_Group_642"
                  data-name="Group 642"
                  transform="translate(-674.48 -54)"
                  class=""
                >
                  <g
                    id="ticket-popup-close_7da51bf2_Group_637"
                    data-name="Group 637"
                    transform="translate(731.51 121.069)"
                    class=""
                  >
                    <rect
                      id="ticket-popup-close_7da51bf2_Rectangle_280"
                      data-name="Rectangle 280"
                      width="4.585"
                      height="32.098"
                      rx="2.293"
                      transform="translate(22.697 0) rotate(45)"
                      fill="#fff"
                      class=""
                    ></rect>
                    <rect
                      id="ticket-popup-close_7da51bf2_Rectangle_281"
                      data-name="Rectangle 281"
                      width="4.585"
                      height="32.098"
                      rx="2.293"
                      transform="translate(25.939 22.697) rotate(135)"
                      fill="#fff"
                      class=""
                    ></rect>
                  </g>
                </g>
              </g>
            </g>
          </symbol>
          <use
            xlink:href="#ticket-popup-close_7da51bf2"
            __h2d_shadowroot="2905"
            class=""
          ></use>
        </svg>
      </div>
      <div class="ticket-content-wrapper">
        <div class="header-wrap">
          <div class="header-title">幸运大转盘</div>
        </div>
        <div class="ticket-popup">
          <div class="ticket-popup-wrapper">
            <div class="banner-wrap">
              <div class="swiper-slide">
                <div class="item-name">幸运大转盘抽奖</div>
              </div>
            </div>
            <div class="content-wrapper">
              <div class="title-wrap">幸运大转盘</div>
              <div class="ticket-time">
                <div class="time-top">
                  <!-- <TimeTick /> -->
                  <div class="title-text">剩余时间</div>
                </div>
                <div class="time-bottom">
                  <div class="wysiwyg">
                    <div class="time-item day">
                      <div class="num">
                        {{ timeLeft.days }}
                      </div>
                      <div class="title">天</div>
                    </div>
                    <div class="time-item">
                      <div class="num">
                        {{ timeLeft.hours }}
                      </div>
                      <div class="title">时</div>
                    </div>
                    <div class="time-item">
                      <div class="num">
                        {{ timeLeft.minutes }}
                      </div>
                      <div class="title">分</div>
                    </div>
                    <div class="time-item">
                      <div class="num">
                        {{ timeLeft.seconds }}
                      </div>
                      <div class="title">秒</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
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
                                      <!-- {{
                                        prize.prize_amount
                                          ? `৳ ${prize.prize_amount}`
                                          : prize.prize_name
                                      }} -->
                                      {{ prize.prize_name }}
                                    </span>
                                    <div v-if="false" class="prize_item">
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
              </div>
              <div class="current-progress-wrapper">
                <div class="progress-bar-wrapper">
                  <div class="progress-bar">
                    <div
                      class="am-progress-outer"
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        class="am-progress-bar"
                        style="width: 75%; height: 0px"
                      ></div>
                    </div>
                    <div class="bar-num">75.00 %</div>
                  </div>
                </div>
              </div>
              <div class="ticket-rank-wrapper">
                <div class="ticket-rank-wrap">
                  <!-- <div
                    class="swiper-container swiper-container-initialized swiper-container-vertical"
                  >
                    <div class="swiper-wrapper">
                      <div
                        v-for="record in winningRecords"
                        :key="record.user"
                        class="swiper-slide"
                      >
                        <div class="winning-record">
                          {{ record.user }} 获得了 ৳{{ record.amount }}
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

// 模拟API数据
const mockPrizeList4 = [
  {
    prize_name: "測試文案Ａ",
    prize_amount: 0,
    prize_id: 1,
    icon: "https://images.1138403.com/mcs-images/ticket/gtppbdtf4/3195047_1739618674360.png",
  },
  {
    prize_name: "现金奖励Ａ",
    prize_amount: 888,
    prize_id: 2,
    icon: null,
  },
  {
    prize_name: "现金奖励Ｂ",
    prize_amount: 188,
    prize_id: 3,
    icon: null,
  },
  {
    prize_name: "现金奖励Ｃ",
    prize_amount: 88,
    prize_id: 4,
    icon: null,
  },
];

const mockPrizeList8 = [
  ...mockPrizeList4,
  {
    prize_name: "測試文案Ｂ",
    prize_amount: 3888,
    prize_id: 5,
    icon: null,
  },
  {
    prize_name: "測試文案Ｃ",
    prize_amount: 2888,
    prize_id: 6,
    icon: null,
  },
  {
    prize_name: "測試文案Ｄ",
    prize_amount: 1888,
    prize_id: 7,
    icon: null,
  },
  {
    prize_name: "測試文案Ｅ",
    prize_amount: 588,
    prize_id: 8,
    icon: null,
  },
];

const mockPrizeList12 = [
  ...mockPrizeList8,
  {
    prize_name: "測試文案Ｆ",
    prize_amount: 0,
    prize_id: 9,
    icon: "https://images.1138403.com/mcs-images/ticket/gtppbdtf4/3195047_1739618674361.png",
  },
  {
    prize_name: "測試文案Ｇ",
    prize_amount: 8888,
    prize_id: 10,
    icon: null,
  },
  {
    prize_name: "測試文案Ｈ",
    prize_amount: 6888,
    prize_id: 11,
    icon: null,
  },
  {
    prize_name: "測試文案Ｑ",
    prize_amount: 4888,
    prize_id: 12,
    icon: null,
  },
];

export default {
  name: "LuckyWheelModal",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["update:modelValue"],
  setup() {
    const isSpinning = ref(false);
    const currentRotation = ref(0);
    const prizeList = ref([]);
    const wheel = ref(null);

    // 计算转盘类名
    const wheelNumberClass = computed(() => {
      const count = prizeList.value.length;
      return `number_${count}`;
    });

    // 计算转盘当前旋转样式
    const rotateStyle = computed(() => ({
      transform: `rotate(${currentRotation.value}deg)`,
    }));

    // 获取每个奖品的角度
    // const getPrizeAngle = (index) => {
    //   const count = prizeList.value.length;
    //   return (360 / count) * index;
    // };

    // 开始抽奖
    const startSpin = async () => {
      if (isSpinning.value) return;

      isSpinning.value = true;
      const winningIndex = Math.floor(Math.random() * prizeList.value.length);
      const baseRotations = 5; // 基础旋转圈数

      // 计算目标角度：
      // 1. 获取每个奖品占据的角度
      const anglePerPrize = 360 / prizeList.value.length;
      // 2. 计算中奖位置需要旋转的角度（因为我们要让它停在正上方）
      const targetDegree = 360 - winningIndex * anglePerPrize;
      // 3. 计算总旋转角度（基础圈数 + 目标角度）
      const totalRotation = baseRotations * 360 + targetDegree;

      // 使用GSAP进行动画
      gsap.to(currentRotation, {
        value: totalRotation,
        duration: 5, // 增加动画时间使旋转更流畅
        ease: "power2.out",
        onComplete: () => {
          isSpinning.value = false;
          // 重置旋转角度，保持在0-360之间
          currentRotation.value = currentRotation.value % 360;

          // 显示中奖信息
          const prize = prizeList.value[winningIndex];
          alert(`恭喜您获得: ${prize.prize_name}`);
        },
      });
    };

    // 倒计时相关
    const timeLeft = ref({
      days: 4,
      hours: 23,
      minutes: 10,
      seconds: 31,
    });

    const updateTimer = () => {
      if (timeLeft.value.seconds > 0) {
        timeLeft.value.seconds--;
      } else {
        if (timeLeft.value.minutes > 0) {
          timeLeft.value.minutes--;
          timeLeft.value.seconds = 59;
        } else {
          if (timeLeft.value.hours > 0) {
            timeLeft.value.hours--;
            timeLeft.value.minutes = 59;
            timeLeft.value.seconds = 59;
          } else {
            if (timeLeft.value.days > 0) {
              timeLeft.value.days--;
              timeLeft.value.hours = 23;
              timeLeft.value.minutes = 59;
              timeLeft.value.seconds = 59;
            }
          }
        }
      }
    };

    let timer = null;

    onMounted(async () => {
      prizeList.value = mockPrizeList12;
      timer = setInterval(updateTimer, 1000);
    });

    onUnmounted(() => {
      if (timer) clearInterval(timer);
    });

    return {
      isSpinning,
      timeLeft,
      prizeList,
      wheel,
      wheelNumberClass,
      rotateStyle,
      startSpin,
    };
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

.ticket-popup-wrap .close-btn {
  position: absolute;
  top: 0.52rem;
  right: 0.42rem;
}

.ticket-popup-wrap .close-btn svg {
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

.ticket-popup-wrap .progress-bar-wrapper {
  color: #fff;
  text-align: center;
  margin-top: 0.22rem;
  width: 100%;
  padding: 0 0.85rem;
}

.ticket-popup-wrap .progress-bar-wrapper .progress-bar {
  width: 100%;
  position: relative;
}

.ticket-popup-wrap .progress-bar-wrapper .progress-bar .am-progress-outer {
  background: #262626 0 0 no-repeat padding-box;
  border: 0.03rem solid #707070;
  border-radius: 0.23rem;
  height: 0.36rem;
  display: flex;
  align-items: center;
  padding: 0 0.12rem;
}

.ticket-popup-wrap .progress-bar-wrapper .progress-bar .am-progress-bar {
  background: transparent linear-gradient(180deg, #ffcf00, #ee7c0e) 0 0
    no-repeat padding-box;
  border-radius: 0.21rem;
  height: 0.2rem !important;
  border: 0;
  animation: progressAnimationStrike 2s;
}

.ticket-popup-wrap .progress-bar-wrapper .progress-bar .bar-num {
  position: absolute;
  font-size: 0.24rem;
  line-height: 0.42rem;
  right: 0.3rem;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
}

.ticket-time {
  margin-top: 0.18rem;
  display: flex;
  align-items: flex-start;
  color: #fff;
  justify-content: center;
}

.ticket-time .time-top {
  height: 0.6rem;
  display: flex;
  align-items: center;
  font-size: 0.22rem;
  margin-right: 0.2rem;
}

.ticket-time .time-top svg {
  width: 0.37rem;
  height: 0.41rem;
  margin-right: 0.22rem;
  fill: #ffb30b;
}

.ticket-time .time-bottom,
.ticket-time .time-bottom .wysiwyg {
  display: flex;
  align-items: center;
}

.ticket-time .time-bottom .time-item {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 0.21rem;
}

.ticket-time .time-bottom .time-item:before {
  position: absolute;
  content: ":";
  color: #cecece;
  font-size: 0.38rem;
  font-weight: 700;
  right: -0.15rem;
}

.ticket-time .time-bottom .time-item.day:before,
.ticket-time .time-bottom .time-item:last-child:before {
  display: none;
}

.ticket-time .time-bottom .time-item .num {
  width: 0.7rem;
  height: 0.6rem;
  background: #262626 0 0 no-repeat padding-box;
  border: 0.02rem solid #707070;
  border-radius: 0.08rem;
  font-size: 0.38rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ticket-time .time-bottom .time-item .title {
  color: #a2a2a2;
  font-size: 0.16rem;
  line-height: 0.22rem;
  font-weight: 700;
  text-align: center;
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

.swiper-slide {
  width: 1.35rem;
  height: 0.68rem;
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

.ticket-popup-wrapper .banner-wrap .swiper-slide.has-img {
  padding: 0;
}

.ticket-popup-wrapper .banner-wrap .swiper-slide.swiper-slide-active {
  width: 1.8rem;
  height: 1rem;
  font-size: 0.2rem;
}

.ticket-popup-wrapper .banner-wrap .swiper-slide.swiper-slide-active img {
  width: 1.8rem;
  height: 1rem;
}

.ticket-popup-wrapper .banner-wrap .swiper-slide .item-name {
  width: 100%;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5;
  text-align: center;
}

@supports (-webkit-line-clamp: 2) {
  .ticket-popup-wrapper .banner-wrap .swiper-slide .item-name {
    display: -webkit-box !important;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}

.ticket-popup-wrapper .banner-wrap .swiper-slide img {
  width: 1.35rem;
  height: 0.68rem;
  object-fit: cover;
  border-radius: 0.14rem;
}

.ticket-popup-wrapper .banner-wrap .swiper-btn {
  width: 0.32rem;
  height: 0.4rem;
  position: absolute;
}

// .ticket-popup-wrapper .banner-wrap .swiper-btn-prew {
//   background: url(../assets/ticket-arrow.png) no-repeat 50% / contain;
//   left: 0.9rem;
//   transform: rotate(180deg);
// }

// .ticket-popup-wrapper .banner-wrap .swiper-btn-next {
//   background: url(../assets/ticket-arrow.png) no-repeat 50% / contain;
//   right: 0.9rem;
// }

.ticket-popup-wrapper .content-wrapper {
  flex: 1 1 0%;
  overflow-y: auto;
  width: 100%;
  padding: 0 0 0.2rem;
}

.ticket-popup-wrapper .content-wrapper .title-wrap {
  font-size: 0.28rem;
  font-weight: 700;
  position: relative;
  color: #fff;
  padding: 0.1rem 0.85rem;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-text-stroke: 0.5px #ffb30b;
  -webkit-text-fill-color: #fff;
  text-align: center;
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

@keyframes progressAnimationStrike {
  0% {
    width: 0;
  }

  to {
    width: attr(aria-valuenow);
  }
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

.ticket-share-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 100030;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ticket-share-wrapper.popList {
  position: fixed;
  left: 0;
}

.ticket-share-wrapper:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  left: 0;
  top: 0;
  z-index: 100011;
}

.ticket-share-wrapper .share-wrap {
  position: relative;
  z-index: 100030;
  width: 5.8rem;
  background: #000 0 0 no-repeat padding-box;
  border: 0.03rem solid #8d8d8d;
  border-radius: 0.32rem;
  padding: 0.45rem 0.32rem 0.32rem;
  max-height: 90vh;
  max-height: calc(var(--vh, 1vh) * 90);
  overflow-y: auto;
}

.ticket-share-wrapper .close-btn {
  position: absolute;
  top: 0.35rem;
  right: 0.3rem;
}

.ticket-share-wrapper .close-btn svg {
  width: 0.44rem;
  height: 0.44rem;
}

.ticket-share-wrapper .share-title {
  font-size: 0.32rem;
  color: #efefef;
  text-align: center;
  padding: 0 0.77rem;
}

.ticket-share-wrapper .share-message {
  margin-top: 0.31rem;
  background: #4b4b4b 0 0 no-repeat padding-box;
  border-radius: 0.21rem;
  padding: 0.29rem 0.5rem 0.13rem;
  font-size: 0.24rem;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ticket-share-wrapper .share-message .share-item {
  margin-bottom: 0.12rem;
  width: 49%;
}

.ticket-share-wrapper .share-btn {
  width: 100%;
  height: 0.8rem;
  border-radius: 0.16rem;
  box-shadow: 0 0.03rem 0.06rem #00000029;
  font-size: 0.24rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2rem;
}

.ticket-share-wrapper .share-btn svg {
  width: 0.46rem;
  height: 0.46rem;
  fill: #fff;
  margin-right: 0.24rem;
}

.ticket-share-wrapper .whatsapp-btn {
  margin-top: 0.3rem;
  background: transparent linear-gradient(178deg, #22d462, #29ce64 30%, #038937)
    0 0 no-repeat padding-box;
}

.ticket-share-wrapper .sms-btn {
  background: transparent linear-gradient(178deg, #62e1ff, #1fb1f2 30%, #0085b5)
    0 0 no-repeat padding-box;
}

.ticket-share-wrapper .facebook-btn {
  background: linear-gradient(180deg, #4496e3, #3581d0 30%, #1565c0);
}

.ticket-share-wrapper .telegram-btn {
  background: linear-gradient(180deg, #71d1ff, #039be5 30%, #0071a8);
}

.ticket-share-wrapper .twitter-btn {
  background: linear-gradient(180deg, #afafaf, #6a6a6a 30%, #3d3d3d);
}

.ticket-share-wrapper .desc-content {
  margin-top: 0.3rem;
  color: #ffb30b;
  font-size: 0.24rem;
  text-align: center;
}

.ticket-share-wrapper .share-modal-wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100032;
}

.ticket-share-wrapper .share-modal-wrapper:before {
  position: absolute;
  content: "";
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100031;
}

.ticket-share-wrapper .share-modal-wrapper .share-modal-content {
  position: relative;
  z-index: 100032;
  background: #fff;
  text-align: center;
  height: 100%;
  width: 5.8rem;
  border-radius: 0.14rem;
  padding-top: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.ticket-share-wrapper .share-modal-wrapper .share-modal-content .modal-title {
  font-size: 0.36rem;
  color: #000;
}

.ticket-share-wrapper .share-modal-wrapper .share-modal-content .modal-content {
  font-size: 0.3rem;
  color: #888;
  padding: 0 0.3rem;
}

.ticket-share-wrapper .share-modal-wrapper .share-modal-content .modal-btn {
  display: flex;
  border-top: 1px solid #ddd;
  width: 100%;
  font-weight: 700;
  font-size: 0.28rem;
  height: 1rem;
}

.ticket-share-wrapper
  .share-modal-wrapper
  .share-modal-content
  .modal-btn
  .cancel-btn {
  flex: 1 1 0%;
  width: 50%;
  color: #000;
  border-right: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ticket-share-wrapper
  .share-modal-wrapper
  .share-modal-content
  .modal-btn
  .go-btn {
  flex: 1 1 0%;
  color: #108ee9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ticket-list-item {
  width: 77%;
  border-radius: 0.13rem;
  display: flex;
  flex-direction: column;
  color: #fff;
}

.ticket-list-item.light .item-tag {
  background: #c60d0d 0 0 no-repeat padding-box;
}

.ticket-list-item.dark .item-tag {
  background: #1d336f 0 0 no-repeat padding-box;
}

.ticket-list-item.img-bg {
  background: none;
  position: relative;
}

.ticket-list-item.img-bg .item-top-wrap {
  background: none;
}

.ticket-list-item .img-bg-wrap {
  border-radius: 0.13rem;
  top: 0;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ticket-list-item .img-bg-wrap img {
  width: 100%;
  object-fit: cover;
}

.ticket-list-item .item-top-wrap {
  min-height: 1.34rem;
  width: 100%;
  padding-right: 0.5rem;
  border-radius: 0.13rem 0.13rem 0 0;
}

.ticket-list-item .item-top-wrap.one-row {
  border-radius: 0.13rem;
}

.ticket-list-item .item-top-wrap .item-tag-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.22rem;
}

.ticket-list-item .item-top-wrap .item-tag {
  position: relative;
  min-width: 1.8rem;
  height: 0.45rem;
  border-radius: 0.13rem 0 0.4rem 0;
  display: flex;
  align-items: center;
}

.ticket-list-item .item-top-wrap .item-tag:before {
  content: "";
  width: 0.8rem;
  height: 0.8rem;
  display: block;
  margin: -0.175rem 0 0 -0.24rem;
}

// .ticket-list-item .item-top-wrap .item-tag.RAFFLE:before {
//   background: url(../assets/reward-redpacket.8083938f.png) no-repeat 50% /
//     contain;
// }

// .ticket-list-item .item-top-wrap .item-tag.CASH_VOUCHER:before {
//   background: url(../assets/reward-cashbox.6edaa189.png) no-repeat 50% / contain;
// }

// .ticket-list-item .item-top-wrap .item-tag.GOLDEN_EGG:before {
//   background: url(../assets/reward-goldegg.be492491.png) no-repeat 50% / contain;
// }

// .ticket-list-item .item-top-wrap .item-tag.GIFT_CODE:before {
//   background: url(../assets/reward-giftbox.87d9cf98.png) no-repeat 50% / contain;
// }

// .ticket-list-item .item-top-wrap .item-tag.PRIZE_WHEEL:before {
//   background: url(../assets/reward-wheel.bd54bd8d.png) no-repeat 50% / contain;
// }

// .ticket-list-item .item-top-wrap .item-tag.FREE_SPIN:before {
//   background: url(../assets/free-spin.ccfd0583.png) no-repeat 50% / contain;
// }

.ticket-list-item .item-top-wrap .item-count .wysiwyg {
  display: flex;
  align-items: center;
  font-size: 0.22rem;
}

.ticket-list-item .item-top-wrap .item-count .wysiwyg .num {
  position: relative;
}

.ticket-list-item
  .item-top-wrap
  .item-count
  .wysiwyg
  .num:not(:last-child):after {
  content: ":";
  margin: 0 0.05rem;
}

.ticket-list-item .item-top-content {
  display: flex;
  align-items: center;
  margin: 0.11rem 0 0.22rem;
}

.ticket-list-item .item-top-content .item-name {
  flex: 1 1 0%;
  font-size: 0.3rem;
  font-weight: 700;
  padding-left: 0.4rem;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.5;
}

@supports (-webkit-line-clamp: 2) {
  .ticket-list-item .item-top-content .item-name {
    display: -webkit-box !important;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}

.ticket-list-item .item-top-content .item-claim {
  background: transparent linear-gradient(180deg, #ff5800, #ff3b00 30%, #e30000)
    0 0 no-repeat padding-box;
  box-shadow: 0 0.03rem 0.06rem #00000029;
  border-radius: 0.25rem;
  min-height: 0.5rem;
  width: 1.68rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  font-size: 0.24rem;
  padding: 0 0.15rem;
  text-align: center;
}

.ticket-list-item .item-top-content .item-claim.disabled {
  background: transparent linear-gradient(180deg, #818181, #716f6f 30%, #464444)
    0 0 no-repeat padding-box;
  color: #b2b2b2;
}

.ticket-list-item .item-bottom-wrap {
  width: 100%;
  background: #fff;
  border-radius: 0 0 0.13rem 0.13rem;
  min-height: 0.53rem;
  display: flex;
  flex-direction: column;
  position: relative;
}

.ticket-list-item .item-bottom-wrap:before {
  position: absolute;
  top: 0.19rem;
  right: 0.4rem;
  content: "";
  width: 0.26rem;
  height: 0.16rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQBAMAAAD6/3KbAAAAJ1BMVEUAAABfX19gYGBeXl5fX19eXl5eXl5dXV1gYGBgYGBeXl5gYGBfX19vXCzzAAAADHRSTlMA8DCgn4DgYEAgbxBXTiavAAAAZUlEQVQI10XJrQ2AUAxF4RsIAgn6CWAOBIMwAiMgGIERGAP7En5Mh+KmpelxJx+0qjkQjXLFlCIyBfGIQcSgxtAoD4no1KInOnUoDI2g6IQfZyXDG0nJMPNIhrz1IRkuL+oN3rl/z0g2MqBkCMkAAAAASUVORK5CYII=)
    no-repeat 50% / contain;
  transform: rotate(180deg);
}

.ticket-list-item .item-bottom-wrap.on:before {
  transform: rotate(0deg);
}

.ticket-list-item .item-bottom-wrap .bottom-header {
  position: relative;
  flex: 1 1 0%;
  display: flex;
  align-items: center;
  font-size: 0.24rem;
  color: #5f5f5f;
  padding: 0 0.76rem 0 0.4rem;
}

.ticket-list-item .condition-wrapper {
  position: relative;
  z-index: 1;
}

.ticket-list-item .condition-wrapper .arrow-wrapper {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ticket-list-item .condition-wrapper .ticket-condition-wrap {
  overflow-y: unset;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .ticket-condition-list {
  height: -webkit-max-content;
  height: max-content;
  max-height: -webkit-max-content;
  max-height: max-content;
  margin-top: 0.4rem;
  gap: initial;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item {
  background: transparent;
  color: #7c7c7c;
  font-size: 0.24rem;
  padding: 0.35rem 0;
  margin: 0 auto;
  width: 5.08rem;
  border-radius: 0;
  flex-direction: row;
  align-items: center;
  gap: 0.15rem;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item:not(:last-child) {
  border-bottom: 0.02rem solid #d3d3d3;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .item-top {
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .item-top
  .condition-title {
  flex: 1 1 0%;
  display: flex;
  align-items: center;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .item-top
  .progress-bar-wrapper {
  flex-direction: row;
  gap: 0.05rem;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .item-top
  .progress-bar-wrapper
  .progress-bar {
  flex: 1 1 0%;
  width: -webkit-max-content;
  width: max-content;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .item-top
  .item-data {
  flex: initial;
  font-size: 0.18rem;
  color: #404040;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .condition-button {
  color: #fff;
  position: relative;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .ticket-condition-list
  .ticket-condition-item
  .condition-button.done {
  border: 0.02rem solid #ff7c1c;
  background: transparent;
  color: #ff7c1c;
}

// .ticket-list-item
//   .condition-wrapper
//   .ticket-condition-wrap
//   .ticket-condition-list
//   .ticket-condition-item
//   .condition-button.done:before {
//   position: absolute;
//   content: "";
//   left: -0.1rem;
//   top: -0.17rem;
//   width: 0.32rem;
//   height: 0.32rem;
//   background: url(../assets/reward-completed.fe345450.png) no-repeat 50% /
//     contain;
// }

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .progress-bar-wrapper {
  margin-top: 0.1rem;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .progress-bar-wrapper
  .progress-bar
  .am-progress-outer {
  background: #404040 0 0 no-repeat padding-box;
  height: 0.12rem;
  padding: 0;
}

.ticket-list-item
  .condition-wrapper
  .ticket-condition-wrap
  .progress-bar-wrapper
  .progress-bar
  .am-progress-bar {
  background: #fab00c 0 0 no-repeat padding-box;
  border-radius: 0.23rem;
  height: 0.12rem;
}

.progress-wrapper {
  width: 100%;
}

.progress-wrapper .money-wrapper {
  height: 0.72rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  margin-bottom: 0.18rem;
}

.progress-wrapper .money-wrapper .money-current-item {
  position: relative;
  padding: 0 0.12rem 0 0.87rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  height: 100%;
  gap: 0.12rem;
}

.progress-wrapper .money-wrapper .money-current-item:before {
  position: absolute;
  content: "";
  width: 0.75rem;
  height: 0.72rem;
  left: 0;
  background: url(../assets/money.png) no-repeat 50% / contain;
}

.progress-wrapper .money-wrapper .money-item {
  font-size: 0.32rem;
  font-weight: 700;
  position: relative;
  padding-left: 0.24rem;
}

.progress-wrapper .money-wrapper .money-item:before {
  position: absolute;
  content: "/";
  left: 0;
}

.progress-wrapper .get-info {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.24rem;
  margin: 0.3rem 0 0.2rem;
}

.progress-wrapper .get-info .info-num {
  font-size: 0.3rem;
  color: #ffcf00;
  position: relative;
  padding: 0 0.14rem;
}

.progress-wrapper .get-info .info-num:before {
  position: absolute;
  content: "!!";
  right: -0.14rem;
  color: #fff;
  font-size: 0.24rem;
}

.modal-free-spin .am-modal-content {
  max-height: 90vh;
  max-height: calc(var(--vh, 1vh) * 90);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-free-spin .am-modal-header {
  padding: 0.03rem 0.51rem 0.3rem;
}

.modal-free-spin .am-modal-body {
  padding: 0 0.51rem;
  flex: 1 1 0%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-free-spin .am-modal-body img {
  max-width: 100%;
}

.modal-free-spin .modal-spin-info {
  flex: 1 1 0%;
  font-size: 0.24rem;
  color: #6e6e6e;
  overflow-y: auto;
}

.modal-free-spin .am-modal-button {
  border-top: none;
  width: -webkit-max-content;
  width: max-content;
  height: 0.64rem;
  padding: 0 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;
  background: #fd2f2f;
  font-size: 0.3rem;
  font-weight: 900;
  color: #fff;
  margin: 0 auto 0.33rem;
}

.progress-wrapper {
  width: 100%;
}

.progress-wrapper .money-wrapper {
  height: 0.72rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  margin-bottom: 0.18rem;
}

.progress-wrapper .money-wrapper .money-current-item {
  position: relative;
  padding: 0 0.12rem 0 0.87rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  display: flex;
  height: 100%;
  gap: 0.12rem;
}

.progress-wrapper .money-wrapper .money-current-item:before {
  position: absolute;
  content: "";
  width: 0.75rem;
  height: 0.72rem;
  left: 0;
  background: url(../assets/money.png) no-repeat 50% / contain;
}

.progress-wrapper .money-wrapper .money-item {
  font-size: 0.32rem;
  font-weight: 700;
  position: relative;
  padding-left: 0.24rem;
}

.progress-wrapper .money-wrapper .money-item:before {
  position: absolute;
  content: "/";
  left: 0;
}

.progress-wrapper .get-info {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.24rem;
  margin: 0.3rem 0 0.2rem;
}

.progress-wrapper .get-info .info-num {
  font-size: 0.3rem;
  color: #ffcf00;
  position: relative;
  padding: 0 0.14rem;
}

.progress-wrapper .get-info .info-num:before {
  position: absolute;
  content: "!!";
  right: -0.14rem;
  color: #fff;
  font-size: 0.24rem;
}

@keyframes lightRotate {
  0% {
    scale: 0.6;
    transform: rotate(0deg);
  }

  to {
    scale: 1;
    transform: rotate(1turn);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}

@keyframes open {
  0% {
    scale: 0;
  }

  to {
    scale: 1;
  }
}

.ticket-game-wrap {
  width: 100%;
}

.ticket-game-wrap .gold-egg-wrapper {
  width: 100%;
  margin: 0.32rem 0 0;
}

.ticket-game-wrap .gold-egg-wrapper .getEgg_container {
  width: 100%;
  text-align: center;
}

.ticket-game-wrap
  .gold-egg-wrapper
  .getEgg_container
  .ticket_message.messageOpen {
  transform: translate(-50%, -50%) scale(0.8);
}

.ticket-game-wrap
  .gold-egg-wrapper
  .getEgg_container
  .ticket_message.messageOpen
  .lossMessage {
  color: #332b28 !important;
}

.ticket-game-wrap .gold-egg-wrapper .gold_egg_root .claim-btn {
  margin: 0.3rem auto 0;
}

.ticket-game-wrap .gold-egg-wrapper .message_mask.messageOpen {
  top: 0;
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

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .start_wheel {
  width: 0.9rem;
  height: 1.22rem;
  bottom: 2.8rem;
  left: 3.05rem;
}

.prize_wheel_root .wheel_bg .start_wheel {
  content: "";
  position: absolute;
  background-image: url(../assets/goBtn.png);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 100;
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
  animation: spinWheel 5s infinite linear;
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

.ticket-game-wrap
  .prize-wheel-wrapper
  .prize_wheel_root
  .wheel_bg
  .start_wheel {
  width: 0.9rem;
  height: 1.22rem;
  bottom: 2.8rem;
  left: 3.05rem;
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

// 添加新的样式
.start_wheel {
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;

    &:hover {
      transform: none;
    }
  }
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

// 添加转盘旋转动画
@keyframes spinWheel {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.wheel_content {
  ul {
    transition: transform 3s cubic-bezier(0.25, 0.1, 0.25, 1);
  }
}
</style>
