module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Points out excess spaces between words, before and after quotes',
    },
    fixable: 'code',
    schema: [], // no options
  },
  create: function (context) {
    return {
      Program: function (node) {
        const sourceCode = context.getSourceCode().text;
        const excessSpacesBeforeQuoteMarkPattern =
          /className=("|{'|{`)[^"'`]*\s+("|'}|`})/g;
        const excessSpacesBetweenWordsPattern =
          /className=("|{'|{`)[^"'`]*?\s{2,}[^"'`]*?("|'}|`})/g;
        const excessSpacesAfterQuoteMarkPattern = /className=("|{`|{')\s+/g;

        let match;

        while ((match = excessSpacesBetweenWordsPattern.exec(sourceCode))) {
          context.report({
            node,
            message: 'Excess spaces found between words',
            loc: {
              start: context.getSourceCode().getLocFromIndex(match.index),
              end: context
                .getSourceCode()
                .getLocFromIndex(match.index + match[0].length),
            },
          });
        }

        while ((match = excessSpacesBeforeQuoteMarkPattern.exec(sourceCode))) {
          context.report({
            node,
            message: 'Excess spaces found before quote mark',
            loc: {
              start: context.getSourceCode().getLocFromIndex(match.index),
              end: context
                .getSourceCode()
                .getLocFromIndex(match.index + match[0].length),
            },
          });
        }

        while ((match = excessSpacesAfterQuoteMarkPattern.exec(sourceCode))) {
          context.report({
            node,
            message: 'Excess spaces found after quote mark',
            loc: {
              start: context.getSourceCode().getLocFromIndex(match.index),
              end: context
                .getSourceCode()
                .getLocFromIndex(match.index + match[0].length),
            },
          });
        }
      },
    };
  },
};
