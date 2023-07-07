import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectedToDB } from "@utils/database";
import User from '@models/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            client: '',
            clientSecret: ''
        })
    ],
    async session({ session }){
        const sessionUser = User.findOne({
            email: session.user.email
        })

        session.user.id = sessionUser._id.toString();

        return session
    },
    async signIn({ profile }){
        try{
            await connectedToDB();

            //find if user exists
            const user = await User.findOne({email : profile.email})

            //if not create new user
            if(!user){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ","").toLowerCase(),
                    image: profile.picture
                })
            }



            return true;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
})

export { handler as GET, handler as POST };