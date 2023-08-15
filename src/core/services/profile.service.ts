import {sendEmailVerification, updateEmail, updateProfile, User} from "firebase/auth";

interface IProfile {
    updateProfile: (userData: User , name: string) => Promise<void>,
    updateEmail: (userData: User , email: string) => Promise<void>,
    sendEmailVerification: (userData: User) => Promise<void>
}

export const ProfileService:IProfile = {
    async updateProfile(userData , name){
        return await updateProfile(userData , {displayName: name})
    },
    async updateEmail(userData , email) {
        return await updateEmail(userData , email)
    },
    async sendEmailVerification(userData) {
        return await sendEmailVerification(userData)
    }
}