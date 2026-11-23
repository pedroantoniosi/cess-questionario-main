"use client";

import {
  ChartNoAxesCombined,
  ClipboardList,
  FilePenLine,
  Settings,
} from "lucide-react";
import { useState } from "react";

import Container from "@/components/ui/Container";
import Modal from "./ui/Modal";

const perfisData = [
  {
    id: 0,
    title: "Perfil do Analista",
    description: "Acompanha e analisa os resultados do questionário.",
    text: "O Analista é responsável por acompanhar as informações preenchidas no CESS Questionário, avaliar indicadores técnicos, analisar os níveis de maturidade e interpretar os resultados obtidos. Seu papel é transformar os dados coletados em informações estratégicas para apoiar a tomada de decisões.",
    icon: ChartNoAxesCombined,
  },
  {
    id: 1,
    title: "Perfil do Executor",
    description: "Gerencia e atualiza as informações técnicas.",
    text: "O Executor é responsável por realizar o preenchimento e a atualização das informações técnicas da instalação. Ele registra dados, atualiza indicadores e mantém as informações necessárias para que o questionário represente corretamente a realidade operacional.",
    icon: ClipboardList,
  },
  {
    id: 2,
    title: "Perfil do Respondente",
    description: "Responde aos questionários e fornece informações.",
    text: "O Respondente participa diretamente do preenchimento do questionário, fornecendo respostas e informações relacionadas à sua área de atuação. Sua contribuição permite reunir dados relevantes para a avaliação técnica e o diagnóstico da instalação.",
    icon: FilePenLine,
  },
  {
    id: 3,
    title: "Perfil do Administrativo",
    description: "Administra usuários, acessos e configurações.",
    text: "O Administrativo é responsável pela gestão organizacional do ambiente, auxiliando no gerenciamento de usuários, permissões de acesso e organização das informações. Seu papel é garantir que cada participante tenha acesso adequado às funcionalidades do sistema.",
    icon: Settings,
  },
];

export default function Perfis() {
  const [selectedPerfil, setSelectedPerfil] = useState<
    (typeof perfisData)[number] | null
  >(null);

  return (
    <>
      <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center gap-6">
        {perfisData.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedPerfil(item)}
              className="group relative flex flex-col items-center gap-5 
              rounded-2xl border-2 border-amber-400/50 bg-white 
              p-8 text-center transition-all duration-300
              hover:-translate-y-2 hover:border-amber-400 
              hover:shadow-xl cursor-pointer"
            >
              <div
                className="flex h-16 w-16 items-center justify-center 
                rounded-2xl bg-amber-400/10 text-amber-500
                transition-all duration-300 group-hover:bg-amber-400 
                group-hover:text-white"
              >
                <Icon size={32} strokeWidth={1.8} />
              </div>

              <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>

              <p className="text-sm leading-relaxed text-gray-500">
                {item.description}
              </p>

              <span className="text-sm font-semibold text-amber-500">
                Saiba mais →
              </span>
            </button>
          );
        })}
      </Container>

      <Modal
        isOpen={selectedPerfil !== null}
        onClose={() => setSelectedPerfil(null)}
        title={selectedPerfil?.title ?? ""}
      >
        {selectedPerfil && (
          <p className="text-base leading-relaxed text-gray-600">
            {selectedPerfil.text}
          </p>
        )}
      </Modal>
    </>
  );
}
