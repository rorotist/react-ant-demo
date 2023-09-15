/**
 * 퍼센테이지(소숫점 이하 반올림) 변환 Method
 * 
 * @example
 *
 * transFormPercentage({
    value: e.target.value,
    percentage: 20
  })
 * @param {number} value 변환 대상 value
 * @param {number} percentage 적용 퍼센테이지
 */

const transFormPercentage = ({ value, percentage }) => {
  const transformValue = value - value * (percentage / 100)
  return Math.round(transformValue)
}

export default transFormPercentage
