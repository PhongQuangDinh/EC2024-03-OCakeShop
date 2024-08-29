"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthGuard = ({ endpoint, options = {}, children }) => {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkToken = async () => {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.NEXT_PUBLIC_BE_BASE_URL_LOCAL || process.env.NEXT_PUBLIC_BE_BASE_URL_PROD;

        if (!token) {
            console.log('No token found');
            router.push('/signin');
            return null;
        }

        try {
            const response = await fetch(`${apiUrl}${endpoint}`, {
                ...options,
                headers: {
                    ...options.headers,
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    console.log('Session expired. Redirecting to signin.');
                    localStorage.removeItem('token');
                    router.push(`/signin?message=${encodeURIComponent('Your session has expired')}`);
                    return null;
                } else {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Request failed');
                    } else {
                        const errorText = await response.text();
                        throw new Error(errorText || 'An error occurred');
                    }
                }
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.log('Error during API request:', err.message);
            throw err;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await checkToken();
                if (result) {
                    setData(result);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {children(data)}
        </>
    );
};

export default AuthGuard;
