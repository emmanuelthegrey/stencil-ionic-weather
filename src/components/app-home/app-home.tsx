import { Component, State, h } from '@stencil/core';
import { Plugins } from "@capacitor/core";
import { WeatherData } from "../../services/weather-data";
import { WeatherResponse } from "../../interfaces/weather";
import { SettingsData } from '../../services/settings-data';
const { Geolocation } = Plugins;

@Component({
	tag: 'app-home',
	styleUrl: 'app-home.css'
})
export class AppHome {

	@State() weather: WeatherResponse = {
		base: "",
		clouds: null,
		coord: null,
		cod: null,
		dt: null,
		id: null,
		main: {
			humidity: null,
			pressure: null,
			temp: null,
			temp_max: null,
			temp_min: null
		},
		name: "Loading...",
		sys: null,
		visibility: null,
		weather: [
			{
				id: null,
				main: null,
				description: null,
				icon: null
			}
		],
		wind: null
	};

	@State() weatherIcon: string = "thermometer";

	async componentDidLoad() {
		let coordinates = await Geolocation.getCurrentPosition();
		await SettingsData.setCoords(coordinates.coords.latitude, coordinates.coords.longitude);

		try {
			this.weather = await WeatherData.getCurrentWeather();
		} catch (err) {
			console.log(err)
		}

		const router = document.querySelector("ion-router");

		router.addEventListener("ionRouteDidChange", () => {
			this.refreshHandler();
		});
		this.setWeatherIcon();
	}

	async refreshHandler(event?) {
		try {
			this.weather = await WeatherData.refreshWeather();
		} catch (err) {
			console.log(err);
		}
		this.setWeatherIcon();
		if (event) {
			event.target.complete();
		}
	}

	setWeatherIcon() {
		let description = this.weather.weather[0].description;

		if (description) {
			if (description.includes("lightning") || description.includes("thunder")) {
				this.weatherIcon = "thunderstorm";
			} else if (description.includes("wind")) {
				this.weatherIcon = "flag";
			} else if (description.includes("rain") ||
				description.includes("shower")) {
				this.weatherIcon = "rainy";
			} else if (description.includes("snow") ||
				description.includes("frost")) {
				this.weatherIcon = "snow";
			} else if (description.includes("cloud")) {
				this.weatherIcon = "cloudy";
			} else if (description.includes("sun") ||
				description.includes("clear ")) {
				this.weatherIcon = "sunny";
			} else {
				this.weatherIcon = "thermometer";
			}
		}
	}


	render() {
		return [
			<ion-header>
				<ion-toolbar color="primary">
					<ion-title>Weather</ion-title>
					<ion-buttons slot="end">
						<ion-button href="/settings"
							routerDirection="forward">
							<ion-icon slot="icon-only" name="settings" />
						</ion-button>
					</ion-buttons>
				</ion-toolbar>
			</ion-header>,

			<ion-content class="ion-padding">
				<ion-refresher slot="fixed" onIonRefresh={event => this.refreshHandler(event)}></ion-refresher>
				<div class="weather-display">
				<ion-icon name={this.weatherIcon} />
					<h1>{this.weather.main.temp}&#176;</h1>
					<p>{this.weather.weather[0].description}</p>
					<ion-card>
						<ion-card-header>
							<ion-card-subtitle>{this.weather.name}</ion-card-subtitle>
							<ion-card-title>Overview</ion-card-title>
						</ion-card-header>

						<ion-card-content>
							<ion-grid>
								<ion-row>
									<ion-col size="6">Min</ion-col>
									<ion-col size="6">{this.weather.main.temp_min}&#176;</ion-col>
								</ion-row>
								<ion-row>
									<ion-col size="6">Max</ion-col>
									<ion-col size="6">{this.weather.main.temp_max}&#176;</ion-col>
								</ion-row>
							</ion-grid>
						</ion-card-content>
					</ion-card>
				</div>
			</ion-content>
		];
	}
}
