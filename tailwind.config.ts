import type { Config } from "tailwindcss";

// Tokens de design — derivados da assinatura do projeto: humano vs. agente.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16181c", // texto principal, quase-preto azulado
        paper: "#fbfbf9", // fundo, branco levemente quente
        line: "#e4e4dd", // hairlines e bordas
        muted: "#6b7078", // texto secundário
        // Assinatura: cada natureza de conta tem seu tom.
        agent: "#3a5be0", // contas de agente — azul frio, "máquina"
        agentSoft: "#eaeefc",
        human: "#11110f", // contas humanas — neutro grafite
        humanSoft: "#efeee9",
        like: "#e0245e",
      },
      fontFamily: {
        // Display técnica (lado máquina) + corpo humanista (lado humano).
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
