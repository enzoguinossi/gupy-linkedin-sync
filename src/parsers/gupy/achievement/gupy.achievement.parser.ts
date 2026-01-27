import {
	GupyAchievementRaw,
	GupyAchievementsResponse,
	GupyAchievementTypes,
} from "../../../services/gupy/achievements/gupy.achievement.raw.types.js";
import { GupyAchievementParsed } from "./gupy.achievement.types.js";

function parseAchievement(raw: GupyAchievementRaw): GupyAchievementParsed {
	return {
		type: raw.type as GupyAchievementTypes,
		name: raw.name,
		description: raw.description,
	};
}

export function parseGupyAchievements(raw: GupyAchievementsResponse): GupyAchievementParsed[] {
	return raw.achievements.map(parseAchievement);
}
