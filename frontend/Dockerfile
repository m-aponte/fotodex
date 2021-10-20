FROM node:16.11-stretch

WORKDIR /app

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install --silent

#Following run required because node_modules/.cache has wrong perms otherwise, crashing app
#https://stackoverflow.com/questions/67087735/eacces-permission-denied-mkdir-usr-app-node-modules-cache-how-can-i-creat
RUN chown -R node.node /app/node_modules

COPY . ./

CMD ["npm", "start"]
