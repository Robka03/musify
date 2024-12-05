export async function getCurrentUser() {
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("No token found. User is not logged in.");
        return null;
    }

    try {
        const response = await fetch("http://localhost:8080/api/users/me", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}