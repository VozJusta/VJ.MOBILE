import { apiFetch } from "@/helpers/api/apiFetch";
import { IHighRelevanceResponse } from "@/interfaces/services/dashboard/lawyer/high-relevance";
import { BASE_URL } from "@/settings/BASE_URL";

export async function getHighRelevanceDashboardLawyer() {
  try {
    const response = await apiFetch(
      `${BASE_URL}/dashboard/lawyer/high-relevance`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    const json = await response.json().catch(() => {});

    if (!response.ok) {
      return {
        success: false,
        message: json?.message,
      };
    }

    return {
      success: true,
      data: json as IHighRelevanceResponse[],
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching high relevance cases",
    };
  }
}
