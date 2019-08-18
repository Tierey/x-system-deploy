
require(`colors`);
const gulp = require('gulp');
const log  = console.log

module.exports = options => async callback => {

    let { taskName , loc:array } = {
        taskName : `[ ${'deploy'.green} ] ${'local'.yellow}:`,
        ...options
    };

    if ( ! array.length ) return callback()

    log(`\n${taskName} deploy start.`);

    for (let i = 0; i < array.length; i++) 
    {
        const v = array[i];

        if(v.mode)
        {

            await new Promise( ( res, rej ) => {
    
                gulp.src( v.src, { buffer: false } )
                .pipe( gulp.dest( v.dest ) )

                .on('error',e=>rej(e))
                .on("end", ()=>{ 
                    log(`\n${taskName} ${v.src} => ${v.dest.green}`)
                    res();
                })
            })
            
        } else {

            log(`\n${taskName} ${'mode'.yellow+':'+'false'.red} for ${`${v.src}`.cyan}`);

        }
    }

    log(`\n${taskName} deploy end.\n`);

    return callback();

}
