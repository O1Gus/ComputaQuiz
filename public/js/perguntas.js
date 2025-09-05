
window.onload = () => {
  document.activeElement.blur();
};



document.addEventListener("DOMContentLoaded", () => {
  const perguntaEl = document.querySelector("h2");
  const botoes = Array.from(document.querySelectorAll(".boxRespostas button"));
  const titulo = document.getElementById("pergunta");
  const scoreEl = document.getElementById("score");

  // Banco de perguntas com dificuldade
  const perguntas = [
    {
      pergunta: "Qual é o significado da sigla CPU?",
      opcoes: ["Central Process Unit", "Central Processing Unit", "Control Processing Utility", "Core Processing User"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual foi a primeira linguagem de programação de alto nível amplamente usada?",
      opcoes: ["Assembly", "Python", "Fortran", "C"],
      correta: 2,
      dificuldade: "medio"
    },
    {
      pergunta: "Em lógica de programação, qual estrutura é usada para repetir instruções?",
      opcoes: ["Variável", "Função", "Laço (loop)", "Constante"],
      correta: 2,
      dificuldade: "dificil"
    },
    {
      pergunta: "A notação Big-O serve para:",
      opcoes: ["Medir velocidade de compilação", "Representar crescimento de tempo/espaço de um algoritmo", "Contar número de instruções", "Identificar o processador usado"],
      correta: 1,
      dificuldade: "dificil"
    },
    {
      pergunta: "Quem é considerado o 'pai da computação'?",
      opcoes: ["Bill Gates", "Charles Babbage", "Alan Turing", "Steve Jobs"],
      correta: 2,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual desses é um banco de dados relacional?",
      opcoes: ["MongoDB", "MySQL", "Neo4j", "Redis"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "O que significa a sigla HTML?",
      opcoes: ["Hypertext Markup Language", "High Transfer Mark Language", "Hyper Tool Markup Language", "Hyperlink Text Machine Language"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual dessas não é uma linguagem de programação?",
      opcoes: ["Python", "SQL", "Java", "HTML"],
      correta: 3,
      dificuldade: "facil"
    },
    {
      pergunta: "O algoritmo de ordenação 'Merge Sort' tem complexidade média:",
      opcoes: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
      correta: 1,
      dificuldade: "dificil"
    },
    {
      pergunta: "No modelo de desenvolvimento ágil, 'sprint' significa:",
      opcoes: ["Teste de unidade", "Período de desenvolvimento com objetivos definidos", "Reunião de equipe", "Documento de requisitos"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual estrutura de dados funciona no princípio FIFO?",
      opcoes: ["Pilha", "Fila", "Árvore", "Grafo"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "Quem criou a linguagem de programação C?",
      opcoes: ["Alan Turing", "Dennis Ritchie", "Linus Torvalds", "John Backus"],
      correta: 1,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual é a principal função de um compilador?",
      opcoes: ["Traduzir código fonte em linguagem de máquina", "Executar programas diretamente", "Controlar memória RAM", "Criar interfaces gráficas"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Em banco de dados, a cláusula SQL 'WHERE' é usada para:",
      opcoes: ["Ordenar resultados", "Filtrar registros", "Criar tabelas", "Definir chaves primárias"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "Na UML, um diagrama de casos de uso mostra:",
      opcoes: ["Fluxo de dados", "Interação entre atores e sistema", "Estrutura física do software", "Código fonte"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destes é um sistema operacional?",
      opcoes: ["Oracle", "Linux", "Python", "MySQL"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "O que significa a sigla API?",
      opcoes: ["Application Programming Interface", "Advanced Program Integration", "Automated Processing Instruction", "Application Process Input"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Quem é considerado o pai da inteligência artificial?",
      opcoes: ["John McCarthy", "Claude Shannon", "Alan Turing", "Herbert Simon"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Em lógica booleana, a operação AND retorna verdadeiro quando:",
      opcoes: ["Apenas uma condição é verdadeira", "Ambas condições são verdadeiras", "Nenhuma condição é verdadeira", "As condições são diferentes"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes algoritmos é usado para busca em listas ordenadas?",
      opcoes: ["Busca Linear", "Busca Binária", "DFS", "BFS"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "O conceito de 'open source' significa:",
      opcoes: ["Software pago com suporte", "Software de código aberto", "Software gratuito apenas para testes", "Software sem licença"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual linguagem é amplamente usada para inteligência artificial?",
      opcoes: ["COBOL", "Prolog", "Pascal", "PHP"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "O que é um 'commit' no Git?",
      opcoes: ["Salvar uma versão do código no repositório", "Excluir uma branch", "Criar uma tag", "Instalar dependências"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Em Engenharia de Software, 'refatoração' significa:",
      opcoes: ["Apagar código antigo", "Melhorar o código sem alterar seu comportamento", "Criar novas funcionalidades", "Traduzir código para outra linguagem"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual modelo de processo de software é conhecido como 'cascata'?",
      opcoes: ["Iterativo", "Waterfall", "Agile", "RAD"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "O que significa a sigla JSON?",
      opcoes: ["Java Standard Object Notation", "JavaScript Object Notation", "Java Syntax Output Name", "Joint System Object Notation"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual estrutura de dados funciona no princípio LIFO?",
      opcoes: ["Fila", "Pilha", "Árvore binária", "Lista circular"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "O que significa IDE em programação?",
      opcoes: ["Integrated Development Environment", "Internal Data Engine", "Interface Driver Execution", "Internet Development Entity"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destes é um exemplo de sistema distribuído?",
      opcoes: ["Google Drive", "Microsoft Word", "Paint", "Notepad"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual foi a primeira programadora da história?",
      opcoes: ["Grace Hopper", "Ada Lovelace", "Margaret Hamilton", "Jean Bartik"],
      correta: 1,
      dificuldade: "dificil"
    },
    {
      pergunta: "Em C, qual operador é usado para incremento?",
      opcoes: ["++", "+=", "--", "**"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "O que significa a sigla DNS?",
      opcoes: ["Domain Name System", "Data Network Service", "Digital Name Software", "Domain Number Syntax"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual protocolo é usado para transferência segura de arquivos?",
      opcoes: ["FTP", "SFTP", "SMTP", "HTTP"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "O que significa MVC em arquitetura de software?",
      opcoes: ["Model View Controller", "Main Variable Compiler", "Memory Virtual Control", "Module Version Code"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual linguagem foi criada por Guido van Rossum?",
      opcoes: ["C#", "Python", "Ruby", "Perl"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destes não é um sistema de controle de versão?",
      opcoes: ["Git", "Mercurial", "SVN", "Jenkins"],
      correta: 3,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual comando SQL é usado para ordenar resultados?",
      opcoes: ["ORDER BY", "GROUP BY", "SELECT", "WHERE"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Em programação orientada a objetos, 'herança' significa:",
      opcoes: ["Compartilhar atributos e métodos de uma classe para outra", "Duplicar código em diferentes classes", "Traduzir métodos em atributos", "Eliminar atributos privados"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes é um sistema de gerenciamento de banco de dados NoSQL?",
      opcoes: ["PostgreSQL", "MongoDB", "Oracle", "SQLite"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual é o criador do sistema Linux?",
      opcoes: ["Steve Wozniak", "Linus Torvalds", "Richard Stallman", "Ken Thompson"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "O que significa UI em design?",
      opcoes: ["User Internet", "User Interface", "Unified Integration", "Universal Input"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "O que significa UX?",
      opcoes: ["User Exchange", "User Execution", "User Experience", "Universal XML"],
      correta: 2,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes é um algoritmo de busca em grafos?",
      opcoes: ["Merge Sort", "Quick Sort", "DFS", "Heap Sort"],
      correta: 2,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual das opções representa um sistema operacional de tempo real?",
      opcoes: ["Windows", "Linux", "RTOS", "MS-DOS"],
      correta: 2
    },
    {
      pergunta: "Qual empresa criou a linguagem Java?",
      opcoes: ["IBM", "Sun Microsystems", "Microsoft", "Google"],
      correta: 1,
      dificuldade: "dificil"
    },
    {
      pergunta: "Em banco de dados, o que é uma chave primária?",
      opcoes: ["Um campo único que identifica cada registro", "Um campo duplicado", "Um índice secundário", "Um tipo de backup"],
      correta: 0,
      dificuldade: "facil"

    },
    {
      pergunta: "Qual destes é um framework front-end?",
      opcoes: ["React", "Node.js", "Django", "Laravel"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "O que significa CRUD?",
      opcoes: ["Create Read Update Delete", "Compile Run Upload Download", "Control Record Update Data", "Create Run Use Data"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual das opções NÃO é um paradigma de programação?",
      opcoes: ["Orientado a objetos", "Funcional", "Declarativo", "Binário"],
      correta: 3,
      dificuldade: "medio"
    },
    {
      pergunta: "Quem foi Alan Turing?",
      opcoes: ["Criador do sistema UNIX", "Matemático pioneiro da computação", "Inventor do transistor", "Fundador da Microsoft"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destes é um exemplo de sistema embarcado?",
      opcoes: ["Arduino", "Linux Mint", "VS Code", "Excel"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual linguagem é mais associada ao desenvolvimento Android nativo?",
      opcoes: ["Swift", "Kotlin", "C#", "Ruby"],
      correta: 1,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual protocolo é usado para envio de e-mails?",
      opcoes: ["HTTP", "SMTP", "IMAP", "FTP"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "O que significa SaaS em computação em nuvem?",
      opcoes: ["Software as a Service", "System as a Solution", "Storage as a Service", "Server as a System"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes é um exemplo de linguagem compilada?",
      opcoes: ["Python", "C", "JavaScript", "PHP"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destas ferramentas é usada para integração contínua?",
      opcoes: ["Git", "Jenkins", "Docker", "Postman"],
      correta: 1,
      dificuldade: "dificil"
    },
    {
      pergunta: "Em testes de software, o que significa TDD?",
      opcoes: ["Test Driven Development", "Technical Design Document", "Total Data Debug", "Temporary Debugging Driver"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual destes algoritmos de ordenação é mais eficiente em média?",
      opcoes: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
      correta: 2,
      dificuldade: "medio"
    },
    {
      pergunta: "O que significa IoT?",
      opcoes: ["Integration of Technology", "Internet of Things", "Input/Output Transfer", "Interface of Terminals"],
      correta: 1,
      dificuldade: "medio"
    
    }, 
    {
      pergunta: "Qual técnica é usada para proteger senhas armazenadas?",
      opcoes: ["Hashing", "Compilação", "Ordenação", "Virtualização"],
      correta: 0,
      dificuldade: "facil"

    },
    {
      pergunta: "Qual foi o primeiro navegador web popular?",
      opcoes: ["Internet Explorer", "Mosaic", "Netscape Navigator", "Opera"],
      correta: 1,
      dificuldade: "facil"

    },
    {
      pergunta: "O que significa a sigla DNS?",
      opcoes: ["Domain Name System", "Data Network Service", "Digital Name Syntax", "Domain Network Server"],
      correta: 0,
      dificuldade: "dificil"

    },
    {
      pergunta: "Qual destas linguagens é mais usada em ciência de dados?",
      opcoes: ["JavaScript", "Python", "PHP", "C"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes é um banco de dados em grafo?",
      opcoes: ["MongoDB", "Neo4j", "MySQL", "PostgreSQL"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destes é um exemplo de linguagem funcional?",
      opcoes: ["Haskell", "C++", "Java", "Ruby"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Em segurança da informação, o que significa phishing?",
      opcoes: ["Técnica de roubo de dados por meio de engano", "Ataque de força bruta", "Criptografia de ponta a ponta", "Backup automático"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "O que é um 'bug' em software?",
      opcoes: ["Um erro ou falha no programa", "Uma melhoria de desempenho", "Uma versão de teste", "Um recurso de segurança"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destes NÃO é um sistema operacional?",
      opcoes: ["Linux", "Windows", "Android", "MySQL"],
      correta: 3,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual é a principal vantagem da programação orientada a objetos?",
      opcoes: ["Maior velocidade de execução", "Reutilização e organização do código", "Menor uso de memória", "Tradução automática de código"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "Quem criou a World Wide Web?",
      opcoes: ["Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "O que significa VPN?",
      opcoes: ["Virtual Private Network", "Visual Program Node", "Virtual Processing Number", "Variable Programming Notation"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual desses é um exemplo de sistema de versionamento centralizado?",
      opcoes: ["Git", "Mercurial", "SVN", "Docker"],
      correta: 2,
      dificuldade: "facil"
    },
    {
      pergunta: "Em estruturas de dados, o que é uma árvore binária?",
      opcoes: ["Estrutura onde cada nó pode ter no máximo dois filhos", "Estrutura com nós ilimitados", "Lista encadeada especial", "Tabela de dispersão"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual linguagem é conhecida como 'linguagem da web'?",
      opcoes: ["Java", "Python", "JavaScript", "C"],
      correta: 2,
      dificuldade: "medio"
    },
    {
      pergunta: "O que é um algoritmo guloso?",
      opcoes: ["Sempre escolhe a melhor opção local em cada etapa", "Usa força bruta para encontrar soluções", "Sempre busca em profundidade", "Ordena os dados antes de executar"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes é um protocolo da camada de transporte?",
      opcoes: ["TCP", "IP", "DNS", "HTTP"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual é a função da memória cache?",
      opcoes: ["Armazenar dados temporários para acesso rápido", "Salvar permanentemente arquivos do usuário", "Executar sistemas operacionais", "Gerenciar rede local"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destes é um exemplo de ataque de negação de serviço?",
      opcoes: ["SQL Injection", "DDoS", "Phishing", "Keylogger"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "O que é Engenharia de Requisitos?",
      opcoes: ["Levantamento e gerenciamento das necessidades do software", "Correção de falhas de código", "Implementação de testes unitários", "Documentação de algoritmos"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes frameworks é voltado para back-end?",
      opcoes: ["React", "Angular", "Django", "Vue.js"],
      correta: 2,
      dificuldade: "dificil"
    },
    {
      pergunta: "O que significa ORM em bancos de dados?",
      opcoes: ["Object Relational Mapping", "Optimal Resource Management", "Open Record Model", "Object Runtime Memory"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual destas empresas criou o sistema operacional Windows?",
      opcoes: ["Apple", "Google", "Microsoft", "IBM"],
      correta: 2,
      dificuldade: "facil"
    },
    {
      pergunta: "O que é escalabilidade em sistemas?",
      opcoes: ["Capacidade de suportar aumento de carga mantendo desempenho", "Capacidade de reduzir custos de energia", "Capacidade de rodar apenas em um servidor", "Capacidade de executar em computadores antigos"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual é a principal característica de um algoritmo recursivo?",
      opcoes: ["Chama a si mesmo para resolver subproblemas", "Nunca termina sua execução", "Executa em paralelo", "Reordena os dados de entrada"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes é um exemplo de chave estrangeira em banco de dados?",
      opcoes: ["Um campo que referencia a chave primária de outra tabela", "Um campo único na mesma tabela", "Um índice secundário", "Um atributo calculado"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes é um exemplo de sistema de gerenciamento de containers?",
      opcoes: ["Docker", "VMware", "Hyper-V", "QEMU"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destes algoritmos é usado para criptografia simétrica?",
      opcoes: ["RSA", "AES", "SHA-256", "ECC"],
      correta: 1,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual destas linguagens é fortemente tipada?",
      opcoes: ["Python", "C", "Java", "JavaScript"],
      correta: 2,
      dificuldade: "medio"
    },
    {
      pergunta: "O que significa SQL?",
      opcoes: ["Structured Query Language", "System Query Logic", "Software Quality Layer", "Structured Quality Language"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual foi o primeiro microprocessador da Intel?",
      opcoes: ["Intel 4004", "Intel 8086", "Intel Pentium", "Intel Core i3"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Em segurança, o que significa HTTPS?",
      opcoes: ["Hyper Transfer Protocol System", "HyperText Transfer Protocol Secure", "Hyper Tool Protocol Secure", "High Transfer Protocol Service"],
      correta: 1,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destas linguagens é usada principalmente para estatística?",
      opcoes: ["R", "C", "Java", "PHP"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "O que é virtualização?",
      opcoes: ["Criação de ambientes isolados simulando hardware ou software", "Compressão de dados", "Backup automático", "Execução paralela de algoritmos"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destes é um exemplo de linguagem declarativa?",
      opcoes: ["SQL", "C++", "Java", "Go"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual das alternativas define corretamente a Lei de Moore?",
      opcoes: ["Número de transistores em um chip dobra a cada ~2 anos", "Velocidade da internet dobra a cada 2 anos", "Memória RAM dobra a cada 2 anos", "Número de processadores em um PC dobra a cada 2 anos"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual destes é um exemplo de arquitetura de microserviços?",
      opcoes: ["Sistema dividido em pequenos serviços independentes", "Sistema monolítico único", "Sistema sem banco de dados", "Sistema apenas com interface gráfica"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destas linguagens é usada para consultas em bancos de dados relacionais?",
      opcoes: ["SQL", "HTML", "Python", "C#"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual destes conceitos pertence à Programação Funcional?",
      opcoes: ["Funções puras", "Herança", "Encapsulamento", "Polimorfismo"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destas áreas NÃO faz parte da Engenharia de Software?",
      opcoes: ["Manutenção", "Gerência de configuração", "Compiladores", "Requisitos"],
      correta: 2,
      dificuldade: "facil"
    },
    {
      pergunta: "O que é um sistema embarcado?",
      opcoes: ["Sistema computacional dedicado a uma função específica", "Sistema operacional de desktop", "Sistema de nuvem", "Sistema de realidade virtual"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes é um exemplo de linguagem de marcação?",
      opcoes: ["HTML", "C", "Python", "Java"],
      correta: 0,
      dificuldade: "facil"
    },
    {
      pergunta: "Qual foi o primeiro sistema operacional desenvolvido pela Microsoft?",
      opcoes: ["Windows 95", "MS-DOS", "Windows XP", "Windows 7"],
      correta: 1,
      dificuldade: "facil"
    },
    {
      pergunta: "O que significa CAMADA de apresentação em sistemas?",
      opcoes: ["Camada de interface com o usuário", "Camada de banco de dados", "Camada de rede", "Camada de hardware"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes algoritmos é usado em compressão de dados?",
      opcoes: ["Huffman", "Prim", "Kruskal", "Dijkstra"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual destes NÃO é um princípio do manifesto ágil?",
      opcoes: ["Indivíduos e interações mais que processos e ferramentas", "Software em funcionamento mais que documentação abrangente", "Responder a mudanças mais que seguir um plano", "Documentação mais que colaboração com o cliente"],
      correta: 3,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes é um exemplo de sistema peer-to-peer?",
      opcoes: ["BitTorrent", "Google Chrome", "Microsoft Excel", "Slack"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destes é considerado um sistema especialista?",
      opcoes: ["MYCIN", "MS Word", "Paint", "PowerPoint"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual destes é um exemplo de algoritmo de busca heurística?",
      opcoes: ["A*", "Bubble Sort", "Merge Sort", "Heap Sort"],
      correta: 0,
      dificuldade: "medio"
    },
    {
      pergunta: "Qual destas linguagens é usada principalmente para programação científica?",
      opcoes: ["Fortran", "PHP", "Ruby", "COBOL"],
      correta: 0,
      dificuldade: "dificil"
    },
    {
      pergunta: "Qual destes modelos é usado em redes neurais profundas?",
      opcoes: ["Perceptron Multicamadas", "Árvore AVL", "Algoritmo de Kruskal", "Lista duplamente ligada"],
      correta: 0,
      dificuldade: "dificil"
    }
  ];


  let selecionadas = [];
  let perguntaAtual = 0;
  let opcoesEmbaralhadas = [];
  let currentIndex = 0;
  let vidas = 3;
  let score = 0;

  const pontosPorDificuldade = {
    facil: 100,
    medio: 500,
    dificil: 1000
  };

  // ---------- FUNÇÕES ----------
  function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function iniciarQuiz() {

    perguntaAtual = 0;
    selecionadas = [];
    vidas = 3;
    score = 0;
    scoreEl.innerText = score;

    document.getElementById("vida1").classList.remove("piscar-sumir");
    document.getElementById("vida2").classList.remove("piscar-sumir");
    document.getElementById("vida3").classList.remove("piscar-sumir");

    while (selecionadas.length < Math.min(30, perguntas.length)) {
      let idx = Math.floor(Math.random() * perguntas.length);
      if (!selecionadas.includes(idx)) {
        selecionadas.push(idx);
      }
    }

    mostrarPergunta();
  }

  function mostrarPergunta() {
    const q = perguntas[selecionadas[perguntaAtual]];

    titulo.innerText = `Pergunta ${perguntaAtual + 1}`;
    perguntaEl.innerText = q.pergunta;

    opcoesEmbaralhadas = q.opcoes.map((texto, i) => ({ texto, index: i }));
    embaralhar(opcoesEmbaralhadas);

    botoes.forEach((btn, i) => {
      if (opcoesEmbaralhadas[i]) {
        btn.innerText = opcoesEmbaralhadas[i].texto;
        btn.dataset.index = opcoesEmbaralhadas[i].index;
        btn.classList.remove("btn-errado");
        btn.disabled = false;
      }
    });

    currentIndex = 0;
    botoes[currentIndex].focus();
  }

  function verificarResposta(indexEscolhido) {
    const q = perguntas[selecionadas[perguntaAtual]];
    const correta = q.correta;

    if (parseInt(indexEscolhido) !== correta) {
      vidas--;
      botoes[currentIndex].classList.add("btn-errado");
      botoes[currentIndex].disabled = true;

      if (vidas <= 0) {
        document.getElementById("vida1").classList.add("piscar-sumir");
        document.getElementById("vida2").classList.add("piscar-sumir");
        document.getElementById("vida3").classList.add("piscar-sumir");

        setTimeout(() => {
          alert("Suas vidas acabaram! O quiz reinicia 🚀");
          let valor = score
          localStorage.setItem("Score", valor);
          window.location.href = "./telagameover.html";
          //iniciarQuiz();
        }, 1000);
      } else if (vidas === 2) {
        document.getElementById("vida3").classList.add("piscar-sumir");
      } else if (vidas === 1) {
        document.getElementById("vida2").classList.add("piscar-sumir");
      }
      return;
    }

    // --- ACERTOU ---
    score += pontosPorDificuldade[q.dificuldade] || 0;
    scoreEl.innerText = score;

    perguntaAtual++;
    if (perguntaAtual < selecionadas.length) {
      mostrarPergunta();
    } else {
      alert(`Parabéns, você acertou todas as ${selecionadas.length} perguntas! 🌌`);
      let valor = score
      localStorage.setItem("Score", valor);
      window.location.href = "./telagameover.html";
      //iniciarQuiz();
    }
  }

  // ---------- EVENTOS TECLADO ----------
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        if ((currentIndex % 2) < 1 && currentIndex + 1 < botoes.length) {
          currentIndex++;
          botoes[currentIndex].focus();
        }
        break;
      case "ArrowLeft":
        if ((currentIndex % 2) > 0) {
          currentIndex--;
          botoes[currentIndex].focus();
        }
        break;
      case "ArrowUp":
        if (currentIndex - 2 >= 0) {
          currentIndex -= 2;
          botoes[currentIndex].focus();
        }
        break;
      case "ArrowDown":
        if (currentIndex + 2 < botoes.length) {
          currentIndex += 2;
          botoes[currentIndex].focus();
        }
        break;
      case "Enter":
        verificarResposta(botoes[currentIndex].dataset.index);
        break;
    }
    e.preventDefault();
  });

  iniciarQuiz();
});

// Easter egg de 3 cliques
let contadorCliques = 0;
document.addEventListener("click", () => {
  contadorCliques++;
  if (contadorCliques === 3) {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && overlay.style.display === "flex") {
        overlay.style.display = "none";
      }
    });
    contadorCliques = 0;
  }
});

const valor = localStorage.getItem("nickname");
document.getElementById("nick").textContent = `${valor}`;
