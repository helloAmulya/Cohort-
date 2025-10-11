# Dockerfile Basic

1. 

FROM (specify the version like node etc.)

RUN 

WORKDIR ( directory to work upon from)

COPY package*.json package-lock.json ./
COPY prisma/schema.prisma ./    

RUN (command)

COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]


2. Injecting ENV variables
```
export DATABASE_URL="anyh value"
DATABASE_URL="any value" node dist/index.js
```

this will inject our variable as per required and no need to pass the values in env file

3. running a command inside a container
> docker exec -it e7a3cef7fcb9 /bin/sh 
