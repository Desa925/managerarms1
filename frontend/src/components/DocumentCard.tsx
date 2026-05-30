import React, { useState } from "react";

interface Document {
  id: string;
  nome: string;
  tipo: string;
  numeroDocumento?: string;
  cpfCnpj?: string;
  telefone?: string;
  inicio?: string;
  fim?: string;
}

interface DocumentCardProps {
  crafDocs?: Document[];
  crDocs?: Document[];
  guiaDocs?: Document[];
  filiacaoDocs?: Document[];

  setCrafDocs?: any;
  setCrDocs?: any;
  setGuiaDocs?: any;
  setFiliacaoDocs?: any;

  setEditingDoc?: any;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  crafDocs = [],
  crDocs = [],
  guiaDocs = [],
  filiacaoDocs = [],

  setCrafDocs,
  setCrDocs,
  setGuiaDocs,
  setFiliacaoDocs,

  setEditingDoc,
}) => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const allDocuments = [
    ...(crafDocs || []),
    ...(crDocs || []),
    ...(guiaDocs || []),
    ...(filiacaoDocs || []),
  ];

  const calculateAviso = (doc: Document) => {
    if (!doc.fim) return new Date();

    const fimDate = new Date(doc.fim);

    switch (doc.tipo) {
      case "CRAF":
      case "CR":
        fimDate.setMonth(fimDate.getMonth() - 4);
        break;

      case "Guia de Trânsito":
        fimDate.setDate(fimDate.getDate() - 20);
        break;

      case "Filiação":
        fimDate.setDate(fimDate.getDate() - 10);
        break;
    }

    return fimDate;
  };

  const formatDate = (dateStr?: string | Date) => {
    if (!dateStr) return "";

    const date = dateStr instanceof Date ? dateStr : new Date(dateStr);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const calculateStatus = (doc: Document) => {
    if (!doc.fim) return "Desconhecido";

    const today = new Date();
    const fimDate = new Date(doc.fim);
    const avisoDate = calculateAviso(doc);

    if (today >= fimDate) return "Vencido";
    if (today >= avisoDate && today < fimDate) return "Próximo";

    return "Válido";
  };

  const filteredDocs = allDocuments.filter((doc) => {
    const status = calculateStatus(doc);

    const matchSearch =
      search === "" ||
      doc.nome.toLowerCase().includes(search.toLowerCase()) ||
      doc.cpfCnpj?.includes(search) ||
      doc.numeroDocumento?.includes(search) ||
      status.toLowerCase().includes(search.toLowerCase());

    const matchType = filterType === "" || doc.tipo === filterType;

    return matchSearch && matchType;
  });

  const getStatusColor = (status: string) => {
    if (status === "Válido") return "green";
    if (status === "Próximo") return "#FF4500";
    if (status === "Vencido") return "red";
    return "black";
  };

  // 🔹 URL do backend na nuvem
  const API_URL = "https://managerarms-backend-1.onrender.com/documents";

  const handleDelete = async (id: string, tipo: string) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este lançamento?");
    if (!confirmar) return;

    try {
      // 🔹 Deleta no backend
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro ao excluir documento");

      // Atualiza estado local
      switch (tipo) {
        case "CRAF":
          setCrafDocs?.((prev: Document[]) => prev.filter((doc) => doc.id !== id));
          break;
        case "CR":
          setCrDocs?.((prev: Document[]) => prev.filter((doc) => doc.id !== id));
          break;
        case "Guia de Trânsito":
          setGuiaDocs?.((prev: Document[]) => prev.filter((doc) => doc.id !== id));
          break;
        case "Filiação":
          setFiliacaoDocs?.((prev: Document[]) => prev.filter((doc) => doc.id !== id));
          break;
      }

      alert("Lançamento excluído com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir documento no servidor");
    }
  };

  return (
    <div style={{ width: "28.5cm", margin: "1rem auto", fontSize: "11px" }}>
      
      {/* PESQUISA */}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
        }}
      >
        <label
          style={{
            fontSize: "17px",
            fontWeight: "bold",
            width: "2cm",
          }}
        >
          Pesquisa
        </label>

        <input
          type="text"
          placeholder="Nome, CPF, documento ou status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "8cm", padding: "0.5rem" }}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ width: "4cm", padding: "0.5rem" }}
        >
          <option value="">Todos</option>
          <option value="CRAF">CRAF</option>
          <option value="CR">CR</option>
          <option value="Guia de Trânsito">G. Trânsito</option>
          <option value="Filiação">Filiação</option>
        </select>

        <button
          style={{
            height: "1cm",
            width: "2.8cm",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Pesquisar
        </button>
      </div>

      {filteredDocs.length > 0 && (
        <table
          style={{
            width: "28.5cm",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "3cm", textAlign: "left" }}>Documento</th>
              <th style={{ width: "6.7cm", textAlign: "left" }}>Nome</th>
              <th style={{ width: "3cm", textAlign: "left" }}>N° Documento</th>
              <th style={{ width: "3cm", textAlign: "left" }}>CPF/CNPJ</th>
              <th style={{ width: "2.5cm", textAlign: "left" }}>Telefone</th>
              <th style={{ width: "2cm", textAlign: "left" }}>Início</th>
              <th style={{ width: "2cm", textAlign: "left" }}>Fim</th>
              <th style={{ width: "2cm", textAlign: "left" }}>Aviso</th>
              <th style={{ width: "1.5cm", textAlign: "left" }}>Status</th>

              <th
                style={{
                  width: "2.5cm",
                  textAlign: "center",
                }}
              >
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredDocs.map((doc) => {
              const avisoDate = calculateAviso(doc);
              const avisoStr = formatDate(avisoDate);
              const status = calculateStatus(doc);
              const statusColor = getStatusColor(status);

              return (
                <tr key={doc.id}>
                  <td style={{ textAlign: "left" }}>{doc.tipo}</td>
                  <td style={{ textAlign: "left" }}>{doc.nome}</td>
                  <td style={{ textAlign: "left" }}>{doc.numeroDocumento}</td>
                  <td style={{ textAlign: "left" }}>{doc.cpfCnpj}</td>
                  <td style={{ textAlign: "left" }}>{doc.telefone}</td>
                  <td style={{ textAlign: "left" }}>{formatDate(doc.inicio)}</td>
                  <td style={{ textAlign: "left" }}>{formatDate(doc.fim)}</td>
                  <td style={{ textAlign: "left" }}>{avisoStr}</td>

                  <td
                    style={{
                      color: statusColor,
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {status}
                  </td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <button
                        onClick={() => setEditingDoc?.(doc)}
                        style={{
                          width: "1.7cm",
                          height: "0.5cm",
                          fontSize: "11px",
                          cursor: "pointer",
                          border: "1px solid blue",
                        }}
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDelete(doc.id, doc.tipo)}
                        style={{
                          width: "1.7cm",
                          height: "0.5cm",
                          fontSize: "11px",
                          cursor: "pointer",
                          border: "1px solid red",
                        }}
                      >
                        Excluir
                      </button>

                      <button
                        onClick={() => {
                          if (!doc.telefone) return alert("Sem telefone");

                          const phone = doc.telefone.replace(/\D/g, "");
                          const msg = `Olá ${doc.nome}, seu documento está próximo do vencimento.`;

                          window.open(
                            `https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`
                          );
                        }}
                        style={{
                          width: "1.7cm",
                          height: "0.5cm",
                          fontSize: "11px",
                          cursor: "pointer",
                          border: "1px solid #008000",
                        }}
                      >
                        Whatsapp
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DocumentCard;
