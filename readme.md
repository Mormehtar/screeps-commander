#Screeps-commander
Is a command line tool to pull and push your Screeps code from and to Screeps server.

##Installation
Just install with npm.
```
    npm i screeps-commander -g
    or
    npm i screeps-commander
```
Then use.
```
    screeps-commander -c pull
    or
    node ./node_modules/.bin/screeps-commander -c push
```

You can use key `-h` to learn all possible keys for tool.
Also you can use config file to set parameters. Especially login and password.
Don't forget to add it to `.gitignore`!

Also library converts Screeps file-structure to folders using `.` as delimiter.
And updates `require` statements accordingly. And transforms this structure back on push.

*From version 1.1.0 can handle index files*
(`blah/blah/index.js` will be transformed to `blah.blah` and back).
