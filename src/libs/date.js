// 获取当前日期时间戳
// 返回格式：2021-05-19 10:38:40
export const curTimeStamp = () => {
  let date = new Date()
  return getTimeStamp(date)
}
// 获取当前日期
// 返回格式：2021-05-19
export const curDate = () => {
  let date = new Date()
  return getDate(date)
}

// getDate 获取日期
// date 为日期格式
export const getDate = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? '0'+month:month
  let day = date.getDate()
  day = day < 10 ? '0'+day: day
  return year+'-'+month+'-'+day
}
// getTimeStamp 获取日期时间戳
// date 为日期格式
export const getTimeStamp = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? '0'+month:month
  let day = date.getDate()
  day = day < 10 ? '0'+day: day
  let hour = date.getHours()
  hour = hour < 10 ? '0'+hour:hour
  let minutes = date.getMinutes()
  minutes = minutes < 10 ? '0'+minutes:minutes
  let seconds = date.getSeconds()
  seconds = seconds < 10 ? '0'+seconds:seconds
  return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds
}
