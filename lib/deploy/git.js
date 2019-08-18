
require('colors')
const clild = require('child_process').execSync;
const log  = console.log

module.exports = options => callback => {

    let { taskName, git:array } = {
        taskName : `[ ${'deploy'.green} ] ${'git'.yellow}:`,
        ... options
    }

    if ( ! array.length ) return callback()

    log(`\n${taskName} deploy start.\n`)

    array.forEach( function(v) {

        if( v.mode ) {

            log(clild(v.cmd).toString().yellow);

        } else {

            log(`\n${taskName} ${'mode'.yellow+':'+'false'.red} for ${`${v.cmd}`.cyan}`);

        }

    })

    log(`\n${taskName} deploy end.\n`)

    return callback()

}
