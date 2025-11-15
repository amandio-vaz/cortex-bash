import { ScriptTemplate } from './types';

export const SCRIPT_TEMPLATES: ScriptTemplate[] = [
  {
    id: 'backup-dir',
    nameKey: 'template_backupDir_name',
    descriptionKey: 'template_backupDir_desc',
    prompt: 'Crie um script robusto que faz backup de um diretório de origem para um diretório de destino. O script deve: aceitar origem e destino como argumentos de linha de comando com flags (-s, -d); criar um arquivo .tar.gz com timestamp no nome (ex: backup-YYYY-MM-DD_HH-MM-SS.tar.gz); verificar se o diretório de origem existe; verificar se o diretório de destino existe e criá-lo se não existir; registrar mensagens de log (info, erro) em um arquivo de log e também na saída padrão.',
    category: 'file',
  },
  {
    id: 'disk-space-alert',
    nameKey: 'template_diskSpace_name',
    descriptionKey: 'template_diskSpace_desc',
    prompt: 'Gere um script que monitora o uso do disco da partição raiz (/). O script deve: aceitar um limite de porcentagem como argumento opcional (padrão 85%); se o uso do disco exceder o limite, imprimir um alerta de AVISO formatado em JSON para stdout que inclua o dispositivo, o percentual de uso e o limite excedido; ser compatível com Linux e macOS.',
    category: 'system',
  },
  {
    id: 'check-open-ports',
    nameKey: 'template_portScan_name',
    descriptionKey: 'template_portScan_desc',
    prompt: 'Escreva um script que verifica quais portas estão abertas em um host. O script deve: aceitar um nome de host ou endereço IP como primeiro argumento; aceitar uma lista de portas separadas por vírgula como segundo argumento (ex: 80,443,8080); usar `nc` (netcat) com um timeout curto para verificar cada porta; imprimir uma lista clara de portas abertas e fechadas.',
    category: 'network',
  },
  {
    id: 'organize-files',
    nameKey: 'template_organizeFiles_name',
    descriptionKey: 'template_organizeFiles_desc',
    prompt: 'Crie um script para organizar os arquivos em um diretório (ex: Downloads) em subdiretórios com base em seus tipos de arquivo. O script deve: aceitar o diretório a ser organizado como argumento; criar pastas como "Imagens", "Documentos", "Vídeos", "Arquivos"; mover arquivos (.jpg, .png) para "Imagens", (.pdf, .docx) para "Documentos", etc.; lidar com arquivos que já existem no destino para não sobrescrevê-los (adicionando um sufixo).',
    category: 'utility',
  },
];
