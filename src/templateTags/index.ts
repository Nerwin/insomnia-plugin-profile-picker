import { profileService } from '../services/Profile.service.js';
import { type InsomniaContext } from '../types/index.js';

const getValueFromContext = (context: InsomniaContext, key: string) => context.context[key] || key;

const retrieveDataFromContext = (context: InsomniaContext, keyName: string) => {
	const currentProfile = profileService.getCurrent();
	if (!currentProfile) return 'Invalid profile';

	return getValueFromContext(context, currentProfile.data?.[keyName]) || '';
};

const createTemplateTag = (tagKey: string) => ({
	name: `currentProfile_${tagKey}`,
	displayName: `Current Profile -> ${tagKey}`,
	description: `Extract ${tagKey} string for the current profile.`,
	async run(context: InsomniaContext) {
		return retrieveDataFromContext(context, tagKey);
	},
});

export const getAllTemplateTags = async () => {
	const currentProfile = profileService.getCurrent();
	if (!currentProfile?.data) return [];

	return Object.keys(currentProfile.data)?.map(tagKey => createTemplateTag(tagKey)) ?? [];
};
