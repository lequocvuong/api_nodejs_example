# build environment
FROM node:16

WORKDIR /app  
COPY package*.json /app  
RUN npm install  
COPY . /app  
EXPOSE 4000  
CMD [ "node", "index.js" ]