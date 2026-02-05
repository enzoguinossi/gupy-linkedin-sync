import {
	GupyAchievementRaw,
	GupyAchievementsResponse,
	GupyAchievementTypesEnum,
} from "../../../services/gupy/achievements/gupy.achievement.raw.types.js";
import { AchievementEntity, AchievementType } from "../../../domain/entities/achievement.entity.js";

function mapGupyTypeToDomain(type: string): AchievementType {
	switch (type) {
		case GupyAchievementTypesEnum.courses:
			return AchievementType.Course;
		case GupyAchievementTypesEnum.certificates:
			return AchievementType.Certification;
		case GupyAchievementTypesEnum.acknowledgements:
			return AchievementType.Acknowledgement;
		case GupyAchievementTypesEnum.volunteerWork:
			return AchievementType.volunteerWork;
		default:
			return AchievementType.Certification;
	}
}

function parseAchievement(raw: GupyAchievementRaw): AchievementEntity {
	return {
		name: raw.name,
		type: mapGupyTypeToDomain(raw.type),
		issuer: "Gupy (Importado)", // Gupy não retorna o emissor explicitamente na estrutura básica
		description: raw.description,
		// Gupy não retorna datas estruturadas ou URL/CredentialID na lista básica
	};
}

export function parseGupyAchievements(raw: GupyAchievementsResponse): AchievementEntity[] {
	return raw.achievements.map(parseAchievement);
}
