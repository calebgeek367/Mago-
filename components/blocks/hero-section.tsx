import React from 'react'
import { ArrowRight, ChevronRight, Menu, X, Wand2, Play } from 'lucide-react'
import { Button } from '../ui/button'
import { AnimatedGroup } from '../ui/animated-group'
import { cn } from '../../lib/utils'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
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
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring',
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                           {/* Background Glow */}
                           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,#020617_75%)]" />
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    <a
                                        href="#offer"
                                        className="hover:bg-background dark:hover:border-t-border bg-slate-900/50 backdrop-blur-sm group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/5 p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:shadow-zinc-950 hover:scale-105">
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
                        
                                    <h1
                                        className="mt-8 max-w-5xl mx-auto text-balance text-4xl md:text-6xl lg:mt-16 xl:text-7xl font-black tracking-tight">
                                        Aprenda a minha Estratégia para viver do YouTube <span className="text-primary text-glow">SEM APARECER</span>
                                    </h1>
                                    <p
                                        className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                                        Do <span className="text-white font-bold">ZERO</span> até a <span className="text-white font-bold">MONETIZAÇÃO</span>. Descubra como eu fiz na prática pra construir negócios digitais que me rendem dinheiro todo mês.
                                    </p>
                                </AnimatedGroup>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
                                    <div
                                        key={1}
                                        className="bg-foreground/10 rounded-[14px] border p-0.5">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="rounded-xl px-8 text-base font-bold h-14 shadow-[0_0_20px_rgba(34,211,238,0.3)]
                                            relative overflow-hidden bg-primary text-brand-dark transition-all duration-300
                                            before:absolute before:inset-0 before:bg-white before:translate-x-[-100%] before:transition-transform before:duration-300 before:ease-out
                                            hover:before:translate-x-0 hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]
                                            z-10 before:-z-10">
                                            <a href="#offer">
                                                <span className="text-nowrap flex items-center gap-2 relative z-20">Garantir Minha Vaga <ArrowRight className="w-4 h-4"/></span>
                                            </a>
                                        </Button>
                                    </div>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-14 rounded-xl px-8 text-base">
                                        <a href="#video">
                                            <span className="text-nowrap flex items-center gap-2">Assistir Vídeo <Play className="w-4 h-4 fill-current"/></span>
                                        </a>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div id="video" className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35% pointer-events-none"
                                />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-5xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.1)] bg-slate-900 relative z-20">
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
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden', 
                                    'font-bold relative overflow-hidden bg-primary text-brand-dark transition-all duration-300 before:absolute before:inset-0 before:bg-white before:translate-x-[-100%] before:transition-transform before:duration-300 before:ease-out hover:before:translate-x-0 hover:text-black z-10 before:-z-10'
                                    )}>
                                    <a href="#offer">
                                        <span className="relative z-20">Comprar Agora</span>
                                    </a>
                                </Button>
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