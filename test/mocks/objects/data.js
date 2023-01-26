const commit = jest.fn()
const rollback = jest.fn()

const transaction = jest.fn().mockImplementation(() => {
  return {
    commit,
    rollback
  }
})

const sequelize = {
  transaction
}

jest.mock('../../../app/data', () => {
  return {
    sequelize
  }
})

module.exports = {
  transaction
}
