
const gulp = require(`gulp`);

const ftp  = require(`./lib/deploy/ftp`);
const git  = require(`./lib/deploy/git`);
const loc  = require(`./lib/deploy/loc`);

function deploy( options ) {

    return gulp.series(

        function deploy_local (callback) {

            loc(options).call(this,callback)

        },

        gulp.parallel(

            function deploy_ftp ( callback ) {

                ftp(options).call(this,callback)

            },

            function deploy_git ( callback ) {

                git(options).call(this,callback)
                
            }
        )
    )
}

module.exports = deploy