import { apiFetch } from "@/helpers/api/apiFetch";
import { BASE_URL } from "@/settings/BASE_URL";

export async function logout() {
  try {
    const response = await apiFetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        message: json.message || "Logout failed",
      };
    }

    return {
      success: true,
      message: json.message || "Logout successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during logout",
    };
  }
}
