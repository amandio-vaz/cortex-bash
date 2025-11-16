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
      {
        title: 'Portainer CE',
        description: 'Implementa a última versão do Portainer CE, uma interface de gerenciamento de UI leve e poderosa para Docker. Este guia utiliza Docker Compose e segue as melhores práticas de rede e persistência de dados.',
        useCase: 'Gerenciar visualmente todos os seus ambientes Docker (contêineres, imagens, volumes, redes) de forma centralizada. Simplifica o deploy de aplicações, a análise de logs e o monitoramento de contêineres sem a necessidade de memorizar todos os comandos do Docker CLI.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/portainer && cd /opt/docker/portainer', description: 'Cria e acessa o diretório do projeto Portainer.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: portainer-stack

services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    command: -H unix:///var/run/docker.sock
    ports:
      - "8000:8000"
      - "9443:9443"
    volumes:
      - ./portainer_data:/data
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - frontend
    restart: unless-stopped

networks:
  frontend:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para o Portainer.' },
          { command: 'docker compose up -d', description: 'Inicia o contêiner do Portainer em segundo plano.' },
          { command: 'echo "Acesse a interface em: https://SEU_IP_DO_SERVIDOR:9443"', description: 'Instrução de acesso.', isCode: false },
          { command: 'echo "No primeiro acesso, você precisará criar um usuário administrador."', description: 'Instrução de configuração inicial.', isCode: false },
        ],
      },
      {
        title: 'Redis',
        description: 'Implementa uma instância do Redis, um banco de dados em memória de alto desempenho, usando Docker Compose com persistência de dados.',
        useCase: 'Ideal para cache de aplicações, filas de mensagens, gerenciamento de sessões e como um banco de dados NoSQL rápido. A persistência garante que os dados não sejam perdidos ao reiniciar o contêiner.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/redis && cd /opt/docker/redis', description: 'Cria e acessa o diretório do projeto Redis.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: redis-stack

services:
  redis:
    image: redis:latest
    container_name: redis
    command: redis-server --save 60 1 --loglevel warning
    ports:
      - "6379:6379"
    volumes:
      - ./redis_data:/data
    networks:
      - backend
    restart: unless-stopped

networks:
  backend:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para o Redis.' },
          { command: 'docker compose up -d', description: 'Inicia o contêiner do Redis em segundo plano.' },
          { command: 'echo "Servidor Redis rodando e acessível na porta 6379."', description: 'Confirmação do serviço.', isCode: false },
        ],
      },
      {
        title: 'PostgreSQL',
        description: 'Implementa o PostgreSQL, um poderoso banco de dados relacional open-source, com persistência de dados e configuração via variáveis de ambiente.',
        useCase: 'Perfeito como banco de dados principal para uma vasta gama de aplicações, desde pequenos projetos a grandes sistemas transacionais. Garante a durabilidade dos dados com volumes gerenciados pelo Docker.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/postgres && cd /opt/docker/postgres', description: 'Cria e acessa o diretório do projeto PostgreSQL.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: postgres-stack

services:
  postgres:
    image: postgres:latest
    container_name: postgres
    environment:
      POSTGRES_DB: minha_db
      POSTGRES_USER: meu_usuario
      POSTGRES_PASSWORD: SuaSenhaSuperSeguraAltereAqui
    ports:
      - "5432:5432"
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
    networks:
      - backend
    restart: unless-stopped

networks:
  backend:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para o PostgreSQL.' },
          { command: 'docker compose up -d', description: 'Inicia o contêiner do PostgreSQL em segundo plano.' },
          { command: 'echo "IMPORTANTE: Altere a senha padrão no arquivo docker-compose.yml!"', description: 'Aviso de segurança.', isCode: false },
          { command: 'echo "Banco de dados PostgreSQL rodando e acessível na porta 5432."', description: 'Confirmação do serviço.', isCode: false },
        ],
      },
      {
        title: 'MySQL',
        description: 'Implementa o MySQL, o banco de dados relacional mais popular do mundo, com persistência de dados e configuração de senhas via variáveis de ambiente.',
        useCase: 'Ideal para aplicações web que utilizam a stack LAMP/LEMP, sistemas de gerenciamento de conteúdo como WordPress, e qualquer aplicação que necessite de um banco de dados relacional robusto e confiável.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/mysql && cd /opt/docker/mysql', description: 'Cria e acessa o diretório do projeto MySQL.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: mysql-stack

services:
  mysql:
    image: mysql:latest
    container_name: mysql
    environment:
      MYSQL_ROOT_PASSWORD: SuaSenhaDeRootSuperSeguraAltereAqui
      MYSQL_DATABASE: minha_db
      MYSQL_USER: meu_usuario
      MYSQL_PASSWORD: SuaSenhaDeUsuarioSuperSeguraAltereAqui
    ports:
      - "3306:3306"
    volumes:
      - ./mysql_data:/var/lib/mysql
    networks:
      - backend
    restart: unless-stopped

networks:
  backend:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para o MySQL.' },
          { command: 'docker compose up -d', description: 'Inicia o contêiner do MySQL em segundo plano.' },
          { command: 'echo "IMPORTANTE: Altere as senhas padrão no arquivo docker-compose.yml!"', description: 'Aviso de segurança.', isCode: false },
          { command: 'echo "Banco de dados MySQL rodando e acessível na porta 3306."', description: 'Confirmação do serviço.', isCode: false },
        ],
      },
      {
        title: 'FastAPI (Exemplo Completo)',
        description: 'Cria uma estrutura completa para uma aplicação FastAPI, incluindo o código Python, Dockerfile e Docker Compose para um deploy rápido.',
        useCase: 'Um ponto de partida excelente para desenvolver APIs de alta performance com Python. O guia cria um ambiente de desenvolvimento e produção pronto para uso e facilmente extensível.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/fastapi_app && cd /opt/docker/fastapi_app', description: 'Cria e acessa o diretório do projeto FastAPI.' },
          { command: `cat <<'EOF' > main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
EOF`, description: 'Cria o arquivo principal da aplicação Python.' },
          { command: `cat <<'EOF' > requirements.txt
fastapi
uvicorn
EOF`, description: 'Cria o arquivo de dependências Python.' },
          { command: `cat <<'EOF' > Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
EOF`, description: 'Cria o Dockerfile para construir a imagem da aplicação.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: fastapi-stack

services:
  web:
    build: .
    container_name: fastapi_app
    ports:
      - "8000:80"
    networks:
      - frontend
    restart: unless-stopped

networks:
  frontend:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para o FastAPI.' },
          { command: 'docker compose up -d --build', description: 'Constrói a imagem e inicia o contêiner em segundo plano.' },
          { command: 'echo "Aplicação FastAPI rodando. Acesse em: http://SEU_IP_DO_SERVIDOR:8000"', description: 'Instrução de acesso.', isCode: false },
        ],
      },
      {
        title: 'ClickHouse',
        description: 'Implementa o ClickHouse, um banco de dados colunar de alta performance para processamento analítico online (OLAP).',
        useCase: 'Perfeito para sistemas de analytics, business intelligence e processamento de grandes volumes de dados de log em tempo real, onde consultas agregadas rápidas são essenciais.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/clickhouse && cd /opt/docker/clickhouse', description: 'Cria e acessa o diretório do projeto ClickHouse.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: clickhouse-stack

services:
  clickhouse-server:
    image: clickhouse/clickhouse-server:latest
    container_name: clickhouse
    ports:
      - "8123:8123" # HTTP
      - "9000:9000" # TCP Nativo
    volumes:
      - ./clickhouse_data:/var/lib/clickhouse/
      - ./clickhouse_logs:/var/log/clickhouse-server/
    ulimits:
      nofile:
        soft: 262144
        hard: 262144
    networks:
      - backend
    restart: unless-stopped

networks:
  backend:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para o ClickHouse.' },
          { command: 'docker compose up -d', description: 'Inicia o contêiner do ClickHouse em segundo plano.' },
          { command: 'echo "Servidor ClickHouse rodando. Interface HTTP na porta 8123."', description: 'Confirmação do serviço.', isCode: false },
        ],
      },
      {
        title: 'Caddy',
        description: 'Implementa o Caddy, um servidor web moderno e fácil de usar com HTTPS automático.',
        useCase: 'Ideal como proxy reverso para outras aplicações Docker, servidor de arquivos estáticos ou balanceador de carga. Sua principal vantagem é a configuração automática e renovação de certificados SSL/TLS da Let\'s Encrypt.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/caddy && cd /opt/docker/caddy', description: 'Cria e acessa o diretório do projeto Caddy.' },
          { command: `cat <<'EOF' > Caddyfile
# Substitua pelo seu domínio ou use o IP do servidor
meu-dominio.com {
    # Exemplo de proxy reverso para um serviço na mesma rede Docker
    reverse_proxy nome_do_container_app:8000
}
EOF`, description: 'Cria um arquivo de configuração Caddyfile de exemplo.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: caddy-stack

services:
  caddy:
    image: caddy:latest
    container_name: caddy
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp" # Para HTTP/3
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - ./caddy_data:/data
      - ./caddy_config:/config
    networks:
      - frontend
    restart: unless-stopped

networks:
  frontend:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para o Caddy.' },
          { command: 'docker compose up -d', description: 'Inicia o contêiner do Caddy em segundo plano.' },
          { command: 'echo "Servidor Caddy rodando. Edite o Caddyfile para configurar seus sites."', description: 'Instrução de configuração.', isCode: false },
        ],
      },
      {
        title: 'Grafana',
        description: 'Implementa o Grafana, a plataforma open-source líder para visualização e análise de métricas, logs e traces.',
        useCase: 'Criar dashboards interativos para monitorar a saúde de aplicações, servidores e infraestrutura, conectando-se a diversas fontes de dados como Prometheus, InfluxDB, PostgreSQL e muitas outras.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/grafana && cd /opt/docker/grafana', description: 'Cria e acessa o diretório do projeto Grafana.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: grafana-stack

services:
  grafana:
    image: grafana/grafana-oss:latest
    container_name: grafana
    ports:
      - "3000:3000"
    volumes:
      - ./grafana_data:/var/lib/grafana
    networks:
      - monitoring
    restart: unless-stopped

networks:
  monitoring:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para o Grafana.' },
          { command: 'docker compose up -d', description: 'Inicia o contêiner do Grafana em segundo plano.' },
          { command: 'echo "Grafana rodando. Acesse em: http://SEU_IP_DO_SERVIDOR:3000"', description: 'Instrução de acesso.', isCode: false },
          { command: 'echo "Login padrão: admin / admin (será solicitado para alterar a senha no primeiro acesso)."', description: 'Credenciais padrão.', isCode: false },
        ],
      },
      {
        title: 'n8n',
        description: 'Implementa o n8n, uma ferramenta de automação de fluxo de trabalho de código aberto, alternativa ao Zapier e Make.',
        useCase: 'Conectar diferentes APIs e serviços para criar automações complexas baseadas em nós. Ideal para sincronizar dados, criar bots, automatizar marketing e integrar sistemas internos.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/n8n && cd /opt/docker/n8n', description: 'Cria e acessa o diretório do projeto n8n.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: n8n-stack

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    ports:
      - "5678:5678"
    volumes:
      - ./n8n_data:/home/node/.n8n
    environment:
      - GENERIC_TIMEZONE=America/Sao_Paulo
    networks:
      - frontend
    restart: unless-stopped

networks:
  frontend:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para o n8n.' },
          { command: 'docker compose up -d', description: 'Inicia o contêiner do n8n em segundo plano.' },
          { command: 'echo "n8n rodando. Acesse em: http://SEU_IP_DO_SERVIDOR:5678"', description: 'Instrução de acesso.', isCode: false },
        ],
      },
       {
        title: 'GLPI com MariaDB',
        description: 'Implementa a stack completa do GLPI, uma poderosa solução ITSM de código aberto, com um banco de dados MariaDB dedicado.',
        useCase: 'Gerenciar inventário de TI, service desk, licenças de software e ciclo de vida de ativos. Esta configuração isola o GLPI e seu banco de dados para melhor segurança e gerenciamento.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/glpi && cd /opt/docker/glpi', description: 'Cria e acessa o diretório do projeto GLPI.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: glpi-stack

services:
  mariadb:
    image: mariadb:latest
    container_name: glpi_db
    environment:
      - MYSQL_ROOT_PASSWORD=sua-senha-root-aqui
      - MYSQL_DATABASE=glpidb
      - MYSQL_USER=glpiuser
      - MYSQL_PASSWORD=sua-senha-glpi-aqui
    volumes:
      - ./db_data:/var/lib/mysql
    networks:
      - backend
    restart: unless-stopped

  glpi:
    image: diouxx/glpi:latest
    container_name: glpi_app
    ports:
      - "8080:80"
    environment:
      - DB_HOST=mariadb
      - DB_DATABASE=glpidb
      - DB_USER=glpiuser
      - DB_PASSWORD=sua-senha-glpi-aqui
    volumes:
      - ./glpi_data:/var/www/html/glpi/files
      - ./glpi_config:/var/www/html/glpi/config
      - ./glpi_plugins:/var/www/html/glpi/plugins
    networks:
      - frontend
      - backend
    depends_on:
      - mariadb
    restart: unless-stopped

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para GLPI e MariaDB.' },
          { command: 'docker compose up -d', description: 'Inicia os contêineres da stack GLPI em segundo plano.' },
          { command: 'echo "IMPORTANTE: Altere as senhas padrão no arquivo docker-compose.yml!"', description: 'Aviso de segurança.', isCode: false },
          { command: 'echo "Aguarde alguns minutos para o GLPI iniciar. Acesse em: http://SEU_IP_DO_SERVIDOR:8080"', description: 'Instrução de acesso.', isCode: false },
        ],
      },
      {
        title: 'Stack Prometheus',
        description: 'Implementa uma stack de monitoramento completa com Prometheus para coleta de métricas, Alertmanager para alertas, Node Exporter para métricas do host e Cadvisor para métricas de contêineres.',
        useCase: 'Monitoramento robusto de infraestrutura e aplicações. Coleta métricas detalhadas de seus servidores e contêineres Docker, permite a criação de alertas sobre condições anormais e serve como base de dados para dashboards no Grafana.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/prometheus_stack/prometheus && sudo mkdir -p /opt/docker/prometheus_stack/alertmanager && cd /opt/docker/prometheus_stack', description: 'Cria a estrutura de diretórios para a stack.' },
          { command: `cat <<'EOF' > ./prometheus/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
EOF`, description: 'Cria o arquivo de configuração do Prometheus.' },
          { command: `cat <<'EOF' > ./alertmanager/config.yml
route:
  receiver: 'null'
receivers:
  - name: 'null'
EOF`, description: 'Cria um arquivo de configuração básico para o Alertmanager.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: monitoring-stack

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - ./prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    networks:
      - monitoring
    restart: unless-stopped

  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager/config.yml:/etc/alertmanager/config.yml
      - ./alertmanager_data:/alertmanager
    networks:
      - monitoring
    restart: unless-stopped

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--path.rootfs=/rootfs'
    networks:
      - monitoring
    restart: unless-stopped

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    networks:
      - monitoring
    restart: unless-stopped

networks:
  monitoring:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para a stack de monitoramento.' },
          { command: 'docker compose up -d', description: 'Inicia todos os serviços de monitoramento.' },
          { command: 'echo "Stack Prometheus rodando! Prometheus: 9090, Alertmanager: 9093, Node Exporter: 9100, Cadvisor: 8080"', description: 'Informações das portas.', isCode: false },
        ],
      },
      {
        title: 'Stack Graylog',
        description: 'Implementa a stack completa do Graylog para gerenciamento centralizado de logs, incluindo OpenSearch como backend de armazenamento e MongoDB para metadados.',
        useCase: 'Coletar, indexar e analisar logs de múltiplas fontes (servidores, aplicações, dispositivos) em um local centralizado. Facilita a busca de erros, auditorias de segurança e criação de dashboards sobre os dados de log.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/graylog && cd /opt/docker/graylog', description: 'Cria e acessa o diretório do projeto Graylog.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: graylog-stack

services:
  mongo:
    image: mongo:6.0
    container_name: graylog_mongo
    volumes:
      - ./mongo_data:/data/db
    networks:
      - backend
    restart: unless-stopped

  opensearch:
    image: opensearchproject/opensearch:2.11.0
    container_name: graylog_opensearch
    environment:
      - 'discovery.type=single-node'
      - 'OPENSEARCH_JAVA_OPTS=-Xms1g -Xmx1g'
    volumes:
      - ./opensearch_data:/usr/share/opensearch/data
    networks:
      - backend
    restart: unless-stopped

  graylog:
    image: graylog/graylog:5.2
    container_name: graylog_server
    depends_on:
      - opensearch
      - mongo
    environment:
      - GRAYLOG_HTTP_EXTERNAL_URI=http://SEU_IP_DO_SERVIDOR:9000/
      - GRAYLOG_PASSWORD_SECRET=SuaSenhaSuperSecretaDePeloMenos16Caracteres
      - GRAYLOG_ROOT_PASSWORD_SHA2=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
      - GRAYLOG_MONGODB_URI=mongodb://mongo:27017/graylog
      - GRAYLOG_ELASTICSEARCH_HOSTS=http://opensearch:9200
    ports:
      - "9000:9000"    # Graylog API/UI
      - "5044:5044"    # Beats
      - "12201:12201/udp" # GELF
      - "1514:1514/udp"   # Syslog
    volumes:
      - ./graylog_data:/usr/share/graylog/data
    networks:
      - frontend
      - backend
    restart: unless-stopped

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para a stack Graylog.' },
          { command: 'docker compose up -d', description: 'Inicia os contêineres da stack Graylog.' },
          { command: 'echo "IMPORTANTE: Substitua SEU_IP_DO_SERVIDOR e a senha secreta no compose!"', description: 'Aviso de configuração.', isCode: false },
          { command: 'echo "O hash de senha para \'admin\' é o padrão. Acesse a UI na porta 9000."', description: 'Instrução de acesso.', isCode: false },
        ],
      },
      {
        title: 'Stack Wazuh (Single-Node)',
        description: 'Implementa uma stack completa do Wazuh em modo single-node, incluindo o Wazuh indexer, manager e dashboard.',
        useCase: 'Plataforma de segurança para detecção de ameaças, monitoramento de integridade, resposta a incidentes e conformidade. Ideal para monitorar a segurança de servidores e endpoints em um ambiente centralizado.',
        steps: [
          { command: 'sudo mkdir -p /opt/docker/wazuh && cd /opt/docker/wazuh', description: 'Cria e acessa o diretório do projeto Wazuh.' },
          { command: `cat <<'EOF' > docker-compose.yml
name: wazuh-stack

services:
  wazuh-indexer:
    image: wazuh/wazuh-indexer:latest
    container_name: wazuh_indexer
    ports:
      - "9200:9200"
    volumes:
      - ./wazuh-indexer-data:/var/lib/wazuh-indexer
    environment:
      - 'INDEXER_USERNAME=admin'
      - 'INDEXER_PASSWORD=SuaSenhaSuperSeguraAqui'
    networks:
      - wazuh-net
    restart: unless-stopped

  wazuh-manager:
    image: wazuh/wazuh-manager:latest
    container_name: wazuh_manager
    ports:
      - "1514:1514/udp"
      - "1515:1515"
      - "55000:55000"
    volumes:
      - ./wazuh-manager-data:/var/ossec/data
    depends_on:
      - wazuh-indexer
    environment:
      - 'WAZUH_INDEXER_URL=http://wazuh-indexer:9200'
      - 'WAZUH_INDEXER_USER=admin'
      - 'WAZUH_INDEXER_PASSWORD=SuaSenhaSuperSeguraAqui'
    networks:
      - wazuh-net
    restart: unless-stopped

  wazuh-dashboard:
    image: wazuh/wazuh-dashboard:latest
    container_name: wazuh_dashboard
    ports:
      - "443:443"
    depends_on:
      - wazuh-indexer
    environment:
      - 'DASHBOARD_USERNAME=admin'
      - 'DASHBOARD_PASSWORD=SuaSenhaSuperSeguraAqui'
      - 'WAZUH_INDEXER_URL=http://wazuh-indexer:9200'
    networks:
      - wazuh-net
    restart: unless-stopped

volumes:
  wazuh-indexer-data:
  wazuh-manager-data:

networks:
  wazuh-net:
    driver: bridge
EOF`, description: 'Cria o arquivo docker-compose.yml para a stack Wazuh.' },
          { command: 'docker compose up -d', description: 'Inicia os contêineres da stack Wazuh.' },
          { command: 'echo "IMPORTANTE: Altere a senha padrão em todos os serviços no compose!"', description: 'Aviso de segurança.', isCode: false },
          { command: 'echo "Aguarde alguns minutos para a inicialização. Acesse o dashboard em https://SEU_IP_DO_SERVIDOR"', description: 'Instrução de acesso.', isCode: false },
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
