var express = require( "express" );
var path = require( "path" );
var childProcess = require( "child_process" );
var phantomjs = require( "phantomjs" );
var binPath = phantomjs.path;
var app = express();

app.use( express.static( __dirname + "/" ) );

app.listen( 8080 );

app.get( "/_escape_fragment_/*", function( request, response ) {

  var script = path.join( __dirname, "get_html.js" );
  var url = "http://localhost:8080" + request.url.replace( "_escape_fragment_", "#!" );
  var childArgs =
  [
    script, url
  ];

  childProcess.execFile( binPath, childArgs, function( err, stdout, stderr ) {
    response.writeHead( 200, {
      "Content-Type": "text/html; charset=UTF-8"
    });
    response.end( "<!doctype html><html>" + stdout + "</html>" );
  });

});

console.log( "Webserver started." );