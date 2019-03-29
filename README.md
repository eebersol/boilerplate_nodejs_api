Type            : API /
Langage         : NodeJs /
ODM             : mongoose /
Database        : MongoDb /
Process manager : PM2 /
UnitTest        : Mochai /

- RUN WITH DOCKER : 

Requirement : [Git, Docker]

1. git clone repo
2. cp config/config_dev.json config/config.json and add all credentials
2. create machine : docker-machine create default
3. eval $(docker-machine env default) on each terminal windodw
4. docker-compose build --no-cache
5. docker-compose up
6. get IP of your machine with docker-machine ls
7. go to your API http://ip_docker:4242


- RUN WITHOUT DOCKER:

Requirement : [Git, Npm, Node, Mongod, Mongodb]

1. git clone repo
2. cd api 
3. cp config/config_dev.json config/config.json and add all credentials
4. npm install
5. go to api/db/mongo.js, comment FOR DOCKER and uncomment FOR DEFAULT sub line
5. node app.js


- INFO: 

1. you can change listened port in api/config/config.json
2. to access container use : docker exec -it ip_docker_machine /bin/bash
3. you can modify Mochai test in /api/test
4. if you are some obscur error with Docker run delete_docker.sh and rerun docker-compose build --no-cache

- FOR RUN MOCHAI TEST :

PATH: api/test/test.model.js

2 solutions : 

-   1. in api/Dockerfile  comment TO DEFAULT RUN and uncomment TO TEST WITH MOCHAI
-   1. docker exec -it ip_docker_machine /bin/bash
    2. npm test dont take care about Uncaught Error: listen EADDRINUSE 0.0.0.0:4242 it's just cause the app run with pm2
