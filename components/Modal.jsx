import React from 'react'
import PropTypes from 'prop-types'
import CalendarItem from './CalendarItem'
// CSS
import styles from "styles/components/modal.module.scss"

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  toggleModal() {
    this.props.toggle()
  }
  render() {
    console.log('🐣 PayCategory')
    return (
      <div className={`${styles.wrap}`} data-modal="close" data-opne={this.props.flag}>
        <div className={styles.cont}>
          <div className={styles.body}>
            <CalendarItem />
            <div className={styles.footer}>
              <ul className="c-btn__wrap">
                <li>
                  <button
                    className="c-btn--small"
                    onClick={()=>{this.toggleModal()}}>決定</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Modal.propTypes = {
  flag: PropTypes.bool,
  toggle: PropTypes.func,
}
export default Modal