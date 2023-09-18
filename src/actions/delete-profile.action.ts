import { profileService } from '../services/Profile.service';
import { type InsomniaContext, type InsomniaScope } from '../types';

export const deleteProfileAction = (scope: InsomniaScope) => ({
	label: 'Delete profile',
	icon: 'trash',
	async action(context: InsomniaContext) {
		const profileToDeletes: string[] = [];

		const handleProfileSelection = async (name?: string) => {
			if (!name) return;

			profileToDeletes.push(name);
		};

		const handleDeleteProfile = async () => {
			if (profileToDeletes.length === 0) return;

			for await (const name of profileToDeletes) {
				await profileService.deleteByName(name);
			}

			await scope.refreshActions();
		};

		try {
			await context.app.prompt('', {
				title: 'Profile deletion',
				label: 'Select profile(s) to delete:',
				inputType: 'hidden',
				defaultValue: '42',
				type: 'text',
				hints: profileService.findAll().map(profile => profile.name),
				submitName: 'Validate',
				onDeleteHint: handleProfileSelection,
			});

			await handleDeleteProfile();
		} catch {
			// Profile deletion canceled
		}
	},
});
