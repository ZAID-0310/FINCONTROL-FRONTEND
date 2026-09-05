"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {

    const router = useRouter();

    const [datos, setDatos] = useState({
        email: '',
        password: ''
    });

    const [mensaje, setMensaje] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos({
            ...datos,
            [name]: value
        });
    };

    const enviarDatos = async (event) => {
        event.preventDefault();
        setMensaje('');

        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const resultado = await respuesta.json();

            if (respuesta.ok) {                   
                setMensaje(resultado.message);       
                localStorage.setItem("token", resultado.access_token);
                console.log("Usuario:", resultado.user);
                router.push("/dashboard");
            } else {
                setMensaje(resultado.message);       
            }

        } catch (error) {
            console.error("Error de conexión:", error);
            setMensaje("No se pudo conectar con el servidor");
        }
    };

    return (
        <form onSubmit={enviarDatos}>
            <div>
                <label>Correo electrónico: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={datos.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={datos.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">INICIAR SESIÓN</button>
            {mensaje && <p>{mensaje}</p>}
            <Link href="/register">Regístrate aquí</Link>
        </form>
    );
}