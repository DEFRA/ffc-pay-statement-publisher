const getPersonalisation = require('../../../app/publishing/get-personalisation')
let businessName
let scheme

describe('get personalisation', () => {
  beforeEach(() => {
    businessName = 'Mr A Farmer'
    scheme = {
      name: 'Test Scheme',
      shortName: 'TS',
      year: '2020',
      frequency: 'Annual'
    }
  })

  test('returns scheme name', () => {
    const result = getPersonalisation(scheme.name, scheme.shortName, scheme.year, scheme.frequency, businessName)
    expect(result.schemeName).toBe(scheme.name)
  })
})
