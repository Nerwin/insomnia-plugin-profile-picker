// === Insomnia Context ===

export type StoreContext = {
	hasItem(key: string): Promise<boolean>;
	setItem(key: string, value: string): Promise<void>;
	getItem(key: string): Promise<string | null>;
	removeItem(key: string): Promise<void>;
	clear(): Promise<void>;
	all(): Promise<Array<{ key: string; value: string }>>;
};

export type AppContext = {
	clipboard: {
		readText(): string;
		writeText(text: string): void;
		clear(): void;
	};

	getInfo(): { version: string; platform: string };
	alert(title: string, message?: string): Promise<void>;

	dialog(title: string, body: HTMLElement, options?: {
		onHide?: () => void;
		tall?: boolean;
		skinny?: boolean;
		wide?: boolean;
	}): void;

	prompt(title: string, options?: {
		title: string;
		defaultValue?: string;
		submitName?: string;
		selectText?: boolean;
		upperCase?: boolean;
		hint?: string;
		type?: string;
		inputType?: string;
		placeholder?: string;
		validate?: (arg0: string) => string;
		label?: string;
		hints?: string[];
		onComplete?: (arg0: string) => Promise<void> | void;
		onHide?: () => void;
		onDeleteHint?: (arg0?: string) => void;
	}): Promise<string>;

	getPath(name: string): string;

	showSaveDialog(options?: {
		defaultPath?: string;
	}): Promise<string | null>;
};

export type InsomniaContext = {
	store: StoreContext;
	app: AppContext;
	response: any;
	request: any;
	context: any;
};

export type InsomniaScope = {
	workspaceActions: any[];
	templateTags: any[];
	refreshActions: () => Promise<void>;
	refreshTemplateTags: () => Promise<void>;
};

// ===== Custom types =====

export type Profile = {
	name: string;
	isCurrent: boolean;
	data: ProfileData;
};

export type ProfileData = Record<string, string>;

export type StorageData = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export type IDataStore = {
	setItem(key: string, value: any): Promise<void>;
	getItem(key: string): any;
	getAll(): StorageData;
};
