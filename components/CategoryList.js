import React from 'react';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.data.expense,
      acitve: false
    }
  }

  render() {
    console.log('🐣 CategoryList')
    if (Object.keys(this.props.data).length < 1) return false;
    const categories = this.props.data.expense;
    console.log(categories)

    let pos;
    const list = Object.keys(categories).map((key, index) => {
      return (
        <li key={'item-' + key} className={'category__item category__item--' + key}>
          <button className='c-btn--circle' onClick={(e) => this.handleClick(e)}>
            {categories[key].ja}
          </button>
          <SubCategoryList value={categories[key].sub} />
        </li >
      );
    });

    return (
      <ul className="category__list" > {list}</ul>
    );
  }

  handleClick(e) {
    if (e.target.classList.contains('is-active')) {
      e.target.classList.remove('is-active')
    } else {
      e.target.classList.add('is-active')
    }
  }
}

// 支出カテゴリの第二階層
function SubCategoryList(props) {
  console.log('🐣 SubCategoryList')
  let list, subCateLen;
  const subCate = props.value
  if (subCate !== undefined) {
    subCateLen = props.value.length
    list = subCate.map((value, index) => {
      return (
        <li key={index} className={'category__subList__item category__subList--' + index}>
          <button className="c-btn--circle">{value.subCt}</button>
        </li>
      )
    })
  }

  return (
    <ul className="category__subList" data-children={subCateLen} data-active={props.active}>
      {list}
    </ul>
  );
}
export default CategoryList;