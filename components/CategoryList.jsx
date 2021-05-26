import React from 'react'
import Router from 'next/router'
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
  const list = Object.keys(props.category).map((key) => {
    return (
      <li
        key={'item-' + key}
        className={`${styles.item}`}
      >
        <button
          className='c-btn'
          data-id={key}
          onClick={(e) => props.clickEvent(e,props.category[key].sub)}>
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

  handleClick(e,sub) {
    const _this = this
    console.log(sub)
    if(sub) {
      Router.push({
        pathname: '/account/category_sub',
        query: { category: e.target.getAttribute("data-id") }
      })
    }
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active')
    } else {
      e.target.classList.add('active')
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

    // イベントが発火するのは別のコンポーネントなのでthisを固定しておく
    const bindHandleClick = this.handleClick.bind(this)
    const listWrap = Object.keys(this.props.data).map((key) => {
      let cate = this.props.data[key]
      let temp = Object.entries(cate)
      // orderの順に並び替える
      // https://pisuke-code.com/js-sort-object-by-key-or-value/
      temp.sort((p1, p2) => {
        var p1Val = p1[1]['order'], p2Val = p2[1]['order']
        return p1Val - p2Val
      })
      cate = Object.fromEntries(temp)
      return (
        <div key={key} data-target={key} >
          <ListItem category={cate} clickEvent={bindHandleClick}/>
        </div>
      )
    })

    return (
      <div className={styles.cont} data-active={this.props.payType}>
        <div className={styles.cont_inr}>
          {listWrap}
        </div>
      </div>
    )
  }
}

CategoryList.propTypes = {
  data: PropTypes.object,
  changeCategory: PropTypes.func,
  payType: PropTypes.string
}

function mapStateToProps(state) {
  return {
    payType: state.inputData.pay.id,
    categoryType: state.inputData.category.id,
    categoryTxt: state.inputData.category.txt
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (obj) => dispatch(changeCategory(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)