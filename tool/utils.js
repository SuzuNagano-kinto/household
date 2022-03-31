/**-----------------------
* @param {target} 削除したいクラスがついている要素
* @param {parent} 削除したいクラスがついている要素の親要素
* ex: removeClass(e.target, ".category")
-----------------------*/
export function removeClass(target, parent) {
  const parentEl = target.closest(parent)
  const nowActive = parentEl.querySelectorAll(".active")
  if (nowActive.length > 0) {
    nowActive.forEach((item) => {
      item.classList.remove('active')
    })
  }
}
/**-----------------------
 * @dec カンマ区切り
 * @param {Number} number 数字
 * @returns {string}  ex. 1000 → 1,000
 * ex: getFormatNumber(1000)
-----------------------*/
export function getFormatNumber(number) {
  return String(number, 10).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}