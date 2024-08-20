"use client"
import React, { useEffect, useContext } from 'react';
import { useAuthInfo } from "@propelauth/react";
import { OpenAPI } from '../../../SDK/projects_api/client';
import { useQuery } from "@tanstack/react-query";

const AuthTokenUpdater = () => {
    const authInfo = useAuthInfo();

    // Check if the API URL is defined
    if (!process.env.NEXT_PUBLIC_API) {
        throw new Error("API URL is not defined");
      }
      OpenAPI.BASE = process.env.NEXT_PUBLIC_API as string;
      console.log("API URL:", OpenAPI.BASE);
    
    useEffect(() => {
        
        // Alternatively, if you need to update headers directly:
        OpenAPI.HEADERS = {
            ...OpenAPI.HEADERS,
            Authorization: authInfo.accessToken ? `Bearer ${authInfo.accessToken}` : '',
            
        };


        
    }, [authInfo.accessToken]);
    
    return null; // This component does not render anything
};

export default AuthTokenUpdater;