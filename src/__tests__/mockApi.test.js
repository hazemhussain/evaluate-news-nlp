const { json } = require('express')
const mockApi = require('../server/mockAPI')

test('test the variable value is true', () => {
    expect(mockApi.title).toBe('test json response')
    expect(mockApi.message).toBe('this is a message')
    expect(mockApi.time).toBe('now')
})


