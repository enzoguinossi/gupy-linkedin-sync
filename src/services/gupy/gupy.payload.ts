import type { Achievement } from '../../types/gupy.achievement.types';

export function buildAchievementsPayload(
  achievements: Achievement[]
) {
  return {
    achievements,
  };
}
