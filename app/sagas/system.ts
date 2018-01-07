import { eventChannel, END } from 'redux-saga'
import { take, put, all, call, fork } from 'redux-saga/effects'
import { replace } from 'react-router-redux'
import { replacePath, stopCountdown } from '../actions/system'

function countdown(secs: number) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        secs -= 1
        if (secs > 0) {
          emitter(secs)
        } else {
          emitter(END)
        }
      }, 1000);
      return () => {
        clearInterval(iv)
      }
    }
  )
}

function* closeChannel(channel: any) {
  yield take(stopCountdown.getType())
  yield call(channel.close)
}

export function* watchCountdown() {
  const channel = yield call(countdown, 10)

  try {
    yield fork(closeChannel, channel)

    while (1) {
      let seconds = yield take(channel)
      console.log(`countdown: ${seconds}`)

      if (seconds === 5) {
        yield put(stopCountdown())
      }
    }

    console.log('end');
  } finally {
    console.log('countdown terminated')
  }
}

export function* replacePathTask() {
  while (1) {
    const { payload } = yield take(replacePath.getType())
    yield put(replace(payload))
  }
}

export default function* systemSagas() {
  yield all([ replacePathTask(), watchCountdown() ])
}
