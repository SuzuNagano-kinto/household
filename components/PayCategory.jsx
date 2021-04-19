import React from 'react'
// import PropTypes from 'prop-types'
import styles from '../styles/components/payCategory.module.scss'


class PayCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeId: 'expense'
    }
  }
  handleClick(event, id) {
    console.log(event)

    if (this.state.activeId === id) {
      return false
    } else {
      let removeClassEl = document.getElementById(this.state.activeId)
      removeClassEl.classList.remove('active')
      this.setState({ activeId: id })
      event.target.classList.add('active')
    }
  }

  render() {
    console.log('🐣 PayCategory')

    return (
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <button
            className={`c-btn--small active`}
            id="expense"
            onClick={(event) => this.handleClick(event, 'expense')}
          >支出</button>
        </li>
        <li className={styles.list_item}>
          <button
            className="c-btn--small"
            id="income"
            onClick={(event) => this.handleClick(event, 'income')}
          >収入</button>
        </li>
        <li className={styles.list_item}>
          <button
            className="c-btn--small"
            id="forward"
            onClick={(event) => this.handleClick(event, 'forward')}
          >立替</button>
        </li>
      </ul>
    )
  }
}

// PayCategory.prototype {}

export default PayCategory