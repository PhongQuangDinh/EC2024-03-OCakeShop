export const getApiUrl = () => {
    const isDevMode = process.env.DEV_MODE === 'true';
    if (isDevMode) {
        return process.env.LOCAL_BASE_URL;
    } else {
        return process.env.PROD_BASE_URL;
    }
};