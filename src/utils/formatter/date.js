import dayjs from 'dayjs'

export const dateStandard = payload => {
  if (payload) {
    return dayjs(payload).format('YYYY-MM-DD')
  }
  return null
}
export const dateStandardTime = payload => {
  if (payload) {
    return dayjs(payload).format('YYYY-MM-DD HH:mm')
  }
  return null
}

export const dateStandardTimeFull = payload => {
  if (payload) {
    return dayjs(payload).format('YYYY-MM-DDTHH:mm:00')
  }
  return null
}

export const dateAge = payload => {
  if (payload) {
    const today = dayjs()
    const birthDay = dayjs(payload)
    let age = dayjs().get('year') - dayjs(payload).get('year')

    const todayMonth = today.get('month') + 1
    const birthMonth = birthDay.get('month') + 1

    if (
      birthMonth > todayMonth ||
      (birthMonth === todayMonth && birthDay.get('day') >= today.get('day'))
    ) {
      age--
    }

    return age
  }
  return null
}
