export class AuthSrvice{
    private isAuthentication = false;

    login (){
        this.isAuthentication = true
    }

    logout(){
        this.isAuthentication = false;
        window.localStorage.clear();
    }

    isLoggedIn(): boolean{
        return this.isAuthentication;
    }
}