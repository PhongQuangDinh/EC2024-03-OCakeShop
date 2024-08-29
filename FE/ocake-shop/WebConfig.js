export const getApiUrl = () => {
    const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === 'true';
    if (isDevMode) {
        return process.env.NEXT_PUBLIC_BE_BASE_URL_LOCAL;
    } else {
        return process.env.NEXT_PUBLIC_BE_BASE_URL_PROD;
    }
};

export const fetchWithAuth = async (router, endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const apiUrl = getApiUrl();

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
