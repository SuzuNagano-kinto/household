import { gsap } from "gsap"
/**-----------------------
* @param {target} スライドで開閉する要素
* @param {option} option
-----------------------*/
class Accordion {
  constructor(target, option){
    this.target = target,
    this.childrenHeight = target.children[0].clientHeight
    if(option) {
      this.duration = option.duration
      this.ease = option.ease
    } else {
      this.duration = 0.5
      this.ease = "power1.out"
    }
  }

  slideUp(){
    gsap.to(this.target, {
      height: 0,
      overflow: "hidden",
      duration: this.duration,
      ease: this.ease,
    })
  }

  slideDown(){
    gsap.to(this.target, {
      height: this.childrenHeight,
      overflow: "visible",
      duration: this.duration,
      ease: this.ease,
    })
  }
}
export default Accordion