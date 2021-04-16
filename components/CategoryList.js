import React from 'react'
import PropTypes from "prop-types"

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
        <li key={'item-' + key} className={'category__item category__item--' + key}>
          <button className='c-btn--circle' onClick={(e) => this.handleClick(e)}>
            {categories[key].ja}
          </button>
        </li >
      )
    })

    return (
      <ul className="category__list" > {list}</ul>
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