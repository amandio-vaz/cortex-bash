import { DeploymentCategory } from '../types';

export const DEPLOYMENT_GUIDES_DATA: Record<string, DeploymentCategory> = {
  apt: {
    displayName: 'deploymentGuidesCategoryApt',
    guides: [
      {
        title: 'Python 3 & Ferramentas Essenciais',
        description: 'Instala o Python 3, o gerenciador de pacotes PIP, o utilitário de ambientes virtuais VENV e as ferramentas de compilação essenciais.',
        useCase: 'Fundamental para qualquer ambiente de desenvolvimento Python em sistemas baseados em Debian/Ubuntu. Permite compilar pacotes, criar ambientes isolados e gerenciar dependências.',
        steps: [
          { command: 'sudo apt update && sudo apt upgrade -y', description: 'Atualiza a lista de pacotes e o sistema.' },
          { command: 'sudo apt install python3 python3-pip python3-venv build-essential libssl-dev libffi-dev python3-dev -y', description: 'Instala o Python e pacotes cruciais.' },
        ],
      },
      {
        title: 'Git',
        description: 'Instala o Git, o sistema de controle de versão distribuído mais popular do mundo.',
        useCase: 'Essencial para desenvolvimento de software, permitindo versionar código, colaborar com equipes e interagir com plataformas como GitHub e GitLab.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install git -y', description: 'Instala o pacote do Git.' },
        ],
      },
      {
        title: 'Nginx',
        description: 'Instala o Nginx, um servidor web de alto desempenho, proxy reverso, balanceador de carga e cache HTTP.',
        useCase: 'Servir sites estáticos, atuar como proxy reverso para aplicações Node.js/Python/Go, balancear carga entre múltiplos servidores e configurar cache para melhorar a performance.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install nginx -y', description: 'Instala o Nginx.' },
        ],
      },
      {
        title: 'Curl & Jq',
        description: 'Instala o `curl` para transferir dados com URLs e o `jq` para processar e manipular dados JSON na linha de comando.',
        useCase: 'Indispensável para testar APIs, baixar arquivos e processar respostas JSON em scripts. `jq` permite filtrar, mapear e transformar estruturas JSON complexas.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install curl jq -y', description: 'Instala ambos os pacotes.' },
        ],
      },
      {
        title: 'Htop',
        description: 'Instala o `htop`, um visualizador de processos interativo e monitor de sistema em tempo real.',
        useCase: 'Uma alternativa muito superior ao comando `top`. Facilita a visualização do consumo de CPU e RAM, busca de processos e gerenciamento (ex: kill) de forma interativa e colorida.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install htop -y', description: 'Instala o htop.' },
        ],
      },
      {
        title: 'Unzip',
        description: 'Instala o utilitário `unzip` para extrair arquivos de arquivos ZIP.',
        useCase: 'Necessário para descompactar arquivos com a extensão .zip, um formato de compressão muito comum.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install unzip -y', description: 'Instala o unzip.' },
        ],
      },
      {
        title: 'Tmux',
        description: 'Instala o `tmux`, um multiplexador de terminal que permite criar e gerenciar múltiplas sessões de terminal em uma única janela.',
        useCase: 'Manter processos rodando em segundo plano mesmo após desconectar do SSH, organizar o trabalho com múltiplos painéis e janelas, e compartilhar sessões de terminal.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install tmux -y', description: 'Instala o tmux.' },
        ],
      },
      {
        title: 'Neofetch',
        description: 'Instala o `neofetch`, uma ferramenta de linha de comando que exibe informações do sistema de forma elegante e visualmente agradável.',
        useCase: 'Gerar rapidamente um resumo visual do sistema, incluindo SO, kernel, uptime, hardware e temas, ideal para screenshots e verificações rápidas.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install neofetch -y', description: 'Instala o neofetch.' },
        ],
      },
      {
        title: 'UFW (Firewall)',
        description: 'Instala o `ufw` (Uncomplicated Firewall), uma interface amigável para gerenciar o `iptables`.',
        useCase: 'Configurar regras de firewall de forma simples e intuitiva para proteger o servidor, permitindo ou bloqueando portas e serviços específicos.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install ufw -y', description: 'Instala o ufw.' },
        ],
      },
      {
        title: 'Fail2ban',
        description: 'Instala o `fail2ban`, uma ferramenta de prevenção de intrusão que monitora logs e bane IPs com atividades maliciosas.',
        useCase: 'Proteger serviços como SSH contra ataques de força bruta, banindo automaticamente os IPs que falham repetidamente na autenticação.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install fail2ban -y', description: 'Instala o fail2ban.' },
        ],
      },
      {
        title: 'Tree',
        description: 'Instala o `tree`, um utilitário que lista o conteúdo de diretórios em um formato de árvore.',
        useCase: 'Visualizar rapidamente a estrutura de diretórios de um projeto de forma hierárquica e clara.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install tree -y', description: 'Instala o tree.' },
        ],
      },
      {
        title: 'Ncdu',
        description: 'Instala o `ncdu` (NCurses Disk Usage), um analisador de uso de disco com interface de console.',
        useCase: 'Identificar rapidamente quais arquivos e diretórios estão consumindo mais espaço em disco de forma interativa.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install ncdu -y', description: 'Instala o ncdu.' },
        ],
      },
      {
        title: 'Bat',
        description: 'Instala o `bat`, um clone do `cat` com syntax highlighting e integração com Git.',
        useCase: 'Visualizar arquivos de código diretamente no terminal com destaque de sintaxe, numeração de linhas e visualização de modificações do Git.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install bat -y', description: 'Instala o bat.' },
          { command: 'mkdir -p ~/.local/bin && ln -s /usr/bin/batcat ~/.local/bin/bat', description: 'Cria um link simbólico para usar `bat` em vez de `batcat`.'},
        ],
      },
      {
        title: 'Ripgrep (rg)',
        description: 'Instala o `ripgrep`, uma ferramenta de busca de texto recursiva extremamente rápida.',
        useCase: 'Uma alternativa moderna e muito mais rápida ao `grep`, especialmente para buscar em grandes bases de código, respeitando automaticamente o `.gitignore`.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install ripgrep -y', description: 'Instala o ripgrep.' },
        ],
      },
      {
        title: 'Fzf',
        description: 'Instala o `fzf`, um localizador fuzzy de linha de comando de propósito geral.',
        useCase: 'Melhorar drasticamente a produtividade no terminal, permitindo buscar arquivos, histórico de comandos (Ctrl+R) e processos de forma interativa e instantânea.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install fzf -y', description: 'Instala o fzf.' },
        ],
      },
      {
        title: 'Zsh (Z Shell)',
        description: 'Instala o `zsh`, um shell poderoso e altamente personalizável, compatível com o Bash.',
        useCase: 'Substituir o Bash por um shell com melhor autocompletar, correção de digitação, temas e um ecossistema de plugins robusto (como o Oh My Zsh).',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install zsh -y', description: 'Instala o zsh.' },
        ],
      },
      {
        title: 'Httpie',
        description: 'Instala o `httpie`, um cliente HTTP de linha de comando amigável, moderno e uma alternativa ao `curl`.',
        useCase: 'Testar e interagir com APIs de forma mais intuitiva, com saída JSON colorida, sintaxe simplificada e sessões persistentes.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install httpie -y', description: 'Instala o httpie.' },
        ],
      },
      {
        title: 'Nmap',
        description: 'Instala o `nmap` (Network Mapper), a ferramenta padrão da indústria para exploração de rede e auditoria de segurança.',
        useCase: 'Descobrir hosts em uma rede, escanear portas abertas, detectar serviços e versões, e identificar sistemas operacionais.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install nmap -y', description: 'Instala o nmap.' },
        ],
      },
      {
        title: 'Iftop',
        description: 'Instala o `iftop`, uma ferramenta que exibe o uso de largura de banda em uma interface de rede.',
        useCase: 'Monitorar o tráfego de rede em tempo real para identificar quais conexões estão consumindo mais banda.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install iftop -y', description: 'Instala o iftop.' },
        ],
      },
      {
        title: 'Iotop',
        description: 'Instala o `iotop`, um utilitário semelhante ao `top` para monitorar o uso de I/O (entrada/saída) de disco.',
        useCase: 'Identificar quais processos estão lendo ou escrevendo intensivamente no disco, ajudando a diagnosticar gargalos de performance.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install iotop -y', description: 'Instala o iotop.' },
        ],
      },
      {
        title: 'Rsync',
        description: 'Instala o `rsync`, uma ferramenta rápida e versátil para sincronizar arquivos e diretórios.',
        useCase: 'Realizar backups incrementais, espelhar diretórios entre máquinas locais ou remotas de forma eficiente, transferindo apenas as diferenças.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install rsync -y', description: 'Instala o rsync.' },
        ],
      },
      {
        title: 'Vim',
        description: 'Instala o `vim`, um editor de texto de terminal altamente configurável e poderoso.',
        useCase: 'Editar arquivos de configuração e código diretamente no servidor via SSH de forma eficiente, sem a necessidade de uma interface gráfica.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install vim -y', description: 'Instala o vim.' },
        ],
      },
      {
        title: 'Net-tools',
        description: 'Instala `net-tools`, que inclui utilitários de rede clássicos como `ifconfig`, `netstat` e `route`.',
        useCase: 'Necessário em alguns scripts legados ou para administradores acostumados com as ferramentas de rede mais antigas, embora `ip` e `ss` sejam os substitutos modernos.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install net-tools -y', description: 'Instala o net-tools.' },
        ],
      },
      {
        title: 'Traceroute',
        description: 'Instala o `traceroute`, uma ferramenta para diagnosticar rotas de rede.',
        useCase: 'Descobrir o caminho (saltos) que os pacotes de rede levam para chegar a um destino, ajudando a identificar problemas de conectividade e latência.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install traceroute -y', description: 'Instala o traceroute.' },
        ],
      },
      {
        title: 'Whois',
        description: 'Instala o `whois`, um cliente para consultar bancos de dados de registro de domínio.',
        useCase: 'Obter informações públicas sobre um nome de domínio, como proprietário, datas de registro e servidores de nomes.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install whois -y', description: 'Instala o whois.' },
        ],
      },
      {
        title: 'Midnight Commander (mc)',
        description: 'Instala o `mc`, um gerenciador de arquivos de dois painéis para o terminal.',
        useCase: 'Navegar, copiar, mover e gerenciar arquivos e diretórios no terminal de forma visual e intuitiva, similar aos antigos gerenciadores de arquivos do DOS.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install mc -y', description: 'Instala o Midnight Commander.' },
        ],
      },
      {
        title: 'Tcpdump',
        description: 'Instala o `tcpdump`, um poderoso analisador de pacotes de linha de comando.',
        useCase: 'Capturar e analisar o tráfego de rede em uma interface específica para depuração detalhada de problemas de rede e segurança.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install tcpdump -y', description: 'Instala o tcpdump.' },
        ],
      },
      {
        title: 'Nload',
        description: 'Instala o `nload`, um monitor de tráfego de rede em tempo real com gráficos no console.',
        useCase: 'Visualizar o tráfego de entrada e saída de uma interface de rede de forma clara e concisa.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install nload -y', description: 'Instala o nload.' },
        ],
      },
      {
        title: 'Speedtest-cli',
        description: 'Instala o `speedtest-cli` para testar a velocidade da conexão de internet a partir da linha de comando.',
        useCase: 'Verificar as velocidades de download e upload de um servidor diretamente do terminal, sem a necessidade de um navegador.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install speedtest-cli -y', description: 'Instala o speedtest-cli.' },
        ],
      },
      {
        title: 'Glances',
        description: 'Instala o `glances`, um monitor de sistema "tudo em um" escrito em Python.',
        useCase: 'Obter uma visão abrangente e em tempo real de CPU, memória, disco, rede e processos, tudo em uma única tela.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install glances -y', description: 'Instala o glances.' },
        ],
      },
      {
        title: 'Silver Searcher (ag)',
        description: 'Instala o `silversearcher-ag`, uma ferramenta de busca de código extremamente rápida.',
        useCase: 'Uma alternativa ao `ack` e `grep` para buscar texto em arquivos, otimizada para velocidade em grandes projetos de código.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install silversearcher-ag -y', description: 'Instala o The Silver Searcher.' },
        ],
      },
      {
        title: 'Bmon',
        description: 'Instala o `bmon`, um monitor de largura de banda de rede e coletor de estatísticas.',
        useCase: 'Monitorar e depurar redes, fornecendo várias visualizações do tráfego de rede com detalhes por interface.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install bmon -y', description: 'Instala o bmon.' },
        ],
      },
      {
        title: 'TLDR Pages',
        description: 'Instala o `tldr`, um cliente para páginas de manual simplificadas e baseadas em exemplos.',
        useCase: 'Obter exemplos práticos de como usar um comando sem ter que ler a página `man` completa. Ex: `tldr tar`.',
        steps: [
          { command: 'sudo apt update', description: 'Atualiza a lista de pacotes.' },
          { command: 'sudo apt install tldr -y', description: 'Instala o cliente tldr.' },
        ],
      },
    ],
  },
  docker: {
    displayName: 'deploymentGuidesCategoryDocker',
    guides: [
      {
        title: 'Docker Engine & Compose (Ubuntu)',
        description: 'Instala a versão mais recente do Docker Engine e do plugin Docker Compose seguindo o método oficial do repositório Docker.',
        useCase: 'Permite criar, executar e gerenciar contêineres Docker e orquestrar aplicações multi-contêiner com arquivos `docker-compose.yml`. Essencial para ambientes de desenvolvimento e produção modernos.',
        steps: [
          { command: 'sudo apt-get update', description: 'Atualiza a lista de pacotes.'},
          { command: 'sudo apt-get install ca-certificates curl', description: 'Instala pacotes para permitir o uso de repositórios via HTTPS.'},
          { command: 'sudo install -m 0755 -d /etc/apt/keyrings', description: 'Cria o diretório para chaves GPG do APT.'},
          { command: 'sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc', description: 'Baixa a chave GPG oficial do Docker.'},
          { command: 'sudo chmod a+r /etc/apt/keyrings/docker.asc', description: 'Ajusta permissões da chave.'},
          { command: 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null', description: 'Adiciona o repositório do Docker ao APT.' },
          { command: 'sudo apt-get update', description: 'Atualiza a lista de pacotes com o novo repositório.'},
          { command: 'sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y', description: 'Instala os pacotes do Docker Engine e Compose.' },
          { command: 'sudo usermod -aG docker $USER', description: 'Adiciona seu usuário ao grupo "docker" para executar comandos sem sudo (requer novo login).'},
        ],
      },
    ],
  },
  microk8s: {
    displayName: 'deploymentGuidesCategoryMicrok8s',
    guides: [
      {
        title: 'MicroK8s via Snap',
        description: 'Instala o MicroK8s, um Kubernetes de nó único, leve e certificado pela CNCF, empacotado como um snap.',
        useCase: 'Ideal para desenvolvimento, prototipagem, testes de CI/CD e cargas de trabalho de IoT/edge. Oferece uma experiência Kubernetes completa de forma simples e rápida.',
        steps: [
          { command: 'sudo snap install microk8s --classic', description: 'Instala o snap do MicroK8s.' },
          { command: 'sudo usermod -a -G microk8s $USER', description: 'Adiciona seu usuário ao grupo do MicroK8s para executar comandos sem sudo.' },
          { command: 'sudo chown -f -R $USER ~/.kube', description: 'Ajusta permissões do diretório kubeconfig.'},
          { command: 'echo "Faça um novo login ou execute \'newgrp microk8s\' para aplicar as permissões."', description: 'Instrução para o usuário.', isCode: false },
          { command: 'microk8s status --wait-ready', description: 'Verifica o status e aguarda o serviço ficar pronto.' },
          { command: 'microk8s enable dns dashboard storage', description: 'Habilita addons essenciais como DNS, o Dashboard e o provisionador de armazenamento padrão.' },
          { command: 'microk8s kubectl get all -A', description: 'Verifica se todos os pods do sistema estão rodando corretamente.' },
        ],
      },
    ],
  },
  pip: {
    displayName: 'deploymentGuidesCategoryPip',
    guides: [
      {
        title: 'Ansible em Ambiente Virtual (.venv)',
        description: 'Instala o Ansible e suas coleções de forma profissional, utilizando um ambiente virtual Python para isolar dependências e garantir a reprodutibilidade dos seus projetos de automação.',
        useCase: 'Ideal para gerenciar múltiplos projetos Ansible com diferentes versões ou dependências, evitando conflitos com pacotes Python do sistema. Essencial para automação de infraestrutura, provisionamento e gerenciamento de configuração de forma limpa e organizada.',
        steps: [
          { command: 'echo "Criando o ambiente virtual..."', description: 'Mensagem informativa.', isCode: false },
          { command: 'python3 -m venv ansible_project_venv', description: 'Cria um diretório com um ambiente Python isolado.'},
          { command: 'echo "Ativando o ambiente virtual..."', description: 'Mensagem informativa.', isCode: false },
          { command: 'source ansible_project_venv/bin/activate', description: 'Ativa o ambiente. O prompt do seu terminal deve mudar.'},
          { command: 'echo "Atualizando o PIP..."', description: 'Mensagem informativa.', isCode: false },
          { command: 'pip install --upgrade pip', description: 'Garante que o gerenciador de pacotes pip está na última versão.'},
          { command: 'echo "Instalando o Ansible..."', description: 'Mensagem informativa.', isCode: false },
          { command: 'pip install ansible', description: 'Instala o pacote principal do Ansible no ambiente isolado.'},
          { command: 'echo "Instalando coleções da comunidade (ex: general, docker)..."', description: 'Mensagem informativa.', isCode: false },
          { command: 'ansible-galaxy collection install community.general community.docker', description: 'Instala coleções populares com módulos úteis.'},
          { command: 'ansible --version', description: 'Verifica a instalação e exibe a versão do Ansible e Python.'},
          { command: 'echo "Para sair do ambiente virtual, use o comando: deactivate"', description: 'Instrução final.', isCode: false },
        ]
      }
    ]
  },
  npm: {
    displayName: 'deploymentGuidesCategoryNpm',
    guides: [
      {
        title: 'NVM + Node.js & NPM',
        description: 'Instala o Node.js e o NPM da forma correta usando o NVM (Node Version Manager). Esta é a melhor prática pois permite gerenciar múltiplas versões do Node sem a necessidade de `sudo`, evitando problemas de permissão e facilitando a troca de versão por projeto.',
        useCase: 'Essencial para qualquer desenvolvedor JavaScript/TypeScript. Permite criar, construir e executar aplicações web, back-ends, ferramentas de linha de comando e muito mais.',
        steps: [
          { command: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash', description: 'Baixa e executa o script de instalação do NVM.' },
          { command: 'export NVM_DIR="$HOME/.nvm"', description: 'Define a variável de ambiente para o NVM (adicione ao seu .bashrc/.zshrc).'},
          { command: '[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"', description: 'Carrega o NVM na sessão atual do shell (adicione também ao .bashrc/.zshrc).'},
          { command: 'source ~/.bashrc', description: 'Recarrega o arquivo de configuração do shell para aplicar as mudanças.'},
          { command: 'nvm install --lts', description: 'Instala a versão mais recente de Suporte de Longo Prazo (LTS) do Node.js, que inclui o NPM.'},
          { command: 'node -v && npm -v', description: 'Verifica se a instalação foi bem-sucedida exibindo as versões.'},
        ],
      },
      {
        title: 'Vercel CLI',
        description: 'Instala a Vercel CLI, a interface de linha de comando para a plataforma Vercel, otimizada para frameworks de frontend e serverless functions.',
        useCase: 'Permite fazer deploy de projetos, gerenciar domínios, variáveis de ambiente e logs diretamente do terminal. Indispensável para o fluxo de trabalho de qualquer desenvolvedor que usa a Vercel.',
        steps: [
          { command: 'npm install -g vercel', description: 'Instala a CLI da Vercel globalmente usando NPM.' },
          { command: 'vercel --version', description: 'Verifica a instalação.' },
          { command: 'vercel login', description: 'Autentica sua conta da Vercel.' },
        ],
      },
      {
        title: 'Redis CLI',
        description: 'Instala o `redis-cli`, a interface de linha de comando oficial para interagir com servidores Redis. Redis é um banco de dados em memória de alto desempenho.',
        useCase: 'Conveniente para desenvolvedores que precisam se conectar a um servidor Redis (local ou remoto) para depurar, inspecionar chaves, executar comandos ou monitorar a performance, sem precisar instalar o pacote completo do servidor Redis.',
        steps: [
          { command: 'npm install -g redis-cli', description: 'Instala o pacote redis-cli globalmente.' },
          { command: 'redis-cli --version', description: 'Verifica se a CLI foi instalada corretamente.' },
          { command: 'redis-cli -h <host> -p <porta> PING', description: 'Exemplo de como conectar a um servidor e testar a conexão.' },
        ],
      },
    ]
  }
};
