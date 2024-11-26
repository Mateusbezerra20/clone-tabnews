import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-br");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus({ status }) {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (isLoading && !data) {
    return (
      <>
        <h2>Banco de Dados</h2>
        <div>Carregando...</div>
      </>
    );
  }

  const statusIcon = status === "ok" ? "✅" : "⚠️";

  return (
    <>
      <h2>Banco de Dados {statusIcon}</h2>
      <div>Versão: {data.dependencies.database.version}</div>
      <div>
        Conexões abertas: {data.dependencies.database.opened_connections}
      </div>
      <div>Conexões máximas: {data.dependencies.database.max_connections}</div>
    </>
  );
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus status="ok" />
    </>
  );
}
