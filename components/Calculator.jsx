import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { calcResult } from '../store/Action'

import styles from '../styles/components/calculator.module.scss'

// ボタン単体
Button.propTypes = {
  value: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func
}
function Button(props) {
  return (
    <button
      className={styles.btn}
      value={props.value}
      data-active={props.active}
      onClick={() => props.onClick()}
    >
      {props.value}
    </button >
  )
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputNum: this.props.result ? String(this.props.result) : '',
      calcFlag: false,
      add: false,
      subtract: false,
      multiply: false,
      divide: false,
      equal: false,
      inputArr: []
    }
  }

  render() {
    console.log('🐣 Calculator')
    return (
      <div className={styles.calculator}>
        <ul className={styles.grid}>
          <li>
            <Button value="7" onClick={() => this.handleClick('7')} />
          </li>
          <li>
            <Button value="8" onClick={() => this.handleClick('8')} />
          </li>
          <li>
            <Button value="9" onClick={() => this.handleClick('9')} />
          </li>
          <li>
            <Button
              value="÷"
              onClick={() => this.handleClick('divide')}
              active={this.state.divide} />
          </li>
          <li>
            <Button value="4" onClick={() => this.handleClick('4')} />
          </li>
          <li>
            <Button value="5" onClick={() => this.handleClick('5')} />
          </li>
          <li>
            <Button value="6" onClick={() => this.handleClick('6')} />
          </li>
          <li>
            <Button
              value="×"
              onClick={() => this.handleClick('multiply')}
              active={this.state.multiply} />
          </li>
          <li>
            <Button value="1" onClick={() => this.handleClick('1')} />
          </li>
          <li>
            <Button value="2" onClick={() => this.handleClick('2')} />
          </li>
          <li>
            <Button value="3" onClick={() => this.handleClick('3')} />
          </li>
          <li>
            <Button
              value="-"
              onClick={() => this.handleClick('subtract')}
              active={this.state.subtract} />
          </li>
          <li>
            <Button value="00" onClick={() => this.handleClick('00')} />
          </li>
          <li>
            <Button value="0" onClick={() => this.handleClick('0')} />
          </li>
          <li>
            <Button value="." onClick={() => this.handleClick('.')} />
          </li>
          <li>
            <Button
              value="+"
              onClick={() => this.handleClick('add')}
              active={this.state.add} />
          </li>
          <li className={styles.item_equal}>
            <Button value="=" onClick={() => this.handleClick('equal')} />
          </li>
          <li className={styles.item_del}>
            <Button value="del" onClick={() => this.handleClick('del')} />
          </li>
        </ul>
      </div>
    )
  }

  /*
  * ボタンクリック時の挙動
  * - 計算本体の処理を呼び出す
  */
  handleClick(value) {
    let inputNum = ''

    // 文字削除
    if (value === 'del') {
      inputNum = String(this.state.inputNum).slice(0, -1)
      this.setState({ inputNum: inputNum })
      this.props.calculate(inputNum)

      // 足し算
    } else if (value === 'add') {
      this.setState({
        add: true,
        subtract: false,
        multiply: false,
        divide: false,
        equal: false,
      })
      this.calculate('add')

      // ひき算
    } else if (value === 'subtract') {
      this.setState({
        add: false,
        subtract: true,
        multiply: false,
        divide: false,
        equal: false,
      })
      this.calculate('subtract')

      // かけ算
    } else if (value === 'multiply') {
      this.setState({
        add: false,
        subtract: false,
        multiply: true,
        divide: false,
        equal: false,
      })
      this.calculate('multiply')

      // わり算
    } else if (value === 'divide') {
      this.setState({
        add: false,
        subtract: false,
        multiply: false,
        divide: true,
        equal: false,
      })
      this.calculate('divide')

      // イコール
    } else if (value === 'equal') {
      this.setState({
        add: false,
        subtract: false,
        multiply: false,
        divide: false,
        equal: true,
      })
      this.calculate('equal')

      // 単純に数字ボタンの場合
      // 数字ボタンが連続で押下された場合桁が増えるので数字以外のボタンが押されるまで計算はできない
    } else {
      // 演算子が押されている場合、入力された値をクリアする
      if (this.state.calcFlag || this.state.equal) {
        inputNum = value
        this.setState({
          calcFlag: false,
          equal: false
        })
      } else {
        // 数字ボタンが連続で押下された場合
        inputNum = this.state.inputNum + value
        this.props.calculate(inputNum)
      }
      this.setState({ inputNum: inputNum })
      this.props.calculate(inputNum)
    }
  }

  /*
  * 計算処理
  */
  calculate(calcMark) {
    let result
    let tempArr = this.state.inputArr
    if (!this.state.calcFlag) {
      this.setState({ calcFlag: true })
      tempArr.push(Number(this.state.inputNum))
      console.log(tempArr)

      if (tempArr.length >= 3) {
        switch (tempArr[1]) {
        case 'add':
          result = tempArr[0] + tempArr[2]
          break
        case 'subtract':
          result = tempArr[0] - tempArr[2]
          break
        case 'multiply':
          result = tempArr[0] * tempArr[2]
          break
        case 'divide':
          result = tempArr[0] / tempArr[2]
          break
        default:
          break
        }

        this.setState({ inputNum: String(result) })
        this.props.calculate(result)

        if (calcMark === 'equal') {
          tempArr = []
          this.setState({ calcFlag: false })
          this.setState({ inputArr: tempArr })
        } else {
          tempArr.push(Number(result), calcMark)
          const tempArr2 = tempArr.slice(3)
          this.setState({ inputArr: tempArr2 })
        }

        this.clickButton(result)
      } else {
        if (calcMark !== 'equal') {
          tempArr.push(calcMark)
        }
      }
    } else {
      // 1 + + みたいに演算子を続けて押した場合初期化する
      if (typeof tempArr[tempArr.length - 1] !== 'number') {
        this.destory()
      } else {
        // = 以外の演算子を配列に追加
        if (calcMark !== 'equal') {
          tempArr.push(calcMark)
        }
      }
    }
    console.log(tempArr)
  }
  /*
  * 破棄
  */
  destory() {
    console.log('destory')
    this.setState({
      inputNum: '',
      calcFlag: false,
      add: false,
      subtract: false,
      multiply: false,
      divide: false,
      equal: false,
      inputArr: []
    })
  }

  clickButton(result) {
    return this.props.update(result)
  }
}

Calculator.propTypes = {
  update: PropTypes.func,
  result: PropTypes.number,
  calculate: PropTypes.func
}

function mapStateToProps(state) {
  return {
    result: state.data.result
  }
}

function mapDispatchToProps(dispatch) {
  return {
    calculate: (num) => dispatch(calcResult(num)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calculator)
// export default Calculator