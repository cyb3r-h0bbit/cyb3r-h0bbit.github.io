import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Lock,
  Shield,
  Terminal,
  Network,
  Code,
  Database,
  CheckCircle,
  Zap,
  AlertCircle,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Design Philosophy: "Technical Trust"
 * - Teal-blue primary (#1e7c7c) for trust & security
 * - Neutral gray for professionalism
 * - Orange accents for alerts/importance
 * - Fraunces (display) + Inter (body) + JetBrains Mono (code)
 * - Geometric patterns, security-themed icons, smooth animations
 */

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "trajectory",
        "investigation",
        "projects",
        "certifications",
        "skills",
        "writeups",
        "contact",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (section: string) => activeSection === section;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663704570907/2G4i7FkBWvH4ez6E3xK6Ay/logo-shield-jLeETeTzcfHZm7odNeb9bE.webp"
                alt="Daniel Logo"
                className="w-8 h-8"
              />
              <span className="font-fraunces font-600 text-lg">Daniel</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {[
                { id: "trajectory", label: "Trajetória" },
                { id: "investigation", label: "Investigação" },
                { id: "projects", label: "Projetos" },
                { id: "certifications", label: "Certificações" },
                { id: "skills", label: "Skills" },
                { id: "writeups", label: "Writeups" },
                { id: "contact", label: "Contato" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-sm transition-colors ${
                    isActive(item.id)
                      ? "text-primary font-600"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-secondary/10 transition-all duration-200 text-muted-foreground hover:text-primary"
                aria-label="Alternar tema"
                title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
              <a
                href="https://github.com/cyb3r-h0bbit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/danielcavalcante"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-background">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663704570907/2G4i7FkBWvH4ez6E3xK6Ay/hero-bg-JctaCL7VxMyM4DFxkwVn8b.webp)",
            backgroundSize: "cover",
            backgroundPosition: "right center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative container max-w-5xl mx-auto px-4 py-24 md:py-40">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary font-600">
                Disponível para novas oportunidades
              </span>
            </div>

            <h1 className="font-fraunces font-700 text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Automatiza o que é repetitivo.{" "}
              <span className="text-primary">Investiga</span> o que é suspeito.
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              10+ anos em TI e processos financeiros, hoje em transição
              estruturada para segurança defensiva. Construo automações em
              Python para ambientes regulados e investigo incidentes reais com a
              mesma atenção a detalhe.
            </p>

            <div className="flex flex-wrap gap-3 mb-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Badge variant="outline">São Paulo, BR</Badge>
              <Badge variant="outline">ISO 27001</Badge>
              <Badge variant="outline">Google Cybersecurity Cert.</Badge>
              <Badge variant="outline">Python · SQL · Power BI</Badge>
            </div>

            <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Entrar em Contato
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Ver Projetos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trajectory Section */}
      <section id="trajectory" className="py-20 md:py-28">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm font-mono text-primary font-600 mb-2">
              TRAJETÓRIA
            </p>
            <h2 className="font-fraunces font-700 text-3xl md:text-4xl mb-4">
              De infraestrutura a Blue Team
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Uma progressão natural, não uma virada de chave: cada etapa
              aproximou mais de entender onde os sistemas falham.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                year: "2025 — hoje",
                role: "Analista de Automação e Processos Financeiros",
                company: "Pagsmile",
                desc: "Automação Python em ambiente fintech regulado (Open Finance, SPB). Análise de incidentes de segurança, gestão de acessos e investigação de phishing.",
                icon: <Shield className="w-5 h-5 text-primary" />,
              },
              {
                year: "2023 — 2024",
                role: "Analista de Implantação EDI",
                company: "Finnet",
                desc: "Integração de sistemas financeiros, configuração de fluxos de dados seguros, troubleshooting de falhas em ambientes corporativos.",
                icon: <Network className="w-5 h-5 text-primary" />,
              },
              {
                year: "2014 — 2023",
                role: "Infraestrutura e Suporte Técnico",
                company: "Diversos",
                desc: "Administração de sistemas Windows/Linux, Active Directory, controle de acessos e suporte a ambientes corporativos de diferentes portes.",
                icon: <Terminal className="w-5 h-5 text-primary" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex gap-6 pb-8 border-b border-border last:border-b-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  {idx < 2 && (
                    <div className="w-0.5 h-12 bg-border mt-4 mb-4" />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-sm font-mono text-muted-foreground mb-1">
                    {item.year}
                  </p>
                  <h3 className="font-fraunces font-600 text-lg mb-1">
                    {item.role}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.company}
                  </p>
                  <p className="text-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investigation Case Study */}
      <section id="investigation" className="py-20 md:py-28 bg-secondary/5">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm font-mono text-primary font-600 mb-2">
              ESTUDO DE CASO
            </p>
            <h2 className="font-fraunces font-700 text-3xl md:text-4xl mb-4">
              Investigação de Phishing Real
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Campanha de phishing direcionada à empresa onde trabalho. Análise
              forense completa, da identificação à classificação de severidade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-5 h-5 text-primary" />
                <h3 className="font-fraunces font-600">Análise Técnica</h3>
              </div>
              <div className="font-mono text-sm space-y-3 text-foreground/80">
                <div>
                  <span className="text-primary">$</span> cat suspicious_email.eml
                  | grep -i "X-Mailer"
                </div>
                <div className="text-accent font-600">X-Mailer: gophish</div>
                <div className="text-muted-foreground">
                  → toolkit de phishing profissional identificado
                </div>

                <Separator className="my-3" />

                <div>
                  <span className="text-primary">$</span> grep
                  "X-Google-Original-From" suspicious_email.eml
                </div>
                <div className="text-accent font-600">
                  comunicapagsmile@pagsr<span className="font-bold">n</span>
                  mile.com
                </div>
                <div className="text-muted-foreground">
                  → typosquatting (rn ≈ m)
                </div>

                <Separator className="my-3" />

                <div>
                  <span className="text-primary">$</span> whois
                  beverly-boc-polar-knows.trycloudflare.com
                </div>
                <div className="text-accent font-600">[!] Cloudflare Tunnel</div>
                <div className="text-muted-foreground">
                  → infraestrutura efêmera de C2
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <Card className="p-4 border-primary/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground mb-1">
                      SEVERIDADE
                    </p>
                    <p className="font-fraunces font-600 text-lg">CRÍTICA</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-primary/20">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground mb-1">
                      TÉCNICA
                    </p>
                    <p className="font-fraunces font-600">
                      Domain Spoofing + Gophish
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-primary/20">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground mb-1">
                      FRAMEWORK
                    </p>
                    <p className="font-fraunces font-600">
                      MITRE ATT&CK — T1566
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-primary/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-sm text-muted-foreground mb-1">
                      RESULTADO
                    </p>
                    <p className="font-fraunces font-600">
                      Severidade confirmada e contida
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-28">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm font-mono text-primary font-600 mb-2">
              PROJETOS
            </p>
            <h2 className="font-fraunces font-700 text-3xl md:text-4xl mb-4">
              O que venho construindo
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Projetos práticos que conectam automação e segurança — a
              interseção onde quero atuar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "log-anomaly-detector",
                status: "Ativo",
                statusColor: "bg-green-100 text-green-800",
                desc: "Ferramenta em Python que analisa logs de acesso e transações, identifica comportamentos suspeitos mapeados ao MITRE ATT&CK e gera relatórios HTML automatizados.",
                tags: ["Python", "MITRE ATT&CK", "Log Analysis"],
                link: "https://github.com/cyb3r-h0bbit/log-anomaly-detector",
                icon: <Terminal className="w-5 h-5" />,
              },
              {
                title: "Home Lab — Privacy & Security Stack",
                status: "Concluído",
                statusColor: "bg-blue-100 text-blue-800",
                desc: "Stack de segurança de rede doméstica em Raspberry Pi: Pi-hole com DNSSEC, Unbound como resolver recursivo, VPN e Fail2ban.",
                tags: ["Linux", "DNS Security", "Fail2ban", "VPN"],
                link: "#",
                icon: <Shield className="w-5 h-5" />,
              },
              {
                title: "Reconciliação Financeira Automatizada",
                status: "Em produção",
                statusColor: "bg-purple-100 text-purple-800",
                desc: "Automação de fluxos de contas a pagar e conciliação bancária em ambiente fintech regulado, aplicando princípios de Security by Design.",
                tags: ["Python", "SQL", "Fintech", "Security"],
                link: "#",
                icon: <Database className="w-5 h-5" />,
              },
              {
                title: "Análise de Logs com IA",
                status: "Planejamento",
                statusColor: "bg-amber-100 text-amber-800",
                desc: "Sistema de análise de logs de segurança usando LLMs para classificação automática de incidentes e geração de relatórios contextualizados.",
                tags: ["Python", "LLM", "Security Analytics"],
                link: "#",
                icon: <Code className="w-5 h-5" />,
              },
            ].map((project, idx) => (
              <Card
                key={idx}
                className="p-6 hover:shadow-lg transition-shadow border-primary/10 hover:border-primary/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {project.icon}
                    </div>
                    <h3 className="font-fraunces font-600 text-lg">
                      {project.title}
                    </h3>
                  </div>
                  <Badge
                    className={`text-xs font-600 ${project.statusColor}`}
                    variant="secondary"
                  >
                    {project.status}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4 text-sm">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-600"
                  >
                    Ver no GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 md:py-28 bg-secondary/5">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm font-mono text-primary font-600 mb-2">
              CERTIFICAÇÕES
            </p>
            <h2 className="font-fraunces font-700 text-3xl md:text-4xl mb-4">
              Credenciais e Validações
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Certificações que validam expertise em segurança, automação e
              conformidade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "ISO 27001",
                issuer: "International Organization for Standardization",
                year: "2024",
                icon: <Shield className="w-8 h-8" />,
              },
              {
                title: "Google Cybersecurity Certificate",
                issuer: "Google Career Certificates",
                year: "2024",
                icon: <Lock className="w-8 h-8" />,
              },
              {
                title: "EF SET English Certificate",
                issuer: "EF Education First",
                year: "2023",
                desc: "C1 Advanced (69/100)",
                icon: <Code className="w-8 h-8" />,
              },
            ].map((cert, idx) => (
              <Card
                key={idx}
                className="p-6 border-primary/20 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  {cert.icon}
                </div>
                <h3 className="font-fraunces font-600 mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {cert.issuer}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">
                    {cert.year}
                  </span>
                  {cert.desc && (
                    <Badge variant="outline" className="text-xs">
                      {cert.desc}
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-28">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm font-mono text-primary font-600 mb-2">
              SKILLS
            </p>
            <h2 className="font-fraunces font-700 text-3xl md:text-4xl mb-4">
              Stack Técnico
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Ferramentas, linguagens e frameworks que uso para construir
              soluções de segurança e automação.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                category: "Linguagens",
                skills: ["Python", "SQL", "Bash", "JavaScript/TypeScript"],
              },
              {
                category: "Segurança & Análise",
                skills: [
                  "MITRE ATT&CK",
                  "Wireshark/TShark",
                  "Log Analysis",
                  "Threat Intelligence",
                ],
              },
              {
                category: "Infraestrutura",
                skills: [
                  "Linux (Ubuntu/Debian)",
                  "Docker",
                  "Active Directory",
                  "VPN/Networking",
                ],
              },
              {
                category: "Ferramentas & Plataformas",
                skills: [
                  "Power BI",
                  "Git",
                  "GitHub",
                  "Raspberry Pi",
                  "Pi-hole",
                  "Fail2ban",
                ],
              },
            ].map((group, idx) => (
              <div key={idx}>
                <h3 className="font-fraunces font-600 text-lg mb-4 text-primary">
                  {group.category}
                </h3>
                <div className="space-y-2">
                  {group.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Writeups Section */}
      <section id="writeups" className="py-20 md:py-28 bg-secondary/5">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm font-mono text-primary font-600 mb-2">
              WRITEUPS
            </p>
            <h2 className="font-fraunces font-700 text-3xl md:text-4xl mb-4">
              Documentação Técnica
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Análises detalhadas de desafios de segurança, CTFs e incidentes
              reais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Pacific 2026 — Linux Forensics",
                desc: "Análise forense em container Docker com foco em recuperação de dados e detecção de anomalias.",
                difficulty: "Avançado",
                difficultyColor: "bg-red-100 text-red-800",
                tags: ["Linux", "Forensics", "Docker"],
                link: "/writeups/pacific-2026-linux-forensics",
              },
              {
                title: "Phishing GoPhish — Fintech",
                desc: "Investigação completa de campanha de phishing usando GoPhish, análise de headers de email e rastreamento de C2.",
                difficulty: "Intermediário",
                difficultyColor: "bg-amber-100 text-amber-800",
                tags: ["Phishing", "Email Analysis", "Threat Intel"],
                link: "/writeups/phishing-gophish-fintech",
              },
            ].map((writeup, idx) => (
              <Card
                key={idx}
                className="p-6 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-fraunces font-600 text-lg group-hover:text-primary transition-colors flex-1">
                    {writeup.title}
                  </h3>
                  <Badge
                    className={`text-xs font-600 whitespace-nowrap ml-2 ${writeup.difficultyColor}`}
                    variant="secondary"
                  >
                    {writeup.difficulty}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4 text-sm">
                  {writeup.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {writeup.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <a
                  href={writeup.link}
                  className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-600 group-hover:gap-3 transition-all"
                >
                  Ler Writeup <ExternalLink className="w-3 h-3" />
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-28">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-mono text-primary font-600 mb-2">
              CONTATO
            </p>
            <h2 className="font-fraunces font-700 text-3xl md:text-4xl mb-4">
              Vamos conversar?
            </h2>
            <p className="text-muted-foreground">
              Estou aberto a oportunidades em Blue Team, SOC, IAM e Threat
              Intelligence. Conecte-se comigo através dos canais abaixo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <a
              href="https://github.com/cyb3r-h0bbit"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="p-6 text-center border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <Github className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-fraunces font-600 mb-1">GitHub</h3>
                <p className="text-sm text-muted-foreground">
                  cyb3r-h0bbit
                </p>
              </Card>
            </a>

            <a
              href="https://linkedin.com/in/danielcavalcante"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="p-6 text-center border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <Linkedin className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-fraunces font-600 mb-1">LinkedIn</h3>
                <p className="text-sm text-muted-foreground">
                  Daniel Cavalcante
                </p>
              </Card>
            </a>

            <a href="mailto:daniel@example.com" className="group">
              <Card className="p-6 text-center border-primary/10 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <Mail className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-fraunces font-600 mb-1">Email</h3>
                <p className="text-sm text-muted-foreground">
                  daniel@cavalcante.dev
                </p>
              </Card>
            </a>
          </div>

          <div className="text-center pt-12 border-t border-border">
            <p className="text-sm text-muted-foreground font-mono">
              © 2026 Daniel Cavalcante. Construído com React + Tailwind CSS.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
