import {test, describe, expect} from '@jest/globals'
import request from 'supertest'
import app, { ShoppingList } from '../src/index'


describe('Test shopping list', () =>{

    test('Get all shopping items', async () => {
        const response = await request(app).get('')

        expect(response.body).toHaveLength(2)
    })

    test('get shopping item', async() => {
        const name = "Mlieko"
        const response = await request(app).get(`/${name}`)
        expect(response.body).toStrictEqual({name:name})
    })

    test('Create shopping item', async () => {
        const item = {
            name:'Tomatoe'
        }

        const response = await request(app)
            .post('/')
            .send(item)
          expect(response.statusCode).toBe(201)
          expect(response.body.name).toBe(item.name)

        const response2 = await request(app).get('')

        expect(response2.body).toHaveLength(3)
    })


    test('Update item', async () => {

        const response = await request(app)
          .put('/111')
          .send({ name: "Milk" })
    
        expect(response.statusCode).toBe(201)
      })
    
      test('Delete shopping item', async () => {
    
        const response = await request(app)
          .del('/111')
    
        expect(response.statusCode).toBe(204)
      })
    

    
})