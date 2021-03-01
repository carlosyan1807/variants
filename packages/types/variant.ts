export type ComponentName = 'Link' | 'Dialog' | 'Button' | 'Card'
export type TypeOfCSS = string | Array<string> | Record<string, string>
/**
 * Card 组件配置
 * @param wrapper 包裹器
 * @param header 头部
 * @param body 主体
 * @param footer 脚部
 */
export interface ICardSettings {
  wrapper: string
  header: string
  body: string
  footer: string
}
