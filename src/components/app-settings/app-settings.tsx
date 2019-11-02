import { Component, State, h } from '@stencil/core';
import { SettingsData } from '../../services/settings-data';

@Component({
	tag: "app-settings",
	styleUrl: "app-settings.css"
})

export class AppSettings {
	@State() userCurrentLocation: boolean = true;
	@State() presetLocation: string = "Ann Arbor";
	@State() unit: string = "celsius";

	async componentWillLoad() {
		let [location, unit] = await Promise.all([
			SettingsData.getLocation(),
			SettingsData.getTemperatureUnit()
		]);

		this.userCurrentLocation = location.useCoords;
		this.presetLocation = location.name;
		this.unit = unit;
	}

	async handleToggleLocation(useLocation) {
		this.userCurrentLocation = useLocation;
		await SettingsData.setUseCoords(this.userCurrentLocation);
	}

	async handleLocationChange(location: string) {
		this.presetLocation = location;
		await SettingsData.setLocationName(location);
	}

	async handleUnitChange(unit) {
		this.unit = unit;
		await SettingsData.setTemperatureUnit(unit)
	}

	render() {
		return [
			<ion-header>
				<ion-toolbar color="primary">
					<ion-buttons slot="start">
						<ion-back-button defaultHref="/" />
					</ion-buttons>
				</ion-toolbar>
			</ion-header>,

			<ion-content>
				<small>
					You may choose to display weather either from your current location,
					or a present location of your choosing.
				</small>
				<ion-radio-group>
					<ion-item>
						<ion-label>Use current location</ion-label>
						<ion-radio slot="start"
							value="current"
							checked={this.userCurrentLocation}
							onIonSelect={() => this.handleToggleLocation(true)}
						/>
					</ion-item>
					<ion-item>
						<ion-label>Use present location</ion-label>
						<ion-radio slot="start"
							value="preset"
							checked={!this.userCurrentLocation}
							onIonSelect={() => this.handleToggleLocation(false)}
						/>
					</ion-item>
				</ion-radio-group>

				<small>When using a preset location, the location listed below will be used.</small>
				<ion-item>
					<ion-input
						type="text"
						value={this.presetLocation}
						onIonInput={(e: any) => {
							this.handleLocationChange(e.target.value);
						}}
					></ion-input>
				</ion-item>

				<small>
					Select the unit of measurement that you would like to use to display the weather:
				</small>
				<ion-radio-group>
					<ion-item>
						<ion-label>Celsius</ion-label>
						<ion-radio
						 slot="start"
						  checked={this.unit == "celsius"}
						  onIonSelect={() => this.handleUnitChange("celsius")}
						  ></ion-radio>
					</ion-item>
					<ion-item>
						<ion-label>Fahrenheit</ion-label>
						<ion-radio
						 slot="start" 
						 checked={this.unit == "fahrenheit"}
						 onIonSelect={() => this.handleUnitChange("fahrenheit")}
						 ></ion-radio>
					</ion-item>
					<ion-item>
						<ion-label>Kelvin</ion-label>
						<ion-radio 
						slot="start" 
						checked={this.unit == "kelvin"}
						onIonSelect={() => this.handleUnitChange("kelvin")}
						></ion-radio>
					</ion-item>
					<small hidden={this.unit != "kelvin"}>Come on, Kelvin? Seriously?</small>
				</ion-radio-group>
			</ion-content>
		]
	}

}