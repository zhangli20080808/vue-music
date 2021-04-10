/**
 * 自定义hook 初始化 better-scroll
 * options Api 和 composition Api
 *
 * 比较: 前者相对于结构是非常清晰的，数据是数据，逻辑是逻辑，对于逻辑比较少的组件，
 * 使用是非常清晰的，因为是一个描述性的结构
 *
 * composition 使用场景一般是逻辑非常复杂，或者逻辑可重用的 slider之所以也用这个方式
 * 是因为我们可以把和第三方交互的逻辑都从组件中剥离出去，非常方便，具体情况看，不要无脑用
 * @param wrapper 元素节点
 */
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)
// https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-api.html#%E4%BA%8B%E4%BB%B6
export default function useSlider (wrapperRef) {
  const slider = ref(null)
  const currentPageIndex = ref(0)
  onMounted(() => {
    const sliderVal = slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      // 2-仅仅当手指按在滚动区域上，一直派发 scroll 事件

      probeType: 2,
      slide: true
    })
    sliderVal.on('slideWillChange', (page) => {
      // 即将要切换的页面
      // console.log(page.pageX, page.pageY)
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value.destroy()
  })

  return {
    slider,
    currentPageIndex
  }
}
