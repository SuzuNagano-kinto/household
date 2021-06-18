import React from 'react'
import PropTypes from 'prop-types'
import { gsap } from "gsap"
// CSS
import styles from "styles/components/modal.module.scss"

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: false
    }
  }
  // DOM にレンダーされた後に実行
  componentDidMount() {
    this.init()
  }

  init() {
    this.targetEl = document.getElementById(this.props.target)
    this.bodyEl = this.targetEl.children[0].children[0]
  }
  toggleModal() {
    console.log('🐣 toggleModal')
    if(this.targetEl.getAttribute("data-opne") === "true") {
      var closetl = gsap.timeline()
      closetl.to(this.bodyEl,{
        y:"100%",
        duration: 0.3,
      })
      closetl.to(this.targetEl,{
        display: "none",
        onComplete:()=>{
          this.setState({ flag: false })
        }
      })
    } else {
      var openTl = gsap.timeline()
      openTl.to(this.targetEl,{
        display: "block"
      })
      openTl.to(this.bodyEl,{
        y:"0%",
        duration: 0.3,
        onComplete:()=>{
          this.setState({ flag: true })
        }
      })
    }
  }
  render() {
    return (
      <div
        className={`${styles.wrap}`}
        id={this.props.target}
        data-opne={this.state.flag}>
        <div className={styles.cont}>
          <div className={styles.body}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
Modal.propTypes = {
  flag: PropTypes.bool,
  toggle: PropTypes.func,
  target: PropTypes.string,
  children: PropTypes.any
}
export default Modal