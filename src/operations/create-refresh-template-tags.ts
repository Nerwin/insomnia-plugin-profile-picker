import { getAllTemplateTags } from '../templateTags';
import { type InsomniaScope } from '../types';

export const createRefreshTemplateTags = (scope: InsomniaScope) => async () => {
	scope.templateTags = await getAllTemplateTags();
};
