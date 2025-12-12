import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Play, Star, ShieldCheck, Lock, Users, ChevronDown } from 'lucide-react';
import { BackgroundCells } from './components/ui/background-ripple-effect';
import { HeroSection } from './components/blocks/hero-section';

// --- Hooks & Animation Components ---

// Hook to detect if element is in viewport
const useInView = (options = { threshold: 0.2 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.threshold]);

  return [ref, isInView] as const;
};

interface FadeSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Component: Fade Section (Fades In Up when entering, Fades Out Down when leaving)
const FadeSection: React.FC<FadeSectionProps> = ({ children, delay = 0, className = "" }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-in-out transform ${className} ${
        isInView 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 translate-y-10 blur-sm'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

// Component: Typewriter Text
// Types out text when it comes into view. Resets when it leaves.
const Typewriter: React.FC<TypewriterProps> = ({ text, className = "", speed = 30, delay = 0 }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    if (isInView) {
      // Start typing sequence
      setDisplayedText(''); 
      timeout = setTimeout(() => {
        let i = 0;
        interval = setInterval(() => {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          if (i > text.length) clearInterval(interval);
        }, speed);
      }, delay);
    } else {
      // Reset when out of view for re-play capability (fade out effect handled by parent usually, but text clears here)
      setDisplayedText('');
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isInView, text, speed, delay]);

  // We maintain the height by rendering the invisible full text to prevent layout shifts
  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="invisible">{text}</span>
      <span className="absolute top-0 left-0 w-full h-full">
        {displayedText}
        <span className={`inline-block w-[2px] h-[1em] bg-current align-middle ml-1 ${isInView ? 'animate-pulse' : 'opacity-0'}`}></span>
      </span>
    </span>
  );
};

// --- Main App ---

