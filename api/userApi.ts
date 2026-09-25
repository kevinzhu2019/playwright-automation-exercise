import { APIRequestContext } from '@playwright/test';
import { User } from '../types/User';

export class UserApi {

    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    // Post User
    async createUser(userData: User) {
        const response = await this.request.post('https://automationexercise.com/api/createAccount', {
            form: userData
        });

        return response;
    }

    // Get User
    async getUser(email: string) {
        const getResponse = await this.request.get('https://automationexercise.com/api/getUserDetailByEmail', {
            params: {
                email: email
            }
        });

        return getResponse;
    }

    // Update User
    async updateUser(userData: User) {
        const putResponse = await this.request.put('https://automationexercise.com/api/updateAccount', {
            form: userData
        });

        return putResponse;
    }

    // Delete user
    async deleteUser(email: string, password: string) {
        const deleteResponse = await this.request.delete('https://automationexercise.com/api/deleteAccount', {
            form: {
                password: password,
                email: email
            }
        })

        return deleteResponse;
    } 

}