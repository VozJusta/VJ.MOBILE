const rawBaseUrl =
	process.env.EXPO_PUBLIC_API_URL

export const BASE_URL = rawBaseUrl.replace(/\/$/, "");