function App() {
  const scrollToCheckout = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans bg-brand-dark overflow-x-hidden">
      
      {/* New Hero Section */}
      <HeroSection />

      {/* Description with Typewriter - moved below hero */}
      <FadeSection delay={200} className="mb-12 mt-12 text-center">
          <div className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto min-h-[3em] px-4">
            <Typewriter 
              text="Descubra como eu fiz na prática pra construir negócios digitais que me rendem dinheiro todo mês na internet."
              speed={20}
              delay={500}
            />
          </div>
      </FadeSection>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-20 px-4">
        {[
          "Encontrar bons nichos mesmo começando do zero",
          "Criar canais e produtos que realmente dão certo",
          "Negócio digital do zero, mesmo sem experiência",
          "Acesso aos bastidores do que realmente funciona"
        ].map((item, i) => (
          <FadeSection key={i} delay={300 + (i * 100)}>
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg flex items-center gap-3 hover:border-brand-accent/30 transition-colors h-full">
              <div className="bg-brand-accent/10 p-1 rounded-full shrink-0">
                <Check className="w-5 h-5 text-brand-accent" />
              </div>
              <span className="text-slate-200 text-sm md:text-base font-medium text-left">{item}</span>
            </div>
          </FadeSection>
        ))}
      </div>

      {/* Steps Section */}
      <section className="bg-slate-950 py-20 border-t border-slate-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <FadeSection>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                O passo a passo para criar um <span className="text-brand-accent">CANAL DARK DE SUCESSO NO YOUTUBE</span>
              </h2>
            </FadeSection>
            
            <FadeSection delay={200}>
              <div className="text-slate-400 max-w-3xl mx-auto min-h-[3em]">
                <Typewriter 
                  text="Sem enrolação, sem teoria, vou te ensinar na prática o passo a passo, clique por clique do que você deve fazer pra conseguir resultados iguais aos meus."
                  speed={15}
                  delay={200}
                />
              </div>
            </FadeSection>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              delay={300}
              title="O que funciona no Youtube?"
              desc="Você vai aprender o que está por trás do conteúdo que viraliza."
            />
            <FeatureCard 
              delay={500}
              title="Canal dark que gera renda"
              desc="Você vai aprender a criar um canal dark de sucesso do zero, clique por clique."
              highlight
            />
            <FeatureCard 
              delay={700}
              title="Música = Dinheiro"
              desc="Você vai aprender a ganhar dinheiro com suas próprias músicas feitas por Inteligência Artificial."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Marquee Section */}
      <section className="py-20 bg-slate-950 border-t border-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10 pointer-events-none"></div>
        <div className="container mx-auto px-4 mb-16 text-center relative z-20">
            <FadeSection>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                O que os alunos estão <span className="text-brand-accent">FALANDO</span>
              </h2>
              <p className="text-slate-400">Resultados reais de quem aplicou o método.</p>
            </FadeSection>
        </div>
        <TestimonialsMarquee />
      </section>

      {/* Offer Section with Background Ripple Effect */}
      <section id="offer" className="relative">
        <BackgroundCells className="min-h-screen py-20">
          <div className="container mx-auto px-4 max-w-2xl text-center relative z-10">
            <FadeSection>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                <Typewriter text="O primeiro passo para a transformação será dado agora." speed={40} />
              </h2>
            </FadeSection>
            
            <FadeSection delay={500}>
              <p className="text-slate-400 text-sm mb-12">
                Esse é o ponto de virada. A partir daqui, você abandona o amadorismo e entra no jogo real do Youtube.
              </p>
            </FadeSection>

            <div className="space-y-4 mb-12">
              <FadeSection delay={600}><OfferItem text="Acesso vitalício ao Torne-se Um Mago do YT" icon={Lock} /></FadeSection>
              <FadeSection delay={700}><OfferItem text="Comunidade de Networking EXCLUSIVA" icon={Users} /></FadeSection>
              <FadeSection delay={800}><OfferItem text="Suporte Pessoal e Direto Comigo" icon={ShieldCheck} /></FadeSection>
            </div>

            <FadeSection delay={900} className="mb-8">
              <p className="text-slate-500 line-through text-lg">De R$ 115,80</p>
              <p className="text-6xl md:text-7xl font-black text-brand-button drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                R$ 57,90
              </p>
            </FadeSection>

            <FadeSection delay={1000}>
              <button 
                className="w-full bg-brand-button text-brand-dark font-black text-xl py-6 rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] hover:scale-105 transition-all duration-300 uppercase tracking-wide cursor-pointer z-50 relative overflow-hidden before:absolute before:inset-0 before:bg-white before:translate-x-[-100%] before:transition-transform before:duration-300 before:ease-out hover:before:translate-x-0 group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors duration-300">
                  Comprar Agora
                  <Zap className="w-6 h-6 fill-current" />
                </span>
              </button>
              
              <div className="mt-6 flex justify-center gap-4 text-slate-500 text-xs">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3"/> Compra 100% Segura</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3"/> Garantia de 7 dias</span>
              </div>
            </FadeSection>
          </div>
        </BackgroundCells>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-950 py-20 border-t border-slate-900 relative z-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeSection>
            <h2 className="text-2xl md:text-4xl font-bold text-center text-white mb-4">
              Dúvidas <span className="text-brand-accent">Frequentes</span>
            </h2>
            <p className="text-slate-400 text-center mb-12">
              Tudo o que você precisa saber antes de entrar.
            </p>
          </FadeSection>

          <div className="space-y-4">
            <FAQItem 
              question="Preciso aparecer nos vídeos?"
              answer="Não! O método é focado 100% em canais dark (sem aparecer). Você vai aprender a usar inteligência artificial e bancos de imagens/vídeos para criar conteúdo altamente viral sem nunca mostrar o rosto."
              delay={200}
            />
            <FAQItem 
              question="Serve para iniciantes que não sabem editar?"
              answer="Sim, o curso vai do zero absoluto. Ensinamos desde como criar a conta no YouTube até a edição de vídeo passo a passo utilizando ferramentas simples e acessíveis."
              delay={300}
            />
            <FAQItem 
              question="Preciso de um computador potente?"
              answer="Não. Você consegue aplicar as estratégias usando apenas um celular ou um computador básico. As ferramentas de IA que utilizamos rodam na nuvem (internet), não pesam no seu computador."
              delay={400}
            />
            <FAQItem 
              question="Por quanto tempo terei acesso?"
              answer="O acesso é VITALÍCIO. Você paga uma única vez e tem acesso para sempre ao conteúdo e a todas as futuras atualizações do curso."
              delay={500}
            />
             <FAQItem 
              question="E se eu não gostar?"
              answer="Você tem 7 dias de garantia incondicional. Se por qualquer motivo achar que o curso não é para você, devolvemos 100% do seu dinheiro, sem perguntas."
              delay={600}
            />
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900 bg-slate-950 relative z-20">
        <p>&copy; 2024 Mago do YouTube. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

