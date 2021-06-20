{
	// Марки по лабам
	semestr: [ 
			[ // 1-ый семестр
				{
					id: 'gw4gw4g4wgws44yh',
					title: "Высшая математика",
					marks: ["Ready", "Ready", "Ready"],
				},
				{
					id: '43y35bcvchfh',
					title: "История Древнего Рима",
					marks: ["Ready", "Ready", "Ready"],
				},
				{
					id: '2352546bntz',
					title: "Полиция",
					marks: ["Ready", "Ready", "Ready"],
				}
			],
			[ // 2-ый семестр
				{
					id: '5252xxzfhhdfhf',
					title: "Высшая математика",
					marks: ["Ready", "In Progress", "Didn't start"],
				},
				{
					id: 'nnfgdgbbbgergrg',
					title: "История Древнего Рима",
					marks: ["Ready", "Didn't start", "Didn't start"],
				},
				{
					id: 'vcfbvbcnbnghhg',
					title: "Полиция",
					marks: ["In Progress", "In Progress", "Didn't start"],
				}
			],
			// 3-ый семестр
			[], 
			// ...и так далее. 
		]
	],
	// Ярлыки, которые можно наклеивать на лабораторные
	marks: {
        id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        styles: { // стили, применяется к прямоугольнику
            backgroundColor: 'green',
            borderWidth: 0,
        },
        value: "Ready", // английское название, удобно использовать в массивах
        title: "Готово", // русское / любое другое название
		active: true // если true, то они отображаются в списках и в выборе. 
		// В статистике отображаются при любом active, если они есть / были на лабораторной
    },
    {
        id: '1b9d62cd-bbfa-4b2d-9b5d-ab4363d4bed',
        styles: {
            backgroundColor: 'purple',
            borderWidth: 0,
        },
        value: "In progress",
        title: "В процессе",
		active: true
    },
    {
        id: '1b9d62cd-bbfa-4b2d-9b5d-ab4363d4bed',
        styles: {
            backgroundColor: 'white',
            borderWidth: 1,
        },
        value: "Did not start",
        title: "Не готово",
		active: true
    }
	// Информация важная только для статистики
	statistical: [
		{ // 1 семестр с начала семестра
			"12.03.2020": {
				"Didn't start": 20,
				"In Progress": 1,
			},
			"13.03.2020": {
				"Didn't start": 19,
				"In Progress": 1,
				"Ready": 1
			},
			// .. и так до окончания семестра
		},
		[
		]
	],
	semestrDates: [ // Даты начала и окончания семестра
		{ // 1 семестр
			beginDate: "10.03.2020",
			endDate: "30.05.2020"
		}, 
		{ // 2 семестр
			beginDate: "2.09.2020",
			endDate: "27.12.2020"
		}, 
	]
}









