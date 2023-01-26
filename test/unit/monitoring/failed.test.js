const { transaction } = require('../../mocks/objects/data')

jest.mock('../../../app/monitoring/get-statement-by-statement-id')
const getStatementByStatementId = require('../../../app/monitoring/get-statement-by-statement-id')

jest.mock('../../../app/messaging/send-crm-message')
const sendCrmMessage = require('../../../app/messaging/send-crm-message')

jest.mock('../../../app/monitoring/complete-delivery')
const completeDelivery = require('../../../app/monitoring/complete-delivery')

jest.mock('../../../app/monitoring/create-failure')
const createFailure = require('../../../app/monitoring/create-failure')

const failed = require('../../../app/monitoring/failed')

const { mockStatement1: statement } = require('../../mocks/statement')
const { mockDelivery1: delivery } = require('../../mocks/delivery')
const { INVALID, REJECTED } = require('../../../app/constants/failure-reasons')

let reason

describe('Notify failed to deliver', () => {
  beforeEach(() => {
    reason = INVALID

    getStatementByStatementId.mockResolvedValue(statement)
    sendCrmMessage.mockResolvedValue(undefined)
    completeDelivery.mockResolvedValue(undefined)
    createFailure.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When reason is INVALID', () => {
    beforeEach(() => {
      reason = INVALID
    })

    test('should call getStatementByStatementId', async () => {
      await failed(delivery, reason)
      expect(getStatementByStatementId).toHaveBeenCalled()
    })

    test('should call getStatementByStatementId once', async () => {
      await failed(delivery, reason)
      expect(getStatementByStatementId).toHaveBeenCalledTimes(1)
    })

    test('should call getStatementByStatementId with delivery.statementId', async () => {
      await failed(delivery, reason)
      expect(getStatementByStatementId).toHaveBeenCalledWith(delivery.statementId)
    })

    test('should call sendCrmMessage', async () => {
      await failed(delivery, reason)
      expect(sendCrmMessage).toHaveBeenCalled()
    })

    test('should call sendCrmMessage once', async () => {
      await failed(delivery, reason)
      expect(sendCrmMessage).toHaveBeenCalledTimes(1)
    })

    test('should call sendCrmMessage with statement.email, statement.frn and reason', async () => {
      const statement = await getStatementByStatementId()
      await failed(delivery, reason)
      expect(sendCrmMessage).toHaveBeenCalledWith(statement.email, statement.frn, reason)
    })

    test('should call completeDelivery', async () => {
      await failed(delivery, reason)
      expect(completeDelivery).toHaveBeenCalled()
    })

    test('should call completeDelivery once', async () => {
      await failed(delivery, reason)
      expect(completeDelivery).toHaveBeenCalledTimes(1)
    })

    test('should call completeDelivery with delivery.deliveryId', async () => {
      await failed(delivery, reason)
      expect(completeDelivery).toHaveBeenCalledWith(delivery.deliveryId)
    })

    test('should call createFailure', async () => {
      await failed(delivery, reason)
      expect(createFailure).toHaveBeenCalled()
    })

    test('should call createFailure once', async () => {
      await failed(delivery, reason)
      expect(createFailure).toHaveBeenCalledTimes(1)
    })

    test('should call createFailure with delivery.deliveryId, INVALID and transaction()', async () => {
      await failed(delivery, reason)
      expect(createFailure).toHaveBeenCalledWith(delivery.deliveryId, INVALID, transaction())
    })

    test('should call transaction().commit', async () => {
      await failed(delivery, reason)
      expect(transaction().commit).toHaveBeenCalled()
    })

    test('should call transaction().commit once', async () => {
      await failed(delivery, reason)
      expect(transaction().commit).toHaveBeenCalledTimes(1)
    })

    test('should not call transaction().rollback', async () => {
      await failed(delivery, reason)
      expect(transaction().rollback).not.toHaveBeenCalled()
    })

    test('should not throw', async () => {
      const wrapper = async () => { await failed(delivery, reason) }
      expect(wrapper).not.toThrow()
    })

    test('should return undefined', async () => {
      const result = await failed(delivery, reason)
      expect(result).toBeUndefined()
    })
  })

  describe('When reason is REJECTED', () => {
    beforeEach(() => {
      reason = REJECTED
    })

    test('should call getStatementByStatementId', async () => {
      await failed(delivery, reason)
      expect(getStatementByStatementId).toHaveBeenCalled()
    })

    test('should call getStatementByStatementId once', async () => {
      await failed(delivery, reason)
      expect(getStatementByStatementId).toHaveBeenCalledTimes(1)
    })

    test('should call getStatementByStatementId with delivery.statementId', async () => {
      await failed(delivery, reason)
      expect(getStatementByStatementId).toHaveBeenCalledWith(delivery.statementId)
    })

    test('should call sendCrmMessage', async () => {
      await failed(delivery, reason)
      expect(sendCrmMessage).toHaveBeenCalled()
    })

    test('should call sendCrmMessage once', async () => {
      await failed(delivery, reason)
      expect(sendCrmMessage).toHaveBeenCalledTimes(1)
    })

    test('should call sendCrmMessage with statement.email, statement.frn and reason', async () => {
      const statement = await getStatementByStatementId()
      await failed(delivery, reason)
      expect(sendCrmMessage).toHaveBeenCalledWith(statement.email, statement.frn, reason)
    })

    test('should call completeDelivery', async () => {
      await failed(delivery, reason)
      expect(completeDelivery).toHaveBeenCalled()
    })

    test('should call completeDelivery once', async () => {
      await failed(delivery, reason)
      expect(completeDelivery).toHaveBeenCalledTimes(1)
    })

    test('should call completeDelivery with delivery.deliveryId', async () => {
      await failed(delivery, reason)
      expect(completeDelivery).toHaveBeenCalledWith(delivery.deliveryId)
    })

    test('should call createFailure', async () => {
      await failed(delivery, reason)
      expect(createFailure).toHaveBeenCalled()
    })

    test('should call createFailure once', async () => {
      await failed(delivery, reason)
      expect(createFailure).toHaveBeenCalledTimes(1)
    })

    test('should call createFailure with delivery.deliveryId, REJECTED and transaction', async () => {
      await failed(delivery, reason)
      expect(createFailure).toHaveBeenCalledWith(delivery.deliveryId, REJECTED, transaction())
    })

    test('should call transaction().commit', async () => {
      await failed(delivery, reason)
      expect(transaction().commit).toHaveBeenCalled()
    })

    test('should call transaction().commit once', async () => {
      await failed(delivery, reason)
      expect(transaction().commit).toHaveBeenCalledTimes(1)
    })

    test('should not call transaction().rollback', async () => {
      await failed(delivery, reason)
      expect(transaction().rollback).not.toHaveBeenCalled()
    })

    test('should not throw', async () => {
      const wrapper = async () => { await failed(delivery, reason) }
      expect(wrapper).not.toThrow()
    })

    test('should return undefined', async () => {
      const result = await failed(delivery, reason)
      expect(result).toBeUndefined()
    })
  })

  describe('When getStatementByStatementId throws', () => {
    beforeEach(() => {
      getStatementByStatementId.mockRejectedValue(new Error('Issue retreiving statement'))
    })

    test('should call transaction().rollback', async () => {
      try { await failed(delivery, reason) } catch {}
      expect(transaction().rollback).toHaveBeenCalled()
    })

    test('should call transaction().rollback once', async () => {
      try { await failed(delivery, reason) } catch {}
      expect(transaction().rollback).toHaveBeenCalledTimes(1)
    })

    test('should throw', async () => {
      const wrapper = async () => { await failed(delivery, reason) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error', async () => {
      const wrapper = async () => { await failed(delivery, reason) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "Issue retreiving statement"', async () => {
      const wrapper = async () => { await failed(delivery, reason) }
      expect(wrapper).rejects.toThrow(/^Issue retreiving statement$/)
    })

    test('should not call sendCrmMessage', async () => {
      try { await failed(delivery, reason) } catch {}
      expect(sendCrmMessage).not.toHaveBeenCalled()
    })

    test('should not call completeDelivery', async () => {
      try { await failed(delivery, reason) } catch {}
      expect(completeDelivery).not.toHaveBeenCalled()
    })

    test('should not call createFailure', async () => {
      try { await failed(delivery, reason) } catch {}
      expect(createFailure).not.toHaveBeenCalled()
    })

    test('should not call transaction().commit', async () => {
      try { await failed(delivery, reason) } catch {}
      expect(transaction().commit).not.toHaveBeenCalled()
    })
  })

  describe('When sendCrmMessage throws', () => {
    beforeEach(() => {
      sendCrmMessage.mockRejectedValue(new Error('Issue sending Service Bus message'))
    })

    test('should call transaction().rollback', async () => {
      try { await failed(delivery, reason) } catch {}
      expect(transaction().rollback).toHaveBeenCalled()
    })

    test('should call transaction().rollback once', async () => {
      try { await failed(delivery, reason) } catch {}
      expect(transaction().rollback).toHaveBeenCalledTimes(1)
    })

    test('should throw', async () => {
      const wrapper = async () => { await failed(delivery, reason) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error', async () => {
      const wrapper = async () => { await failed(delivery, reason) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "Issue sending Service Bus message"', async () => {
      const wrapper = async () => { await failed(delivery, reason) }
      expect(wrapper).rejects.toThrow(/^Issue sending Service Bus message$/)
    })

    test('should call getStatementByStatementId', async () => {
      try { await failed(delivery, reason) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalled()
    })

    test('should call getStatementByStatementId once', async () => {
      try { await failed(delivery, reason) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalledTimes(1)
    })

    test('should call getStatementByStatementId with delivery.statementId', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalledWith(delivery.statementId)
    })

    test('should not call completeDelivery', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(completeDelivery).not.toHaveBeenCalled()
    })

    test('should not call createFailure', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(createFailure).not.toHaveBeenCalled()
    })

    test('should not call transaction().commit', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(transaction().commit).not.toHaveBeenCalled()
    })
  })

  describe('When completeDelivery throws', () => {
    beforeEach(() => {
      completeDelivery.mockRejectedValue(new Error('Issue saving down to database'))
    })

    test('should call transaction().rollback', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(transaction().rollback).toHaveBeenCalled()
    })

    test('should call transaction().rollback once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(transaction().rollback).toHaveBeenCalledTimes(1)
    })

    test('should throw', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "Issue saving down to database"', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(/^Issue saving down to database$/)
    })

    test('should call getStatementByStatementId', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalled()
    })

    test('should call getStatementByStatementId once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalledTimes(1)
    })

    test('should call getStatementByStatementId with delivery.statementId', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalledWith(delivery.statementId)
    })

    test('should call sendCrmMessage', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalled()
    })

    test('should call sendCrmMessage once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalledTimes(1)
    })

    test('should call sendCrmMessage with statement.email, statement.frn and reason', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalledWith(statement.email, statement.frn, reason)
    })

    test('should not call createFailure', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(createFailure).not.toHaveBeenCalled()
    })

    test('should not call transaction().commit', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(transaction().commit).not.toHaveBeenCalled()
    })
  })

  describe('When createFailure throws', () => {
    beforeEach(() => {
      createFailure.mockRejectedValue(new Error('Issue saving down to database'))
    })

    test('should call transaction().rollback', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(transaction().rollback).toHaveBeenCalled()
    })

    test('should call transaction().rollback once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(transaction().rollback).toHaveBeenCalledTimes(1)
    })

    test('should throw', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "Issue saving down to database"', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(/^Issue saving down to database$/)
    })

    test('should call getStatementByStatementId', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalled()
    })

    test('should call getStatementByStatementId once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalledTimes(1)
    })

    test('should call getStatementByStatementId with delivery.statementId', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalledWith(delivery.statementId)
    })

    test('should call sendCrmMessage', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalled()
    })

    test('should call sendCrmMessage once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalledTimes(1)
    })

    test('should call sendCrmMessage with statement.email, statement.frn and reason', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalledWith(statement.email, statement.frn, reason)
    })

    test('should call completeDelivery', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(completeDelivery).toHaveBeenCalled()
    })

    test('should call completeDelivery once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(completeDelivery).toHaveBeenCalledTimes(1)
    })

    test('should call completeDelivery with delivery.deliveryId', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(completeDelivery).toHaveBeenCalledWith(delivery.deliveryId)
    })

    test('should not call transaction().commit', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(transaction().commit).not.toHaveBeenCalled()
    })
  })

  describe('When transaction.commit throws', () => {
    beforeEach(() => {
      transaction().commit.mockRejectedValue(new Error('Issue commiting database transaction'))
    })

    test('should call transaction().rollback', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(transaction().rollback).toHaveBeenCalled()
    })

    test('should call transaction().rollback once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(transaction().rollback).toHaveBeenCalledTimes(1)
    })

    test('should throw', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "Issue commiting database transaction"', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(/^Issue commiting database transaction$/)
    })

    test('should call getStatementByStatementId', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalled()
    })

    test('should call getStatementByStatementId once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalledTimes(1)
    })

    test('should call getStatementByStatementId with delivery.statementId', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(getStatementByStatementId).toHaveBeenCalledWith(delivery.statementId)
    })

    test('should call sendCrmMessage', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalled()
    })

    test('should call sendCrmMessage once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalledTimes(1)
    })

    test('should call sendCrmMessage with statement.email, statement.frn and reason', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalledWith(statement.email, statement.frn, reason)
    })

    test('should call completeDelivery', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(completeDelivery).toHaveBeenCalled()
    })

    test('should call completeDelivery once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(completeDelivery).toHaveBeenCalledTimes(1)
    })

    test('should call completeDelivery with delivery.deliveryId', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(completeDelivery).toHaveBeenCalledWith(delivery.deliveryId)
    })

    test('should call createFailure', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(createFailure).toHaveBeenCalled()
    })

    test('should call createFailure once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(createFailure).toHaveBeenCalledTimes(1)
    })

    test('should call createFailure with delivery.deliveryId, INVALID and transaction', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(createFailure).toHaveBeenCalledWith(delivery.deliveryId, INVALID, transaction())
    })
  })

  describe('When transaction.rollback throws', () => {
    beforeEach(() => {
      getStatementByStatementId.mockRejectedValue(new Error('Issue retreiving statement'))
      transaction().rollback.mockRejectedValue(new Error('Issue rolling back database transaction'))
    })

    test('should throw', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "Issue rolling back database transaction"', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(/^Issue rolling back database transaction$/)
    })

    test('should not call sendCrmMessage', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).not.toHaveBeenCalled()
    })

    test('should not call completeDelivery', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(completeDelivery).not.toHaveBeenCalled()
    })

    test('should not call createFailure', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(createFailure).not.toHaveBeenCalled()
    })

    test('should not call transaction().commit', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(transaction().commit).not.toHaveBeenCalled()
    })
  })
})
