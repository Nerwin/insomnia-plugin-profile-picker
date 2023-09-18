import { profileService } from '../services/Profile.service';
import { type InsomniaContext, type InsomniaScope } from '../types';

const isValidNameAndValue = (nameAndValue?: string) => {
	if (!nameAndValue || !/^\w+:.+$/.test(nameAndValue.trim())) return false;
	return true;
};

export const addDataToProfileAction = (scope: InsomniaScope) => ({
	label: 'Add to profile',
	icon: 'folder-plus',
	async action(context: InsomniaContext) {
		const currentProfile = profileService.getCurrent();
		if (!currentProfile) throw new Error('No current profile selected');

		const handleOnComplete = async (nameAndValue?: string) => {
			if (!isValidNameAndValue(nameAndValue)) {
				await context.app.alert('Invalid', 'Name and value must be separated by ":"');
				return;
			}

			const [key, ...rest] = nameAndValue!.trim().split(':');
			const profileData = currentProfile.data || {};
			profileData[key] = rest.join(':'); // Handle case where value contains ":"

			currentProfile.data = profileData;
			await profileService.update(currentProfile);
			await scope.refreshTemplateTags();
		};

		const handleValidate = (nameAndValue?: string) => {
			const isValid = isValidNameAndValue(nameAndValue);
			if (!isValid) return 'Name and value must be separated by ":"';

			return '';
		};

		const result = await context.app.prompt('', {
			title: `Add data to profile "${currentProfile.name}"`,
			label: 'Property name and value',
			inputType: 'text',
			placeholder: 'name:value',
			defaultValue: '',
			hint: 'Name and value must be separated by ":". Note: this will overwrite existing data with the same name.',
			submitName: 'Add / Update',
			validate: handleValidate,
		});

		await handleOnComplete(result);
	},
});
