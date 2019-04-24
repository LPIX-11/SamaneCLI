# SamaneCLI

## Overview
This is the CLI specialy made for the Senegalese Made PHP Framework Samane. It's purpose is 
to be the assistant of the developer and help him go faster when using the Framework.
The CLI is written in [nodejs](https://nodejs.org/en/) and is up to Modern Software Development Standards.
But, we're still improving it, so if you just fell like it we love pull requests ^_^.

Quality Assurance: [![Codacy Badge](https://api.codacy.com/project/badge/Grade/52b7e7291f8341dba2fd9e4b73f18265)](https://app.codacy.com/app/LPIX-11/SamaneCLI?utm_source=github.com&utm_medium=referral&utm_content=LPIX-11/SamaneCLI&utm_campaign=Badge_Grade_Dashboard)

Build: [![CircleCI](https://circleci.com/gh/LPIX-11/SamaneCLI.svg?style=svg)](https://circleci.com/gh/LPIX-11/SamaneCLI)

### Structure
    .
      - Commands
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
      - start.js
      
#### Commands [using sm or samane]
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
        - notification_toggle
        - active
        * user
        * database connection type
    
    NB: The use of the -p flag will allow to write directly the project name, 
        and the use of multiple flags is possible 
        
#### In Sight
    Files generation through the CLI
        - sm generate --model <model_name>
            - Will generate a model class
            
        - sm generate --entity <entity_name>
            - will generate an entity
            
        - sm generate --controller <controller_name>
            - Will generate a controller class

        - sm generate <name> -m -c -e
            - Will generate a model, controller and entity
            
##### Author
    + Mohamed Johnson

###### Contributors
    + Djiby Ndiaye
