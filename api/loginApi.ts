import { APIRequestContext } from '@playwright/test';

export class LoginApi {

    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async verifyLogin(email?: string, password?: string) {

        const form: Record<string, string> = {};
        if (email !== undefined)
            form.email = email;
        if (password !== undefined)
            form.password = password;

        const response = await this.request.post('https://automationexercise.com/api/verifyLogin', {
            form
        });
        return response;
    }

}