import { DataStore } from '../store/DataStore';
import { type IDataStore, type Profile } from '../types/index';

class ProfileService {
	private readonly _dataStore: IDataStore;

	constructor() {
		this._dataStore = new DataStore('profiles-data');
	}

	get storeKey() {
		return 'PROFILES';
	}

	_ensureCurrentProfile(profiles: Profile[]) {
		if (profiles.length === 0) return profiles;

		if (!profiles.some(profile => profile.isCurrent)) {
			profiles[0].isCurrent = true;
		}

		return profiles;
	}

	async save(profiles: Profile[]) {
		const profilesToSave = this._ensureCurrentProfile(profiles);
		await this._dataStore.setItem(this.storeKey, profilesToSave);
	}

	findAll(): Profile[] {
		return this._dataStore.getItem(this.storeKey) ?? [];
	}

	getCurrent(): Profile | null {
		const profiles = this.findAll();
		if (profiles.length === 0) return null;

		return profiles.find(profile => profile.isCurrent) ?? profiles[0];
	}

	findByName(name: string) {
		const profiles = this.findAll();
		return profiles.find(profile => profile.name === name);
	}

	async deleteByName(name: string) {
		const profiles = this.findAll();
		const filteredProfiles = profiles.filter(user => user.name !== name);

		if (filteredProfiles.length > 0 && !filteredProfiles.some(profile => profile.isCurrent)) {
			filteredProfiles[0].isCurrent = true;
		}

		await this.save(filteredProfiles);
	}

	async create(name: string) {
		const profiles = this.findAll();
		if (profiles.some(profile => profile.name === name)) throw new Error(`Profile "${name}" already exists`);

		profiles.push({ name, isCurrent: false, data: {} });

		await this.save(profiles);
	}

	async setAsCurrent(name: string) {
		const profiles = this.findAll();
		for (const profile of profiles) {
			profile.isCurrent = profile.name === name;
		}

		await this.save(profiles);
	}

	async update(profile: Profile) {
		const { name } = profile;
		const profiles = this.findAll();

		const profileIndex = profiles.findIndex(profile => profile.name === name);
		if (profileIndex === -1) throw new Error(`Profile "${name}" does not exist`);

		profiles[profileIndex] = profile;

		await this.save(profiles);
	}
}

export const profileService = new ProfileService();
