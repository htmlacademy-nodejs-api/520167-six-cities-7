import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string []): Promise<void> {
    console.info(`
      ${chalk.magenta('Программа для подготовки данных для REST API сервера.')}
        ${chalk.bgGreenBright('Пример:')}
          cli.js ${chalk.yellow('--<command>')} ${chalk.blue('[--arguments]')}
        ${chalk.bgGreenBright('Команды:')}
          --version:                   # выводит номер версии
          --help:                      # печатает этот текст
          --import ${chalk.yellow('<path>')}:             # импортирует данные из TSV
    `);
  }
}
