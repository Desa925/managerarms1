import { useEffect, useState } from "react";

interface Document {
  id: number;
  tipo: string;
  nome: string;
  numeroDocumento?: string;
  cpfCnpj?: string;
  telefone?: string;
  inicio?: string;
  fim?: string;
}

export default function DocumentsList() {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    fetch("https://managerarms-backend-1.onrender.com/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((err) => console.error("Erro:", err));
  }, []);

  return (
    <div>
      <h1>Lista de Documentos</h1>

      {documents.map((doc) => (
        <div key={doc.id}>
          <p>{doc.nome}</p>
          <p>{doc.tipo}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
