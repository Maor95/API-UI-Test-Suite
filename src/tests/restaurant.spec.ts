import { ApiResponse } from '../infra/rest/api-response';
import { Restaurant } from '../logic/REST/API-Response/get-restaurants-response';
import { expect } from 'chai';


import restaurantsAPI from '../logic/REST/restaurantsAPI';
import exp from 'constants';
import { remove } from 'lodash';
import { visitEachChild } from 'typescript';

describe('Restaurants tests', () => {

    before('Reset restaurant server', async () => {
        //Arrange
        await restaurantsAPI.resetServer();
    })

    it('Validate the amount of restaurants', async () => {
        //Act
        const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();

        //Assert
        expect(restaurants.success).to.be.true;
        const actualAmount = restaurants.data?.length;
        expect(actualAmount).to.equal(3, 'Restaurants amount is not as expected');
    })

    it('Get restaurant by id', async () => {
        //Arrange
        const myNewRest = { address: "My Addess 1", id: 233, name: "My Restaurant", score: 2.3 };
        const createResponse = await restaurantsAPI.createRestaurant(myNewRest);

        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(233);

        //Assert
        expect(getByIdResponse.status).to.equal(200);
        expect(getByIdResponse.success).to.be.true;
        expect(getByIdResponse.data).to.deep.equal(myNewRest);
    })

    it('Get non exsisting restaurant', async () => {
        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(263);

        //Assert
        expect(getByIdResponse.error).to.equal("restaurant with given id not found");
        expect(getByIdResponse.success).to.be.false;
        expect(getByIdResponse.status).to.equal(404);
    })

    it('Add a new restuarant', async () => {
        //Arrange
        const myNewRest = { address: "The street 1", id: 1234, name: "Maors Restaurant", score: 3.2 };

        //Act
        const addRestaurant = await restaurantsAPI.createRestaurant(myNewRest);

        //Assert
        expect(addRestaurant.success).to.be.true;
        expect(addRestaurant.status).to.equal(201);
    })

    it('Delete existing restaurant', async () => {
        //Act
        const removeRestaurant = await restaurantsAPI.deleteRestaurant(233);

        //Assert
        expect(removeRestaurant.success).to.be.true;
        expect(removeRestaurant.status).to.deep.equal(200);

    })

    it('Update an existing restuarant', async () => {
        //Arrange
        const updatedAddress = { address: "The street 2", id: 21, name: "2nd Street Pub", score: 3.2 };

        //Act
        const modifyRestaurant = await restaurantsAPI.updateRestaurant(updatedAddress);

        //Assert
        expect(modifyRestaurant.success).to.be.true;
        expect(modifyRestaurant.status).to.equal(200)
    })


})