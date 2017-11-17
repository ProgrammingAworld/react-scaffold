const Mock = require('mockjs')
const Random = Mock.Random

const obj = Mock.mock({
  'star|5': '*',
  'str|1-5': '6',
  'age|1-90': 90,
  'weight|1-100.2-4': 100,
  'friends|1': [{name: 'tom'}, {name: 'jerry'}, {name: 'alex'}, {name: 'ok'}],
  'friends3|3': [{name: 'tom'}, {name: 'jerry'}, {name: 'alex'}, {name: 'ok'}],
  'friends2|1-3': [{name: 'tom'}, {name: 'jerry'}, {name: 'alex'}, {name: 'ok'}],
  'fn': function () {
    return 111
  },
  'other|1-5': {
    id: 12,
    name: 'tom',
    age: 22,
    h: 100,
    w: 175
  },
  'others|3': {
    id: 12,
    name: 'tom',
    age: 22,
    h: 100,
    w: 175
  }
})

console.log(obj)

module.exports = function () {
  let data = { users: [] }

  for (let i = 1; i <= 50; i++) {
    data.users.push(Mock.mock({
      'id|+1': i,
      first: '@FRISt',
      middle: '@MIDDLE',
      last: '@LAST',
      fullName: '@FRIST @MIDDLE @LAST',
      name: Random.cword(2, 4)
    }))
  }

  return data
}
