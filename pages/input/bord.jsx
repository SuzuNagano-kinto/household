import React from 'react'
import Layout from '../../components/LayoutInput';
import Link from 'next/link';
import styles from '../../styles/page/input_bord.module.scss'


// connectとは、Reduxの「store」にReactがアクセスするための関数
import { connect } from 'react-redux'

class bord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('🐓 input bord page')
    return (
      <Layout>
        <p className={styles.result}>
          <span className={styles.result_unit}>¥</span>
          <span className={styles.result_num}>{this.props.result}</span>
        </p>

        <ul>
          <li className={styles.row }>
            <p>支出＞光熱費＞電気</p>
            <Link href="/input/category">
              <a className="c-btn--small">
                <span className="c-btn__inr">変更</span>
              </a>
            </Link>
          </li>

          <li className={styles.row}>
            <p>2021/4</p>
            <Link href="/input/bord">
              <a className="c-btn--small">
                <span className="c-btn__inr">変更</span>
              </a>
            </Link>
          </li>

          <li className={`${styles.row_col}`}>
            <p>メモ</p>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </li>
        </ul>

        <div className="c-btn__wrap--center">
          <Link href="/input/">
            <a className="c-btn">もどる</a>
          </Link>
          <Link href="/input/">
            <a className="c-btn">記録する</a>
          </Link>
        </div>
      </Layout>
    )
  }
}

// mapStateToPropsはでっかいstateの中から、対象のコンポーネントに合ったプロパティを生成する為のもの
function mapStateToProps(state) {
  return {
    num: state.num,
    result: state.result
  }
}

// export default bord;
export default connect(mapStateToProps)(bord);