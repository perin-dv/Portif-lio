import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../dist/', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const normalized = html.toLocaleLowerCase('pt-BR');

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
if (new Set(ids).size !== ids.length) throw new Error('IDs duplicados.');

for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.includes(match[1])) throw new Error(`Âncora ausente: ${match[1]}`);
}

for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
  if (/^(https?:|mailto:|data:)/.test(match[1])) continue;
  if (!existsSync(fileURLToPath(new URL(match[1], root)))) throw new Error(`Arquivo ausente: ${match[1]}`);
}

const required = [
  'takedream',
  'temnaloja',
  'stella',
  'amazonclip',
  'perinjobs',
  'transformando ideias em',
  'desenvolvimento • ia • cloud • automação',
  'histórias que merecem ser revividas.',
  'tem uma ideia?'
];

for (const text of required) {
  if (!normalized.includes(text)) throw new Error(`Texto ausente: ${text}`);
}

if (/R\$\s*4|Projetos a partir de/i.test(html)) {
  throw new Error('Valor comercial antigo ainda presente.');
}


const weddingLinks = [...html.matchAll(/class="wedding-watch media-watch"[^>]*data-video="([^"]+)"[^>]*data-poster="([^"]+)"/g)];
if (weddingLinks.length !== 6) throw new Error('A galeria precisa de seis cards com vídeos reais.');
const eventVideos = [...new Set([...weddingLinks.map(m => m[1]), 'assets/media/julia-ayalla-trailer.mp4'])];
if (eventVideos.length !== 7) throw new Error('Esperados sete vídeos distintos para seis cards.');
for (const videoPath of eventVideos) {
  const posterPath = videoPath.replace(/\.mp4$/, '.webp');
  if (!existsSync(fileURLToPath(new URL(videoPath, root)))) throw new Error('Vídeo de evento ausente: ' + videoPath);
  if (!existsSync(fileURLToPath(new URL(posterPath, root)))) throw new Error('Capa de evento ausente: ' + posterPath);
}

console.log('Conteúdo, CTA, navegação, cases e referências locais verificados.');
