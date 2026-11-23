import { Questao } from "./types";

/**
 * Questões do "Questionário 2025" (132, em um único grupo), do catálogo real
 * do backend: backend/prisma/seeds/data/050_questionnaire_2025_questions.data.js
 * (questionário de estaleiros, na ordem da planilha).
 *
 * As RESPOSTAS são ILUSTRATIVAS: a Dock Brasil não tem submissão na seed
 * de 2025. Onde a pergunta tem o mesmo enunciado de 2024, foi reaproveitada
 * a resposta de 2024; as perguntas novas ficam em branco. "obrigatoria" é
 * true nas questões com resposta (a seed não traz esse campo).
 *
 * Gerado sem edição manual.
 */
export const questoes2025: Questao[] = [
  {
    "id": "q1",
    "numero": 1,
    "codigo": "E_META_TIMESTAMP",
    "texto": "Carimbo de data/hora",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q2",
    "numero": 2,
    "codigo": "E_META_RESPONDENT_NAME",
    "texto": "Nome do respondente",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q3",
    "numero": 3,
    "codigo": "E_META_CONTACT_EMAIL",
    "texto": "E-mail para contato",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q4",
    "numero": 4,
    "codigo": "E_META_CONTACT_PHONE",
    "texto": "Telefone para contato",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q5",
    "numero": 5,
    "codigo": "E001",
    "texto": "Nome do estaleiro ou instalação de reciclagem",
    "obrigatoria": true,
    "tipo": "texto",
    "resposta": "Dock Brasil Engenharia e Serviços S.A."
  },
  {
    "id": "q6",
    "numero": 6,
    "codigo": "E002",
    "texto": "Localização do estaleiro ou instalação de reciclagem (endereço completo)",
    "obrigatoria": true,
    "tipo": "texto",
    "resposta": "Rua Manuel Duarte, lotes 5 e 6 - Gradim - São Gonçalo - CEP 24350-500"
  },
  {
    "id": "q7",
    "numero": 7,
    "codigo": "E003",
    "texto": "Principais tipos de atividades do estaleiro ou instalação de reciclagem?",
    "obrigatoria": true,
    "tipo": "multipla_escolha",
    "opcoes": [
      "Construção",
      "Reparo",
      "Reciclagem"
    ],
    "resposta": [
      "Reparo",
      "Reciclagem"
    ]
  },
  {
    "id": "q8",
    "numero": 8,
    "codigo": "E004",
    "texto": "Qual é a taxa média de ocupação do estaleiro ou instalação de reciclagem em cada uma das atividades? (Construção, Reparo ou Reciclagem)",
    "obrigatoria": true,
    "tipo": "texto",
    "resposta": "100% e reciclagem ainda sem operação"
  },
  {
    "id": "q9",
    "numero": 9,
    "codigo": "E005",
    "texto": "Descreva seu conhecimento em relação às oportunidades para o mercado de descomissionamento e reciclagem de ativos marítimos offshore.",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "5"
  },
  {
    "id": "q10",
    "numero": 10,
    "codigo": "E006",
    "texto": "Qual é o interesse em atender este mercado que está se desenvolvendo no Brasil?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "5"
  },
  {
    "id": "q11",
    "numero": 11,
    "codigo": "E007",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de normas ISO?",
    "obrigatoria": true,
    "tipo": "multipla_escolha",
    "opcoes": [
      "9.001",
      "14.001",
      "18.000",
      "30.000",
      "31.000",
      "45.001",
      "Outros(text)"
    ],
    "resposta": []
  },
  {
    "id": "q12",
    "numero": 12,
    "codigo": "E008",
    "texto": "O estaleiro ou instalação de reciclagem já possui associação ou tem interesse em se associar a uma siderúrgica em seus projetos de desmantelamento?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q13",
    "numero": 13,
    "codigo": "E009",
    "texto": "O estaleiro ou instalação de reciclagem já possui ou deseja se associar com compradores a dinheiro (cash buyers) como forma de aquisição de empreendimentos?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q14",
    "numero": 14,
    "codigo": "E010",
    "texto": "O estaleiro ou instalação de reciclagem já atuou em algum projeto de descomissionamento (apoio e recebimento de estruturas), reciclagem de instalações marítimas offshore (navios mercantes, militares e O&G)?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q15",
    "numero": 15,
    "codigo": "E011",
    "texto": "Quais projetos foram desenvolvidos?",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q16",
    "numero": 16,
    "codigo": "E012",
    "texto": "Existem berços ou píeres disponíveis para operações de atracação temporária de plataformas de petróleo por longo prazo (>1 ano)?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q17",
    "numero": 17,
    "codigo": "E013",
    "texto": "Quais são as necessidades para a atracação no estaleiro ou instalação de reciclagem? Existe alguma necessidade específica para atração de plataformas do tipo: SemiSubmersível (SS), fixa e FPSO?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Calado 6m"
  },
  {
    "id": "q18",
    "numero": 18,
    "codigo": "E014",
    "texto": "O estaleiro dispõe ou tem interesse em dispor de frente de cais que permita o recebimento de instalações marítimas por meio de balsa de flutuação com meios de movimentação da embarcação para pátio seco?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q19",
    "numero": 19,
    "codigo": "E015",
    "texto": "Existe a possibilidade de realizar um pré-desmantelamento de superestruturas, descontaminação e remoção de equipamentos no estaleiro ou instalação de reciclagem enquanto atracado no píer ou berço? Explicitar.",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q20",
    "numero": 20,
    "codigo": "E016",
    "texto": "Existe retroárea disponível para receber, armazenar e movimentar equipamentos oriundos das plataformas no estaleiro ou instalação de reciclagem?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q21",
    "numero": 21,
    "codigo": "E017",
    "texto": "Quais tipos de instalações offshore oriundas do descomissionamento poderiam ser recebidas neste estaleiro ou instalação de reciclagem (FPSO; Semi Submersível - SS; Plataforma Fixa)? Informar as dimensões e o calado máximo possível de ser recebido.",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "As estruturas adequadas para o calado de 6 metros. Em caso de grandes obras, pode ser viável o investimento em dragagem para aumentar a profundidade."
  },
  {
    "id": "q22",
    "numero": 22,
    "codigo": "E018",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de quais das seguintes infraestruturas aplicadas a reciclagem?",
    "obrigatoria": true,
    "tipo": "multipla_escolha",
    "opcoes": [
      "Carreira",
      "Dique seco",
      "Dique flutuante",
      "Rampa",
      "Cais",
      "Guindaste",
      "Píer para embarcações"
    ],
    "resposta": [
      "Carreira",
      "Dique flutuante",
      "Cais",
      "Guindaste"
    ]
  },
  {
    "id": "q23",
    "numero": 23,
    "codigo": "E019",
    "texto": "Caso o estaleiro ou instalação de reciclagem não disponha de dique, existe interesse na construção desta infraestrutura para atendimento ao mercado de reciclagem de instalações marítimas offshore? Quais são as razões para a decisão?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "O estaleiro possui atualmente 1 dique flutuante com capacidade para 5.800 toneladas. A possibilidade de investir em um ou mais diques flutuantes adicionais seria uma estratégia vantajosa para consolidar o estaleiro como uma instalação de referência em reciclagem offshore, fortalecendo sua competitividade e criando novas oportunidades de receita. Além disso, esse investimento permitiria ampliar o atendimento à crescente demanda do setor, com benefícios adicionais em sustentabilidade e responsabilidade ambiental."
  },
  {
    "id": "q24",
    "numero": 24,
    "codigo": "E020",
    "texto": "Caso o estaleiro ou instalação de reciclagem não disponha de rampa, existe algum interesse na construção desta infraestrutura para atendimento do mercado de reciclagem de instalações marítimas offshore? Quais são as razões para a decisão?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Nosso sistema atual permite operações de load in/out o que substitui a rampa."
  },
  {
    "id": "q25",
    "numero": 25,
    "codigo": "E021",
    "texto": "O estaleiro ou instalação de reciclagem tem interesse em atuar neste mercado com alguma empresa parceira? A atuação seria focada na prestação de serviços de corte de estruturas ou também tem interesse na compra de ativos para a reciclagem?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Apenas corte de estruturas."
  },
  {
    "id": "q26",
    "numero": 26,
    "codigo": "E022",
    "texto": "Quais são os métodos de reciclagem de embarcações que o estaleiro ou instalação de reciclagem está apto a desenvolver de imediato?",
    "obrigatoria": true,
    "tipo": "texto",
    "resposta": "Dique flutuante, Alongside (no berço), Carreira"
  },
  {
    "id": "q27",
    "numero": 27,
    "codigo": "E022_LIKERT",
    "texto": "Em uma escala Likert de 1 (nenhuma capacidade) a 5 (capacidade plena), como avalia a capacidade atual do estaleiro ou instalação de reciclagem para desenvolver métodos de reciclagem de embarcações de imediato?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": ""
  },
  {
    "id": "q28",
    "numero": 28,
    "codigo": "E023",
    "texto": "Quais são os métodos de corte de estruturas podem ser aplicados do estaleiro ou instalação de reciclagem?",
    "obrigatoria": true,
    "tipo": "texto",
    "resposta": "Corte a quente: oxicorte"
  },
  {
    "id": "q29",
    "numero": 29,
    "codigo": "E024",
    "texto": "O estaleiro ou instalação de reciclagem possui área impermeabilizada com drenagem de efluentes?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q30",
    "numero": 30,
    "codigo": "E025",
    "texto": "Qual é a dimensão (m²)?",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "20000"
  },
  {
    "id": "q31",
    "numero": 31,
    "codigo": "E026",
    "texto": "O estaleiro ou instalação de reciclagem possui área impermeabilizada para o manuseio, operações de limpeza e armazenamento temporário de materiais contaminados com hidrocarbonetos?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q32",
    "numero": 32,
    "codigo": "E027",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de serviço de fornecimento de água industrial para o processo de limpeza das instalações offshore?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q33",
    "numero": 33,
    "codigo": "E028",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de serviço de recepção, armazenamento e/ou tratamento de água de lastro?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": ""
  },
  {
    "id": "q34",
    "numero": 34,
    "codigo": "E029",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de fornecimento de energia para embarcação atracada no píer ou berço - shore power?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q35",
    "numero": 35,
    "codigo": "E030",
    "texto": "Qual a potência em (kW) disponível para o atendimento das instalações para shore power?",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "1.000 KW"
  },
  {
    "id": "q36",
    "numero": 36,
    "codigo": "E031",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de facilidades e fornecimento de serviço para remoção de coral-sol no casco de embarcações?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q37",
    "numero": 37,
    "codigo": "E032",
    "texto": "O estaleiro ou instalação de reciclagem tem capacidade técnica e operacional para realizar o desmantelamento e a destinação adequada de resíduos e materiais para reciclagem? Explicitar.",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "O estaleiro atende o desmantelo e destinação das tipologias de resíduos"
  },
  {
    "id": "q38",
    "numero": 38,
    "codigo": "E033",
    "texto": "O estaleiro ou instalação de reciclagem já teve contato com alguma atividade de reciclagem completa de embarcações?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q39",
    "numero": 39,
    "codigo": "E034",
    "texto": "Relate a sua experiência.",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q40",
    "numero": 40,
    "codigo": "E035",
    "texto": "O estaleiro ou instalação de reciclagem possui capacitação e/ou treinamento técnico em caso de sinistro (incêndio, explosão, vazamento, entre outros) para a atividade de reciclagem? Explicitar.",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Sim. A operação do estaleiro de reparos é similar à atividade de desmantelamento e os exercícios (drills) de segurança são adequados."
  },
  {
    "id": "q41",
    "numero": 41,
    "codigo": "E036",
    "texto": "O estaleiro ou instalação de reciclagem possui redes de drenagens e coleta de efluentes na retroárea, berços, píers, rampas e carreiras? Explicitar.",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q42",
    "numero": 42,
    "codigo": "E037",
    "texto": "O estaleiro ou instalação de reciclagem tem condições de trabalhar simultaneamente nas atividades de construção, reparo e reciclagem? Explicar as razões.",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Temos condições de atuar nos segmentos simultaneamente, mas depende do volume das atividades."
  },
  {
    "id": "q43",
    "numero": 43,
    "codigo": "E038",
    "texto": "Se a resposta a pergunta 37 for 'Sim', explicitar quais infraestruturas podem ser utilizadas de maneira combinada.",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q44",
    "numero": 44,
    "codigo": "E039",
    "texto": "Se a resposta para a pergunta 37 for 'Não', explique as razões.",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q45",
    "numero": 45,
    "codigo": "E040",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de acesso ferroviário?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q46",
    "numero": 46,
    "codigo": "E041",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de acesso rodoviário?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q47",
    "numero": 47,
    "codigo": "E042",
    "texto": "No entorno do estaleiro ou instalação de reciclagem existem usinas siderúrgicas?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q48",
    "numero": 48,
    "codigo": "E043",
    "texto": "Quais são as usinas integradas à malha ferroviária e qual a distância média do estaleiro ou instalação de reciclagem em relação a elas? Existe integração direta da malha ferroviária com a usina?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": ""
  },
  {
    "id": "q49",
    "numero": 49,
    "codigo": "E044",
    "texto": "Profundidade (m) do canal de acesso",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "6,0m"
  },
  {
    "id": "q50",
    "numero": 50,
    "codigo": "E045",
    "texto": "Largura (m) do canal de acesso",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "50m"
  },
  {
    "id": "q51",
    "numero": 51,
    "codigo": "E046",
    "texto": "Calado (m) permitido para os navios junto a instalação",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "6m"
  },
  {
    "id": "q52",
    "numero": 52,
    "codigo": "E047",
    "texto": "Amplitude de maré (m) no canal de acesso",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "1,4m"
  },
  {
    "id": "q53",
    "numero": 53,
    "codigo": "E048",
    "texto": "Máxima amplitude na maré de sizígia (m)",
    "obrigatoria": false,
    "tipo": "numero",
    "resposta": ""
  },
  {
    "id": "q54",
    "numero": 54,
    "codigo": "E049",
    "texto": "Restrições de acesso no canal (ponte (altura), dutos no fundo e pedras no fundo do canal).",
    "obrigatoria": true,
    "tipo": "texto",
    "resposta": "Ponte Rio-Niterói"
  },
  {
    "id": "q55",
    "numero": 55,
    "codigo": "E050",
    "texto": "Previsão de dragagem (período) e aprofundamento de canal (m); frequência de dragagem (vezes por ano).",
    "obrigatoria": true,
    "tipo": "texto",
    "resposta": "Não"
  },
  {
    "id": "q56",
    "numero": 56,
    "codigo": "E051",
    "texto": "Número de berços de atracação.",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "Temos 130m de cais com 2 laterais de 30m cada. Total de 190m"
  },
  {
    "id": "q57",
    "numero": 57,
    "codigo": "E052",
    "texto": "Comprimento (m) médio dos berços de atracação.",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "Temos 130m de cais com 2 laterais de 30m cada. Total de 190m"
  },
  {
    "id": "q58",
    "numero": 58,
    "codigo": "E053",
    "texto": "Comprimento (m) máximo dos berços de atracação",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "Temos 130m de cais com 2 laterais de 30m cada. Total de 190m"
  },
  {
    "id": "q59",
    "numero": 59,
    "codigo": "E054",
    "texto": "Profundidade média dos berços (m).",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "6,0m"
  },
  {
    "id": "q60",
    "numero": 60,
    "codigo": "E055",
    "texto": "Número de píeres",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "0"
  },
  {
    "id": "q61",
    "numero": 61,
    "codigo": "E056",
    "texto": "Profundidade média dos píeres (m).",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "0"
  },
  {
    "id": "q62",
    "numero": 62,
    "codigo": "E057",
    "texto": "Comprimento (m) máximo dos píeres de atracação.",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "0"
  },
  {
    "id": "q63",
    "numero": 63,
    "codigo": "E058",
    "texto": "Qual é o número de cabeços disponível para amarração?",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "5 cabeços"
  },
  {
    "id": "q64",
    "numero": 64,
    "codigo": "E059",
    "texto": "Área da retroárea (m²).",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "20.000 m2"
  },
  {
    "id": "q65",
    "numero": 65,
    "codigo": "E060",
    "texto": "Taxa de ocupação média da retroárea existente (%).",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "0.3"
  },
  {
    "id": "q66",
    "numero": 66,
    "codigo": "E061",
    "texto": "Qual o status dos equipamentos disponíveis para a operação do estaleiro ou instalação de reciclagem em termos de guindastes e outras infraestruturas?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Funcional",
      "Necessidade de Investimentos: alto",
      "Necessidade de Investimentos: médio"
    ],
    "resposta": "Funcional"
  },
  {
    "id": "q67",
    "numero": 67,
    "codigo": "E062",
    "texto": "Em caso de estarem funcionais, na questão anterior, qual é a capacidade de içamento desses guindastes?",
    "obrigatoria": true,
    "tipo": "numero",
    "resposta": "120 ton e 70 ton"
  },
  {
    "id": "q68",
    "numero": 68,
    "codigo": "E063",
    "texto": "Os equipamentos estão operacionais para iniciar uma atividade de desmantelamento de imediato?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q69",
    "numero": 69,
    "codigo": "E064",
    "texto": "O que falta para estar apto para iniciar?",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q70",
    "numero": 70,
    "codigo": "E065",
    "texto": "O cais dispõe de formas para fornecer meios de ajuste de tensionamento através do cais?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q71",
    "numero": 71,
    "codigo": "E066",
    "texto": "Explicite.",
    "obrigatoria": true,
    "tipo": "texto",
    "resposta": "?"
  },
  {
    "id": "q72",
    "numero": 72,
    "codigo": "E067",
    "texto": "Existem restrições de obra de arte (pontes, vãos de pilares, etc) que podem impactar nas movimentações de pequenos blocos de estruturas marítimas nas vias próximas ao estaleiro ou instalação de reciclagem?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q73",
    "numero": 73,
    "codigo": "E068",
    "texto": "Em termos da relação estaleiro ou instalação de reciclagem x cidade, como seria classificado o relacionamento com a comunidade no entorno?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "O estaleiro já possui um compromisso firme com a contratação local. Com a oportunidade do desmantelamento, haverá um aumento na demanda por mão de obra, o que beneficiará diretamente a comunidade local. Além disso, a comunidade poderá se beneficiar de práticas sustentáveis que visem reduzir a poluição e melhorar a qualidade de vida, por meio da implementação de programas de responsabilidade social e ambiental."
  },
  {
    "id": "q74",
    "numero": 74,
    "codigo": "E069",
    "texto": "Na sua percepção, considerando o status da relação estaleiro ou instalação de reciclagem x cidade, como a comunidade no entorno reagiria a atividades de desmantelamento de embarcações na sua área de influência?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Muitos membros da comunidade podem ver o desmantelamento como uma oportunidade de emprego, especialmente se o estaleiro continuar comprometido a contratar localmente e investir em capacitação técnica. No entanto, também podem surgir preocupações significativas em relação aos impactos ambientais e sociais associados. Questões como aumento do ruído, tráfego de veículos e poluição podem gerar resistência entre os moradores, principalmente se não houver um planejamento adequado para mitigar esses efeitos. A percepção de que o estaleiro não está cuidando do meio ambiente pode levar à desconfiança e oposição. Portanto, é crucial que o estaleiro promova um diálogo aberto com a comunidade, esclarecendo os benefícios do desmantelamento e as medidas que estão sendo tomadas para minimizar os impactos negativos."
  },
  {
    "id": "q75",
    "numero": 75,
    "codigo": "E069_LIKERT",
    "texto": "Em uma escala Likert de 1 (reação muito desfavorável) a 5 (reação muito favorável), como prevê a reação da comunidade do entorno às atividades de desmantelamento de embarcações na área de influência do estaleiro ou instalação de reciclagem?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": ""
  },
  {
    "id": "q76",
    "numero": 76,
    "codigo": "E070",
    "texto": "Na sua percepção, a atuação política dos Stakeholders, por exemplo, sindicatos, associação de classe, entre outros, podem impactar na atividade de reciclagem junto a seu estaleiro ou instalação de reciclagem?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q77",
    "numero": 77,
    "codigo": "E071",
    "texto": "Há hospitais e/ou redes de assistência de saúde de emergência próximas?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q78",
    "numero": 78,
    "codigo": "E072",
    "texto": "Se a resposta a pergunta anterior for 'Sim', explicite.",
    "obrigatoria": true,
    "tipo": "texto",
    "resposta": "Hospital e Clinica são Gonçalo, Hospital Geral Alberto Torres"
  },
  {
    "id": "q79",
    "numero": 79,
    "codigo": "E073_A",
    "texto": "Qual é o conhecimento do estaleiro ou instalação de reciclagem em relação as normativas associadas ao descomissionamento e reciclagem de ativos marítimos offshore? [a) Resolução ANP n. 817/2020]",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "4"
  },
  {
    "id": "q80",
    "numero": 80,
    "codigo": "E073_B",
    "texto": "Qual é o conhecimento do estaleiro ou instalação de reciclagem em relação as normativas associadas ao descomissionamento e reciclagem de ativos marítimos offshore? [b) Convenção de Basileia]",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "4"
  },
  {
    "id": "q81",
    "numero": 81,
    "codigo": "E073_C",
    "texto": "Qual é o conhecimento do estaleiro ou instalação de reciclagem em relação as normativas associadas ao descomissionamento e reciclagem de ativos marítimos offshore? [c) Convenção de Hong Kong para a reciclagem ambientalmente correta de navios (IMO, 2023)]",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "4"
  },
  {
    "id": "q82",
    "numero": 82,
    "codigo": "E073_D",
    "texto": "Qual é o conhecimento do estaleiro ou instalação de reciclagem em relação as normativas associadas ao descomissionamento e reciclagem de ativos marítimos offshore? [d) IMO MEPC.210(63)]",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": ""
  },
  {
    "id": "q83",
    "numero": 83,
    "codigo": "E073_E",
    "texto": "Qual é o conhecimento do estaleiro ou instalação de reciclagem em relação as normativas associadas ao descomissionamento e reciclagem de ativos marítimos offshore? [e) Regulamento Europeu (1257/2013)]",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "4"
  },
  {
    "id": "q84",
    "numero": 84,
    "codigo": "E073_F",
    "texto": "Qual é o conhecimento do estaleiro ou instalação de reciclagem em relação as normativas associadas ao descomissionamento e reciclagem de ativos marítimos offshore? [f) Projeto de Lei n. 1584/2021 - para a reciclagem de navios no Brasil]",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "4"
  },
  {
    "id": "q85",
    "numero": 85,
    "codigo": "E073_G",
    "texto": "Qual é o conhecimento do estaleiro ou instalação de reciclagem em relação as normativas associadas ao descomissionamento e reciclagem de ativos marítimos offshore? [g) Lei Estadual n. 10028/2023 - Atividades relacionadas ao desmantelamento de embarcações e ativos marítimos offshore no Estado do Rio de Janeiro]",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "4"
  },
  {
    "id": "q86",
    "numero": 86,
    "codigo": "E073_H",
    "texto": "Qual é o conhecimento do estaleiro ou instalação de reciclagem em relação as normativas associadas ao descomissionamento e reciclagem de ativos marítimos offshore? [h) NR37 de 2022: Segurança e Saúde em Plataformas de Petróleo]",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "4"
  },
  {
    "id": "q87",
    "numero": 87,
    "codigo": "E073_I",
    "texto": "Qual é o conhecimento do estaleiro ou instalação de reciclagem em relação as normativas associadas ao descomissionamento e reciclagem de ativos marítimos offshore? [i) NR34 de 2017: Condições e meio ambiente de trabalho na indústria da construção, reparação e desmonte naval]",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "4"
  },
  {
    "id": "q88",
    "numero": 88,
    "codigo": "E074",
    "texto": "A instalação possui um Plano de Instalação de Reciclagem de Navios (Ship Recycling Facility Plan)?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": ""
  },
  {
    "id": "q89",
    "numero": 89,
    "codigo": "E075",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de licenciamento para a movimentação de resíduos (listados a seguir)?",
    "obrigatoria": true,
    "tipo": "multipla_escolha",
    "opcoes": [
      "Amianto",
      "Cádmio e seus compostos",
      "Cromo hexavalente e seus compostos",
      "Chumbo e seus compostos",
      "Mercúrio e seus compostos",
      "Bifenilas policloradas (PCBs)",
      "Bifenilas polibromadas (PBBs)",
      "Éteres difenilas polibromadas (PBDEs)",
      "Ácido perfluorooctano sulfônico (PFOS)",
      "Hexabromociclododecano (HBCD)",
      "Naftalenos policlorados (com mais de 2 átomos de cloro)",
      "Certas parafinas cloradas de cadeia curta (10 a 13 carbonos)",
      "Resíduos de hidrocarbonetos",
      "Borras de petróleo",
      "Substâncias que destroem a camada de ozônio",
      "Anti-incrustantes: biocidas (organoestânicos)",
      "Cibutrina",
      "Nenhum dos listados acima"
    ],
    "resposta": [
      "Amianto",
      "Cádmio e seus compostos",
      "Cromo hexavalente e seus compostos",
      "Chumbo e seus compostos",
      "Mercúrio e seus compostos",
      "Bifenilas policloradas (PCBs)",
      "Bifenilas polibromadas (PBBs)",
      "Éteres difenilas polibromadas (PBDEs)",
      "Ácido perfluorooctano sulfônico (PFOS)",
      "Hexabromociclododecano (HBCD)",
      "Naftalenos policlorados (com mais de 2 átomos de cloro)",
      "Certas parafinas cloradas de cadeia curta (10 a 13 carbonos)",
      "Resíduos de hidrocarbonetos",
      "Borras de petróleo",
      "Substâncias que destroem a camada de ozônio",
      "Anti-incrustantes: biocidas (organoestânicos)",
      "Cibutrina"
    ]
  },
  {
    "id": "q90",
    "numero": 90,
    "codigo": "E076",
    "texto": "Qual é a validade da licença ambiental de operação? Qual é a quantidade de resíduos (t) que estão autorizados de serem movimentados na licença de operação?",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q91",
    "numero": 91,
    "codigo": "E077",
    "texto": "Quais são as atividades previstas na licença de operação (LO)?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "BASE DE APOIO PARA ATRACAÇÃO DE DIQUES FLUTUANTES COM ATIVIDADE DE REPARO NAVAL, ATRACAÇÃO DE PEQUENAS EMBARCAÇÕES PARA REPARO NAVAL INTERNO, ESTOCAGEM DE MATERIAIS E EQUIPAMENTOS AFINS, GUARDA DE PEQUENAS EMBARCAÇÕES EM SOLO E GERENCIAMENTO DE RESÍDUOS"
  },
  {
    "id": "q92",
    "numero": 92,
    "codigo": "E078",
    "texto": "A atividade de desmantalamento e reciclagem de instalações marítimas está prevista na licença de operação (LO)?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": ""
  },
  {
    "id": "q93",
    "numero": 93,
    "codigo": "E079",
    "texto": "Existe o interesse ou alguma ação para a solicitação?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": ""
  },
  {
    "id": "q94",
    "numero": 94,
    "codigo": "E080",
    "texto": "O estaleiro dispõe em sua Licença de Operação (LO) autorização para o descarte de efluentes, tais como efluentes sanitários e água do interior da embarcação?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": ""
  },
  {
    "id": "q95",
    "numero": 95,
    "codigo": "E081",
    "texto": "Qual o limite máximo de carbono orgânico total determinado na licença?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Não há regramento para este quesito na LO"
  },
  {
    "id": "q96",
    "numero": 96,
    "codigo": "E082",
    "texto": "Listar os efluentes citados na licença de operação e a forma de tratamento e/ou descarte licenciados.",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Efluentes Sanitários: tratamento por Fossa-Septica Efluente de hidrojateamento: tratamento por Filtragem composta por hidrociclone, carvão ativo e filtro."
  },
  {
    "id": "q97",
    "numero": 97,
    "codigo": "E083",
    "texto": "Qual a percepção do estaleiro ou instalação de reciclagem em relação ao PL n. 1584/2021 que trata da reciclagem de navios no Brasil? A falta de uma lei específica pode ser um problema para execução da atividade de reciclagem de embarcações? Explicitar as razões.",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "O Projeto de Lei n. 1584/2021, que propõe regulamentar a reciclagem de navios no Brasil, é visto como uma medida positiva pelos estaleiros e instalações de reciclagem. Eles tendem a perceber a criação de uma lei específica como essencial para estabelecer diretrizes claras e consistentes, o que beneficiaria a segurança jurídica e facilitaria o cumprimento das normas internacionais, como a Convenção de Hong Kong para Reciclagem Segura e Ambientalmente Adequada de Navios. A falta de uma lei específica de reciclagem de navios é, de fato, um problema para a execução dessas atividades. Sem uma regulamentação, os estaleiros podem enfrentar insegurança jurídica e dificuldades no licenciamento ambiental e no cumprimento de exigências de segurança e sustentabilidade, o que pode desmotivar os investidores e operadores do setor. Além disso, a ausência de normas específicas dificulta o controle e a fiscalização das atividades, aumentando os riscos de acidentes e de poluição ambiental por substâncias tóxicas e resíduos perigosos presentes nas embarcações. A regulamentação estabelecida pelo PL 1584/2021 poderia fornecer padrões mais rigorosos para o manejo e descarte seguro de resíduos, prevenir práticas prejudiciais e apoiar a profissionalização e a sustentabilidade da reciclagem naval no país, tornando-a mais atrativa para empresas interessadas em atuar no setor de maneira responsável."
  },
  {
    "id": "q98",
    "numero": 98,
    "codigo": "E084",
    "texto": "Existe algum plano de monitoramento de espécies exóticas marinhas no estaleiro ou instalação de reciclagem?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não",
      "Não se aplica"
    ],
    "resposta": "Não"
  },
  {
    "id": "q99",
    "numero": 99,
    "codigo": "E085",
    "texto": "Como é realizado o monitoramento?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Não é feito."
  },
  {
    "id": "q100",
    "numero": 100,
    "codigo": "E086",
    "texto": "Na área do entorno do estaleiro ou instalação de reciclagem já foram identificadas colônias de coral-sol?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q101",
    "numero": 101,
    "codigo": "E087",
    "texto": "Existe alguma restrição por parte dos órgãos ambientais em relação a bioincrustação em cascos de embarcações que atracam no estaleiro ou instalação de reciclagem?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q102",
    "numero": 102,
    "codigo": "E088",
    "texto": "Quais? E existe a necessidade de casco limpo para atracação no estaleiro ou instalação de reciclagem?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não",
      "Não se aplica"
    ],
    "resposta": ""
  },
  {
    "id": "q103",
    "numero": 103,
    "codigo": "E089",
    "texto": "O estaleiro ou instalação de reciclagem já presta serviço de limpeza de casco de instalações marítimas offshore e embarcações mercantes?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q104",
    "numero": 104,
    "codigo": "E090",
    "texto": "Qual é o procedimento utilizado?",
    "obrigatoria": true,
    "tipo": "texto",
    "resposta": "Hidrojateamento e raspagem"
  },
  {
    "id": "q105",
    "numero": 105,
    "codigo": "E091",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de serviço de recepção, armazenamento e/ou tratamento de água oleosa?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": ""
  },
  {
    "id": "q106",
    "numero": 106,
    "codigo": "E092",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de serviço de coleta e tratamento de efluentes das embarcações? Caso a resposta seja 'Sim', qual é o volume que pode ser recebido, armazenado e tratado em m3?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Estaleiro dispõe apenas de sistema de coleta, o descarte é realizado através de empresa parceira licenciada. Conseguimos descartar 40m³ dia"
  },
  {
    "id": "q107",
    "numero": 107,
    "codigo": "E093",
    "texto": "O estaleiro ou instalação de reciclagem possui capacidade de limpeza de resíduos oleosos remanescentes na embarcação para permitir operações de corte a quente?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q108",
    "numero": 108,
    "codigo": "E094",
    "texto": "Se a resposta a pergunta anterior for 'Sim', quais os procedimentos do estaleiro ou instalação de reciclagem no recebimento de embarcação com os resíduos remanescentes de hidrocarbonetos líquidos? Quais limites de volume? Quais facilidades estão disponíveis?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "É realizado bombeamento do resíduo liquido para tanque externo e realizado o descarte através de empresa licenciada. Tão logo o tanque fique livre de resíduo, inicia limpeza através de trapeamento manual."
  },
  {
    "id": "q109",
    "numero": 109,
    "codigo": "E095",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de plano de emergência (PEI) em caso de acidentes de vazamento na água?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q110",
    "numero": 110,
    "codigo": "E096",
    "texto": "Como sua empresa gerencia, trata, destina e/ou descarta os materiais perigosos (amianto; bifenilas policloradas (PCBs); substâncias que destroem a camada de ozônio; anti-incrustantes: biocidas (organoestânicos) e cibutrina; cádmio; cromo hexavalente; chumbo; mercúrio e seus compostos; bifenilas polibromadas (PBBs); éteres difenilas polibromadas (PBDEs); naftalenos policlorados; substâncias radioativas; certas parafinas cloradas de cadeia curta (C10-C13), lã de vidro, espuma, resíduos de cabos, plásticos, madeira, entre outros?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Amianto: encaminhados para aterros sanitários específicos para resíduos perigosos, com contenção rigorosa para evitar a liberação de fibras. Bifenilas Policloradas (PCBs): Incineração em alta temperatura (1200°C) em instalações licenciadas, ou despolimerização térmica. Proibido descartar em aterros comuns. Substâncias que destroem a camada de ozônio: Reciclagem. Anti-incrustantes e biocidas (organoestânicos, cibutrina): Incineração controlada ou neutralização química, com destinação em aterros especializados. Cádmio, cromo hexavalente, chumbo e mercúrio e seus compostos: Reciclagem em processos industriais para reaproveitamento, ou disposição em aterros de resíduos perigosos com impermeabilização rigorosa. Bifenilas Polibromadas (PBBs) e éteres difenilas polibromadas (PBDEs): Incineração em alta temperatura com controle de emissões, dado o risco de liberação de dioxinas. Naftalenos Policlorados: Destruição térmica controlada em incineradores de resíduos perigosos. Substâncias radioativas: Armazenamento em instalações especializadas e seguras, conforme normas de radioproteção, para desativação. Parafinas cloradas de cadeia curta (C10-C13): Incineração em alta temperatura, com coleta e controle rigoroso das emissões. Lã de vidro: Reciclagem em processos industriais ou disposição em aterros sanitários, evitando fragmentação. Espumas e resíduos de cabos, plásticos e madeira: Reciclagem sempre que possível; caso contrário, disposição em aterros controlados, ou incineração controlada para resíduos não-recicláveis e contaminados."
  },
  {
    "id": "q111",
    "numero": 111,
    "codigo": "E097",
    "texto": "Há protocolos específicos para lidar com diferentes tipos de resíduos, conforme a Lei n. 12.305 de 2010 (PNRS)?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Temos um PGRS descrevendo como lidar com os diferentes tipos de resíduos."
  },
  {
    "id": "q112",
    "numero": 112,
    "codigo": "E098",
    "texto": "Existe uma prática de segregação de materiais no estaleiro ou instalação de reciclagem? Se 'Sim', como os materiais perigosos são segregados dos materiais não perigosos?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Os resíduos são segregados na fonte e armazenados em local seguro para destinação imediata."
  },
  {
    "id": "q113",
    "numero": 113,
    "codigo": "E099",
    "texto": "O estaleiro ou instalação de reciclagem já atuou na movimentação de Naturally Occurring Radioactive Materials (NORMs)?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não",
      "Não se aplica"
    ],
    "resposta": "Não"
  },
  {
    "id": "q114",
    "numero": 114,
    "codigo": "E100",
    "texto": "Qual volume foi movimentado (t)?",
    "obrigatoria": false,
    "tipo": "numero",
    "resposta": ""
  },
  {
    "id": "q115",
    "numero": 115,
    "codigo": "E101",
    "texto": "Classifique em qual nível de segurança a instalação está inserida para movimentar este tipo de material perigoso.",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "resposta": "3"
  },
  {
    "id": "q116",
    "numero": 116,
    "codigo": "E102",
    "texto": "Possui ou já possuiu Plano de Proteção Radiológica implantado?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q117",
    "numero": 117,
    "codigo": "E103",
    "texto": "Caso seja necessário, considere a possibilidade de implantação?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q118",
    "numero": 118,
    "codigo": "E104",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de espaço físico para a destinação transitória de NORMs, atendendo à legislação?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q119",
    "numero": 119,
    "codigo": "E105",
    "texto": "Caso o estaleiro ou instalação de reciclagem ainda não tenha atuado na atividade de reciclagem de instalações marítimas, que procedimento poderia ser adotado para a destinação de mobiliário (mesas, armários, camas, etc), eletroeletrônicos (geladeira, fogão, fornos, computadores, aparelhos de telecomunicações, rádios comunicadores, telefones, impressora, scanners, entre outros) entre outros resíduos não perigosos presentes na plataforma?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "O material poderá ser doado ou vendido"
  },
  {
    "id": "q120",
    "numero": 120,
    "codigo": "E106",
    "texto": "Caso o estaleiro ou instalação de reciclagem ainda não tenha atuado na atividade de reciclagem de instalações marítimas, como lidaria com a destinação de resíduos poliméricos (embalagens plásticas, dutos, EPIs descartáveis, resíduos de polímeros especiais)? Reciclagem, descarte ou destinação? Descreva o procedimento adotado.",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Seria integralmente encaminhado para empresas recicladoras licenciadas."
  },
  {
    "id": "q121",
    "numero": 121,
    "codigo": "E107",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de área alfandegada para o recebimento de materiais através do regime de incentivo REPETRO (Obs: REPETRO - é um regime aduaneiro especial que permite a importação de equipamentos específicos para atividades de pesquisa e lavra das jazidas de petróleo e gás natural, sem a incidência dos tributos federais (II, IPI, PIS e Cofins) e o adicional de frete para a renovação da marinha mercante (AFRMM) ?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": "Não"
  },
  {
    "id": "q122",
    "numero": 122,
    "codigo": "E108",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de área alfandegada para recebimento de resíduos de combustível a bordo da instalação que demande tratamento fiscal no processo de reciclagem?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Neste momento não"
  },
  {
    "id": "q123",
    "numero": 123,
    "codigo": "E109",
    "texto": "A mão de obra disponível hoje no estaleiro ou instalação de reciclagem tem capacitação para atuar no segmento de desmantelamento e reciclagem? Qual é a quantidade de pessoas atualmente trabalhando? Qual percentual é próprio e terceirizado? Quais as atividades que são realizadas pelos próprios e terceirizados?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Sim. 280 100% próprio"
  },
  {
    "id": "q124",
    "numero": 124,
    "codigo": "E110",
    "texto": "Qual a taxa de acidentes registráveis da instalação?",
    "obrigatoria": false,
    "tipo": "numero",
    "resposta": ""
  },
  {
    "id": "q125",
    "numero": 125,
    "codigo": "E111",
    "texto": "Existe alguma ação de capacitação para treinamento de profissionais (corte, limpeza, içamento, movimentação, segregação, entre outros) para atuação no segmento de reciclagem?",
    "obrigatoria": true,
    "tipo": "texto_longo",
    "resposta": "Ainda não"
  },
  {
    "id": "q126",
    "numero": 126,
    "codigo": "E112",
    "texto": "Há oferta de mão de obra local? Ou, alternativamente, o fluxo de mão de obra para o estaleiro ou instalação de reciclagem em função da demanda é possível de ser suprido ou são esperadas dificuldades?",
    "obrigatoria": true,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não",
      "Não se aplica"
    ],
    "resposta": "Sim"
  },
  {
    "id": "q127",
    "numero": 127,
    "codigo": "E113",
    "texto": "O estaleiro ou instalação de reciclagem dispõe de recursos humanos capacitados em:",
    "obrigatoria": true,
    "tipo": "multipla_escolha",
    "opcoes": [
      "Corte com maçarico",
      "Corte com tesoura hidráulica",
      "Gestão de resíduos perigosos",
      "Montagem de andaimes",
      "Operador de guindaste",
      "Trabalho em altura",
      "Trabalho em ambiente confinado"
    ],
    "resposta": [
      "Corte com maçarico",
      "Corte com tesoura hidráulica",
      "Gestão de resíduos perigosos",
      "Montagem de andaimes",
      "Operador de guindaste",
      "Trabalho em altura",
      "Trabalho em ambiente confinado"
    ]
  },
  {
    "id": "q128",
    "numero": 128,
    "codigo": "E114",
    "texto": "Qual é a ordem de grandeza do investimento necessário para adequar o estaleiro ou instalação de reciclagem a fim de atender à demanda de reciclagem de navios?",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q129",
    "numero": 129,
    "codigo": "E115",
    "texto": "O estaleiro ou instalação de reciclagem possui seguro de responsabilidade civil para poluição ambiental?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": ""
  },
  {
    "id": "q130",
    "numero": 130,
    "codigo": "E116",
    "texto": "O estaleiro ou instalação de reciclagem possui seguro de responsabilidade civil de responsabilidade genérica (explosão, incêndio, sinistro, eventos climáticos)?",
    "obrigatoria": false,
    "tipo": "opcao_unica",
    "opcoes": [
      "Sim",
      "Não"
    ],
    "resposta": ""
  },
  {
    "id": "q131",
    "numero": 131,
    "codigo": "E_FINAL_DOCUMENT",
    "texto": "Deseja encaminhar documentos da sua empresa que possam auxiliar no mapeamento da capacidade tecnológica (Somente arquivos em PDF).",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
  {
    "id": "q132",
    "numero": 132,
    "codigo": "E_FINAL_COMMENTS",
    "texto": "Comentários adicionais",
    "obrigatoria": false,
    "tipo": "texto",
    "resposta": ""
  },
];
