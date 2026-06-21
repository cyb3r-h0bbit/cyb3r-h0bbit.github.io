---
title: Investigação de Phishing — Campanha Gophish em Ambiente Fintech
type: incident
date: 2026-04-28
difficulty: intermediate
tags: [phishing, email-forensics, mitre-attack, ioc, gophish]
summary: Análise forense completa de uma campanha de phishing real direcionada a uma fintech, da identificação do toolkit à classificação de severidade.
---

## Contexto

Recebi um e-mail interno com assunto "Especial Dia das Mães 🌷 Uma surpresa
para você", aparentemente enviado pelo time de comunicação interna da empresa.
Algo no remetente chamou atenção antes mesmo de abrir: o domínio parecia
correto à primeira vista, mas não estava.

Decidi investigar antes de reportar — queria chegar ao time de segurança com
evidências, não só uma suspeita.

## Hipótese inicial

E-mails de campanhas internas legítimas vêm sempre do domínio corporativo
oficial. Esse tinha nuances sutis no remetente que pediam uma checagem mais
profunda dos headers brutos do e-mail.

## Investigação

### 1. Análise dos headers

Abri o `.eml` em editor de texto puro e fui direto ao campo `X-Mailer`:

```
X-Mailer: gophish
```

Esse já foi o primeiro sinal forte. Gophish é um framework open-source
legítimo para simulações de phishing — mas também é amplamente reaproveitado
por atacantes reais por ser leve e fácil de configurar.

### 2. Remetente forjado

```
X-Google-Original-From: comunicapagsmile@pagsrnmile.com
```

O domínio real era `pagsrnmile.com`, não o domínio corporativo legítimo. Um
clássico de **typosquatting**: a substituição de "m" por "rn" é quase
imperceptível na maioria das fontes usadas em clientes de e-mail.

### 3. Infraestrutura do link malicioso

O link embutido no corpo do e-mail apontava para:

```
beverly-boc-polar-knows.trycloudflare.com
```

Um subdomínio de **Cloudflare Tunnel** — infraestrutura que permite expor um
serviço local através de um túnel temporário, frequentemente abusada por
atacantes porque a infraestrutura é efêmera e difícil de takedown.

### 4. Pixel de rastreamento

O HTML do e-mail continha uma imagem de 1x1 pixel carregada de um endpoint
externo, técnica clássica para confirmar quando o e-mail é aberto — sinal de
campanha com tracking ativo, não um teste isolado.

## Classificação

| Critério | Achado |
|---|---|
| Técnica MITRE ATT&CK | T1566.002 — Spearphishing Link |
| Toolkit identificado | Gophish |
| Vetor | Typosquatting de domínio corporativo |
| Infraestrutura C2 | Cloudflare Tunnel (efêmera) |
| Severidade | **Crítica** |

## Resposta

Documentei todos os achados em um relatório técnico estruturado: headers
brutos, IOCs extraídos, técnica MITRE mapeada e recomendação de bloqueio do
domínio e do subdomínio de tunnel a nível de proxy/firewall. O relatório foi
entregue ao gestor de segurança da empresa com o assunto sinalizado como
prioridade alta.

## Lições

- Headers brutos contam uma história que a visualização padrão do cliente de
  e-mail esconde — vale sempre abrir o `.eml` puro quando algo parece
  estranho.
- Typosquatting de domínio é eficaz justamente porque depende de um detalhe
  visual sutil, não de sofisticação técnica.
- Cloudflare Tunnel como infraestrutura de phishing está cada vez mais comum
  porque dificulta a atribuição e o takedown tradicional.
