import CodeMirror from 'codemirror';
import 'codemirror/mode/meta';
import 'codemirror/addon/mode/simple';
import { defineRobotMode, MODE_NAME } from './mode';

// https://github.com/jsdom/jsdom/issues/3002
document.createRange = () => {
  const range = new Range();

  range.getBoundingClientRect = jest.fn();

  range.getClientRects = () => {
    return {
      item: () => null,
      length: 0,
      [Symbol.iterator]: jest.fn()
    };
  };

  return range;
}

const tokenTypeMap: { [key: string]: string } = {
  'cm-header': 'header',
  'cm-atom': 'atom',
  'cm-keyword': 'keyword',
  'cm-attribute': 'attr',
  'cm-operator': 'operator',
  'cm-variable-2': 'var2',
  'cm-string': 'string',
}

const mapTokenTypes = (value: string): string => value?.split(' ').map((x) => {
  const tokenType = tokenTypeMap[x];
  return tokenType ? `<${tokenType}>` : x;
}).join(' ');

const findLines = (
  editor: CodeMirror.EditorFromTextArea,
  body: HTMLElement,
): string[] => {
  const lineCount = editor.lineCount();
  const lines: string[] = [];
  for (let line = 0; line < lineCount; line++) {
    editor.setCursor({line: line, ch: 0});
    const nodes = body.querySelector('.CodeMirror-scroll .CodeMirror-line span').childNodes;
    const spans: any[] = [];
    nodes.forEach((x) => spans.push(x));
    const allTokens = spans.map((span) => ({
      types: mapTokenTypes(span.attributes?.class?.value),
      text: span.innerHTML,
    }));
    const tokens = allTokens
      .filter((x) => x.text !== undefined && x.text !== '&nbsp;')
      .map((token) => `${token.types}: ${token.text}`);
    lines.push([`#${line}`, ...tokens].join(' '));
  }
  return lines;
}

defineRobotMode({ CodeMirror } as any);
document.body.innerHTML = `<textarea id='code' />`
const codeElement = document.getElementById('code') as HTMLTextAreaElement;
const editor = CodeMirror.fromTextArea(codeElement, { mode: MODE_NAME });

const parse = (value: string): string[] => {
  const input = value.split('\n').filter((x) => !!x);
  editor.setValue([
    '*** Tasks ***',
    'Task ATest',
    ...input.map((x) => `    ${x}`),
  ].join('\n'));
  const output = findLines(editor, document.body);
  return output.slice(2);
}

test('Tasks', () => {
  editor.setValue([
    '*** Tasks ***',
    'Task ATest',
  ].join('\n'));
    const lines = findLines(editor, document.body);
    expect(lines).toStrictEqual([
      "#0 <header>: *** Tasks ***",
      "#1 <string> <header>: Task ATest",
    ]);
  });

describe('FOR', () => {
  test('example 1', () => {
      const actual = parse(`
        FOR  \${x}  IN  '1'  '2'
          NOOP
        END
      `);
      expect(actual).toStrictEqual([
        "#2 <atom>: FOR <var2>: ${x} <atom>: IN <string>: '1' <string>: '2'",
        "#3 <keyword>: NOOP",
        "#4 <atom>: END",
        "#5",
      ]);
    });
    test('example 2', () => {
      const actual = parse(`
        FOR  \${x}  IN  '1'  '2'
          FOR  \${y}  IN  '2'
            NOOP
          END
        END
      `);
      expect(actual).toStrictEqual([
        "#2 <atom>: FOR <var2>: ${x} <atom>: IN <string>: '1' <string>: '2'",
        "#3 <atom>: FOR <var2>: ${y} <atom>: IN <string>: '2'",
        "#4 <keyword>: NOOP",
        "#5 <atom>: END",
        "#6 <atom>: END",
        "#7"
      ]);
    });
    test('example 3', () => {
      const actual = parse(`
        FOR  \${x}  IN  '1'  '2'
          IF  {1 > 0}
            NOOP
          ELSE IF  {2 > 1}
            NOOP
          ELSE
            NOOP
          END
        END
      `);
      expect(actual).toStrictEqual([
        "#2 <atom>: FOR <var2>: ${x} <atom>: IN <string>: '1' <string>: '2'",
        "#3 <atom>: IF <string>: {1 <string>: &gt; <string>: 0}",
        "#4 <keyword>: NOOP",
        "#5 <atom>: ELSE IF <string>: {2 <string>: &gt; <string>: 1}",
        "#6 <keyword>: NOOP",
        "#7 <atom>: ELSE",
        "#8 <keyword>: NOOP",
        "#9 <atom>: END",
        "#10 <atom>: END",
        "#11"
      ]);
  });
});

