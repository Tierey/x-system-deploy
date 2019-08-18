#use
``` javascript
const gulp = require(`gulp`);

const options = require(`./deploy`) ;                 // options file
const deploy  = require(`@x-system/deploy`); // gulp 4 function

gulp.task("deplloy", deploy(options))
```
## options
``` javascript
// root project directory
let cwd    = process.cwd().replace(/\\/g,"/")
// project folder name
let folder = cwd.split("/").pop()

module.exports = {

    loc:[ // local operations ( computer copy or local network )
        {
            mode : false, // do it or not
            // local copy
            src  : [`./README.md`],
            dest : "./www"
        },
        {
            mode : false,
            // local network
            src  : [`${cwd}/www/**/{*.*,.*}`],
            dest : `\\\\192.168.1.111\\somePath\\${folder}`
        }
    ],

    ftp:[
        {
            mode : false,

            src  : [`${cwd}/www/**`],
            host : `some.host.ua`,
            user : `ftp_user`,
            pass : `ftp_path`,
			// full server ftp path
            path : `www/some.host.ua/${folder}`,
			// http auth ( optional or false )
            auth : `user:password`
        },
    ],

    git:[
        {
            mode : true,
            
            cmd  : `git add . && git commit -m "auto deploy" && git push origin master`,
        },
    ],
    
    
}
```