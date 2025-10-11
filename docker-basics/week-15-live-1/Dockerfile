FROM node:24-alpine3.21

RUN 

WORKDIR /app

COPY package*.json package-lock.json ./
COPY prisma/schema.prisma ./    

RUN apk add --no-cache openssl

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
