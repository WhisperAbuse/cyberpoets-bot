FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package*.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 8080

CMD [ "pnpm", "start" ]