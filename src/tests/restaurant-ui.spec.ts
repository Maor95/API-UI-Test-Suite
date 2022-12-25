import { expect } from 'chai';
import { RestaurantPage } from '../logic/pages/restaurant-page';
import { BrowserWrapper } from '../infra/browser/browser';
import configJson from '../../config.json';
import restaurantsAPI from '../logic/REST/restaurantsAPI';


describe('UI tests', () => {
    let browser: BrowserWrapper;
    let resturantPage: RestaurantPage;

    beforeEach('Start browser', async () => {
        browser = new BrowserWrapper();
        resturantPage = await browser.newPage(RestaurantPage, configJson.baseUiUrl);
    })

    afterEach('Close browser', async () => {
        await browser.close();
    })

    it('Validate "Create new Restaurant Popup" opened', async function () {
        await resturantPage.clickCreateNewRestaurantButton();
        let actualResult = await resturantPage.checkIfTitleInPopupExists();
        expect(actualResult, 'New restaurant popup opened').to.be.true;
    })

    it('Validate new restaurant was submitted',async function () {
        await resturantPage.clickSubmitNewRestaurantButton();
        let actualResult = await resturantPage.checkIfCreatedPopupExists();
        expect(actualResult, 'Restaurant submitted').to.be.true;
        
    })

    //ADD UI & API test to validate that the new restaurant is now visible and part of the list



    it('Validates address is updated in UI after being validated with API test', async () => {
        let newRestaurantAddress = await resturantPage.getNewRestaurantAddress();
        expect((await newRestaurantAddress.innerText()).toString()).to.contains('The street 2');
    }
    )

    it('Validate "Delete Popup" opened', async function () {
        await resturantPage.clickDeleteRestaurantButton();
        let actualResult = await resturantPage.checkIfDeletedPopupExists();
        expect(actualResult, 'Restaurant deleted and popup opened').to.be.true;
    })

    ////ADD UI & API  test to validate that the deleted restaurant is now not visible and not part of the list


    
})


