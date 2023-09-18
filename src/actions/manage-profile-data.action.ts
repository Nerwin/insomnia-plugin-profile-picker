import { profileService } from '../services/Profile.service';
import { type InsomniaContext, type InsomniaScope } from '../types';

export const manageProfileDataAction = (scope: InsomniaScope) => ({
	label: 'Manage profile',
	icon: 'database',
	async action(context: InsomniaContext, data: any) {
		const currentProfile = profileService.getCurrent();
		if (!currentProfile) throw new Error('No current profile selected');

		const profileData = Object.entries(currentProfile.data || {}).map(([name, value]) => `${name}: ${value}`);
		const dataKeysToDelete: string[] = [];

		const handleDataSelection = async (nameAndValue?: string) => {
			if (!nameAndValue) return;

			const [name] = nameAndValue.trim().split(':');
			dataKeysToDelete.push(name);
		};

		const handleDeleteData = async () => {
			if (dataKeysToDelete.length === 0) return;

			const profileData = currentProfile.data || {};
			for (const key of dataKeysToDelete) {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete profileData[key];
			}

			currentProfile.data = profileData;

			await profileService.update(currentProfile);
			await scope.refreshActions();
		};

		const hintMessage = profileData.length > 0
			? 'You can remove data from the current profile by clicking the cross, then Validate'
			: `No data found in profile "${currentProfile.name}"`;

		try {
			await context.app.prompt('', {
				title: `Manage data for profile "${currentProfile.name}"`,
				label: 'Current data:',
				inputType: 'hidden',
				defaultValue: '42',
				type: 'text',
				hint: hintMessage,
				hints: profileData,
				submitName: 'Validate',
				onDeleteHint: handleDataSelection,
			});

			await handleDeleteData();
		} catch {
			// Manage data canceled
		}
	},
});
