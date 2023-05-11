FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]

# docker build -t client .
# docker run -dp 3000:3000 --name client-container client
# docker start client-container