import React from 'react'
import { ArrowRight, ChevronRight, Menu, X, Wand2, Play } from 'lucide-react'
import { Button } from '../ui/button'
import { AnimatedGroup } from '../ui/animated-group'
import { cn } from '../../lib/utils'
import { MagicButton, MinimalWaveButton } from '../ui/magic-button'
import { TextEffect } from '../ui/text-effect'

// Configuração de animação "Suave" (Cinematic Smooth Rise)
const smoothVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    },
    item: {
        hidden: { 
            opacity: 0, 
            y: 40, 
            filter: 'blur(10px)' 
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                // Curva de Bezier para um movimento suave e elegante (sem bounce/pulo)
                ease: [0.2, 0.8, 0.2, 1],
                duration: 1.2,
            },
        },
    },
}

export function HeroSection() {
    return (
        <div className="bg-[#020617] text-foreground dark relative">
             {/* Subtle Gradient Animation Background */}
             <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Base Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0f172a] to-slate-950 opacity-80" />
                
                {/* Animated Moving Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent bg-[length:200%_200%] animate-gradient-slow mix-blend-screen" />
                
                {/* Vignette Effect (Darkens edges to focus center) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#020617_120%)] pointer-events-none opacity-80" />
            </div>

            {/* Soft Bottom Fade Transition */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent z-[5] pointer-events-none" />

            <HeroHeader />
            <main className="overflow-hidden relative z-10">
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-30 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24 md:pt-36 pb-20">
                        {/* Background Ambient Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,#020617_75%)]" />
                        
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0 flex flex-col items-center">
                                {/* Top Badge */}
                                <AnimatedGroup variants={smoothVariants}>
                                    <a
                                        href="#offer"
                                        className="hover:bg-background dark:hover:border-t-border bg-slate-900/50 backdrop-blur-sm group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/5 p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:shadow-zinc-950 hover:scale-105 mb-8">
                                        <span className="text-foreground text-sm font-bold text-primary">PROMOÇÃO DE NATAL: 50% OFF ⚡</span>
                                        <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                                        <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </AnimatedGroup>
                        
                                {/* Main Heading with Word-by-Word Animation */}
                                <h1 className="max-w-5xl mx-auto text-balance text-4xl md:text-6xl xl:text-7xl font-black tracking-tight mb-8">
                                    <TextEffect 
                                        per="word" 
                                        preset="slide" 
                                        delay={0.5} 
                                        className="inline-block text-white"
                                    >
                                        {"Aprenda a minha Estratégia para viver do YouTube"}
                                    </TextEffect>
                                    {' '}
                                    <TextEffect 
                                        per="word" 
                                        preset="slide" 
                                        delay={1.5} 
                                        className="text-primary text-glow inline-block"
                                    >
                                        {"SEM APARECER"}
                                    </TextEffect>
                                </h1>

                                {/* Subtitle with Smooth Rise */}
                                <AnimatedGroup variants={smoothVariants} className="w-full">
                                    <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground mb-12">
                                        Do <span className="text-white font-bold">ZERO</span> até a <span className="text-white font-bold">MONETIZAÇÃO</span>. Descubra como eu fiz na prática pra construir negócios digitais que me rendem dinheiro todo mês.
                                    </p>
                                
                                    {/* Buttons */}
                                    <div className="flex flex-col items-center justify-center gap-4 md:flex-row mb-16">
                                        <div className="bg-transparent p-1">
                                            <MagicButton href="#offer" className="shadow-none">
                                                Garantir Minha Vaga
                                            </MagicButton>
                                        </div>
                                        <Button
                                            asChild
                                            size="lg"
                                            variant="ghost"
                                            className="h-14 rounded-xl px-8 text-base">
                                            <a href="#video">
                                                <span className="text-nowrap flex items-center gap-2">Assistir Vídeo <Play className="w-4 h-4 fill-current"/></span>
                                            </a>
                                        </Button>
                                    </div>
                                </AnimatedGroup>
                            </div>
                        </div>

                        {/* Video Section with Smooth Reveal */}
                        <AnimatedGroup
                            variants={smoothVariants}>
                            <div id="video" className="relative -mr-56 overflow-hidden px-2 sm:mr-0">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35% pointer-events-none"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1 transform hover:scale-[1.01] transition-transform duration-700">
                                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.1)] bg-slate-900 relative z-20 group">
                                      <iframe
                                        src="https://player.cloudinary.com/embed/?cloud_name=duihicyei&public_id=AULA_GRATUITA_-_Mago_do_Algoritmo_1080p_h264_youtube_oyuajs&profile=cld-default&autoplay=true"
                                        width="100%"
                                        height="100%"
                                        style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0}}
                                        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0"
                                        title="Mago do YouTube - Vídeo de Vendas"
                                      ></iframe>
                                    </div>
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
            </main>
        </div>
    )
}

const menuItems = [
    { name: 'Início', href: '#' },
    { name: 'Conteúdo', href: '#offer' },
    { name: 'Garantia', href: '#offer' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-50 w-full px-2 group top-4">
                <div className={cn(
                    'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', 
                    isScrolled && 'bg-slate-950/40 max-w-4xl rounded-full border border-white/10 backdrop-blur-xl shadow-2xl lg:px-6 py-2'
                )}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-2">
                        <div className="flex w-full justify-between lg:w-auto">
                            <a
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </a>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm font-medium">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            className="text-muted-foreground hover:text-primary block duration-150 transition-colors">
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                className="text-muted-foreground hover:text-primary block duration-150">
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <div className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <MinimalWaveButton href="#offer" className="px-6 py-2">
                                        Comprar Agora
                                    </MinimalWaveButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn('flex items-center gap-2 font-bold text-lg', className)}>
            <div className="bg-gradient-to-br from-primary to-blue-600 p-1.5 rounded-lg">
                <Wand2 className="w-5 h-5 text-brand-dark" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Mago do YouTube
            </span>
        </div>
    )
}