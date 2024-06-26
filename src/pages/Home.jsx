import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div style={{ height: "100vh", padding: "20px", backgroundColor: "#232323", color: "white" }}>
            <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Homepage</h1>

            <p>Quickly use below links to navigate through all pages:</p>
            <ul style={{ listStyle: "none", padding: "0", marginTop: "20px" }}>
                <li style={{ marginBottom: "10px" }}>
                    <Link to="/painelprincipal" style={{ color: "#87CEFA", textDecoration: "none" }}>
                        Painel Principal
                    </Link>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <Link to="/LoginPage" style={{ color: "#87CEFA", textDecoration: "none" }}>
                        LoginPage
                    </Link>
                </li>

                <li style={{ marginBottom: "10px" }}>
                    <Link to="/ordens" style={{ color: "#87CEFA", textDecoration: "none" }}>
                        Ordens
                    </Link>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <Link to="/cadastro" style={{ color: "#87CEFA", textDecoration: "none" }}>
                        Cadastro
                    </Link>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <Link to="/editarordem" style={{ color: "#87CEFA", textDecoration: "none" }}>
                        Editar Ordem
                    </Link>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <Link to="/painelusuarios" style={{ color: "#87CEFA", textDecoration: "none" }}>
                        Painel Usuarios
                    </Link>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <Link to="/editarusuario" style={{ color: "#87CEFA", textDecoration: "none" }}>
                        Editar Usuario
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
