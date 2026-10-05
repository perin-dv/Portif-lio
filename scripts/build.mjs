import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('../dist/', import.meta.url));
const output = fileURLToPath(new URL('../build/', import.meta.url));
const indexPath = fileURLToPath(new URL('../dist/index.html', import.meta.url));

let html = readFileSync(indexPath, 'utf8');

const linkedinButton = '<a class="button" href="https://www.linkedin.com/in/guilherme-perin-580322272" target="_blank" rel="noopener noreferrer">LinkedIn</a>';
const resumeButtons = '<a class="button" href="assets/Curriculo_Guilherme_Perin_Tecnologia.pdf" download>Currículo Tecnologia</a><a class="button" href="assets/Curriculo_Guilherme_Perin_AI_Video.pdf" download>Currículo AI & Audiovisual</a>';

if (!html.includes('Currículo Tecnologia')) {
  if (!html.includes(linkedinButton)) throw new Error('Ponto de inserção dos currículos não encontrado.');
  html = html.replace(linkedinButton, `${linkedinButton}${resumeButtons}`);
  writeFileSync(indexPath, html, 'utf8');
}

mkdirSync(output, { recursive: true });
cpSync(source, output, { recursive: true });
console.log('Build concluído: currículos adicionados e build/ gerado.');
