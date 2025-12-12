"use client";
import React from "react";
import {
  Mail,
  Youtube,
  Instagram,
  ShieldCheck,
  Wand2
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "../ui/hover-footer";

export function HoverFooter() {
  const footerLinks = [
    {
      title: "O Curso",
      links: [
        { label: "Módulos", href: "#modules" },
        { label: "Garantia", href: "#offer" },
        { label: "Depoimentos", href: "#testimonials" },
        { label: "Comprar Agora", href: "#offer" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { label: "Central de Ajuda", href: "#" },
        { label: "Termos de Uso", href: "#" },
        { label: "Políticas de Privacidade", href: "#" },
        { label: "Área de Membros", href: "#", pulse: true },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-brand-accent" />,
      text: "suporte@magodoyoutube.com",
      href: "mailto:suporte@magodoyoutube.com",
    },
    {
      icon: <ShieldCheck size={18} className="text-brand-accent" />,
      text: "Compra 100% Segura",
    },
  ];

  const socialLinks = [
    { icon: <Youtube size={20} />, label: "YouTube", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
  ];

  return (
    <footer className="bg-slate-950 relative overflow-hidden pt-20 pb-10 border-t border-slate-900 mt-20">
      <div className="container mx-auto px-4 z-40 relative max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-blue-600 flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xl font-bold">Mago do YT</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Aprenda a criar, crescer e monetizar canais no YouTube sem precisar aparecer. O método definitivo.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative w-fit">
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-brand-accent transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-1 -right-3 w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contato
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-slate-400 hover:text-brand-accent transition-colors text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-slate-400 text-sm">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-slate-900 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <div className="flex space-x-6 text-slate-500">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-brand-accent transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
          <p className="text-slate-600 text-center md:text-right">
            &copy; {new Date().getFullYear()} Mago do YouTube. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="flex justify-center w-full h-[150px] md:h-[250px] relative z-30 opacity-80 mt-10">
        <div className="w-full max-w-5xl px-4">
            <TextHoverEffect text="MAGO" />
        </div>
      </div>
      
      <FooterBackgroundGradient />
    </footer>
  );
}