import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = new URL('../dist/', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(ids).size !== ids.length) throw new Error('IDs duplicados.');
for (const match of html.matchAll(/href="#([^"]+)"/g)) if (!ids.includes(match[1])) throw new Error(`Âncora ausente: ${match[1]}`);
for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
  if (/^(https?:|mailto:|data:)/.test(match[1])) continue;
  if (!existsSync(fileURLToPath(new URL(match[1], root)))) throw new Error(`Arquivo ausente: ${match[1]}`);
}
const required = [
  'TakeDream',
  'TemNaLoja',
  'Stella',
  'AmazonClip',
  'Software • IA • Cloud • Generative Media',
  'Disponível para oportunidades remotas e projetos freelance. Entre em contato para conversar sobre uma vaga, colaboração ou projeto.'
];
for (const text of required) if (!html.includes(text)) throw new Error(`Texto ausente: ${text}`);
if (/R\$\s*4|Projetos a partir de/.test(html)) throw new Error('Valor comercial antigo ainda presente.');
console.log('Conteúdo, CTA, navegação e referências locais verificados.');
