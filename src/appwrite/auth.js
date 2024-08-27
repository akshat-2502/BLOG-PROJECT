import {Client, Account, ID} from "appwrite";
import config from "../config/config";


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndPoint(config.appwriteEndPoint)
            .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    //create account
    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //another methon for direct login
                return this.login ({email, password});
            }else{
               return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    //login
    async login ({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    //login status
    async getCurrentUser (){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    //logout

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

}

const authService = new AuthService()

export default authService