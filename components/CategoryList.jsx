import React from 'react'
import PropTypes from "prop-types"
import styles from '../styles/components/categoryList.module.scss'

class CategoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.data.expense,
      acitve: false
    }
  }

  render() {
    console.log('🐣 CategoryList')
    if (Object.keys(this.props.data).length < 1) return false
    const categories = this.props.data.expense
    console.log(categories)

    const list = Object.keys(categories).map((key) => {
      return (
        <li key={'item-' + key} className={`${styles.item} categoryList_item_${key}`}>
          <button className='c-btn' onClick={(e) => this.handleClick(e)}>
            {categories[key].ja}
          </button>
        </li >
      )
    })

    return (
      <ul className={styles.wrap}> {list}</ul>
    )
  }

  handleClick(e) {
    if (e.target.classList.contains('is-active')) {
      e.target.classList.remove('is-active')
    } else {
      e.target.classList.add('is-active')
    }
  }
}

CategoryList.propTypes = {
  data: PropTypes.object
}

export default CategoryList