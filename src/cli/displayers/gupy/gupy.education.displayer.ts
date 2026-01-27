import {
	GupyEducationResponseParsed,
	GupyUnderGraduationTypes,
	GupyEducationTypes,
	GupyEducationConclusionStatus,
} from "../../../parsers/gupy/education/gupy.education.types.js";
import { truncateText } from "../../../shared/util/truncateText.js";

const underGraduationMap: Record<GupyUnderGraduationTypes, string> = {
	[GupyUnderGraduationTypes.completedHighSchool]: "Ensino médio completo",
	[GupyUnderGraduationTypes.inProgressHighSchool]: "Ensino médio em andamento",
	[GupyUnderGraduationTypes.incompleteHighSchool]: "Ensino médio incompleto",
	[GupyUnderGraduationTypes.completedElementarySchool]: "Ensino fundamental completo",
	[GupyUnderGraduationTypes.inProgressFundamental]: "Ensino fundamental em andamento",
	[GupyUnderGraduationTypes.incompleteElementarySchool]: "Ensino fundamental incompleto",
};

const educationTypeMap: Record<GupyEducationTypes, string> = {
	[GupyEducationTypes.technical_course]: "Curso Técnico",
	[GupyEducationTypes.technological]: "Tecnólogo",
	[GupyEducationTypes.graduation]: "Graduação",
	[GupyEducationTypes.post_graduate]: "Pós-graduação",
	[GupyEducationTypes.master_degree]: "Mestrado",
	[GupyEducationTypes.phd]: "Doutorado",
};

const statusMap: Record<GupyEducationConclusionStatus, string> = {
	[GupyEducationConclusionStatus.education_complete]: "Completo",
	[GupyEducationConclusionStatus.education_in_progress]: "Em andamento",
	[GupyEducationConclusionStatus.education_incomplete]: "Incompleto",
};

export function displayGupyEducation(data: GupyEducationResponseParsed) {
	if (data.underGraduationDegree) {
		const translatedUnderGraduation =
			underGraduationMap[data.underGraduationDegree] || data.underGraduationDegree;
		console.log(`\n🎓 Ensino Básico: ${translatedUnderGraduation}\n`);
	} else {
		console.log("NÃO HÁ FORMAÇÃO BÁSICA");
	}

	if (data.formations.length === 0) {
		console.log("Nenhuma formação acadêmica encontrada na Gupy.");
		return;
	}

	const tableData = data.formations.map((item) => ({
		Instituicao: truncateText(item.institution, 30),
		Curso: truncateText(item.course, 30),
		Nivel: educationTypeMap[item.formation] || item.formation,
		Status: statusMap[item.conclusionStatus] || item.conclusionStatus,
		Inicio: `${item.startDateMonth}/${item.startDateYear}`,
		Fim: `${item.endDateMonth}/${item.endDateYear}`,
	}));

	console.table(tableData);
}
