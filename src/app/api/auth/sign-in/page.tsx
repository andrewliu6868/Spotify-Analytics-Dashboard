import React, { useState } from "react";
import SignInPage from "./signInPage";
import { redirect } from "next/navigation";

// page to check if a user is already signed in -> gatekeeper of sorts

export default function SignIn(){
    const [isAuth, setIsAuth] = useState(false);
    
    if (isAuth){
        redirect('/dashboard')
    }

    return(
        <SignInPage></SignInPage>
    )
}