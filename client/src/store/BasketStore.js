import { makeAutoObservable } from 'mobx';

export default class BasketStore {
	constructor() {
		this._basket = [];
		this._devices = [];
		this._price = 0;
		makeAutoObservable(this);
	}

	setBasket(basket) {
		this._basket = basket;
	}

	addDevice(device) {
		this._devices.push(device);
	}

	setPrice(price) {
		this._price = price;
	}

	deleteDevice(device) {
		this._devices = this._devices.filter((d) => d.id !== device.id);
	}

	deleteFromBasket(deviceId) {
		this._basket = this._basket.filter(
			(device) => device.deviceId !== deviceId
		);
	}

	get basket() {
		return this._basket;
	}

	get devices() {
		return this._devices;
	}

	get price() {
		return this._price;
	}
}
