import { createAction } from 'redux-act'

export const replacePath = createAction('跳转路由', (path: string) => path)
export const stopCountdown = createAction('停止倒计时')