/**
 * Created by anchao on 16-11-22.
 */
import React from 'react'
/**
 * 分页组件
 * page={
 *      pageIndex: 1,
 *      pageSize: 30,
 *      total: 0,
 *      pageDisplayCount: 5,
 *      keywords: ""
 * }
 * pageIndex的变化方法
 * onPageIndexChange
 *
 */
export default class Pagination extends React.Component {
  constructor (props) {
    super(props)
  }

  shouldComponentUpdate (nextProps, nextState) {
    let pageIndex = this.props.page.pageIndex
    let pageIndexNew = nextProps.page.pageIndex

    let total = this.props.page.total
    let totalNew = nextProps.page.total

    return pageIndex != pageIndexNew || total != totalNew
  }

  prevPage () {
    let pageIndex = this.props.page.pageIndex
    let pageDisplayCount = this.props.page.pageDisplayCount
    pageIndex -= pageDisplayCount
    pageIndex = pageIndex < 1 ? 1 : Math.ceil(pageIndex / pageDisplayCount) * pageDisplayCount
    this.props.onPageIndexChange({pageIndex})
  }

  nextPage () {
    let pageIndex = this.props.page.pageIndex
    let pageDisplayCount = this.props.page.pageDisplayCount
    let pageTotal = this.getPageTotal()
    pageIndex += this.props.page.pageDisplayCount
    pageIndex = pageIndex > pageTotal ? pageTotal : Math.ceil(pageIndex / pageDisplayCount - 1) * pageDisplayCount + 1
    this.props.onPageIndexChange({pageIndex})
  }

  getPageTotal () {
    let total = this.props.page.total
    total = total == 0 ? 1 : total
    return Math.ceil(total / this.props.page.pageSize)
  }

  curPageChange (pageIndex) {
    return e => {
      this.props.onPageIndexChange({pageIndex})
    }
  }

  render () {
    let page = this.props.page
    let pageIndex = page.pageIndex
    let pageDisplayCount = page.pageDisplayCount
    let pageTotal = this.getPageTotal()
    let aLis = []
    let liRender = (startPage, endPage) => {
      for (var i = startPage; i <= endPage; i++) {
        let key = 'li_' + i
                // 追加上一组标志
        if (i == startPage) {
          if (i <= pageDisplayCount) {
            aLis.push(<li className='disabled' key='first'><a href='javascript:;' aria-label='Previous'>
              <i className='fa fa-chevron-left' />
            </a></li>)
          } else {
            aLis.push(<li onClick={e => this.prevPage()} key='first'><a
              href='javascript:;'><i className='fa fa-chevron-left' /></a></li>)
          }
        }

                // 追加正常页码
        if (pageIndex == i) {
          aLis.push(<li className='active' key={key}><span>{i}</span></li>)
        } else {
          aLis.push(<li onClick={this.curPageChange(i)} key={key}><a href='javascript:;'>{i}</a></li>)
        }

                // 追加下一页标志
        if (i == endPage) {
          if (endPage == pageTotal) {
            aLis.push(<li className='disabled' key='last'><a href='javascript:;' aria-label='Next'>
              <i className='fa fa-chevron-right' />
            </a></li>)
          } else {
            aLis.push(<li onClick={e => this.nextPage()} key='last'><a
              href='javascript:;'><i className='fa fa-chevron-right' /></a></li>)
          }
        }
      }
    }

    if (pageTotal <= pageDisplayCount) {
      liRender(1, pageTotal)
    } else {
      let startPage = Math.ceil(pageIndex / pageDisplayCount) * pageDisplayCount - pageDisplayCount + 1
      var endPage = startPage + pageDisplayCount - 1
      endPage = endPage < pageTotal ? endPage : pageTotal
      liRender(startPage, endPage)
    }

    return (
      <nav>
        <ul className='pagination pagination-sm'>
          {aLis}
        </ul>
      </nav>
    )
  }
}
