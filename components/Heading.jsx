import React from 'react'
import PropTypes from 'prop-types'
import styles from 'styles/components/heading.module.scss'


heading.propTypes = {
  txt: PropTypes.string,
  sub: PropTypes.string,
  icon: PropTypes.string,
}

function heading(props) {
  return (
    <div className={styles.wrap} data-icon={props.icon}>
      <h1>
        <span>{props.txt}</span>
        <span className={styles.sub}>{props.sub}</span>
      </h1>
    </div>
  )
}

export default heading