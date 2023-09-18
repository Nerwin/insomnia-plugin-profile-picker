import { createProfileActionList } from '../profiles';
import { createProfileAction, deleteProfileAction, addDataToProfileAction, manageProfileDataAction } from '../actions';
import { type InsomniaScope } from '../types';

const createSeparatorAction = () => ({
	label: '--------------',
	icon: 'circle-user',
	// eslint-disable-next-line object-shorthand, @typescript-eslint/no-empty-function
	action: () => {},
});

export const createRefreshWorkspaceActions = (scope: InsomniaScope) => async () => {
	const profilesActions = createProfileActionList(scope);
	scope.workspaceActions = [
		createProfileAction(scope),
		deleteProfileAction(scope),
	];

	if (profilesActions.length > 0) {
		scope.workspaceActions.push(
			manageProfileDataAction(scope),
			addDataToProfileAction(scope),
			createSeparatorAction(),
			...profilesActions,
		);
	}
};
