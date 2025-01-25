FROM node:22

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env.docker ./
COPY .npmrc ./

RUN npm install

COPY . .

RUN npx tsc -p ./tsconfig.json

EXPOSE 4545

CMD ["node", "--env-file=.env.docker", "./bin/main/bootstrap/main.js"]
