FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]

# docker build -t server .
# docker run -dp 4000:4000 --name server-container server
# docker start server-container