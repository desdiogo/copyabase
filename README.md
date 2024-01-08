
# Sobre O projeto

## Observação
O arquivo para importar e o relatorio.xlsx que se encontra no projeto, tentei importar em csv para o formato de alguns itens muda e a validação do zod
falha.

## Detalhes
Acessando projeto frontend, selecionará o arquivo no formato xlsx, o arquivo será enviado para o backend e validado
e vai retornar os dados, se tiver tudo correto, terá acesso a quatro gráficos, a receita recorrente mensal, taxa de rotatividade
usuarios ativos e usuários inativos.

## Backend

Foi desenvolvido utilizando as seguintes libs:
- [fastify](https://github.com/fastify/fastify) para as conexões http
- [zod](https://github.com/colinhacks/zod) para as validações das requisições
- [sheetjs](https://github.com/SheetJS/sheetjs) para importação dos documentos xls e csv
- [dayjs](https://github.com/iamkun/dayjs) para trabalhar com datas

## Frontend

Foi desenvolvido utilizando as seguintes libs:
- [zod](https://github.com/colinhacks/zod) para as validações das requisições
- [dayjs](https://github.com/iamkun/dayjs) para trabalhar com datas
- [vueuse](https://github.com/vueuse/vueuse) utilitários do vue
- [axios](https://github.com/axios/axios) para as requisiçoes http
- [shadcn-vue](https://github.com/radix-vue/shadcn-vue) para os componentes
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss) utilitário css


## Configuração  Via Docker

- Criar a imagem e instalar as dependências
```sh
docker compose up -d
```

### Acessar a aplicação

- Frontend
```
http://localhost:5173/
```

- Backend
```
http://localhost:3000/
```

## Configuração  local

- Instalar as dependências backend
```sh
cd backend && pnpm install && pnpm dev
```

- Instalar as dependências frontend(em outro terminal)
```sh
cd frontend && pnpm install &&  pnpm dev
```

### Acessar a aplicação

- Frontend
```
http://localhost:5173/
```

- Backend
```
http://localhost:3000/
```