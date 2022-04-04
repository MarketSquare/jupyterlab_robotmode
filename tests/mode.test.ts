import fs from 'fs';
import { join, basename, extname } from 'path';
import CodeMirror from 'codemirror';
import 'codemirror/mode/meta';
import 'codemirror/addon/mode/simple';
import { defineRobotMode, MODE_NAME } from '../src/mode';

const fixtureDir = join(__dirname, `${basename(__filename, '.ts')}.fixtures`);
const fixtures = fs
  .readdirSync(fixtureDir)
  .filter((x) => extname(x).toLowerCase() === '.robot')
  .map((x) => [basename(x, '.robot')]);

// https://github.com/jsdom/jsdom/issues/3002
document.createRange = () => {
  const range = new Range();
  range.getBoundingClientRect = jest.fn();
  range.getClientRects = () => {
    return {
      item: () => null,
      length: 0,
      [Symbol.iterator]: jest.fn(),
    };
  };
  return range;
};

const tokenTypeMap: { [key: string]: string } = {
  'cm-atom': 'atom',
  'cm-attribute': 'attribute',
  'cm-header': 'header',
  'cm-keyword': 'keyword',
  'cm-operator': 'operator',
  'cm-string': 'string',
  'cm-variable-2': 'variable2',
};

const mapToTokenTypes = (value: string): string => {
  const tokenTypes = value
    ?.split(' ')
    .map((x) => {
      const tokenType = tokenTypeMap[x];
      return tokenType ? tokenType : x;
    })
    .join('|');
  return tokenTypes ? `<${tokenTypes}>` : null;
};

const parseTokens = (robot: string): string[] => {
  editor.setValue(robot);
  const body = document.body;
  const lineCount = editor.lineCount();
  const lines: string[] = [];
  for (let line = 0; line < lineCount; line++) {
    editor.setCursor({ line: line, ch: 0 });
    const nodes = body.querySelector(
      '.CodeMirror-scroll .CodeMirror-line span'
    ).childNodes;
    const spans: any[] = [];
    nodes.forEach((x) => spans.push(x));
    const allTokens = spans.map((span) => ({
      types: mapToTokenTypes(span.attributes?.class?.value),
      text: span.innerHTML,
    }));
    const tokens = allTokens
      .filter((x) => x.text !== undefined && x.text !== '&nbsp;')
      .map((token) => `${token.types}: ${token.text}`);
    lines.push([`#${line}`, ...tokens].join(' '));
  }
  return lines;
};

defineRobotMode({ CodeMirror } as any);
document.body.innerHTML = `<textarea id='code' />`;
const codeElement = document.getElementById('code') as HTMLTextAreaElement;
const editor = CodeMirror.fromTextArea(codeElement, { mode: MODE_NAME });

test('fixtures exist', () => expect(fixtures.length).toBeGreaterThan(0));

test.each(fixtures)('%s', (fixture) => {
  const robotFilePath = join(fixtureDir, `${fixture}.robot`);
  const robot = fs.readFileSync(robotFilePath, { encoding: 'utf8' });
  const tokens = parseTokens(robot);
  expect(tokens).toMatchSnapshot();
});
