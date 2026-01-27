import { CsvParseError } from "../../../errors/index.js";
import { inferSchema, initParser } from "udsv";
import {
	LinkedinAchievementDomain,
	LinkedinAchievementParsed,
	LinkedinAchievementRaw,
} from "./linkedin.achievement.types.js";
import { GupyAchievementTypes } from "../../../services/gupy/achievements/gupy.achievement.raw.types.js";
import { readCsv } from "../../../shared/csv/readCsv.js";
import { parseLinkedinDate } from "../shared/linkedin.date.parser.js";

function parseRawAchievements(csv: string): LinkedinAchievementRaw[] {
	const schema = inferSchema(csv);
	const parser = initParser(schema);
	return parser.typedObjs(csv) as unknown as LinkedinAchievementRaw[];
}

function parseAchievements(rawRows: LinkedinAchievementRaw[]): LinkedinAchievementParsed[] {
	return rawRows.map((row) => ({
		Name: row.Name,
		Url: row.Url,
		Authority: row.Authority,
		Started_On: parseLinkedinDate(row["Started On"]),
		Finished_On: parseLinkedinDate(row["Finished On"]),
		License_Number: row["License Number"],
	}));
}

function normalizeAchievement(row: LinkedinAchievementParsed): LinkedinAchievementDomain {
	if (!row.Name?.trim()) {
		throw new CsvParseError('Linha do CSV inválida: coluna "Name" ausente ou vazia');
	}

	if (!row.Authority?.trim()) {
		throw new CsvParseError(
			`Linha do CSV inválida: coluna "Authority" ausente ou vazia para o achievement "${row.Name}"`,
		);
	}

	const descriptionParts: string[] = [];
	if (row.Authority) descriptionParts.push(`Emitido por: ${row.Authority}`);
	if (row.Url) {
		descriptionParts.push(row.Url);
	} else if (row.License_Number) {
		descriptionParts.push(`ID da licença: ${row.License_Number}`);
	}

	return {
		Type: GupyAchievementTypes.course,
		Name: row.Name.trim(),
		Description: descriptionParts.join(" | "),
	};
}

export function parseLinkedinAchievementsCSV(csvPath: string): LinkedinAchievementDomain[] {
	const csvContent = readCsv(csvPath);
	const rawRows = parseRawAchievements(csvContent);
	const parsedRows = parseAchievements(rawRows);
	return parsedRows.map(normalizeAchievement);
}

export function getParsedLinkedinAchievementsCSV(csvPath: string): LinkedinAchievementParsed[] {
	const csvContent = readCsv(csvPath);
	const rawRows = parseRawAchievements(csvContent);
	return parseAchievements(rawRows);
}
