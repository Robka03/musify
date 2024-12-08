import config from '../config';

export async function loginUser(email: string, password: string) {
    const loginDetails = {
        email,
        password,
    };

    try {
        const response = await fetch(config.apiBaseUrl+"/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails),
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.status}`);
        }

        const data = await response.json();
        // Store the token in localStorage or cookies
        localStorage.setItem("token", data.token);      //TODO: Use cookies instead of localStorage AFTER PROJECT SHOWOFF

        return data;
    } catch (error) {
        throw new Error("Error during login:"+ error);
    }
};