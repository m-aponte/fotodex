FROM node:16.11-stretch

WORKDIR /home/node/app

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install --silent

COPY --chown=node:node . ./

# #Following run required because node_modules/.cache has wrong perms otherwise, crashing app
# #https://stackoverflow.com/questions/67087735/eacces-permission-denied-mkdir-usr-app-node-modules-cache-how-can-i-creat
# RUN chown -R node /app

USER node
CMD ["npm", "start"]
