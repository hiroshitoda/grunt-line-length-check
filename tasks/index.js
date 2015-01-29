module.exports = function(grunt)
{
    'use strict';
    var fs = require('fs'),
        debug = false,
        color =
        {
            red: '\u001b[31m',
            green: '\u001b[32m',
            cyan: '\u001b[36m',
            magenta: '\u001b[35m',
            yellow: '\u001b[33m',
            gray: '\u001b[30;1m',
            reset: '\u001b[0m'
        };
    
    function log(messages, level)
    {
        var message = messages.toString() + color.reset;
        if(level)
        {
            if(! debug)
            {
                return;
            }
            message = color.gray + message;
        }
        if(console && console.log)
        {
            console.log(message);
        }
    }
    
    function digDirectory(directoryPath, config)
    {
        log(['digDirectory', directoryPath, config], 'DEBUG');

        var files = fs.readdirSync(directoryPath);
        files.forEach(
            function(fileName)
            {
                var filePath = directoryPath + '/' + fileName,
                    fileStat = fs.statSync(filePath);
                try
                {
                    if(isMatchToExclusions(filePath, config))
                    {
                        return;
                    }

                    if(fileStat.isDirectory())
                    {
                        digDirectory(filePath, config);
                    }
                    else if(fileStat.isFile())
                    {
                        checkLineLength(filePath, config);
                    }
                }
                catch(error)
                {
                    throw error;
                }
            }
        );
    }
    
    function isMatchToExclusions(filePath, config)
    {
        log(['isMatchToExclusions', filePath, config], 'DEBUG');

        var isMatch = false,
            excludePatterns = config.excludePatterns;
        if(! excludePatterns || ! excludePatterns.length)
        {
            return false;
        }
        excludePatterns.forEach(
            function(pattern)
            {
                var regexpObject = new RegExp(pattern);
                if(filePath.match(regexpObject))
                {
                    isMatch = true;
                    log(['isMatchToExclusions', pattern], 'DEBUG');
                }
            }
        );
        return isMatch;
    }
    
    function checkLineLength(filePath, config)
    {
        log(['checkLineLength', filePath, config], 'DEBUG');

        var fileData = fs.readFileSync(filePath),
            lengthUnit = config.lengthUnit,
            limitLength = config.limitLength,
            verbose = config.verbose,
            encoding = config.encoding || 'utf8',
            lines = fileData.toString().split(/[\r\n]+/);
        lines.forEach(
            function(line)
            {
                var _length = 0;
                switch(lengthUnit)
                {
                    case 'byte':
                        _length = Buffer.byteLength(line, encoding);
                        break;
                    case 'character':
                    default:
                        _length = line.length;
                }
                if(_length > limitLength)
                {
                    throw new Error('a line of more than ' + Math.floor(limitLength) + ' characters detected: ' + filePath);
                }
            }
        );
        if(verbose) log([filePath, color.green, 'OK']);
    }

    grunt.registerTask(
        'line-length-check',
        'check line length',
        function()
        {
            var config = grunt.config('line-length-check'),
                basePath = config.basePath;
            
            if(! fs.statSync(basePath).isDirectory())
            {
                throw new Error('config.basePath is not directory: ' + basePath);
            }
            
            digDirectory(basePath, config);
        }
    );
};