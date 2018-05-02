import classNames from 'classnames'
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
    Glyphicon,
    FormControl,
    Clearfix
} from 'react-bootstrap'
import { React, connect } from 'common/Util'
import ReactComponentBase from 'base/ReactComponentBase'
import dialog from 'dialog'

class BootstrapReactView extends ReactComponentBase {
    constructor(props) {
        super(props)

        this.state = {
            foldsec1: true,
            foldsec2: true,
            foldsec3: true
        }
    }

  changeFold = (foldIndex) => {
      this.setState((prevState) => {
          const oldFoldsecValue = prevState[`foldsec${foldIndex}`]
          return { [`foldsec${foldIndex}`]: !oldFoldsecValue }
      })
  }

  render() {
      const { foldsec1, foldsec2, foldsec3 } = this.state
      return (
          <div className="bootstrapsec">
              <h3 style={{ paddingLeft: '20px' }}>基于：react-bootstrap</h3>
              <div>
                  <fieldset>
                      <legend
                          role="presentation"
                          onClick={() => this.changeFold(1)}
                      >按钮<span className={classNames('caret', { fold: foldsec1 })} />
                      </legend>
                      <div className={classNames({ hide: foldsec1 })}>
                          <ButtonToolbar>
                              <Button>默认</Button>
                              <Button bsStyle="primary">primary</Button>
                              <Button bsStyle="success">success</Button>
                              <Button bsStyle="danger">danger</Button>
                              <Button bsStyle="info">info</Button>
                              <Button bsStyle="warning">warning</Button>
                              <Button bsStyle="link">link</Button>
                          </ButtonToolbar>
                          <br />
                          <ButtonToolbar>
                              <Button bsSize="lg" bsStyle="primary">大按钮</Button>
                              <Button bsStyle="primary">默认按钮</Button>
                              <Button bsSize="sm" bsStyle="primary">小按钮</Button>
                              <Button bsSize="xs" bsStyle="primary">最小按钮</Button>
                          </ButtonToolbar>
                          <br />
                          <div className="well">
                              <Button
                                  bsStyle="primary"
                                  bsSize="lg"
                                  block
                              >Block level button
                              </Button>
                              <Button bsSize="lg" block>Block level button</Button>
                          </div>
                          <ButtonToolbar>
                              <Button bsStyle="primary" active>primary button</Button>
                              <Button active>primary button</Button>
                              <Button bsStyle="primary" disabled>primary button</Button>
                              <Button disabled>primary button</Button>
                              <Button bsClass="mybtn">自定义样式按钮</Button>
                          </ButtonToolbar>
                          <br />
                          <ButtonToolbar>
                              <Button href="https://github.com/pvfhv">github链接</Button>
                              <Button type="reset" bsStyle="info">reset</Button>
                              <Button type="submit" bsStyle="primary">submit</Button>
                              <Button componentClass="div">指定用什么标签渲染</Button>
                              <LoadingButton />
                          </ButtonToolbar>
                          <br />
                          <ButtonToolbar>
                              <ButtonGroup bsSize="lg">
                                  <Button>&lt;&lt;</Button>
                                  <Button>1</Button>
                                  <Button>2</Button>
                                  <DropdownButton
                                      id="language"
                                      title="语言"
                                      bsSize="lg"
                                      bsStyle="info"
                                      defaultOpen
                                      onSelect={(eventKey, e) => console.log(eventKey, e)}
                                      onToggle={(isOpen, e, eventType) =>
                                          console.log(isOpen, e, eventType)
                                      }
                                      rootCloseEvent="click"
                                  >
                                      <MenuItem
                                          eventKey="1"
                                          href="#/cn"
                                          target="_blank"
                                      >中文
                                      </MenuItem>
                                      <MenuItem eventKey="2" title="en">英文</MenuItem>
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
                              <ButtonGroup bsSize="sm">
                                  <Button>&lt;&lt;</Button>
                                  <Button>1</Button>
                                  <Button>2</Button>
                                  <Button>3</Button>
                                  <Button>&gt;&gt;</Button>
                              </ButtonGroup>
                              <ButtonGroup bsSize="xs">
                                  <Button>&lt;&lt;</Button>
                                  <Button>1</Button>
                                  <Button>2</Button>
                                  <Button>3</Button>
                                  <Button>&gt;&gt;</Button>
                              </ButtonGroup>
                              <ButtonGroup vertical>
                                  <Button>a</Button>
                                  <Button>b</Button>
                                  <DropdownButton id="random" title="随机" bsStyle="success">
                                      <MenuItem eventKey="100">100</MenuItem>
                                      <MenuItem eventKey="200">200</MenuItem>
                                      <MenuItem divider />
                                      <MenuItem eventKey="300">300</MenuItem>
                                  </DropdownButton>
                              </ButtonGroup>
                              <br />
                              <ButtonGroup vertical block>
                                  <Button>全屏填充</Button>
                              </ButtonGroup>
                              <br />
                              <br />
                              <ButtonGroup justified>
                                  <Button href="#">中国</Button>
                                  <DropdownButton id="justified-bg2" title="没有下拉箭头的下拉菜单" noCaret>
                                      <MenuItem eventKey="美国">美国</MenuItem>
                                      <MenuItem eventKey="德国">德国</MenuItem>
                                  </DropdownButton>
                                  <Button href="#">朝鲜</Button>
                                  <DropdownButton id="justified-bg" title="国家">
                                      <MenuItem eventKey="美国">美国</MenuItem>
                                      <MenuItem eventKey="德国">德国</MenuItem>
                                  </DropdownButton>
                              </ButtonGroup>
                              <br />
                              <br />
                              <SplitButton id="split-button-1" title="歌曲" bsStyle="warning">
                                  <MenuItem eventKey="390">传奇</MenuItem>
                                  <MenuItem eventKey="490">眼泪</MenuItem>
                                  <MenuItem divider />
                                  <MenuItem eventKey="590">看海</MenuItem>
                              </SplitButton>
                              <SplitButton id="split-button-2" title="歌曲2" bsStyle="info" dropup>
                                  <MenuItem eventKey="390">传奇</MenuItem>
                                  <MenuItem eventKey="490">眼泪</MenuItem>
                                  <MenuItem divider />
                                  <MenuItem eventKey="590">看海</MenuItem>
                              </SplitButton>
                              <SplitButton
                                  id="split-button-2"
                                  title="歌曲3"
                                  bsStyle="success"
                                  dropup
                                  pullRight
                              >
                                  <MenuItem eventKey="390">传奇</MenuItem>
                                  <MenuItem eventKey="490">眼泪</MenuItem>
                                  <MenuItem divider />
                                  <MenuItem eventKey="590">看海</MenuItem>
                              </SplitButton>
                              <Dropdown id="dropdown-1">
                                  <Dropdown.Toggle>
                                      <Glyphicon glyph="star" />
                    窗外
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu className="super-colors">
                                      <MenuItem eventKey="1">李琛</MenuItem>
                                      <MenuItem eventKey="2">张学友</MenuItem>
                                      <MenuItem eventKey="3">童安格</MenuItem>
                                      <MenuItem divider />
                                      <MenuItem eventKey="4">王菲</MenuItem>
                                  </Dropdown.Menu>
                              </Dropdown>
                              <Dropdown id="dropdown-2">
                                  <Button bsStyle="info">混搭</Button>
                                  <Dropdown.Toggle bsStyle="success" />
                                  <Dropdown.Menu className="super-colors">
                                      <MenuItem eventKey="1">李琛</MenuItem>
                                      <MenuItem eventKey="2">张学友</MenuItem>
                                      <MenuItem eventKey="3">童安格</MenuItem>
                                      <MenuItem divider />
                                      <MenuItem eventKey="4">王菲</MenuItem>
                                  </Dropdown.Menu>
                              </Dropdown>
                              <MyDropdownList title="列表" />
                          </ButtonToolbar>
                      </div>
                  </fieldset>
                  <fieldset>
                      <legend
                          role="presentation"
                          onClick={() => this.changeFold(2)}
                      >checkbox / radio <span className={classNames('caret', { fold: foldsec2 })} />
                      </legend>
                      <div className={classNames({ hide: foldsec2 })}>
                          <ButtonToolbar>
                              <ToggleButtonGroup
                                  type="checkbox"
                                  defaultValue={[1, '3']}
                              >
                                  <ToggleButton value={1}>checkbox 1(checked)</ToggleButton>
                                  <ToggleButton value="2">checkbox 2</ToggleButton>
                                  <ToggleButton value="3">checkbox 3(checked)</ToggleButton>
                                  <ToggleButton
                                      value="4"
                                      disabled
                                  >checkbox 4(disabled)
                                  </ToggleButton>
                              </ToggleButtonGroup>
                          </ButtonToolbar>
                          <br />
                          <ButtonToolbar>
                              <CheckboxGroupButtons />
                          </ButtonToolbar>
                          <br />
                          <ButtonToolbar>
                              <ToggleButtonGroup type="radio" name="gender" defaultValue="male">
                                  <ToggleButton value="male">male</ToggleButton>
                                  <ToggleButton value="famale">famale</ToggleButton>
                                  <ToggleButton value="unknown">unknown</ToggleButton>
                              </ToggleButtonGroup>
                              <ToggleButton
                                  checked
                                  value="1"
                                  type="checkbox"
                                  onChange={(e) => { console.log(e.target.checked) }}
                              >1
                              </ToggleButton>
                              <ToggleButton
                                  value="2"
                                  type="radio"
                                  onChange={() => {}}
                              >2
                              </ToggleButton>
                          </ButtonToolbar>
                      </div>
                  </fieldset>
                  <fieldset>
                      <legend
                          role="presentation"
                          onClick={() => this.changeFold(3)}
                      >Menuitem <span className={classNames('caret', { fold: foldsec3 })} />
                      </legend>
                      <Clearfix className={classNames('foldsec3', { hide: foldsec3 })}>
                          <ul className="dropdown-menu open">
                              <MenuItem header>标题一</MenuItem>
                              <MenuItem>内容</MenuItem>
                              <MenuItem divider />
                              <MenuItem header>标题二</MenuItem>
                              <MenuItem>内容</MenuItem>
                              <MenuItem disabled>禁用内容</MenuItem>
                              <MenuItem
                                  title="我是一个title"
                                  eventKey={100}
                                  onSelect={ekey => dialog.alert(ekey)}
                              >带title且可以点击
                              </MenuItem>
                          </ul>
                      </Clearfix>
                  </fieldset>
              </div>
          </div>
      )
  }
}

