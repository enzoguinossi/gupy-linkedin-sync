import { GupyEducationTypes } from "../../parsers/gupy/education/gupy.education.types.js";

export interface UserInput {
	selectFormationType(context: string): Promise<GupyEducationTypes>;
	askCourseName(context: string): Promise<string>;
}