function TestimonialsMarquee() {
  // Portrait images simulating mobile screenshots (9:16 approx)
  const images = [
    "https://placehold.co/360x640/0f172a/22d3ee?text=Venda+Aprovada+R$97",
    "https://placehold.co/360x640/0f172a/22d3ee?text=Painel+Youtube+10k",
    "https://placehold.co/360x640/0f172a/22d3ee?text=Monetiza%C3%A7%C3%A3o+Ativa",
    "https://placehold.co/360x640/0f172a/22d3ee?text=Notifica%C3%A7%C3%A3o+de+Venda",
    "https://placehold.co/360x640/0f172a/22d3ee?text=Grafico+de+Views",
    "https://placehold.co/360x640/0f172a/22d3ee?text=Comentario+de+Aluno",
    "https://placehold.co/360x640/0f172a/22d3ee?text=Pix+Recebido",
  ];

  return (
    <div className="flex w-full overflow-hidden select-none py-4">
      <motion.div
        className="flex gap-8 min-w-full flex-shrink-0 px-4"
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40,
        }}
      >
        {images.map((src, idx) => (
          <div key={`orig-${idx}`} className="relative flex-shrink-0 w-[240px] h-[480px] rounded-[32px] overflow-hidden border-[6px] border-slate-900 bg-slate-950 group shadow-2xl shadow-black/60 ring-1 ring-slate-800/50">
            {/* Mobile Notch/Bar simulation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-xl z-20"></div>
            <div className="absolute inset-0 bg-slate-900 animate-pulse-slow -z-10" />
            <img 
              src={src} 
              alt="Resultado de Aluno" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 scale-105"
            />
            {/* Reflection Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />
          </div>
        ))}
      </motion.div>
      <motion.div
        className="flex gap-8 min-w-full flex-shrink-0 px-4"
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40,
        }}
      >
        {images.map((src, idx) => (
          <div key={`dup-${idx}`} className="relative flex-shrink-0 w-[240px] h-[480px] rounded-[32px] overflow-hidden border-[6px] border-slate-900 bg-slate-950 group shadow-2xl shadow-black/60 ring-1 ring-slate-800/50">
             {/* Mobile Notch/Bar simulation */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-xl z-20"></div>
            <div className="absolute inset-0 bg-slate-900 animate-pulse-slow -z-10" />
            <img 
              src={src} 
              alt="Resultado de Aluno" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 scale-105"
            />
             {/* Reflection Overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function FeatureCard({ title, desc, highlight = false, delay = 0 }: { title: string, desc: string, highlight?: boolean, delay?: number }) {
  return (
    <FadeSection delay={delay} className="h-full">
      <div className={`p-8 rounded-2xl border transition-all duration-300 h-full flex flex-col justify-center text-center group hover:-translate-y-2 ${
        highlight 
          ? 'bg-slate-900 border-brand-accent/30 shadow-[0_0_30px_rgba(56,189,248,0.1)]' 
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
      }`}>
        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-accent transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </FadeSection>
  )
}

function OfferItem({ text, icon: Icon }: { text: string, icon: any }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-4 justify-center md:justify-start hover:border-brand-accent/50 transition-colors">
      <div className="bg-brand-button/10 p-2 rounded-lg">
        <Check className="w-5 h-5 text-brand-button" />
      </div>
      <span className="text-white font-medium">{text}</span>
      {Icon && <Icon className="w-5 h-5 text-slate-600 ml-auto hidden md:block" />}
    </div>
  )
}

function FAQItem({ question, answer, delay = 0 }: { question: string, answer: string, delay?: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FadeSection delay={delay}>
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden transition-colors hover:border-slate-700">
        <button 
          className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-base md:text-lg font-medium text-slate-200 group-hover:text-white transition-colors pr-4">{question}</span>
          <div className={`bg-slate-800 p-1 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-accent/20 text-brand-accent' : 'text-slate-500'}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>
        <div 
          className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-6 pb-6 pt-0 text-slate-400 text-sm md:text-base leading-relaxed border-t border-slate-800/50 mt-2">
            <div className="pt-4">
              {answer}
            </div>
          </div>
        </div>
      </div>
    </FadeSection>
  );
}

export default App;