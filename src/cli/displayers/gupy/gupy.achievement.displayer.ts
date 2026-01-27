import { GupyAchievementParsed } from "../../../parsers/gupy/achievement/gupy.achievement.types.js";
import { truncateText } from "../../../shared/util/truncateText.js";
import { GupyAchievementTypes } from "../../../services/gupy/achievements/gupy.achievement.raw.types.js";

const certificationTypeMap: Record<GupyAchievementTypes, string> = {
	[GupyAchievementTypes.certificate]: "Certificado",
	[GupyAchievementTypes.course]: "Curso",
};

export function displayGupyAchievements(data: GupyAchievementParsed[]) {
	if (data.length === 0) {
		console.log("Nenhum certificado encontrado na Gupy.");
		return;
	}

	const tableData = data.map((item) => ({
		Tipo: certificationTypeMap[item.type] || item.type,
		Nome: item.name,
		Descricao: item.description ? truncateText(item.description, 25) : "-",
	}));

	console.table(tableData);
}
