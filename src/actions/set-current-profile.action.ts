import { profileService } from '../services/Profile.service';
import { type Profile, type InsomniaContext, type InsomniaScope } from '../types';

export const setCurrentProfileAction = (scope: InsomniaScope, profile: Profile, isCurrent: boolean) => ({
	label: profile.name,
	icon: isCurrent ? 'circle-check' : 'circle',
	async action(context: InsomniaContext) {
		await profileService.setAsCurrent(profile.name);

		await scope.refreshActions();
		await scope.refreshTemplateTags();
	},
});
