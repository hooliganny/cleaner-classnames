const RuleTester = require('eslint').RuleTester;
const rule = require('../lib/rules/cleaner-classnames');

const ruleTester = new RuleTester();

ruleTester.run('cleaner-classnames', rule, {
  valid: [
    // Valid code examples
    {
      code: 'className={"some class"}',
    },
    {
      code: 'className={`another-class`}',
    },
    {
      code: 'className="yet another-class"',
    },
  ],
  invalid: [
    // Invalid code examples
    {
      code: 'className={` another-class`}',
      errors: [{ message: 'Excess spaces found after quote mark' }],
      //   output: 'className={`another-class`}',
    },
    {
      code: "className={' yet-another-class'}",
      errors: [{ message: 'Excess spaces found after quote mark' }],
      //   output: "className={'yet-another-class'}",
    },
    {
      code: 'className=" yet-another-class"',
      errors: [{ message: 'Excess spaces found after quote mark' }],
      //   output: "className={'yet-another-class'}",
    },

    {
      code: 'className={`another-  class`}',
      errors: [{ message: 'Excess spaces found between words' }],
      //   output: 'className={`another-class`}',
    },
    {
      code: "className={'yet-another-  class'}",
      errors: [{ message: 'Excess spaces found between words' }],
      //   output: "className={'yet-another-class'}",
    },
    {
      code: 'className="some-  class"',
      errors: [{ message: 'Excess spaces found between words' }],
      //   output: 'className={"some-class"}',
    },
    {
      code: 'className={`another-class `}',
      errors: [{ message: 'Excess spaces found before quote mark' }],
      //   output: 'className={`another-class`}',
    },
    {
      code: "className={'yet-another-class '}",
      errors: [{ message: 'Excess spaces found before quote mark' }],
      //   output: "className={'yet-another-class'}",
    },
    {
      code: 'className="some-class "',
      errors: [{ message: 'Excess spaces found before quote mark' }],
      //   output: 'className={"some-class"}',
    },
  ],
});
