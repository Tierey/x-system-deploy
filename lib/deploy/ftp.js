require('colors')
const gulp = require('gulp');
const ftp  = require('vinyl-ftp');
const log  = console.log

module.exports = options => async callback  => {

    let { taskName, ftp:array } = {
        taskName : `[ ${'deploy'.green} ] ${'ftp'.yellow}:`,
        ... options
    }
    
    if ( ! array.length ) return callback()

    log(`\n${taskName} deploy start.`)

    for (let i = 0; i < array.length; i++) 
    {

        const v = array[i];

        if(v.mode)
        {
            noone = false;

            let conn = ftp.create( {
                host:           v.host,
                user:           v.user,
                password:       v.pass,
                parallel:       10,
                maxConnections: 10,
                //log:          console.log
            } );

            await new Promise( ( res, rej ) => {

                gulp.src( v.src, { buffer:true } )

                .pipe(
                    conn.newer( `${v.path}` ) // only upload newer files
                )
                .pipe( conn.dest( `${v.path}` ))
                .on('error',e => rej(e) )
                .on("end", ()=>{ 

                    let auth = v.auth ? v.auth : ""

                    if(auth){
                        let [ user, pass ] = auth.split(":")
                        auth = `${user}:${pass}@`
                    }
                    let path = v.path.replace(/\\/g,"/").split("/").slice(1).join("/")

                    let url = `http://${auth}${path}/index.html`.cyan.underline

                    log(`\n${url}`)

                    res()

                })
            })

        } else {
            log(`\n${taskName} ${'mode'.yellow+':'+'false'.red} for ${`http://${v.host}`.cyan.underline}`);
        }
    }

    log(`\n${taskName} deploy end.\n`);

    return callback()

}
