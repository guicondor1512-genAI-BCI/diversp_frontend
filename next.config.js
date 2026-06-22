/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Sem rewrite de /api aqui: o API Gateway (nginx) é quem roteia /api/* para o
  // serviço `api`. As chamadas do browser usam caminhos relativos e passam pelo
  // gateway; o fetch em Server Components fala direto com a API pela rede interna
  // (API_BASE_URL), sem sair pelo gateway.
};
module.exports = nextConfig;
