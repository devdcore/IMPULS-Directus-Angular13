
const { gitDescribeSync } = require( 'git-describe' );
const { version, name } = require( './package.json' );
const { resolve, relative } = require( 'path' );
const { writeFileSync, existsSync, mkdirSync } = require( 'fs-extra' );

const gitInfo = gitDescribeSync( {
  dirtyMark: false,
  dirtySemver: false
} );

gitInfo.version = version;

// Create or validate folders
if ( !existsSync( __dirname + '/src/environments' ) ) {
  mkdirSync( __dirname + '/src/environments' );
}
if ( !existsSync( __dirname + '/dist' ) ) {
  mkdirSync( __dirname + '/dist' );
}

let file = resolve( __dirname, 'src', 'environments', 'version.ts' );

writeFileSync( file,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const VERSION = ${ JSON.stringify( gitInfo, null, 4 ) };
/* tslint:enable */
`, { encoding: 'utf-8' } );

file = resolve( __dirname, 'dist', 'version.json' );
writeFileSync( file, `${ JSON.stringify( gitInfo, null, 4 ) }`, { encoding: 'utf-8' } );

// Write message to console
console.log( "***************************************************" );
console.log( {
  name: name,
  version: version,
  git: `${ gitInfo.raw }`,
  to: `${ relative( resolve( __dirname, '..' ), file ) }`
} );
console.log( "***************************************************" );
