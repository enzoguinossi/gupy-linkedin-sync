import { getParsedLinkedinEducationCSV } from "../../parsers/linkedin/education/linkedin.education.parser.js";

export async function getLinkedInFormation(csvPath: string) {
	return getParsedLinkedinEducationCSV(csvPath);
}
