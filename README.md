# My Blackboard

Uma lousa digital simples e intuitiva para desenhar, fazer anotações e salvar suas criações diretamente na galeria do dispositivo.

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
