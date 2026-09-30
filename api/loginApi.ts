import { APIRequestContext } from '@playwright/test';

export class LoginApi {

    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async verifyLogin(email: string, password: string) {
        const response = await this.request.post('https://automationexercise.com/api/verifyLogin', {
            form: {
                email: email,
                password: password
            }
        });
        return response;
    }

}