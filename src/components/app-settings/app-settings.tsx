import {Component, State, h} from '@stencil/core';

@Component({
	tag: "app-settings",
	styleUrl: "app-settings.css"
})

export class AppSettings {
	@State() userCurrentLocation: boolean = true;
	@State() presetLocation: string = "Ann Arbor";
	@State() unit: string = "celsius";

	render() {
		return [
			<ion-header>
				<ion-toolbar color="primary">
					<ion-buttons slot="start">
						<ion-back-button defaultHref="/"/>
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
						<ion-radio slot="start" value="current" checked={this.userCurrentLocation}/>
					</ion-item>
					<ion-item>
						<ion-label>Use present location</ion-label>
						<ion-radio slot="start" value="preset" checked={!this.userCurrentLocation}/>
					</ion-item>
				</ion-radio-group>

				<small>When using a preset location, the location listed below will be used.</small>
				<ion-item>
					<ion-input type="text" value={this.presetLocation}></ion-input>
				</ion-item>

				<small>
					Select the unit of measurement that you would like to use to display the weather:
				</small>
				<ion-radio-group>
					<ion-item>
						<ion-label>Celsius</ion-label>
						<ion-radio slot="start" checked={this.unit == "celsius"}></ion-radio>
					</ion-item>
					<ion-item>
						<ion-label>Fahrenheit</ion-label>
						<ion-radio slot="start" checked={this.unit == "fahrenheit"}></ion-radio>
					</ion-item>
					<ion-item>
						<ion-label>Kelvin</ion-label>
						<ion-radio slot="start" checked={this.unit == "kelvin"}></ion-radio>
					</ion-item>
					<small hidden={this.unit != "kelvin"}>Come on, Kelvin? Seriously?</small>
				</ion-radio-group>
			</ion-content>
		]
	}

}