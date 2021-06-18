import React from 'react'
import PropTypes from "prop-types"
import Link from "next/link"
import styles from 'styles/components/navi.module.scss'

ListItem.propTypes = {
  items: PropTypes.array
}
function ListItem(props) {
  const list = props.items.map((item, index) => {
    return (
      <li key={index}>
        <Link href={item.link}>
          <a
            className="">
            <span className="c-btn__inr">{item.txt}</span>
          </a>
        </Link>
      </li>
    )
  })

  return (
    <ul className={styles.list}>{list}</ul>
  )
}

Navi.propTypes = {
  page: PropTypes.string
}
function Navi(props) {
  let NaviItems = []
  if (props.page !== "account") {
    NaviItems = [
      {
        txt: "HOME",
        link: "/"
      },
      {
        txt: "家計簿",
        link: "/account/bord"
      },
      {
        txt: "買い物リスト",
        link: "/shopping"
      },
      {
        txt: "レシピ集",
        link: "/recipe"
      },
      {
        txt: "設定",
        link: "/setting"
      },
    ]
  } else {
    NaviItems = [
      {
        txt: "HOME",
        link: "/"
      },
      {
        txt: "記録",
        link: "/account/bord"
      },
      {
        txt: "分析",
        link: "/account/analize"
      },
      {
        txt: "履歴",
        link: "/account/log"
      },
      {
        txt: "設定",
        link: "/setting"
      },
    ]
  }

  return (
    <nav className={styles.wrap}>
      <ListItem items={NaviItems} />
    </nav>
  )
}

export default Navi