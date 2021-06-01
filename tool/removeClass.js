/**-----------------------
* @param {target} 削除したいクラスがついている要素
* @param {parent} 削除したいクラスがついている要素の親要素
* ex: removeClass(e.target, ".category")
-----------------------*/
function removeClass(target, parent) {
  const parentEl = target.closest(parent)
  const nowActive = parentEl.querySelectorAll(".active")
  if (nowActive.length > 0) {
    nowActive.forEach((item) => {
      item.classList.remove('active')
    })
  }
}

export { removeClass }