# SamaneCLI

## Overview
This is the CLI specialy made for the Senegalese Made PHP Framework Samane. It's purpose is 
to be the assistant of the developer and help him go faster when using the Framework.
The CLI is written in [nodejs](https://nodejs.org/en/) and is up to Modern Software Development Standards.
But, we're still improving it, so if you just feel like it, we love pull requests ^_^.

Quality Assurance: [![Codacy Badge](https://api.codacy.com/project/badge/Grade/52b7e7291f8341dba2fd9e4b73f18265)](https://app.codacy.com/app/LPIX-11/SamaneCLI?utm_source=github.com&utm_medium=referral&utm_content=LPIX-11/SamaneCLI&utm_campaign=Badge_Grade_Dashboard)

Build: [![CircleCI](https://circleci.com/gh/LPIX-11/SamaneCLI.svg?style=svg)](https://circleci.com/gh/LPIX-11/SamaneCLI)

### Structure
    .
      - commands
      - node_modules
      - about.txt
      - package-lock.json
      - package.json
      - README.md
      - sm-cli.js
      
    ./commands
      - framework
      - version.js
      - version.txt
     
    ./commands/framework
      - classes
      - generate
      - start.js
    
    ./commands/framework/classes
      - Generator.js
      
    ./commands/framework/generate
      - generate.js
      
#### Commands (using sm or samane)
    + Command to create a new project
        sm start 
            - project name
            - database type
            - database instance
            - database name
            - database host
            - database port
            * database connection type

        sm start --blank -> this will give you the skeleton of the framework
            - project name

        sm start --minimal -> this will give you a minimal project set up
            - project name
            * database connection type
    
    + Controller, Model or Entity generation
        - sm generate --model <model_name>
            - generates a model class
            
        - sm generate --entity <entity_name>
            - generates an entity
            
        - sm generate --controller <controller_name>
            - generates a controller class

        - sm generate <name> -m -c -e
            - generates a model, controller and entity
            
        - sm generate <name> -m -e
            - generates a model and an entity
    
    NB: The use of the -p flag will allow to write directly the project name, 
        and the use of multiple flags is possible 
        
#### In Sight
    Improve the sm generate command
        - write more ergonomic code
        - allow to add attributes when creating the entity
        - create a model by exporting the entity
        - create a entity by exporting the model
            
##### Author
    + Mohamed Johnson

###### Contributors
    + Djiby Ndiaye
