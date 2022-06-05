export const setItem = (key, value) => {
  if (typeof value === 'object') {
    // 将对象转换为字符串
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    // 将json字符串转换为对象
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const removeItem = key => {
  window.localStorage.removeItem(key)
}
