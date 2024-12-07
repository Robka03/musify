import config from '../config';

export async function registerUser(apiUrl: string, username: string, email: string, password: string, firstname: string, lastname: string, dob: string, subscription: boolean) {
    // const username = "admin";
    // const password = "admin123"; // Replace with your generated password
    // const credentials = btoa(`${username}:${password}`); // Encode to Base64
    const body = {
        "username": firstname + " " + lastname,
        "email": email,
        "password": password,
        "firstname": firstname,
        "lastname": lastname,
        "dob": dob,
        "subscription": true
    }
    try {
        const response = await fetch(config.apiBaseUrl + "/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
        console.log("User created:", response);
        return response;
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};