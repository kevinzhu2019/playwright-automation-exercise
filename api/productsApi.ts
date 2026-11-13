import { APIRequestContext } from '@playwright/test';

export class ProductsApi {

    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async verifyProductsApi() {
        return await this.request.get('https://automationexercise.com/api/productsList');
    }

    async postAllProductsApi() {
        return await this.request.post('https://automationexercise.com/api/productsList');
    }

    async verifyBrandsApi() {
        return await this.request.get('https://automationexercise.com/api/brandsList');
    }

    async putAllBrandsApi() {
        return await this.request.put('https://automationexercise.com/api/brandsList');
    }

    async postSearchProductsApi(content: string) {
        return await this.request.post('https://automationexercise.com/api/searchProduct', {
            form: {
                search_product: content
            }
        });
    }   

}