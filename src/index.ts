import { createRefreshTemplateTags } from './operations/create-refresh-template-tags.js';
import { createRefreshWorkspaceActions } from './operations/create-refresh-workspace.js';
import { type InsomniaScope } from './types';

export const templateTags = [];
export const refreshActions = createRefreshWorkspaceActions(this as unknown as InsomniaScope);
export const refreshTemplateTags = createRefreshTemplateTags(this as unknown as InsomniaScope);

// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
	await refreshActions();
	await refreshTemplateTags();
})();
