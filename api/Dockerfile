FROM node:8

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/yourapp && cp -a /tmp/node_modules /usr/src/yourapp
WORKDIR /usr/src/yourapp
RUN npm install -g pm2
COPY . /usr/src/yourapp
EXPOSE 4242

# TO DEFAULT RUN
CMD ["pm2-runtime", "ecosystem.config.json"]

# TO TEST WITH MOCHAI
# CMD npm test