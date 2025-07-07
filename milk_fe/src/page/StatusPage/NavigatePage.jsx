import { useEffect } from "react";

export default function NavigatePage() {
  const token = localStorage.getItem("sessionToken");

  useEffect(() => {
    const resultUrl = window.location.href;
    const navigateResultPayment = async () => {
      try {
        const response = await fetch(
          ` http://localhost:8080/api/payments/callback?url=${resultUrl}`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.ok) {
          const data = await response.text();
          window.location.href = data;
        }
      } catch (error) {}
    };

    navigateResultPayment();
  }, []);
}
