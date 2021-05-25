import React from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { changeCategory } from 'store/Action'
import styles from 'styles/components/categoryList.module.scss'

/**-----------------------
* 各カテゴリーごとのリストを生成する
-----------------------*/
ListItem.propTypes = {
  category: PropTypes.object,
  clickEvent: PropTypes.func
}
function ListItem(props) {
  console.log(props.category)
  const list = Object.keys(props.category).map((key) => {
    return (
      <li
        key={'item-' + key}
        className={`${styles.item}`}
      >
        <button
          className='c-btn'
          data-id={key}
          onClick={(e) => props.clickEvent(e)}>
          {props.category[key].ja}
        </button>
      </li >
    )
  })

  return (
    <ul className={styles.wrap}>{list}</ul>
  )
}

class CategoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.data,
      acitve: false
    }
  }

  handleClick(e) {
    const _this = this
    if (e.target.classList.contains('is-active')) {
      e.target.classList.remove('is-active')
    } else {
      e.target.classList.add('is-active')
      // storeに送信する
      _this.props.changeCategory({
        id: e.target.getAttribute("data-id"),
        txt: e.target.innerText
      })
    }
  }

  render() {
    console.log('🐣 CategoryList')
    if (Object.keys(this.props.data).length < 1) return false
    console.log(this.props.data)

    // イベントが発火するのは別のコンポーネントなのでthisを固定しておく
    const bindHandleClick = this.handleClick.bind(this)
    const listWrap = Object.keys(this.props.data).map((key) => {
      const cate = this.props.data[key]
      return (
        <div key={key} id={key} >
          <p>{key}</p>
          <ListItem category={cate} clickEvent={bindHandleClick}/>
        </div>
      )
    })

    return (
      <div>{listWrap}</div>
    )
  }
}

CategoryList.propTypes = {
  data: PropTypes.object,
  changeCategory: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    categoryType: state.data.category.id,
    categoryTxt: state.data.category.txt
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (obj) => dispatch(changeCategory(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)