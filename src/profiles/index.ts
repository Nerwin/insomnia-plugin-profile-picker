import { profileService } from '../services/Profile.service';
import { setCurrentProfileAction } from '../actions';
import { type InsomniaScope, type Profile } from '../types';

export const createProfileActionList = (scope: InsomniaScope) => {
	const profiles = profileService.findAll();
	const currentProfile = profileService.getCurrent();

	return profiles.map((profile: Profile) => {
		const isCurrentProfile = currentProfile?.name === profile.name;
		return setCurrentProfileAction(scope, profile, isCurrentProfile);
	});
};
