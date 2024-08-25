export const getApiUrl = () => {
    const isDevMode = process.env.DEV_MODE === 'true';
    if (isDevMode) {
        return process.env.NEXT_PUBLIC_BE_BASE_URL_LOCAL;
    } else {
        return process.env.NEXT_PUBLIC_BE_BASE_URL_PROD;
    }
};