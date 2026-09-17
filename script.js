//@brief кнопка перезапуска
const cornerbtn = document.querySelector('.corner-btn');

//@brief Обработчик клика по кнопке перезапуска.
// Заменяет кнопку на изображение и перезагружает страницу через 1 секунду.
cornerbtn.addEventListener('click', function() {
	const img = document.createElement('img');
	img.src = 'jojo.png';
	img.className = 'jojo-img';
	this.parentNode.replaceChild(img, this);
	setTimeout(() => location.reload(), 1000);
});

//@brief счетчик ничьей если достигает 9 ничья
let draw = 0;

//@brief Массив счётчиков для проверки выигрышных линий.
// Индексы 0–7 — для светлых, 8–15 — для тёмных.
let line_sum_count = Array(16).fill(0);

//@brief счетчик ходов 1 светлые 0 темные
let turn_counter = 0;

//@brief масив кнопок таблицы
const btn_massive = document.querySelectorAll('.btn');

//@brief перебор кнопок массива для добавления обработчика
btn_massive.forEach(btn => {
	//@brief Перебирает все кнопки и добавляет обработчик клика
	btn.addEventListener('click', function() {
		//@brief вычисление индекса строки и столбца
		let index = parseInt(btn.textContent);
		let row = Math.floor(index / 3);
		let col = index % 3;
		const img = document.createElement('img');

		//@brief Определение текущего игрока и обновление счётчиков.
		if (turn_counter == 1) {
			line_sum_count[col]++;
			line_sum_count[row + 3]++;
			if (row == col) {
				line_sum_count[6]++;
			}
			if (row + col === 2) {
				line_sum_count[7]++;
			}
			img.src = 'crest.jpg';
			turn_counter = 0;
		} else {
			line_sum_count[col + 8]++;
			line_sum_count[row + 11]++;
			if (row == col) {
				line_sum_count[14]++;
			}
			if (row + col == 2) {
				line_sum_count[15]++;
			}
			img.src = 'satanic.jpg';
			turn_counter++;
		}

		img.style.width = '100%';
		img.style.height = '100%';
		img.style.objectFit = 'contain';
		this.parentNode.replaceChild(img, this);

		draw++;

		//@brief проверка на ничью
		if (draw == 9) {
			console.log('победили атеисты');
		}

		//@brief проверка равен ли какой-то ряд 3
		line_sum_count.forEach(function(n, i, _) {
			if (n == 3) {
				//@brief сообщение о том кто победил
				if (i <= 7) {
					console.log('победило добро');
				} else {
					console.log('победило зло');
				}
			}
		});
	});
});