import { authClient } from "./auth-client";

export const getTokenFromClent = async () => {

     const {data} = await authClient.token(); 
     const token = data?.token;
     return token;
     }
    

//      use client

//     const token = await getTokenFromClent();
//  authorization: `Bearer ${token}`,
