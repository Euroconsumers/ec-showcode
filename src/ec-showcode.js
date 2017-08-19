//TODO: do not remove first line when it's this widget
//TODO: optimize jquery selectors

(function($, hljs) {
    'use strict';

    $.widget('ec.showcode', {
        options: {
        },
        _create: function() {
            var encodeHtmlEntity = function (str) {
                var buf = [];
                for (var i = str.length - 1; i >= 0; i--) {
                    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
                }
                return buf.join('');
            };

            var $pattern = $(this.element.next('.comment').addBack().wrap('<div class="showcode__pattern showcode--hide"/>'));
            
            //Remove first empty line in each pattern
            var patternCode = this.element.html().replace(/[\n\r]/m, '');
            //Find the indentation of the first line of code
            var patternIndent = /\s*\</m.exec(patternCode);
            //Remove from each line the amount of tab of the first line
            patternCode = patternCode.split(patternIndent[0]).join('\<');
            
            //Add the code of the pattern in pre>code to show the code of the pattern (Hidden by default)
            var $codeBlock = $('<code class="html">' + encodeHtmlEntity(patternCode) + '</code>');
            hljs.highlightBlock($codeBlock[0]);           
            $codeBlock.insertAfter(this.element);
            $codeBlock.wrap('<pre>')
            
            var $showCode = $('<div class="showcode__button">&lt; Code &gt;</div>');
            $showCode.click(function () {
                $(this).closest('.showcode__pattern').toggleClass("showcode--hide");
            });
            $pattern.prepend($showCode);
        },
    })
})(jQuery, hljs)






