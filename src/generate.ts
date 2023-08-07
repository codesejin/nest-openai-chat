import axios from 'axios';
import { Command } from 'commander';

const program = new Command();

// program
//     .option('-n, --name <name>', 'file name')
//     .option('-c, --compress', 'compress')
//     .parse();

// console.log(program.opts().n);
// console.log(program.opts().name);
// console.log(program.opts().compress);

export function generateCommand(program: Command) {
  program
    .command('generate <option>')
    .description('API를 호출하여 데이터를 생성합니다.')
    .action(async (option: string) => {
      try {
        const response = await axios.get(`http://localhost:3000`);
        console.log(response.data);
      } catch (error) {
        console.error('API 호출에 실패하였습니다:', error.message);
      }
    });
}
