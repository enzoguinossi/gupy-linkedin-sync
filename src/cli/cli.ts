import { Command } from 'commander';;
import { isKnownError, ExitCode } from '../errors';


import { createGupyCookieJar } from '../http/cookieJar';
import { createGupyHttpClient } from '../http/axiosClient';
import { GupyService } from '../services/gupy/gupy.service';
import { parseLinkedinCSV } from '../parsers/linkedin/linkedin.parser';
import { buildAchievementsPayload } from '../services/gupy/gupy.payload';
import { validateCsvPath } from './validators/validateCsvPath';

const program = new Command()

program
    .name('gupy-sync')
    .description('Sincroniza achievements do LinkedIn com a Gupy')
    .version('0.1.0');

program
    .command('import-linkedin')
    .description('Importa certificados a partir do CSV do LinkedIn')
    .requiredOption('--csv <path>', 'Caminho para o CSV exportado do LinkedIn')
    .option('--dry-run', 'Não atualiza o Gupy, apenas mostra o resultado da análise do CSV')
    .action(async (options) => {
        validateCsvPath(options.csv);

        const achievements = parseLinkedinCSV(options.csv);
        const payload = buildAchievementsPayload(achievements);

        if (options.dryRun) {
            console.log(JSON.stringify(payload, null, 2));
            return;
        }

        const jar = await createGupyCookieJar();
        const client = createGupyHttpClient(jar);

        const gupy = new GupyService(client);

        gupy.replaceAchievements(payload);
    });

program
    .command('show-certificates')
    .description('Mostra os certificados já existentes na Gupy')
    .action(async () => {
        const jar = await createGupyCookieJar();
        const client = createGupyHttpClient(jar);

        const gupy = new GupyService(client);

        const data = await gupy.getAchievements();
        console.log(JSON.stringify(data, null, 2));
    });


program.exitOverride();

program.parseAsync(process.argv).catch(err => {
  if (isKnownError(err)) {
    console.error(err.message);
    process.exit(err.exitCode);
  }

  console.error('Erro inesperado:', err);
  process.exit(ExitCode.UNEXPECTED);
});

