const rawBaseUrl =
	process.env.EXPO_PUBLIC_API_URL ||
	process.env.EXPO_PUBLIC_API_KEY ||
	process.env.API_URL ||
	"https://vj-api-yx3g.onrender.com";

export const BASE_URL = rawBaseUrl.replace(/\/$/, "");