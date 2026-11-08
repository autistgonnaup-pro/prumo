Aqui está o histórico completo e o relatório de engenharia do seu projeto Prumo reestruturado, limpo e formatado profissionalmente. Ele conta a história exata do desenvolvimento, deixando claro o que ocorreu em cada fase de evolução. [1]

📑 Changelog e Histórico de Engenharia — Projeto Prumo

Todas as mudanças notáveis neste projeto estão documentadas neste arquivo. Este projeto adere estritamente ao Semantic Versioning. [1]

 - 2026-11-08 (Release Atual)


🎯 Visão Geral do Pivot de Escopo

Transformação completa do Prumo em um Engine Genérico de Desenvolvimento Humano e Infraestrutura de Rotina inspirado nas mecânicas clássicas de MMORPGs (Perfect World / D&D). O projeto abandonou o monitoramento de arquivos locais (v2.0.0) para se tornar uma aplicação offline-first flexível. Agora, o usuário final tem liberdade absoluta para instanciar suas próprias rotinas (como o Usuário X focado no Vestibular ou o Usuário A focado em Emagrecimento), enquanto o motor calcula o equilíbrio de carga, os estados e a evolução em classes no mundo real. [1]

✨ Novas Funcionalidades (Features)


🎮 O Motor Lógico de Atributos (engine.js)

• 6 Atributos Clássicos: Implementação dos atributos Força (FOR), Constituição (CON), Destreza (DES), Carisma (CAR), Inteligência (INT) e Sabedoria (SAB). [1]
• Mecânica Anti-Negligência (Regra do Piso 10): O motor exige um nível mínimo base de 10 pontos em todos os atributos para manter a estabilidade do sistema. [1]
• Debuff Visual Global (Prumo Torto): Se qualquer atributo cair abaixo de 10, o motor aplica a classe CSS .prumo-torto no container principal. O logotipo inclina 2 graus, as bordas pulsam em tom Terracota e os ganhos de bônus são congelados até que a rotina básica de manutenção da vida seja restaurada. [1]
• Sistema de Classes do Mundo Real: Manter a base estável e focar em atributos específicos calcula vetores que desbloqueiam profissões e estilos de vida reais de forma automática (ex: Erudito / Mago Acadêmico para foco em estudos; Atleta para foco em treinos e saúde). [1]

⚔️ Processamento de Missões (Loops de Engajamento)

• Dailies (Missões Diárias): Rotinas de resfriamento e manutenção biológica (sono, higiene, hidratação). Resetam automaticamente à meia-noite. [1]
• Weeklies (Missões Semanais): Grandes blocos de processamento em lote (Batch Processing) com data fixa (ex: finanças, limpeza do ambiente) para eliminar o atrito cognitivo e os vazamentos de memória mental. Resetam aos domingos. [1]
• Projetos (Masmorras): Objetivos de longo prazo estruturados com milestones (marcos) e pré-requisitos de nível de atributos para destravar a conclusão. [1]

🧠 Gestão de Recursos e Economia Interna

• Barra de Mana: Recurso que limita a execução de tarefas com alta carga de energia mental (como codificar).
• Tokens de Foco & Loja Real: Moedas adquiridas ao concluir missões. Podem ser trocadas na interface por recompensas físicas do mundo real configuradas pelo próprio usuário (ex: pausas, recompensas), automatizando o ciclo de dopamina de forma madura. [1]

 - 2026-11-03 (Release Descontinuada)


🎯 Visão Geral da Release

Implementação de uma infraestrutura local e experimental de Auditoria e Rastreabilidade de Arquivos (File Tracking System). O objetivo inicial era monitorar a criação e exclusão de arquivos no computador do desenvolvedor, salvando um histórico em nuvem para métricas de produtividade. [1]

🚨 Motivo da Descontinuação / Breaking Changes

• Mudança Crítica de Escopo: O monitoramento frio de arquivos foi totalmente removido para dar lugar ao motor de RPG de rotina real (v3.0.0). [1]
• Remoção de Código e Dependências: O script de monitoramento em segundo plano, o arquivo de lote .bat antigo e as dependências chokidar e dotenv foram removidos do ecossistema principal do projeto. A tabela arquivos_novos do Supabase foi arquivada. [1]

 - 2026-10-15 (MVP Inicial)


🎯 Visão Geral da Release

Construção do primeiro protótipo visual estático do Prumo. Consistia em uma interface mobile-first básica para validar a disposição dos elementos na tela (antigo banner de foco e barra de navegação inferior de 4 abas), utilizando autenticação simples por e-mail no Supabase. [1]

🛠️ Decisões de Engenharia e Arquitetura Atual (v3.0.0)


📂 Estrutura de Pastas Implementada

A engenharia do frontend foi isolada de forma modular e limpa dentro do diretório src/: [1]
• src/lib/prumo/constants.js: Centraliza os metadados de cores, siglas de atributos e regras do piso mínimo do motor.
• src/lib/prumo/initialData.js: Fábrica de dados e estado limpo para novos usuários da aplicação.
• src/lib/prumo/engine.js: Funções javascript puras, livres de renderização, que calculam debuffs, transição de níveis e liberação de classes.
• src/lib/prumo/storage.js: Camada de persistência local isolada para gerenciar o ciclo de salvamento no navegador.
• src/hooks/usePrumo.js: O cérebro em React que gerencia o estado da aplicação através de um useReducer estável, disparando ações e persistindo modificações em tempo real. [1]

🗄️ Modelagem do Estado Salvo (LocalStorage)

O estado persistido na chave unificada prumo:estado:v1 adota a seguinte arquitetura genérica de dados: [1]
json
{
  "meta": { "nome": "Jogador", "nivel": 1, "xp": 0, "xpProximo": 100 },
  "atributos": { "FOR": 10, "CON": 10, "DES": 10, "CAR": 10, "INT": 10, "SAB": 10 },
  "mana": 100,
  "manaMax": 100,
  "tokens": 0,
  "ultimoReset": { "daily": "2026-11-08", "weekly": "2026-11-08" },
  "missoes": [],
  "projetos": [],
  "tokensGastos": []
}
Use code with caution.
O histórico do seu projeto agora está perfeitamente claro, profissional e limpo! Diga-me qual será o próximo passo do desenvolvimento que deseja registrar ou codificar.
