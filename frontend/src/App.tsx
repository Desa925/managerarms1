import React, { useState } from "react";
import DocumentForm from "./pages/DocumentForm";
import DocumentCard from "./components/DocumentCard";
import Login from "./components/Login";

const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  const [crafDocs, setCrafDocs] = useState([]);
  const [crDocs, setCrDocs] = useState([]);
  const [guiaDocs, setGuiaDocs] = useState([]);
  const [filiacaoDocs, setFiliacaoDocs] = useState([]);

  // Documento em edição
  const [editingDoc, setEditingDoc] = useState<any>(null);

  // SE NÃO ESTIVER LOGADO
  if (!isLogged) {
    return <Login onLogin={() => setIsLogged(true)} />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#007BFF",
          padding: "1rem 0",
          color: "white",
          position: "relative",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "1.5rem",
          }}
        >
          WR DESPACHANTE
          <span style={{ color: "yellow", fontSize: "1.5rem" }}>★</span>
          Manager Arms
        </h1>

        {/* BOTÃO SAIR */}
        <button
          onClick={() => setIsLogged(false)}
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            padding: "0.4rem 1rem",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Sair
        </button>
      </header>

      {/* Conteúdo principal */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <DocumentForm
          setCrafDocs={setCrafDocs}
          setCrDocs={setCrDocs}
          setGuiaDocs={setGuiaDocs}
          setFiliacaoDocs={setFiliacaoDocs}
          editingDoc={editingDoc}
          setEditingDoc={setEditingDoc}
        />

        <DocumentCard
          crafDocs={crafDocs}
          crDocs={crDocs}
          guiaDocs={guiaDocs}
          filiacaoDocs={filiacaoDocs}

          setCrafDocs={setCrafDocs}
          setCrDocs={setCrDocs}
          setGuiaDocs={setGuiaDocs}
          setFiliacaoDocs={setFiliacaoDocs}

          setEditingDoc={setEditingDoc}
        />
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "1rem 0",
          textAlign: "center",
        }}
      >
        Desenvolvido por José Luiz de Sá Silva <br />
        © AEROREDE TELECOM <br />
        Todos os direitos reservados
      </footer>
    </div>
  );
};

export default App;