describe('IF', () => {
  test('example 1', () => {
    const actual = parse(`
      IF  {1 > 0}
        NOOP
      END
    `);    
    expect(actual).toStrictEqual([
      "#2 <atom>: IF <string>: {1 <string>: &gt; <string>: 0}",
      "#3 <keyword>: NOOP",
      "#4 <atom>: END",
      "#5"
    ]);
  });
  test('example 2', () => {
    const actual = parse(`
      IF  {1 > 0}
        NOOP
      ELSE
        NOOP
      END
    `);    
    expect(actual).toStrictEqual([
      "#2 <atom>: IF <string>: {1 <string>: &gt; <string>: 0}",
      "#3 <keyword>: NOOP",
      "#4 <atom>: ELSE",
      "#5 <keyword>: NOOP",
      "#6 <atom>: END",
      "#7"
    ]);
  });
  test('example 3', () => {
    const actual = parse(`
      IF  {1 > 0}
        NOOP
      ELSE IF  {2 > 1}
        NOOP
      END
    `);    
    expect(actual).toStrictEqual([
      "#2 <atom>: IF <string>: {1 <string>: &gt; <string>: 0}",
      "#3 <keyword>: NOOP",
      "#4 <atom>: ELSE IF <string>: {2 <string>: &gt; <string>: 1}",
      "#5 <keyword>: NOOP",
      "#6 <atom>: END",
      "#7"
    ]);
  });
  test('example 4', () => {
    const actual = parse(`
      IF  {1 > 0}
        NOOP
      ELSE IF  {2 > 1}
        NOOP
      ELSE
        NOOP
      END
    `);    
    expect(actual).toStrictEqual([
      "#2 <atom>: IF <string>: {1 <string>: &gt; <string>: 0}",
      "#3 <keyword>: NOOP",
      "#4 <atom>: ELSE IF <string>: {2 <string>: &gt; <string>: 1}",
      "#5 <keyword>: NOOP",
      "#6 <atom>: ELSE",
      "#7 <keyword>: NOOP",
      "#8 <atom>: END",
      "#9"
    ]);
  });
    test('example 5', () => {
      const actual = parse(`
      IF  {1 > 0}
        IF  {1 > 0}
          NOOP
        END
      ELSE IF  {2 > 1}
        IF  {1 > 0}
          NOOP
        END
      ELSE
        IF  {1 > 0}
          NOOP
        END
      END
    `);
    expect(actual).toStrictEqual([
      "#2 <atom>: IF <string>: {1 <string>: &gt; <string>: 0}",
      "#3 <atom>: IF <string>: {1 <string>: &gt; <string>: 0}",
      "#4 <keyword>: NOOP",
      "#5 <atom>: END",
      "#6 <atom>: ELSE IF <string>: {2 <string>: &gt; <string>: 1}",
      "#7 <atom>: IF <string>: {1 <string>: &gt; <string>: 0}",
      "#8 <keyword>: NOOP",
      "#9 <atom>: END",
      "#10 <atom>: ELSE",
      "#11 <atom>: IF <string>: {1 <string>: &gt; <string>: 0}",
      "#12 <keyword>: NOOP",
      "#13 <atom>: END",
      "#14 <atom>: END",
      "#15",
    ]);
  });
  test('example 6', () => {
      const actual = parse(`
      IF  {1 > 0}
        FOR  \${x}  IN  '1'  '2'
          NOOP
        END
      ELSE IF  {2 > 1}
        FOR  \${x}  IN  '1'  '2'
          NOOP
        END
      ELSE
        FOR  \${x}  IN  '1'  '2'
          NOOP
        END
      END
    `);
    expect(actual).toStrictEqual([
      "#2 <atom>: IF <string>: {1 <string>: &gt; <string>: 0}",
      "#3 <atom>: FOR <var2>: ${x} <atom>: IN <string>: '1' <string>: '2'",
      "#4 <keyword>: NOOP",
      "#5 <atom>: END",
      "#6 <atom>: ELSE IF <string>: {2 <string>: &gt; <string>: 1}",
      "#7 <atom>: FOR <var2>: ${x} <atom>: IN <string>: '1' <string>: '2'",
      "#8 <keyword>: NOOP",
      "#9 <atom>: END",
      "#10 <atom>: ELSE",
      "#11 <atom>: FOR <var2>: ${x} <atom>: IN <string>: '1' <string>: '2'",
      "#12 <keyword>: NOOP",
      "#13 <atom>: END",
      "#14 <atom>: END",
      "#15",
    ]);
  });
});
