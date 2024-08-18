"use client"
import React, { useEffect, useContext } from 'react';
import { useAuthInfo } from "@propelauth/react";
import { useToken } from '@/components/auth/FM/useFMToken';
import { OpenAPI as openAPI_projectAPI } from '../../SDK/projects_api/client/core/OpenAPI';
import { OpenAPI as OpenAPI_FieldManagerAPI } from '../../SDK/fm_api/client/core/OpenAPI';
import { FieldManagerService } from '@/SDK/projects_api/client';
import { useQuery } from "@tanstack/react-query";

const AuthTokenUpdater = () => {
    const authInfo = useAuthInfo();
    const {data:fm_token} = useQuery<Promise<string>>({
        queryKey: ["fm-token"],
        queryFn: () => FieldManagerService.getToken(),
      });

    // Check if the API URL is defined
    if (!process.env.NEXT_PUBLIC_API) {
        throw new Error("API URL is not defined");
      }
    openAPI_projectAPI.BASE = process.env.NEXT_PUBLIC_API as string;

    console.log('fm_token', fm_token)
    
    useEffect(() => {
        
        // Alternatively, if you need to update headers directly:
        openAPI_projectAPI.HEADERS = {
            ...openAPI_projectAPI.HEADERS,
            Authorization: authInfo.accessToken ? `Bearer ${authInfo.accessToken}` : '',
            
        };

        OpenAPI_FieldManagerAPI.HEADERS = {
            ...OpenAPI_FieldManagerAPI.HEADERS,
            Authorization: fm_token ? `Bearer ${fm_token}` : '',
            accept: 'application/json'
        };

        console.log('OpenAPI_FieldManagerAPI',OpenAPI_FieldManagerAPI)
        
    }, [authInfo.accessToken, fm_token]);
    
    return null; // This component does not render anything
};

export default AuthTokenUpdater;