import { GupyAchievementTypes } from "../../../services/gupy/achievements/gupy.achievement.raw.types.js";

export interface GupyAchievementParsed {
	type: GupyAchievementTypes;
	name: string;
	description?: string;
}
