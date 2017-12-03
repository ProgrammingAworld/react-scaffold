import { React, connect, createSelector } from '../../../common/Util'
import ReactComponentBase from '../../../base/ReactComponentBase'
import {Table, Column, Cell} from 'fixed-data-table-2'

class TableExampleView extends ReactComponentBase {
  constructor (props) {
    super(props)

    this.state = {
      schema: [
        {name: 'id', type: 'int'},
        {name: 'city', type: 'string'},
        {name: 'email', type: 'string'},
        {name: 'firstName', type: 'string'},
        {name: 'lastName', type: 'string'},
        {name: 'street', type: 'string'},
        {name: 'zipCode', type: 'string'},
        {name: 'date', type: 'string'},
        {name: 'bs', type: 'string'},
        {name: 'catchPhrase', type: 'string'},
        {name: 'companyName', type: 'string'},
        {name: 'words', type: 'string'},
        {name: 'sentence', type: 'string'}
      ],
      dataList: [],
      currentIndex: 0,
      tableWidth: 800
    }
  }

  componentDidMount () {
    let obj = {
      'id': 0,
      'city': 'Hilllbury',
      'email': 'Guiseppe58@yahoo.com',
      'firstName': 'Addison',
      'lastName': 'Hilpert',
      'street': 'Janick Spur',
      'zipCode': '46892',
      'date': '2017-04-20T16:09:44.383Z',
      'bs': 'extensible synergize platforms',
      'catchPhrase': 'Grass-roots radical initiative',
      'companyName': 'Stokes and Daughters',
      'words': ['libero', 'corrupti', 'hic'],
      'sentence': 'adipisci odit possimus reprehenderit inventore enim occaecati officia totam'
    }

    let dataList = []

    for (let i = 0; i < 100; i++) {
      let objNew = {...obj}
      for (let key in objNew) {
        objNew[key] = objNew[key] + i
      }

      dataList.push(objNew)
    }

    const tableWidth = document.querySelector('.tableSec').offsetWidth - 40
    this.setState({dataList, tableWidth})
  }

  render () {
    const {schema, dataList, currentIndex, tableWidth} = this.state

    return (
      <div className='tableSec'>
        <h3>基于：fixed-data-table-2</h3>
        <Table
          rowsCount={dataList.length}
          scrollToColumn={currentIndex}
          width={tableWidth}
          height={500}
          headerHeight={50}
          rowHeight={30}
        >
          <Column
            fixed
            width={70}
            align='center'
            header={<Cell />}
            cell={({...props}) => (
              <Cell>{props.rowIndex}</Cell>
            )}
          />
          {
            schema.map((item, itemIndex) => (
              <Column
                key={itemIndex}
                width={100}
                maxWidth={200}
                align='center'
                header={<Cell>{item.name}</Cell>}
                cell={({...props}) => (
                  <Cell {...props}>{dataList[props.rowIndex][item.name]}</Cell>
                )}
              />
            ))
          }
        </Table>
      </div>
    )
  }
}

const componentData = createSelector([], () => {
  return {}
})

export default connect(componentData)(TableExampleView)
