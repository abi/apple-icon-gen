#!/usr/bin/env node
var path = require('path');

var sharp = require('sharp');
var argv = require('minimist')(process.argv.slice(2));

try {
    var inputFile = path.normalize(argv.input);
    var inputFileBasename = path.basename(inputFile, '.png');
} catch (e) {
    console.log(e);
    console.error('Check your input path');
    process.exit(1);
}

var outputSizes = argv.spec;
var outputSizesSplit = outputSizes.split(' ');

var outputFiles = [];

for (var i = 0; i < outputSizesSplit.length; i++) {
    var imageSpec = outputSizesSplit[i];
    var size = parseInt(imageSpec.split('@')[0]);
    var mag = parseInt(imageSpec.split('@')[1]);

    outputFiles.push(
        {
            name: inputFileBasename + '-' + imageSpec + 'x.png',
            size: size * mag
        }
    );
}

for (var i = 0; i < outputFiles.length; i++) {
    var outputFile = outputFiles[i];
    sharp(path.resolve(inputFile))
        .resize(outputFile.size)
        .toFile(path.join(argv.output, outputFile.name), function (err, info) {
            console.log(err, info)
            
        });
}
