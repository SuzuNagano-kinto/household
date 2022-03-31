import React from 'react'
import PropTypes from "prop-types"
import Heading from "components/Heading"
import Navi from "components/Navi"
import styles from 'styles/components/historyList.module.scss'
import getFirestore from "tool/getFirestore"
import { getFormatNumber } from "tool/utils"

HistoryCard.propTypes = {
  data: PropTypes.object,
}
function HistoryCard(props) {
  console.log(getFormatNumber(1000))
  return (
    <div className={styles.card}>
      <p>{props.data.date}</p>
      <p className={styles.card_price}>¥{getFormatNumber(props.data.result)}</p>
      <p>{props.data.category.txt}{(()=>{ if("sub" in props.data.category) return <span>&gt; {props.data.category.sub.txt}</span>})()}</p>
      {(()=>{ if(props.data.memo) return <p>&gt; {props.data.memo}</p>})()}
    </div>
  )
}


HistoryList.propTypes = {
  datas: PropTypes.array,
}
function HistoryList(props) {
  return (
    <ul>
      {props.datas.map((data,index,arr) => {
        if(index > 0 && data.date === arr[index-1].date) {
          return <li key={index}><HistoryCard data={data} /></li>
        }
        return <li key={index}><HistoryCard data={data} /></li>
      })}
    </ul>
  )
}

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allData: []
    }
    this.fs = new getFirestore()
  }
  componentDidMount() {
    this.getData()
  }

  render() {
    console.log('🐓 account page')

    return (
      <div>
        <Heading
          txt="家計簿"
          sub="- 履歴"
          icon="account" />
        <Navi page="account" />

        <div className="history">
          <HistoryList datas={this.state.allData} />
        </div>
      </div>
    )
  }

  getData() {
    this.logs = []
    let allData = []
    this.fs.init()
    const db = this.fs.getData()
    const logRef = db.collection("user").doc("log").collection('history')
    logRef.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          let data = doc.data()
          data.id = doc.id
          allData.push(data)

          if(this.logs.includes(doc.data().date)) {
            this.logs.push(doc.data().date)
          }
        })
      })
      .then(() => {
        this.formatArr(allData)
      })
  }

  // 日付順が新しい順に並び替え
  formatArr(allData) {
    allData.sort((a, b) => {
      let diff = new Date(a.date) - new Date(b.date)
      if (diff > 0) return -1
      if (diff < 0) return 1
      return 0
    })

    this.setState({ allData: allData })
    console.log(allData)
  }
}

export default History