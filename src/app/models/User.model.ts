export class User {
    constructor(public firstname: string,
                public lastname: string,
                public email: string,
                public drinkPreference: string,
                public hobbies?: string[]) {
    }
}