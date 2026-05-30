import React, { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    if (usuario === "admin" && senha === "1234") {
      setErro("");
      onLogin();
    } else {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
            color: "#007BFF",
            fontSize: "32px",
          }}
        >
          Manager Arms
        </h2>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Usuário
          </label>

          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{
              width: "100%",
              height: "45px",
              marginTop: "0.3rem",
              padding: "0 10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Senha
          </label>

          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              width: "100%",
              height: "45px",
              marginTop: "0.3rem",
              padding: "0 10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        {erro && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {erro}
          </p>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            height: "45px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
