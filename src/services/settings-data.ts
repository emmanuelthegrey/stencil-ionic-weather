import { Location } from './../interfaces/location';
import { get, set } from './storage';

const TEMPERATURE_UNIT_KEY = "weatherTemperatureUnit";
const LOCATION_KEY = "weatherUserLocation";

export class SettingsController {
	private defaultLocation: Location = {
		lat: null,
		lng: null,
		name: 'Ann Arbor',
		useCoords: true
	}

	async getTemperatureUnit(): Promise<string> {
		return (await get(TEMPERATURE_UNIT_KEY)) || "celsius";
	}

	async setTemperatureUnit(unit: string): Promise<void> {
		await set(TEMPERATURE_UNIT_KEY, unit)
	}

	async getLocation(): Promise<Location> {
		return (await get(LOCATION_KEY)) || this.defaultLocation;
	}

	async setLocationName(name: string): Promise<void> {
		let location = (await this.getLocation()) || this.defaultLocation;
		location.name = name;
		return set(LOCATION_KEY, location);
	}

	async setCoords(lat: number, lng: number): Promise<void> {
		let location = (await this.getLocation()) || this.defaultLocation;

		location.lat = lat;
		location.lng = lng;

		return set(LOCATION_KEY, location);
	}

	async setUseCoords(flag: boolean): Promise<void> {
		let location = (await this.getLocation()) || this.defaultLocation;

		location.useCoords = flag;

		return set(LOCATION_KEY, location);
	}
}

export const SettingsData = new SettingsController(); 