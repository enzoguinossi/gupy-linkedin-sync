import { LinkedinAchievementParsed } from "../../../parsers/linkedin/achievement/linkedin.achievement.types.js";
import { truncateText } from "../../../shared/util/truncateText.js";

export function displayLinkedinAchievements(achievements: LinkedinAchievementParsed[]) {
	if (achievements.length === 0) {
		console.log("Nenhum certificado encontrado no CSV.");
		return;
	}

	const tableData = achievements.map((item) => ({
		Nome: truncateText(item.Name, 25),
		Emissor: item.Authority,
		Inicio: item.Started_On ? `${item.Started_On.Month}/${item.Started_On.Year}` : "-",
		Fim: item.Finished_On ? `${item.Finished_On.Month}/${item.Finished_On.Year}` : "-",
		Licenca: item.License_Number ? truncateText(item.License_Number, 8) : "-",
		Url: item.Url ? truncateText(item.Url, 25) : "-",
	}));

	console.table(tableData);
}
