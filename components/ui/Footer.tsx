import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Container from "./Container";
import Logo from "./Logo";

export default function Footer() {
  return (
    <>
      <footer className="mt-auto p-4 bg-navbar text-white">
        <Container className="grid md:grid-cols-4 items-center gap-8">
          {/* Instituicional */}
          <div className="flex flex-col gap-4">
            <div className="flex  items-center gap-4">
              <Logo className="w-20 h-20" />
              <h2 className="text-xl max-w-80 font-bold">
                Centro de Estudos para Sistemas Sustentáveis
              </h2>
            </div>
            <div>
              <p>© 2026 CESS/UFF. Todos os direitos reservados.</p>
            </div>
          </div>

          {/* Links Uteis */}
          <div className="flex flex-col">
            <span className="font-bold  text-2xl mb-2">Links Úteis</span>
            <ul>
              <li>
                <Link
                  href="/"
                  className="transition-all duration-200 hover:scale-105 hover:text-zinc-300"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="sobre"
                  className="transition-all duration-200 hover:scale-105 hover:text-zinc-300"
                >
                  Sobre
                </Link>
                <li>
                  <Link
                    href="projetos"
                    className="transition-all duration-200 hover:scale-105 hover:text-zinc-300"
                  >
                    Projetos
                  </Link>
                </li>
              </li>
              <li>
                <Link
                  href="pesquisas"
                  className="transition-all duration-200 hover:scale-105 hover:text-zinc-300"
                >
                  Pesquisas
                </Link>
              </li>

              <li>
                <Link
                  href="#equipe"
                  className="transition-all duration-200 hover:scale-105 hover:text-zinc-300"
                >
                  Equipe
                </Link>
              </li>
              <li>
                <Link
                  href="#contato"
                  className="transition-all duration-200 hover:scale-105 hover:text-zinc-300"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Siga-nos</span>
            <ul className="mt-4 flex items-center gap-6">
              <li>
                <Link
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex transition-all duration-200 hover:scale-110 hover:text-zinc-300"
                >
                  <FaFacebookF size={24} />
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex transition-all duration-200 hover:scale-110 hover:text-zinc-300"
                >
                  <FaLinkedinIn size={24} />
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex transition-all duration-200 hover:scale-110 hover:text-zinc-300"
                >
                  <FaInstagram size={24} />
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex transition-all duration-200 hover:scale-110 hover:text-zinc-300"
                >
                  <FaYoutube size={24} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Endereço*/}
          <div className="flex flex-col">
            <span className="font-bold  text-2xl mb-2">Endereço</span>
            <p>
              Av. Desembargador Ellis Hermydio Figueira, nº 783, Aterrado, Volta
              Redonda-RJ
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}
