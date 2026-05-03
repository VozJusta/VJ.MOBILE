const rawBaseUrl: string =
	process.env.EXPO_PUBLIC_API_URL

export const BASE_URL = rawBaseUrl.replace(/\/$/, "");

export const BASE_DID_KEY = process.env.EXPO_PUBLIC_DID_KEY;

export const BASE_DID_URL = "https://api.d-id.com"