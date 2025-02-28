FROM node:lts

WORKDIR /app

COPY .  .

ENV HOST 0.0.0.0
ENV PORT 3000
EXPOSE 3000

CMD [ "npm", "run", "start" ]
