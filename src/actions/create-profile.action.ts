import { profileService } from '../services/Profile.service';
import { type InsomniaScope, type InsomniaContext } from '../types';

export const createProfileAction = (scope: InsomniaScope) => ({
	label: 'Create profile',
	icon: 'user-plus',
	async action(context: InsomniaContext) {
		const name = await context.app.prompt('', {
			title: 'Create new profile',
			label: 'Profile name ?',
			inputType: 'text',
			submitName: 'Create',
			hint: 'Name must be unique',
		});
		if (!name || name.length === 0) return;

		const profiles = profileService.findAll();
		let setAsCurrentProfile = 'false';
		if (profiles.length > 0) {
			setAsCurrentProfile = await context.app.prompt('', {
				title: 'Create new profile',
				label: 'Set as current profile ?',
				inputType: 'checkbox',
			});
		}

		try {
			await profileService.create(name);
			if (setAsCurrentProfile === 'true') await profileService.setAsCurrent(name);
		} catch (error: any) {
			// eslint-disable-next-line no-alert
			alert(`Error creating new profile: ${error.message}`);
			return;
		}

		await scope.refreshActions();
	},
});
