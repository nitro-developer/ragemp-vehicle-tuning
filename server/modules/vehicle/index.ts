class Vehicle {
	constructor() {
		mp.events.addCommand('tuning', this.onVehicleTuningCommand);
		mp.events.addCommand('visual', this.onVehicleTuningVisualCommand);
		mp.events.addCommand('vehcreate', this.onVehicleCreateCommand);
	}

	private onVehicleTuningCommand(player: PlayerMp, args: string) {
		if (!args) return player.notify(`USAGE: /tuning [vehicle id] [engine/brakes/horns] [value]`);

		const [vehicleID, mod, value] = <string[]>args.split(' ');
		const vehicle = mp.vehicles.at(Number(vehicleID));

		if (!vehicle) return player.notify(`Не удалось найти автомобиль с id ${vehicleID}`);

		if (!mod === undefined || value === undefined) {
			player.notify(`USAGE: /tuning [vehicle id] [engine/brakes/horns] [value]`);
			return;
		}

		const valueConfig = [
			{
				id: 11,
				component: 'engine',
				min: -1,
				max: 3,
			},
			{
				id: 12,
				component: 'brakes',
				min: -1,
				max: 2,
			},
			{
				id: 14,
				component: 'horns',
				min: -1,
				max: 34,
			},
		];

		const config = valueConfig.find((el) => el.component === mod);
		if (!config) return player.notify(`Невозможно установить компонент ${mod}`);

		const val = Number(value);
		if (val < config.min || val > config.max) return player.notify(`Допустимые значения: min = ${config.min}, max = ${config.max}`);

		vehicle.setMod(config.id, val);

		player.notify(`Вы установили ${config.component} значение ${val}`);
	}

	private onVehicleTuningVisualCommand(player: PlayerMp, vehicleID: string) {
		const vehicle = mp.vehicles.at(Number(vehicleID));
		if (!vehicle) {
			player.notify(`Автомобиль с ID ${vehicleID} не найден!`);
			return;
		}

		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 23, 24, 25, 27].forEach((id: number) => {
			const count = vehicle.getMod(id);

			if (count > 0) {
				const component = Math.floor(0 + Math.random() * (count + 1));
				vehicle.setMod(id, component);
			}
		});

		player.notify(`Вы выдали рандомный визуальный тюнинг автомобилю ${vehicleID}`);
	}

	private onVehicleCreateCommand(player: PlayerMp, model: string) {
		const hash = mp.joaat(model);
		const position = new mp.Vector3(player.position.x, player.position.y + 5.0, player.position.z);

		try {
			mp.vehicles.new(hash, position, { alpha: 255, dimension: player.dimension, heading: player.heading, numberPlate: 'testtask' });
			player.notify(`Вы создали автомобиль ${model}`);
		} catch {
			player.notify(`Некорректная модель ${model}`);
		}
	}
}

export default new Vehicle();
