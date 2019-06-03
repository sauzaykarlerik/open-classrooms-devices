export class AuthService {
    isAuth = false;

    signIn() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.isAuth = true;
                resolve(true);
            }, 2000);
        });
    }

    signOut() {
        this.isAuth = false;
    }
}
