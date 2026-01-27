import {
	GupyFormationRaw,
	GupyFormationsRaw,
} from "../../../services/gupy/education/gupy.education.raw.types.js";
import {
	GupyEducationConclusionStatus,
	GupyEducationParsed,
	GupyEducationResponseParsed,
	GupyEducationTypes,
	GupyUnderGraduationTypes,
} from "./gupy.education.types.js";

function parseFormation(raw: GupyFormationRaw): GupyEducationParsed {
	return {
		formation: raw.formation as GupyEducationTypes,
		conclusionStatus: raw.conclusionStatus as GupyEducationConclusionStatus,
		course: raw.course,
		institution: raw.institution,
		startDateMonth: raw.startDateMonth,
		startDateYear: raw.startDateYear,
		endDateMonth: raw.endDateMonth,
		endDateYear: raw.endDateYear,
	};
}

export function parseGupyEducation(raw: GupyFormationsRaw): GupyEducationResponseParsed {
	return {
		formations: raw.academicFormation.map(parseFormation),
		underGraduationDegree: raw.underGraduationDegree as GupyUnderGraduationTypes,
	};
}
