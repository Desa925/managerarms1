import DocumentCard from './DocumentCard'

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h2>Controle de Documentos</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <DocumentCard
          name="CRAF"
          startDate="01/01/2026"
          endDate="01/01/2027"
          alertDays={120}
          titularNome="João da Silva"
          titularEndereco="Rua A, 123"
          titularCPF="123.456.789-00"
        />
        <DocumentCard
          name="CR"
          startDate="01/03/2026"
          endDate="01/03/2027"
          alertDays={120}
          titularNome="Carlos Pereira"
          titularEndereco="Av. B, 456"
          titularCPF="234.567.890-12"
        />
        <DocumentCard
          name="GUIA DE TRÂNSITO"
          startDate="01/05/2026"
          endDate="31/05/2026"
          alertDays={20}
          titularNome="Empresa XYZ"
          titularEndereco="Rua C, 789"
          titularCPF="12.345.678/0001-99"
        />
        <DocumentCard
          name="FILIAÇÃO"
          startDate="17/05/2026"
          endDate="17/05/2027"
          alertDays={10}
          titularNome="Maria Oliveira"
          titularEndereco="Av. D, 101"
          titularCPF="987.654.321-00"
        />
      </div>
    </main>
  )
}
