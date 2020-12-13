FROM node:12

EXPOSE 3000

WORKDIR /home/app

RUN npm ci
RUN npm install -g nodemon

CMD ["nodemon"]