// loading按钮
class LoadingButton extends ReactComponentBase {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false
        }
    }

  handleClick = () => {
      this.setState({ isLoading: true })

      setTimeout(() => {
          this.setState({ isLoading: false })
      }, 2000)
  }

  render() {
      const { isLoading } = this.state

      return (
          <Button
              bsStyle="primary"
              disabled={isLoading}
              onClick={isLoading ? null : this.handleClick}
          >{isLoading ? 'loading...' : 'loading state'}
          </Button>
      )
  }
}

// checkbox按钮组
class CheckboxGroupButtons extends ReactComponentBase{
    constructor(props){
        super(props)

        this.state = {
            value: ['reading', 'eating']
        }
    }

  valueChange = (value) => {
      console.log(value)
      this.setState({
          value
      })
  }

  render(){
      const { value } = this.state

      return (
          <ToggleButtonGroup
              type="checkbox"
              value={value}
              onChange={this.valueChange}
          >
              <ToggleButton value="reading">reading</ToggleButton>
              <ToggleButton value="game">game</ToggleButton>
              <ToggleButton value="eating">eating</ToggleButton>
              <ToggleButton value="run">run</ToggleButton>
          </ToggleButtonGroup>
      )
  }
}

// 自定义dropdownlist
class MyDropdownList extends ReactComponentBase{
    constructor(props){
        super(props)

        this.state = {
            id: `dropdown-title-${Date.now()}`,
            value: '',
            open: false
        }
    }

