import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{ height: "100vh", padding: "20px", backgroundColor: "#232323", color: "white", textAlign: "center" }}>
            <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Erro</h1>
            <p style={{ fontSize: "18px", marginBottom: "30px" }}>A página que você está procurando não foi encontrada.</p>
            <Link to="/" style={{ color: "#87CEFA", textDecoration: "none", fontSize: "16px" }}>
                Voltar para a página inicial
            </Link>
        </div>
    );
};

export default NotFound;
