export async function apiFetch(url, options = {}) {
    const token =
        localStorage.getItem("companyToken") ||
        sessionStorage.getItem("companyToken");

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };

    const res = await fetch(url, {
        ...options,
        headers,
    });

    // ❌ لو مش ناجح
    if (!res.ok) {
        const errorText = await res.text();
        console.error("API Error:", errorText);

        // 🔥 لو Unauthorized
        if (res.status === 401) {
            localStorage.removeItem("companyToken");
            sessionStorage.removeItem("companyToken");
            localStorage.removeItem("companyId");
            sessionStorage.removeItem("companyId");

            throw new Error("Unauthorized");
        }

        throw new Error(errorText || "API Error");
    }

    return res.json();
}