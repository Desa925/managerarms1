import React, { useEffect, useState } from "react";

interface DocumentFormProps {
  setCrafDocs: any;
  setCrDocs: any;
  setGuiaDocs: any;
  setFiliacaoDocs: any;

  editingDoc: any;
  setEditingDoc: any;
}

const formatDate = (date: any) => {
  if (!date) return "";
  return date.toString().slice(0, 10); // 🔥 garante YYYY-MM-DD
};

const DocumentForm: React.FC<DocumentFormProps> = ({
  setCrafDocs,
  setCrDocs,
  setGuiaDocs,
  setFiliacaoDocs,
  editingDoc,
  setEditingDoc,
}) => {
  const [tipo, setTipo] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [nome, setNome] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");

  // 🔥 Preenche corretamente ao editar
  useEffect(() => {
    if (editingDoc) {
      setTipo(editingDoc.tipo || "");
      setInicio(formatDate(editingDoc.inicio));
      setFim(formatDate(editingDoc.fim));
      setNome(editingDoc.nome || "");
      setNumeroDocumento(editingDoc.numeroDocumento || "");
      setCpfCnpj(editingDoc.cpfCnpj || "");
      setTelefone(editingDoc.telefone || "");
    }
  }, [editingDoc]);

  const limparCampos = () => {
    setTipo("");
    setInicio("");
    setFim("");
    setNome("");
    setNumeroDocumento("");
    setCpfCnpj("");
    setTelefone("");
    setEditingDoc(null);
  };

  const API_URL = "https://managerarms-backend-1.onrender.com/documents";

  const handleAddDocument = async () => {
    if (!tipo || !nome) {
      alert("Tipo e Nome são obrigatórios");
      return;
    }

    const novoDoc = {
      tipo,
      inicio,
      fim,
      nome,
      numeroDocumento,
      cpfCnpj,
      telefone,
    };

    try {
      if (editingDoc) {
        const response = await fetch(`${API_URL}/${editingDoc.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novoDoc),
        });

        if (!response.ok) throw new Error("Erro ao atualizar documento");

        const updatedDoc = await response.json();

        const updateDocs = (setter: any) => {
          setter((prev: any[]) =>
            prev.map((doc) => (doc.id === editingDoc.id ? updatedDoc : doc))
          );
        };

        switch (tipo) {
          case "CRAF":
            updateDocs(setCrafDocs);
            break;
          case "CR":
            updateDocs(setCrDocs);
            break;
          case "Guia de Trânsito":
            updateDocs(setGuiaDocs);
            break;
          case "Filiação":
            updateDocs(setFiliacaoDocs);
            break;
        }

        alert("Documento atualizado com sucesso!");

        // 🔥 IMPORTANTE: limpar só depois de tudo processado
        setTimeout(() => limparCampos(), 0);

        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoDoc),
      });

      if (!response.ok) throw new Error("Erro ao criar documento");

      const createdDoc = await response.json();

      switch (tipo) {
        case "CRAF":
          setCrafDocs((prev: any[]) => [...prev, createdDoc]);
          break;
        case "CR":
          setCrDocs((prev: any[]) => [...prev, createdDoc]);
          break;
        case "Guia de Trânsito":
          setGuiaDocs((prev: any[]) => [...prev, createdDoc]);
          break;
        case "Filiação":
          setFiliacaoDocs((prev: any[]) => [...prev, createdDoc]);
          break;
      }

      limparCampos();
      alert("Documento salvo com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar documento no servidor");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        {editingDoc ? "Editar Documento" : "Cadastro de Documento"}
      </h2>

      <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label>Tipo de Documento:</label>

          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="">Selecione</option>
            <option value="CRAF">CRAF</option>
            <option value="CR">CR</option>
            <option value="Guia de Trânsito">Guia de Trânsito</option>
            <option value="Filiação">Filiação</option>
          </select>

          <label>Início:</label>
          <input type="date" value={inicio} onChange={(e) => setInicio(e.target.value)} />

          <label>Fim:</label>
          <input type="date" value={fim} onChange={(e) => setFim(e.target.value)} />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
          <label>Nome do Titular:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} style={{ width: "100%" }} />

          <label>N° do Documento:</label>
          <input type="text" maxLength={15} value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} style={{ width: "100%" }} />

          <button style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }} onClick={handleAddDocument}>
            {editingDoc ? "Salvar Alterações" : "Adicionar Documento"}
          </button>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label>CPF/CNPJ do Titular:</label>
          <input type="text" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} />

          <label>Telefone do Titular:</label>
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;

