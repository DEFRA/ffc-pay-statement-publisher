const { mockTransaction } = require('../../mocks/objects/data')

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

describe('Notify failed to send', () => {
  beforeEach(() => {
    getStatementByStatementId.mockResolvedValue(statement)
    sendCrmMessage.mockResolvedValue(undefined)
    completeDelivery.mockResolvedValue(undefined)
    createFailure.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When reason is INVALID', () => {
    test('should call getStatementByStatementId', async () => {
      await failed(delivery, INVALID)
      expect(getStatementByStatementId).toHaveBeenCalled()
    })

    test('should call getStatementByStatementId once', async () => {
      await failed(delivery, INVALID)
      expect(getStatementByStatementId).toHaveBeenCalledTimes(1)
    })

    test('should call getStatementByStatementId with delivery.statementId', async () => {
      await failed(delivery, INVALID)
      expect(getStatementByStatementId).toHaveBeenCalledWith(delivery.statementId)
    })

    test('should call sendCrmMessage', async () => {
      await failed(delivery, INVALID)
      expect(sendCrmMessage).toHaveBeenCalled()
    })

    test('should call sendCrmMessage once', async () => {
      await failed(delivery, INVALID)
      expect(sendCrmMessage).toHaveBeenCalledTimes(1)
    })

    test('should call sendCrmMessage with { email: statement.email, frn: statement.frn, errorMessage: "b" }', async () => {
      const statement = await getStatementByStatementId()
      await failed(delivery, INVALID)
      expect(sendCrmMessage).toHaveBeenCalledWith({ email: statement.email, frn: statement.frn, errorMessage: 'b' })
    })

    test('should call completeDelivery', async () => {
      await failed(delivery, INVALID)
      expect(completeDelivery).toHaveBeenCalled()
    })

    test('should call completeDelivery once', async () => {
      await failed(delivery, INVALID)
      expect(completeDelivery).toHaveBeenCalledTimes(1)
    })

    test('should call completeDelivery with delivery.deliveryId', async () => {
      await failed(delivery, INVALID)
      expect(completeDelivery).toHaveBeenCalledWith(delivery.deliveryId)
    })

    test('should call createFailure', async () => {
      await failed(delivery, INVALID)
      expect(createFailure).toHaveBeenCalled()
    })

    test('should call createFailure once', async () => {
      await failed(delivery, INVALID)
      expect(createFailure).toHaveBeenCalledTimes(1)
    })

    test('should call createFailure with delivery.deliveryId, INVALID and mockTransaction()', async () => {
      await failed(delivery, INVALID)
      expect(createFailure).toHaveBeenCalledWith(delivery.deliveryId, INVALID, mockTransaction())
    })

    test('should call mockTransaction().commit', async () => {
      await failed(delivery, INVALID)
      expect(mockTransaction().commit).toHaveBeenCalled()
    })

    test('should call mockTransaction().commit once', async () => {
      await failed(delivery, INVALID)
      expect(mockTransaction().commit).toHaveBeenCalledTimes(1)
    })

    test('should not call mockTransaction().rollback', async () => {
      await failed(delivery, INVALID)
      expect(mockTransaction().rollback).not.toHaveBeenCalled()
    })

    test('should not throw', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).not.toThrow()
    })

    test('should return undefined', async () => {
      const result = await failed(delivery, INVALID)
      expect(result).toBeUndefined()
    })
  })

  describe('When reason is REJECTED', () => {
    test('should call getStatementByStatementId', async () => {
      await failed(delivery, REJECTED)
      expect(getStatementByStatementId).toHaveBeenCalled()
    })

    test('should call getStatementByStatementId once', async () => {
      await failed(delivery, REJECTED)
      expect(getStatementByStatementId).toHaveBeenCalledTimes(1)
    })

    test('should call getStatementByStatementId with delivery.statementId', async () => {
      await failed(delivery, REJECTED)
      expect(getStatementByStatementId).toHaveBeenCalledWith(delivery.statementId)
    })

    test('should call sendCrmMessage', async () => {
      await failed(delivery, REJECTED)
      expect(sendCrmMessage).toHaveBeenCalled()
    })

    test('should call sendCrmMessage once', async () => {
      await failed(delivery, REJECTED)
      expect(sendCrmMessage).toHaveBeenCalledTimes(1)
    })

    test('should call sendCrmMessage with { email: statement.email, frn: statement.frn, errorMessage: "b" }', async () => {
      const statement = await getStatementByStatementId()
      await failed(delivery, REJECTED)
      expect(sendCrmMessage).toHaveBeenCalledWith({ email: statement.email, frn: statement.frn, errorMessage: 'b' })
    })

    test('should call completeDelivery', async () => {
      await failed(delivery, REJECTED)
      expect(completeDelivery).toHaveBeenCalled()
    })

    test('should call completeDelivery once', async () => {
      await failed(delivery, REJECTED)
      expect(completeDelivery).toHaveBeenCalledTimes(1)
    })

    test('should call completeDelivery with delivery.deliveryId', async () => {
      await failed(delivery, REJECTED)
      expect(completeDelivery).toHaveBeenCalledWith(delivery.deliveryId)
    })

    test('should call createFailure', async () => {
      await failed(delivery, REJECTED)
      expect(createFailure).toHaveBeenCalled()
    })

    test('should call createFailure once', async () => {
      await failed(delivery, REJECTED)
      expect(createFailure).toHaveBeenCalledTimes(1)
    })

    test('should call createFailure with delivery.deliveryId, REJECTED and mockTransaction', async () => {
      await failed(delivery, REJECTED)
      expect(createFailure).toHaveBeenCalledWith(delivery.deliveryId, REJECTED, mockTransaction())
    })

    test('should call mockTransaction().commit', async () => {
      await failed(delivery, REJECTED)
      expect(mockTransaction().commit).toHaveBeenCalled()
    })

    test('should call mockTransaction().commit once', async () => {
      await failed(delivery, REJECTED)
      expect(mockTransaction().commit).toHaveBeenCalledTimes(1)
    })

    test('should not call mockTransaction().rollback', async () => {
      await failed(delivery, REJECTED)
      expect(mockTransaction().rollback).not.toHaveBeenCalled()
    })

    test('should not throw', async () => {
      const wrapper = async () => { await failed(delivery, REJECTED) }
      expect(wrapper).not.toThrow()
    })

    test('should return undefined', async () => {
      const result = await failed(delivery, REJECTED)
      expect(result).toBeUndefined()
    })
  })

  describe('When getStatementByStatementId throws', () => {
    beforeEach(() => {
      getStatementByStatementId.mockRejectedValue(new Error('Issue retreiving statement'))
    })

    test('should call mockTransaction().rollback', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().rollback).toHaveBeenCalled()
    })

    test('should call mockTransaction().rollback once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().rollback).toHaveBeenCalledTimes(1)
    })

    test('should throw', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "Issue retreiving statement"', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(/^Issue retreiving statement$/)
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

    test('should not call mockTransaction().commit', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().commit).not.toHaveBeenCalled()
    })
  })

  describe('When sendCrmMessage throws', () => {
    beforeEach(() => {
      sendCrmMessage.mockRejectedValue(new Error('Issue sending Service Bus message'))
    })

    test('should call mockTransaction().rollback', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().rollback).toHaveBeenCalled()
    })

    test('should call mockTransaction().rollback once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().rollback).toHaveBeenCalledTimes(1)
    })

    test('should throw', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow()
    })

    test('should throw Error', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(Error)
    })

    test('should throw error "Issue sending Service Bus message"', async () => {
      const wrapper = async () => { await failed(delivery, INVALID) }
      expect(wrapper).rejects.toThrow(/^Issue sending Service Bus message$/)
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

    test('should not call completeDelivery', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(completeDelivery).not.toHaveBeenCalled()
    })

    test('should not call createFailure', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(createFailure).not.toHaveBeenCalled()
    })

    test('should not call mockTransaction().commit', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().commit).not.toHaveBeenCalled()
    })
  })

  describe('When completeDelivery throws', () => {
    beforeEach(() => {
      completeDelivery.mockRejectedValue(new Error('Issue saving down to database'))
    })

    test('should call mockTransaction().rollback', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().rollback).toHaveBeenCalled()
    })

    test('should call mockTransaction().rollback once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().rollback).toHaveBeenCalledTimes(1)
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

    test('should call sendCrmMessage with { email: statement.email, frn: statement.frn, errorMessage: "b" }', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalledWith({ email: statement.email, frn: statement.frn, errorMessage: 'b' })
    })

    test('should not call createFailure', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(createFailure).not.toHaveBeenCalled()
    })

    test('should not call mockTransaction().commit', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().commit).not.toHaveBeenCalled()
    })
  })

  describe('When createFailure throws', () => {
    beforeEach(() => {
      createFailure.mockRejectedValue(new Error('Issue saving down to database'))
    })

    test('should call mockTransaction().rollback', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().rollback).toHaveBeenCalled()
    })

    test('should call mockTransaction().rollback once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().rollback).toHaveBeenCalledTimes(1)
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

    test('should call sendCrmMessage with { email: statement.email, frn: statement.frn, errorMessage: "b" }', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalledWith({ email: statement.email, frn: statement.frn, errorMessage: 'b' })
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

    test('should not call mockTransaction().commit', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().commit).not.toHaveBeenCalled()
    })
  })

  describe('When transaction.commit throws', () => {
    beforeEach(() => {
      mockTransaction().commit.mockRejectedValue(new Error('Issue commiting database transaction'))
    })

    test('should call mockTransaction().rollback', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().rollback).toHaveBeenCalled()
    })

    test('should call mockTransaction().rollback once', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().rollback).toHaveBeenCalledTimes(1)
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

    test('should call sendCrmMessage with { email: statement.email, frn: statement.frn, errorMessage: "b" }', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(sendCrmMessage).toHaveBeenCalledWith({ email: statement.email, frn: statement.frn, errorMessage: 'b' })
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

    test('should call createFailure with delivery.deliveryId, INVALID and mockTransaction', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(createFailure).toHaveBeenCalledWith(delivery.deliveryId, INVALID, mockTransaction())
    })
  })

  describe('When transaction.rollback throws', () => {
    beforeEach(() => {
      getStatementByStatementId.mockRejectedValue(new Error('Issue retreiving statement'))
      mockTransaction().rollback.mockRejectedValue(new Error('Issue rolling back database transaction'))
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

    test('should not call mockTransaction().commit', async () => {
      try { await failed(delivery, INVALID) } catch {}
      expect(mockTransaction().commit).not.toHaveBeenCalled()
    })
  })
})
