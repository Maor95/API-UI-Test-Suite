import { Page } from "playwright";
import { PageBase } from "./page-base";

const CREATE_NEW_RESTURANT_BUTTON = "body > app-root > app-main > div:nth-child(3) > button";
const POPUP_TITLE = "#create-new-popup"
const NEW_RESTAURANT_ADDRESS_SELECTOR = "#main-table > table > tbody > tr:nth-child(1)" 
const DELETE_RESTAURANT_BUTTON = "#main-table > table > tbody > tr:nth-child(1) > td:nth-child(6) > button"
const DELETE_POPUP = "#alert-popup"
const NEW_RESTAURANT_SUBMISSION = "#create-new-popup > form > button";
const NEW_RESTURANT_CREATED_POPUP = "#alert-popup"
export class RestaurantPage extends PageBase {

    constructor(page: Page) {
        super(page);
    }

    checkIfCreatedPopupExists =async () => {
        await this.page.isVisible(NEW_RESTURANT_CREATED_POPUP)
    }

    clickSubmitNewRestaurantButton =async () => {
        await this.page.click(NEW_RESTAURANT_SUBMISSION)
    }

    clickCreateNewRestaurantButton = async () => {
        await this.page.click(CREATE_NEW_RESTURANT_BUTTON);
    }
    checkIfTitleInPopupExists = async () => {
        return await this.page.isVisible(POPUP_TITLE);
    }

    getNewRestaurantAddress = async () => {
        return await this.page.waitForSelector(NEW_RESTAURANT_ADDRESS_SELECTOR);
    }

    clickDeleteRestaurantButton = async () => {
        await this.page.click(DELETE_RESTAURANT_BUTTON);
    }

    checkIfDeletedPopupExists =async () => {
        return await this.page.isVisible(DELETE_POPUP)   
    }
}