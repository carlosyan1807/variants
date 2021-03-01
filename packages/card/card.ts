import { defineComponent, h } from 'vue'
import type { VNode } from 'vue'
import { useVariant, initProps } from '../utils/variant'
import type { ICardSettings } from '../types/variant'

export default defineComponent({
  name: 'Card',
  props: {
    ...initProps<ICardSettings>('Card'),
    header: {
      type: String,
      default: undefined,
    },
    footer: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const classes = useVariant<ICardSettings>()
    const { header, footer, body, wrapper } = classes

    const children = () => {
      const result: VNode[] = []

      const slotHeader = !!slots.header
        ? slots.header()
        : props.header !== undefined
        ? props.header
        : undefined
      if (slotHeader !== undefined)
        result.push(
          h('div', { ref: 'header', class: header.value }, slotHeader)
        )

      result.push(
        h(
          'div',
          { ref: 'body', class: body.value },
          slots.default ? slots.default() : ''
        )
      )

      const slotFooter = !!slots.footer
        ? slots.footer()
        : props.footer !== undefined
        ? props.footer
        : undefined
      if (slotFooter !== undefined) {
        result.push(
          h('div', { ref: 'footer', class: footer.value }, slotFooter)
        )
      }

      return result
    }

    return () => h('div', { class: wrapper.value }, [...children()])
  },
})
