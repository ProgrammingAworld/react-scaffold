import { React } from '../../common/Util'
import ReactComponentBase from '../../base/ReactComponentBase'
import {
  ButtonGroup,
  ButtonToolbar,
  Button,
  Dropdown,
  DropdownButton,
  SplitButton,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Glyphicon
} from 'react-bootstrap'

class BootstrapReactView extends ReactComponentBase {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='bootstrapsec'>
        <h3 style={{paddingLeft: '20px'}}>基于：react-bootstrap</h3>
        <div>
          <fieldset>
            <legend>按钮</legend>
            <ButtonToolbar>
              <Button>默认</Button>
              <Button bsStyle='primary'>primary</Button>
              <Button bsStyle='success'>success</Button>
              <Button bsStyle='danger'>danger</Button>
              <Button bsStyle='info'>info</Button>
              <Button bsStyle='warning'>warning</Button>
              <Button bsStyle='link'>link</Button>
            </ButtonToolbar>
            <br/>
            <ButtonToolbar>
              <Button bsSize='lg' bsStyle='primary'>大按钮</Button>
              <Button bsStyle='primary'>默认按钮</Button>
              <Button bsSize='sm' bsStyle='primary'>小按钮</Button>
              <Button bsSize='xs' bsStyle='primary'>最小按钮</Button>
            </ButtonToolbar>
            <br/>
            <div className='well'>
              <Button bsStyle='primary' bsSize='lg' block>Block level button</Button>
              <Button bsSize='lg' block>Block level button</Button>
            </div>
            <ButtonToolbar>
              <Button bsStyle='primary' active>primary button</Button>
              <Button active>primary button</Button>
              <Button bsStyle='primary' disabled>primary button</Button>
              <Button disabled>primary button</Button>
              <Button bsClass='mybtn'>自定义样式按钮</Button>
            </ButtonToolbar>
            <br/>
            <ButtonToolbar>
              <Button href='https://github.com/pvfhv'>github链接</Button>
              <Button type='reset' bsStyle='info'>reset</Button>
              <Button type='submit' bsStyle='primary'>submit</Button>
              <Button componentClass='div'>指定用什么标签渲染</Button>
              <LoadingButton/>
            </ButtonToolbar>
            <br/>
            <ButtonToolbar>
              <ButtonGroup bsSize='lg'>
                <Button>&lt;&lt;</Button>
                <Button>1</Button>
                <Button>2</Button>
                <DropdownButton id='language' title='语言' bsSize='lg' bsStyle='info'>
                  <MenuItem eventKey='1'>中文</MenuItem>
                  <MenuItem eventKey='2'>英文</MenuItem>
                </DropdownButton>
                <Button>&gt;&gt;</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button>&lt;&lt;</Button>
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>&gt;&gt;</Button>
              </ButtonGroup>
              <ButtonGroup bsSize='sm'>
                <Button>&lt;&lt;</Button>
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>&gt;&gt;</Button>
              </ButtonGroup>
              <ButtonGroup bsSize='xs'>
                <Button>&lt;&lt;</Button>
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>&gt;&gt;</Button>
              </ButtonGroup>
              <ButtonGroup vertical>
                <Button>a</Button>
                <Button>b</Button>
                <DropdownButton id='random' title='随机' bsStyle='success'>
                  <MenuItem eventKey='100'>100</MenuItem>
                  <MenuItem eventKey='200'>200</MenuItem>
                  <MenuItem divider/>
                  <MenuItem eventKey='300'>300</MenuItem>
                </DropdownButton>
              </ButtonGroup>
              <br />
              <ButtonGroup vertical block>
                <Button>全屏填充</Button>
              </ButtonGroup>
              <br />
              <br />
              <ButtonGroup justified>
                <Button href='#'>中国</Button>
                <DropdownButton id='justified-bg2' title='没有下拉箭头的下拉菜单' noCaret>
                  <MenuItem eventKey='美国'>美国</MenuItem>
                  <MenuItem eventKey='德国'>德国</MenuItem>
                </DropdownButton>
                <Button href='#'>朝鲜</Button>
                <DropdownButton id='justified-bg' title='国家'>
                  <MenuItem eventKey='美国'>美国</MenuItem>
                  <MenuItem eventKey='德国'>德国</MenuItem>
                </DropdownButton>
              </ButtonGroup>
              <br />
              <br />
              <SplitButton id='split-button-1' title='歌曲' bsStyle='warning'>
                <MenuItem eventKey='390'>传奇</MenuItem>
                <MenuItem eventKey='490'>眼泪</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey='590'>看海</MenuItem>
              </SplitButton>
              <SplitButton id='split-button-2' title='歌曲2' bsStyle='info' dropup>
                <MenuItem eventKey='390'>传奇</MenuItem>
                <MenuItem eventKey='490'>眼泪</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey='590'>看海</MenuItem>
              </SplitButton>
              <SplitButton id='split-button-2' title='歌曲3' bsStyle='success' dropup pullRight>
                <MenuItem eventKey='390'>传奇</MenuItem>
                <MenuItem eventKey='490'>眼泪</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey='590'>看海</MenuItem>
              </SplitButton>
              <Dropdown id='dropdown-1'>
                <Dropdown.Toggle>
                  <Glyphicon glyph='star'/>
                  窗外
                </Dropdown.Toggle>
                <Dropdown.Menu className='super-colors'>
                  <MenuItem eventKey='1'>李琛</MenuItem>
                  <MenuItem eventKey='2'>张学友</MenuItem>
                  <MenuItem eventKey='3'>童安格</MenuItem>
                  <MenuItem divider/>
                  <MenuItem eventKey='4'>王菲</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown id='dropdown-2'>
                <Button bsStyle='info'>混搭</Button>
                <Dropdown.Toggle bsStyle='success' />
                <Dropdown.Menu className='super-colors'>
                  <MenuItem eventKey='1'>李琛</MenuItem>
                  <MenuItem eventKey='2'>张学友</MenuItem>
                  <MenuItem eventKey='3'>童安格</MenuItem>
                  <MenuItem divider/>
                  <MenuItem eventKey='4'>王菲</MenuItem>
                </Dropdown.Menu>
              </Dropdown>
            </ButtonToolbar>
          </fieldset>
          <fieldset>
            <legend>checkbox / radio</legend>
            <div>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type='checkbox'
                  defaultValue={[1,'3']}>
                  <ToggleButton value={1}>checkbox 1(checked)</ToggleButton>
                  <ToggleButton value='2'>checkbox 2</ToggleButton>
                  <ToggleButton value='3'>checkbox 3(checked)</ToggleButton>
                  <ToggleButton value='4' disabled>checkbox 4(disabled)</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
              <br />
              <ButtonToolbar>
                <CheckboxGroupButtons />
              </ButtonToolbar>
              <br />
              <ButtonToolbar>
                <ToggleButtonGroup type='radio' name='gender' defaultValue='male'>
                  <ToggleButton value='male'>male</ToggleButton>
                  <ToggleButton value='famale'>famale</ToggleButton>
                  <ToggleButton value='unknown'>unknown</ToggleButton>
                </ToggleButtonGroup>
                <ToggleButton value='1' type='checkbox' checked onChange={(e)=>{ console.log(e.target.checked)}}>1</ToggleButton>
                <ToggleButton value='2' type='radio' onChange={()=>{}}>2</ToggleButton>
              </ButtonToolbar>
            </div>
          </fieldset>
        </div>
      </div>
    )
  }
}

// loading按钮
class LoadingButton extends ReactComponentBase {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  handleClick = e => {
    this.setState({isLoading: true})

    setTimeout(() => {
      this.setState({isLoading: false})
    }, 2000)
  }

  render () {
    let {isLoading} = this.state

    return (
      <Button
        bsStyle='primary'
        disabled={isLoading}
        onClick={isLoading ? null : this.handleClick}
      >{isLoading ? 'loading...' : 'loading state'}</Button>
    )
  }
}

// checkbox按钮组
class CheckboxGroupButtons extends ReactComponentBase{
  constructor (props){
    super(props)

    this.state = {
      value:['reading', 'eating']
    }
  }

  valueChange = value => {
    console.log(value)
    this.setState({
      value
    })
  }

  render(){
    let {value} = this.state

    return (
      <ToggleButtonGroup
        type='checkbox'
        value={value}
        onChange={this.valueChange}
      >
        <ToggleButton value='reading'>reading</ToggleButton>
        <ToggleButton value='game'>game</ToggleButton>
        <ToggleButton value='eating'>eating</ToggleButton>
        <ToggleButton value='run'>run</ToggleButton>
      </ToggleButtonGroup>
    )
  }
}

export default BootstrapReactView
