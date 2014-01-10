module.exports = function(grunt) {
  grunt.registerMultiTask('templates', 'Put HTML templates into XML file.', function() {

    // xml header
    var xml = '<?xml version="1.0" encoding="UTF-8"?>'+
                '<templates>';

    // get the root directory for all templates
    var afterRoot=false, rootDir = '';
    grunt.util._.each(this.files[0].orig.src[0].split('/'), function(piece) {
      if (piece.match(/\*/)) {
        afterRoot = true;
      }

      if (afterRoot) {
        return;
      }

      rootDir += piece+'/';
    });

    grunt.util._.each(this.filesSrc, function(filepath) {
      try {
        var template = grunt.file.read(filepath),
          minified = '';

        xml += '<template name="'+filepath.match(rootDir+'([a-zA-Z]+(/[a-zA-Z0-9_]+)*).html$')[1]+'">'+
                  '<![CDATA['+template+']]>'+
              '</template>';

      } catch (e) {
        console.log('error in template: '+filepath);
        throw e;
      }
    });

    // finish xml and write to destination
    xml += '</templates>';

    var dest = this.files[0].dest;
    grunt.file.write(this.files[0].dest, xml);

    // Fail task if errors were logged.
    if (this.errorCount) {
        return false;
    }

    // Otherwise, print a success message.
    grunt.log.writeln('File "' + dest + '" created.');
  });
};