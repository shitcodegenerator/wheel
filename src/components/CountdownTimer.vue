<template>
  <div>
    <div class="title-wrap">幸运大转盘</div>
    <div class="ticket-time">
      <div class="time-top">
        <!-- <TimeTick /> -->
        <div class="title-text">剩余时间</div>
      </div>
      <div class="time-bottom">
        <div class="days">
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
  </div>
</template>
<script>
export default {
  props: {
    timeLeft: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.title-wrap {
  font-size: 0.28rem;
  font-weight: 700;
  color: #fff;
  padding: 0.1rem 0.85rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  -webkit-text-stroke: 0.5px #ffb30b;
  -webkit-text-fill-color: #fff;
}

.ticket-time {
  margin-top: 0.18rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  color: #fff;

  .time-top {
    height: 0.6rem;
    display: flex;
    align-items: center;
    font-size: 0.22rem;
    margin-right: 0.2rem;

    svg {
      width: 0.37rem;
      height: 0.41rem;
      margin-right: 0.22rem;
      fill: #ffb30b;
    }
  }

  .time-bottom {
    display: flex;
    align-items: center;

    .days {
      display: flex;
      align-items: center;
    }

    .time-item {
      display: flex;
      flex-direction: column;
      position: relative;
      margin-right: 0.21rem;

      &:before {
        position: absolute;
        content: ":";
        color: #cecece;
        font-size: 0.38rem;
        font-weight: 700;
        right: -0.15rem;
      }

      &.day:before,
      &:last-child:before {
        display: none;
      }

      .num {
        width: 0.7rem;
        height: 0.6rem;
        background: #262626;
        border: 0.02rem solid #707070;
        border-radius: 0.08rem;
        font-size: 0.38rem;
        font-weight: 700;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .title {
        color: #a2a2a2;
        font-size: 0.16rem;
        line-height: 0.22rem;
        font-weight: 700;
        text-align: center;
      }
    }
  }
}
</style>
