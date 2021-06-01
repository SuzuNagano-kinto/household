import React from 'react'
// import Router from 'next/router'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { changeCategory } from 'store/Action'
import { changeSubCategory } from 'store/Action'
import { removeClass } from "tool/removeClass"
import Accordion from "tool/Accordion"
import styles from 'styles/components/categoryList.module.scss'

/**-----------------------
* 各サブカテゴリーごとのリストを生成する
-----------------------*/
SubListItem.propTypes = {
  subCategory: PropTypes.object,
  clickEvent: PropTypes.func
}

function SubListItem(props) {
  const list = Object.keys(props.subCategory).map((key) => {
    return (
      <li
        key={'item-sub' + key}
        className={`${styles.item_sub}`}
      >
        <button
          className='c-btn'
          data-id={key}
          onClick={(e) => props.clickEvent(e)}>
          <span>{props.subCategory[key].ja}</span>
        </button>
      </li>
    )
  })
  return (
    <div className={`${styles.wrap_sub}`}>
      <ul className={`sub-category`}>{list}</ul>
    </div>
  )
}

/**-----------------------
* 各カテゴリーごとのリストを生成する
-----------------------*/
ListItem.propTypes = {
  category: PropTypes.object,
  clickCategory: PropTypes.func,
  clickSubCategory: PropTypes.func,
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
          onClick={(e) => props.clickCategory(e, props.category[key].sub)}>
          <span>{props.category[key].ja}</span>
        </button>
        {props.category[key].sub && <SubListItem subCategory={props.category[key].sub} clickEvent={props.clickCategory} />}
      </li >
    )
  })

  return (
    <ul className={`${styles.wrap} category`}>{list}</ul>
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

  categoryClickEvent(e, sub) {
    // サブカテゴリーだったら
    if (e.target.closest(".sub-category")) {
      removeClass(e.target, ".sub-category")
      e.target.classList.add('active')
      // storeに送信する
      this.props.changeCategory({
        id: this.props.categoryType,
        txt: this.props.categoryTxt,
        sub: {
          id: e.target.getAttribute("data-id"),
          txt: e.target.innerText,
        }
      })
    // 親カテゴリーだったら
    } else if (e.target.closest(".category")) {
      let acd
      if (sub) {
        acd = new Accordion(e.target.nextElementSibling)
      }

      if (e.target.classList.contains('active')) {
        e.target.classList.remove('active')
        if (sub) {
          acd.slideUp()
        }
      } else {
        removeClass(e.target, ".category")
        e.target.classList.add('active')
        if (sub) {
          acd.slideDown()
        }
        // storeに送信する
        this.props.changeCategory({
          id: e.target.getAttribute("data-id"),
          txt: e.target.innerText
        })
      }
    }
  }

  subCategoryClickEvent(e) {
    console.log("sub click")
    this.props.changeSubCategory({
      id: e.target.getAttribute("data-id"),
      txt: e.target.innerText
    })
  }

  render() {
    console.log('🐣 CategoryList')
    if (Object.keys(this.props.data).length < 1) return false

    // イベントが発火するのは別のコンポーネントなのでthisを固定しておく
    const bindCategoryClick = this.categoryClickEvent.bind(this)
    const bindSubCategoryClick = this.subCategoryClickEvent.bind(this)

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
          <ListItem
            category={cate}
            clickCategory={bindCategoryClick}
            clickSubCategory={bindSubCategoryClick} />
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
  changeSubCategory: PropTypes.func,
  payType: PropTypes.string,
  categoryType: PropTypes.string,
  categoryTxt: PropTypes.string,
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
    changeSubCategory: (obj) => dispatch(changeSubCategory(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)