import { LinkedinEducationParsed } from "../../../parsers/linkedin/education/linkedin.education.types.js";
import { truncateText } from "../../../shared/util/truncateText.js";

export function displayLinkedinEducation(education: LinkedinEducationParsed[]) {
	if (education.length === 0) {
		console.log("Nenhuma formação encontrada no CSV.");
		return;
	}
	const tableData = education.map((item) => ({
		Instituicao: truncateText(item.School_Name, 30),
		Grau: item.Degree_Name ? truncateText(item.Degree_Name, 20) : "-",
		Inicio: `${item.Start_Date.Month}/${item.Start_Date.Year}`,
		Fim: `${item.End_Date.Month}/${item.End_Date.Year}`,
	}));

	console.table(tableData);
}
