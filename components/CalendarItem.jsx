import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { changeDay } from 'store/Action'
import Calendar from 'react-calendar'
import styles from "styles/components/calendar.module.scss"

class CalendarItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }
  //
  tileClassName({ date, view }){
    if (view === 'month') {
      const targetMonth = date.getMonth() + 1
      if(targetMonth !== this.state.date.getMonth() + 1) {
        return "react-calendar__tile__not__current"
      }
    }
  }
  clickDay(value) {
    const date = {
      year: value.getFullYear(),
      month: value.getMonth() + 1,
      day: value.getDate()
    }
    // storeに送信する
    this.props.changeDay(date)
  }
  render() {
    return (
      <div>
        <Calendar
          locale="ja-JP"
          onChange={this.props.date}
          value={this.props.date}
          className={styles.wrap}
          tileClassName={this.tileClassName.bind(this)}
          onClickDay={(value)=>{this.clickDay(value)}}
        />
      </div>
    )
  }
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
    changeDay: (obj) => dispatch(changeDay(obj)),
  }
}
CalendarItem.propTypes = {
  date: PropTypes.string,
  changeDay: PropTypes.func,
}
// export default CalendarItem
export default connect(mapStateToProps, mapDispatchToProps)(CalendarItem)