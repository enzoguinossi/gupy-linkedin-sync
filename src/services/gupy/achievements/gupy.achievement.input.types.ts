import { GupyAchievementTypesEnum } from "./gupy.achievement.raw.types.js";

export interface GupyAchievementInput {
	type: GupyAchievementTypesEnum;
	name: string;
	description?: string;
}

export interface GupyAchievementsPayload {
	achievements: GupyAchievementInput[];
}
