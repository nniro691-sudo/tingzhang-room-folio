import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const base = process.env.PAGES_BASE || '/tingzhang-room-folio/';
if (!/^\/[a-zA-Z0-9_-]+\/$/.test(base)) throw new Error('Expected a single repository base path');
const output = path.resolve('dist/client');
const textTypes = new Set(['.html', '.js', '.css', '.json', '.webmanifest', '.svg']);
async function adapt(folder) {
  for (const entry of await readdir(folder, {withFileTypes:true})) {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) { await adapt(file); continue; }
    if (!textTypes.has(path.extname(file))) continue;
    let content = await readFile(file, 'utf8');
    content = content.replace(/(["'`(=])\/(assets|audio|models|textures|fonts|draco|images|media|portfolio|shaders)\//g,
      (_, lead, directory) => `${lead}${base}${directory}/`);
    content = content.replace(/(["'])\/\?section=/g, `$1${base}?section=`);
    await writeFile(file, content);
  }
}
await adapt(output);
await writeFile(path.join(output,'.nojekyll'),'');
console.log(`Prepared GitHub Pages build at ${base}`);
