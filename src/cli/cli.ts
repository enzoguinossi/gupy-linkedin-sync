import packageInfo from "../shared/util/packageInfo.js";
import { Command, CommanderError } from "commander";

import { ExitCode, isKnownError } from "../errors/index.js";

import { syncGupyToLinkedin } from "../application/sync/syncLinkedinAchievementsToGupy.js";
import { getGupyAchievements } from "../application/gupy/getGupyAchievements.js";
import { syncLinkedinEducationToGupy } from "../application/sync/syncLinkedinEducationToGupy.js";
import { cliUserInput } from "../infra/cli/cliUserInput.js";
import { initEnv } from "../config/env.js";
import { displayGupyAchievements } from "./displayers/gupy/gupy.achievement.displayer.js";
import { getLinkedinAchievements } from "../application/linkedin/getLinkedinAchievements.js";
import { getLinkedInFormation } from "../application/linkedin/getLinkedInFormation.js";
import { displayLinkedinAchievements } from "./displayers/linkedin/linkedin.achievement.displayer.js";
import { displayLinkedinEducation } from "./displayers/linkedin/linkedin.education.displayer.js";
import { getGupyEducation } from "../application/gupy/getGupyEducation.js";
import { displayGupyEducation } from "./displayers/gupy/gupy.education.displayer.js";

const program = new Command();
const userInput = cliUserInput;

program
	.name("gupy-sync")
	.description("Ferramenta de sincronização entre LinkedIn e Gupy")
	.version(packageInfo.version)
	.option("--token <token>", "Token de autenticação da Gupy")
	.option("--debug", "Exibe o stack trace completo em caso de erro");

program
	.command("importar-certificados")
	.description("Importa certificados a partir do CSV do LinkedIn")
	.requiredOption("--csv <path>", "Caminho para o CSV exportado do LinkedIn")
	.option("--dry-run", "Não envia dados para a Gupy, apenas exibe o resultado da análise")
	.action(async (options) => {
		await syncGupyToLinkedin(options.csv, options.dryRun);
	});

program
	.command("mostrar-certificados")
	.description("Exibe os certificados atualmente cadastrados na Gupy")
	.action(async () => {
		const data = await getGupyAchievements();
		displayGupyAchievements(data);
	});

program
	.command("mostrar-formacao")
	.description("Exibe a formação atualmente cadastrada na Gupy")
	.action(async () => {
		const data = await getGupyEducation();
		displayGupyEducation(data);
	});

program
	.command("mostrar-certificados-linkedin")
	.description("Exibe os certificados de um arquivo CSV do LinkedIn")
	.requiredOption("--csv <path>", "Caminho para o CSV exportado do LinkedIn")
	.action(async (options) => {
		const data = await getLinkedinAchievements(options.csv);
		displayLinkedinAchievements(data);
	});

program
	.command("mostrar-formacao-linkedin")
	.description("Exibe a formação acadêmica presente no csv exportado do Linkedin")
	.requiredOption("--csv <path>", "Caminho para o CSV exportado do LinkedIn")
	.action(async (options) => {
		const data = await getLinkedInFormation(options.csv);
		displayLinkedinEducation(data);
	});

program
	.command("importar-formacao")
	.description("Substitui a formação acadêmica da Gupy pelos dados do LinkedIn")
	.requiredOption("--csv <path>", "Caminho para o CSV exportado do LinkedIn")
	.option("--dry-run", "Não envia dados para a Gupy, apenas exibe o payload gerado")
	.action(async (options) => {
		await syncLinkedinEducationToGupy(options.csv, options.dryRun, userInput);
	});

program.exitOverride();

program.hook("preAction", () => {
	initEnv(program.opts());
});

try {
	await program.parseAsync(process.argv);
} catch (err) {
	const { debug } = program.opts?.() ?? {};

	if (err instanceof CommanderError) {
		console.error(err.message);
		process.exit(ExitCode.CLI);
	}

	if (isKnownError(err)) {
		console.error(err.message);
		if (debug) console.error(err.stack);
		process.exit(err.exitCode);
	}

	console.error("❌ Erro inesperado.");
	if (debug && err instanceof Error) {
		console.error(err.stack);
	}

	process.exit(ExitCode.UNEXPECTED);
}
