const chokidar = require('chokidar');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient('SUA_URL', 'SUA_CHAVE');

const watcher = chokidar.watch('./src', {
  ignored: /(^|[\/\\])\..|node_modules|dist|build/,
  persistent: true
});

watcher.on('add', async (caminho) => {
  console.log(`[NOVO ARQUIVO] ${caminho}`);

  const { error } = await supabase
    .from('arquivos_novos')
    .insert({ caminho: caminho });

  if (error) {
    console.error('Erro ao salvar no Supabase:', error.message);
  } else {
    console.log(`Salvo no Supabase: ${caminho}`);
  }
});