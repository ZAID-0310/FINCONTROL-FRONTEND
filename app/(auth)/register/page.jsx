"use client"
import { useState } from "react";

export default function Register() {

    const [datos, setDatos] = useState(
        {
            name: '',
                email: '',
                password: ''
        }
    ); 

    const [mensaje, setMensaje] = useState('');
    const [errores, setErrores] = useState({});

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
        setErrores({});


        try {
            const respuesta = await fetch("http://127.0.0.1:8000/api/register", {
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
                console.log("Usuario registrado:", resultado.user);
                
            } else {
                setMensaje(resultado.message);
                setErrores(resultado.errors || {});
            }

        } catch (error) {
            console.error("Error de conexión:", error);
            setMensaje("No se pudo conectar con el servidor");
        }
    };

    return(
         <form onSubmit={enviarDatos}>
            <div>
                <label>Nombre: </label>
                <input
                    type="text"
                    name="name"
                    value={datos.name}
                    onChange={handleChange}
                    required
                />
                {errores.name && <p style={{color: 'red'}}>{errores.name[0]}</p>}
            </div>
            <div>
                <label>Correo electrónico: </label>
                <input
                    type="email"
                    name="email"
                    value={datos.email}
                    onChange={handleChange}
                    required
                />
                {errores.email && <p style={{color: 'red'}}>{errores.email[0]}</p>}
            </div>
            <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    value={datos.password}
                    onChange={handleChange}
                    minLength={8}
                    required
                />
                {errores.password && <p style={{color: 'red'}}>{errores.password[0]}</p>}
            </div>
            <button type="submit">REGISTRARSE</button>

            {mensaje && <p>{mensaje}</p>}
        </form>
    );
}