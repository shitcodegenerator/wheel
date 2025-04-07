<!-- ProgressBar.vue -->
<template>
  <div class="progress-bar-wrapper">
    <div class="progress-bar">
      <div
        class="am-progress-outer"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="am-progress-bar"
          :style="{ width: `${progress}%` }"
        />
      </div>
      <div class="bar-num">
        {{ progress.toFixed(2) }} %
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    progress: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 100,
    },
  },
};
</script>

<style scoped lang="scss">
.progress-bar-wrapper {
  color: #fff;
  text-align: center;
  margin-top: 0.22rem;
  width: 100%;
  padding: 0 0.85rem;
}

.progress-bar {
  width: 100%;
  position: relative;
}

.am-progress-outer {
  background: #262626 0 0 no-repeat padding-box;
  border: 0.03rem solid #707070;
  border-radius: 0.23rem;
  height: 0.36rem;
  display: flex;
  align-items: center;
  padding: 0 0.12rem;
}

.am-progress-bar {
  background: transparent linear-gradient(180deg, #ffcf00, #ee7c0e) 0 0
    no-repeat padding-box;
  border-radius: 0.21rem;
  height: 0.2rem !important;
  border: 0;
  animation: progressAnimationStrike 2s;
}

.bar-num {
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

@keyframes progressAnimationStrike {
  0% {
    width: 0;
  }
  to {
    width: attr(aria-valuenow);
  }
}
</style>
