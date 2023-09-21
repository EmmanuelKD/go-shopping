
"use client"

import { ProductType } from "./components/product-listing-card";

type AuthUserType = {
    email: string,
    password: string
}

type entityType = {
    created_at?: Date;
    deleted_at?: Date;
    updated_at?: Date;
    objectId?: string;
};



type AppUser = entityType & {
    email: string;
    fname: string;
    lname: string;
    phoneNumber: string;
    isVerified: boolean;
    photoRef?: string;
    productLiked?:string[],
    
    
};


type AppProduct = entityType & ProductType;