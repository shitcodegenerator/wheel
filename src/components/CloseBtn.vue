<template>
  <div
    class="close-btn"
    @click="close"
  >
    <svg class="am-icon am-icon-ticket-popup-close_7da51bf2 am-icon-md">
      <symbol
        id="ticket-popup-close_7da51bf2"
        viewBox="0 0 56 56"
      >
        <g transform="translate(-652 -52)">
          <g transform="translate(610)">
            >
            <g
              transform="translate(42 52)"
              fill="none"
              stroke="#fff"
              stroke-width="4"
            >
              <circle
                cx="28"
                cy="28"
                r="28"
                stroke="none"
              />
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
              />
            </g>
            <g transform="translate(-674.48 -54)">
              <g transform="translate(731.51 121.069)">
                <rect
                  width="4.585"
                  height="32.098"
                  rx="2.293"
                  transform="translate(22.697 0) rotate(45)"
                  fill="#fff"
                />
                <rect
                  width="4.585"
                  height="32.098"
                  rx="2.293"
                  transform="translate(25.939 22.697) rotate(135)"
                  fill="#fff"
                />
              </g>
            </g>
          </g>
        </g>
      </symbol>
      <use
        xlink:href="#ticket-popup-close_7da51bf2"
        __h2d_shadowroot="2905"
      />
    </svg>
  </div>
</template>
<script>
export default {
  name: "CloseBtn",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.close-btn {
  z-index: 999999;
  position: absolute;
  top: 0.52rem;
  right: 0.42rem;
  svg {
    width: 0.56rem;
    height: 0.56rem;
  }
}
</style>
