# My Blackboard

Uma lousa digital simples e intuitiva para desenhar, fazer anotações e salvar suas criações diretamente na galeria do dispositivo.

## Sumário

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação](#instalação)
- [Política de uso](#política-de-uso)
- [Política de privacidade](#política-de-privacidade)
  - [Dados armazenados](#dados-armazenados)
  - [Acesso à galeria](#acesso-à-galeria)
  - [Compartilhamento e serviços de terceiros](#compartilhamento-e-serviços-de-terceiros)
  - [Segurança e alterações](#segurança-e-alterações)

## Sobre

O **My Blackboard** é um aplicativo mobile desenvolvido com Expo e React Native. Ele oferece uma tela de desenho em modo retrato, com ferramentas para personalizar o lápis e o fundo da lousa. Os desenhos e as preferências do usuário são armazenados localmente, permitindo continuar de onde parou ao abrir o aplicativo novamente.

## Funcionalidades

- Desenho livre por toque;
- seleção da cor e da espessura do lápis;
- escolha da cor de fundo da lousa;
- borracha;
- desfazer o último traço;
- limpeza completa da tela;
- persistência local do desenho e das configurações;
- exportação do desenho como imagem PNG para a galeria.

## Tecnologias

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## Como executar

### Pré-requisitos

- Node.js e npm instalados;
- ambiente Android ou iOS configurado, ou o aplicativo Expo Go instalado em um dispositivo.

### Instalação

```bash
git clone https://github.com/fllaviacorreia/my-blackboard.git
cd my-blackboard
npm install
npm start
```

Depois de iniciar o Expo, escolha uma das opções exibidas no terminal para abrir o projeto. Também é possível executar diretamente em uma plataforma:

```bash
npm run android
npm run ios
```

> Para salvar desenhos, autorize o acesso à biblioteca de fotos quando solicitado pelo aplicativo.

## Política de uso

Ao utilizar o My Blackboard, o usuário concorda em:

- usar o aplicativo de maneira lícita e responsável;
- não utilizar o aplicativo para criar, armazenar ou compartilhar conteúdo ilegal, ofensivo ou que viole direitos de terceiros;
- respeitar direitos autorais, marcas, privacidade e demais direitos aplicáveis aos conteúdos criados ou utilizados;
- assumir a responsabilidade pelos desenhos e arquivos produzidos no aplicativo.

O aplicativo é fornecido no estado em que se encontra. Embora sejam adotados cuidados para oferecer uma experiência estável, não há garantia de funcionamento ininterrupto, ausência de falhas ou recuperação de desenhos perdidos. Funcionalidades e condições de uso podem ser atualizadas em versões futuras.

## Política de privacidade

O My Blackboard foi desenvolvido para funcionar localmente no dispositivo. Atualmente, o aplicativo não exige cadastro, não possui servidor próprio e não envia desenhos ou dados pessoais para o desenvolvedor.

### Dados armazenados

Os seguintes dados podem ser mantidos no armazenamento local do dispositivo:

- traços que compõem o desenho;
- cor e espessura do lápis;
- cor de fundo;
- estado das ferramentas do aplicativo.

Esses dados são usados somente para restaurar o desenho e as preferências ao abrir o aplicativo novamente. O usuário pode apagar o desenho pela opção de limpeza do próprio aplicativo ou remover todos os dados ao desinstalá-lo ou limpar seus dados nas configurações do dispositivo.

### Acesso à galeria

O acesso à biblioteca de mídia é solicitado apenas quando necessário para salvar uma cópia do desenho em formato PNG. A permissão pode ser negada ou revogada a qualquer momento nas configurações do sistema operacional; nesse caso, a exportação para a galeria poderá não funcionar.

### Compartilhamento e serviços de terceiros

O aplicativo não vende nem compartilha deliberadamente dados pessoais com terceiros. A distribuição e a execução do aplicativo podem depender de serviços da plataforma, do sistema operacional ou do Expo, sujeitos às respectivas políticas de privacidade.

### Segurança e alterações

Os dados locais estão sujeitos aos mecanismos de segurança do próprio dispositivo. Esta política poderá ser atualizada quando novas funcionalidades forem adicionadas ou houver mudanças na forma de tratamento dos dados. A versão mais recente ficará disponível neste README.
