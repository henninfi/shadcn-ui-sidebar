"use client";
import { useEffect } from "react";
import { client } from '../../client/services.gen';
import { useAuthInfo } from "@propelauth/react";

export const SDKConfig = () => {
    const authInfo = useAuthInfo();

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_API) {
            throw new Error("API URL is not defined");
        }

        client.setConfig({
            baseUrl: process.env.NEXT_PUBLIC_API as string,
        });

        client.interceptors.request.use((request, options) => {
            request.headers.set('Authorization', `Bearer ${authInfo.accessToken}`);
            return request;
        });
    }, [authInfo]);

    return null;  // Return null because this component doesn't need to render anything
};
