<template>
  <div
    v-show="value"
    class="popup-mask"
    @click.self="closePopup"
  >
    <div class="prize-popup">
      <div class="prize-content">
        <h3 class="title">
          Congratulations!
        </h3>
        <p
          v-if="prize"
          class="prize-text"
        >
          You've won: {{ prize.prize_name }}
          <template v-if="prize.prize_amount">
            {{ prize.prize_amount }}元
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WinningPopup",
  props: {
    value: Boolean,
    prize: Object,
  },
  methods: {
    closePopup() {
      this.$emit("input", false);
    },
  },
};
</script>

<style scoped lang="scss">
.popup-mask {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999999;
}

.prize-popup {
  background: url("../assets/pize_bg.png") center/contain no-repeat;
  width: 280px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
}

.prize-content {
  position: absolute;
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  text-align: center;
}

.title {
  font-size: 0.5rem;
  font-weight: bold;
  color: #a62922;
}

.prize-text {
  font-size: 0.25rem;
  color: #a62922;
}
</style>
