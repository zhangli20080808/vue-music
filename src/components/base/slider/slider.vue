<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div
        class="slider-page"
        v-for="item in sliders"
        :key="item.id"
      >
        <a :href="item.link">
          <img :src="item.pic"/>
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{'active': currentPageIndex === index}">
      </span>
    </div>
  </div>
</template>

<script>
// better-scroll2 https://better-scroll.github.io/docs/zh-CN/guide/#betterscroll-%E5%9C%A8-mvvm-%E6%A1%86%E6%9E%B6%E7%9A%84%E5%BA%94%E7%94%A8
import { ref } from 'vue'
import useSlider from './use-slider'

export default {
  name: 'slider',
  props: {
    sliders: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    const rootRef = ref(null)
    const { currentPageIndex } = useSlider(rootRef) // 不能直接传入rootRef.value 因为不是响应式的
    return {
      rootRef,
      currentPageIndex
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  font-size: 0;
  // CSS属性 touch-action 用于设置触摸屏用户如何操纵元素的区域(例如，浏览器内置的缩放功能)。
  // https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action
  touch-action: pan-y;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      // CSS 属性 backface-visibility 指定当元素背面朝向观察者时是否可见。
      // https://developer.mozilla.org/zh-CN/docs/Web/CSS/backface-visibility
      backface-visibility: hidden;

      a {
        display: block;
        width: 100%;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots-wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    line-height: 12px;
    transform: translateX(-50%);

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
