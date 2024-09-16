# Introduction 
TODO: Back-End desktop project to Haus Training

# Getting Started

## Configuring Node in the project
1. Install Nodejs 20.12.1 version. It is advisable to use nvm(Node version package).

2. Software Installation
  - 1. In the project's `bash terminal`, open your profile file as a text editor using the command:
    ```
    nano ~/.bashrc
    ```

  - 2. Add the following code to the end of the profile file to configure NVM and press `Ctrl + o` to save the file:
    ```
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
    ```

  - 3. Reload the profile file by running the command:
    ```
    source ~/.bashrc
    ```

  - 4. Install NVM:
    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    ```

  **Important:** Close and reopen the `bash terminal` to ensure NVM is configured correctly.

    To check if the NVM installation was successful, run the command:
    ```
    nvm --version
    ```

  To install the version of Node used in this boilerplate, run the command:
    ```
    nvm install 20.12.1
    ```
    ```
    nvm use 20.12.1
    ```

## Running the project
This project uses the `Yarn` package manager, so install the manager on your computer using the link:
[Yarn Installation](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

To run the project, follow these steps:

1. Start installing dependencies with the command:
```
yarn
```

2. To run the application it is necessary to generate the secrets. To do this, follow the example of the file in the root of the project, called .env.exemple. 

OBS: It will be necessary to set the variables according to the example and check the docker compose database connection.As it is a test application, I already left Docker Compose configured. Just run the command 
docker-compose up -d. check path to connect with database

2. To apply the migrations, the command below must be executed:
```
yarn prisma migrate dev
```
OBS: check if the tables have been created in the database. You can view it in the database or by running Prisma Studio using the command
```
yarn prisma studio
```
4. run the command to run the seeds
```
yarn seed
```

5. To run the project in a development environment, run the command:
```
yarn dev
```

6. To run unit tests and integration tests execute this command:
```
yarn test
```

# Build and Test
1- It is necessary to generate an javascript build, run the command below without the application running in another terminal:

  ```
  yarn build
  ```
The folder generated by the build is in the "build" directory in the project root. It contains the build of project

2. To test the project in js mode use the command
  ```
  yarn start
  ``` 

## Libraries and Technologies
  - Typescript 
  - Nodejs 
  - express.js
  - postgres
  - swagger

This project was developed with the following libraries:
  - express.js
  - prisma orm
  - postgres
  - uuid
  - inversify
  - babel
  - eslint and prettier
  - dotenv


To hide the execute the build we will use pm2 . To do this, globally install pm2 on your computer.
  - npm install pm2 -g
  - npm install pm2-windows-startup -g
  - pm2-startup install

To start the automatic process, execute the commands below.
  - pm2 start build/Api/Http/server.js
  - pm2 save
  - reboot
  - pm2 ls

Check if the project was started successfully on the computer

To monitor the application use the command - pm2 monit


## Backend project structure

- API: Exposes endpoints for front-end use and for synchronization with the web. Contains the controllers with the endpoints, middleware, API configurations.
- Application: Contains application services, repository interfaces and use cases.
- Domain: Contains entities, constants, enumerators, types and exceptions. It is the layer that does not depend on any other layer.
- Infra: Contains the entire data persistence part (context, entity configuration, DTO repositories) 
- IoC: Contains dependency resolution settings
- Test: Contains the project's tests. In the name of unit tests only.