  valueChange = (e) => {
      this.setState({
          value: e.currentTarget.value
      })
  }

  toggleHandler = (isOpen, e, eventType) => {
      console.log(isOpen, e, eventType)

      this.setState({
          open: isOpen
      })
  }

  render(){
      const { title } = this.props
      const { id, value, open } = this.state

      return (
          <Dropdown
              id={id}
              rootCloseEvent="mousedown"
              open={open}
              onToggle={this.toggleHandler}
          >
              <CustomToggle bsRole="toggle">{title}</CustomToggle>
              <CustomMenu bsRole="menu" value={value} valueChange={this.valueChange}>
                  <MenuItem
                      eventKey="1"
                      onSelect={() => this.setState({ open: false })}
                  >ok
                  </MenuItem>
                  <MenuItem eventKey="2" active>error</MenuItem>
                  <MenuItem eventKey="3">warning</MenuItem>
                  <MenuItem eventKey="4">info</MenuItem>
              </CustomMenu>
          </Dropdown>
      )
  }
}

class CustomToggle extends ReactComponentBase{
  titleClick = (e) => {
      e.preventDefault()
      this.props.onClick(e)
  }

  render(){
      return (
          <button onClick={this.titleClick}>{this.props.children}</button>
      )
  }
}

class CustomMenu extends ReactComponentBase{
    render(){
        const { value, valueChange, children } = this.props;

        return (
            <div className="dropdown-menu" style={{ padding: '10px' }}>
                <FormControl
                    ref={(c) => { this.input = c }}
                    type="text"
                    placeholder="请输入文件名..."
                    value={value}
                    onChange={valueChange}
                />
                <ul className="list-unstyled">
                    {
                        React.Children.toArray(children).filter(child => (
                            value.trim() === null || child.props.children.includes(value)
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default connect()(BootstrapReactView)
