import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/components/heading.module.scss'


heading.propTypes = {
  txt: PropTypes.string
}

function heading(props) {
  return (
    <div className={styles.wrap}>
      <h1>
        <span>{props.txt}</span>
      </h1>
    </div>
  )
}

export default heading