
import { Command } from 'commander';
import { generateCommand } from './generate';
const packageJson = require('./package.json'); // require로 JSON 파일 불러오기


const program = new Command();

program.name(packageJson.name);

// 'generate' 명령어 처리를 위한 로직 파일을 가져옵니다.

generateCommand(program);

program.parse(process.argv);
