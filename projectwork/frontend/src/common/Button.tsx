import axios from "axios";
import { log } from "console";
import React, { useEffect } from "react";
import { useState } from "react";

interface ButtonProps {
    text: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

export default function Button({ text }: ButtonProps) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const refreshUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/users");
                console.log(response);
                setUsers(response.data);
            }
            catch {
                setError("An error occurred");
            }
        }
        refreshUsers();
    },[])

    console.log(users);

    return (
        <div>
            {users.map((user: User) => (<div>{user.name}</div>))}
        </div>
    )
}