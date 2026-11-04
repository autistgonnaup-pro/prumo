import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import chokidar from 'chokidar';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  { global: { headers: { 'User-Agent': 'script-local' } } }
);

const comando = process.argv[2];
const pastaRaiz = path.dirname(fileURLToPath(import.meta.url));

function formatarCaminho(caminhoAbsoluto) {
  let rel = caminhoAbsoluto.replace(/\\/g, '/').replace(pastaRaiz.replace(/\\/g, '/'), '');
  return rel.startsWith('/') ? rel.substring(1) : rel;
}

async function listarArquivos() {
  console.log('Buscando histórico...\n');
  const { data, error } = await supabase.from('arquivos_novos').select('*').order('criado_em', { ascending: false });
  
  if (error) return console.error('❌ Erro no banco:', error.message);
  if (data.length === 0) return console.log('Nenhum arquivo registrado.');

  console.table(data.map(item => ({
    Status: item.status === 'excluído' ? '🔴 Excluído' : '🟢 Ativo',
    Arquivo: item.caminho,
    'Criado em': new Date(item.criado_em).toLocaleString('pt-BR'),
    'Excluído em': item.excluido_em ? new Date(item.excluido_em).toLocaleString('pt-BR') : '-'
  })));
}

if (comando === 'list') {
  listarArquivos();
} else {
  const watcher = chokidar.watch(pastaRaiz, {
    ignored: /(^|[\/\\])\..|node_modules|dist|build|\.git/,
    persistent: true,
    ignoreInitial: true,
  });

  console.log(`👀 Monitorando: ${pastaRaiz}\n`);

  watcher.on('add', async (caminho) => {
    const rel = formatarCaminho(caminho);
    console.log(`🟢 [NOVO ARQUIVO] ${rel}`);
    
    const { error } = await supabase.from('arquivos_novos').upsert(
      { caminho: rel, status: 'ativo', criado_em: new Date().toISOString(), excluido_em: null },
      { onConflict: 'caminho' }
    );
    
    if (error) console.error('❌ Erro ao salvar:', error.message);
    else console.log(`✅ Salvo no banco.`);
  });

  watcher.on('unlink', async (caminho) => {
    const rel = formatarCaminho(caminho);
    console.log(`\n🔴 [ARQUIVO EXCLUÍDO] ${rel}`);
    
    const { error } = await supabase.from('arquivos_novos')
      .update({ status: 'excluído', excluido_em: new Date().toISOString() })
      .eq('caminho', rel);
      
    if (error) console.error('❌ Erro ao marcar exclusão:', error.message);
    else console.log(`🗑️ Marcado como excluído no banco.`);
  });
}