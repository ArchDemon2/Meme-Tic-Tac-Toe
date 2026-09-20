let score_good=parseInt(localStorage.getItem('score_good')) || 0;
let score_evil=parseInt(localStorage.getItem('score_evil')) || 0;
update_score()

resscore = document.getElementById('res_score')

resscore.addEventListener('click', function()
	{
		localStorage.setItem('score_good', 0);
		localStorage.setItem('score_evil', 0);
		score_evil = 0;
		score_good = 0;
		update_score();
		save_score();
	}
)

function save_score()
{
	localStorage.setItem('score_good', score_good);
	localStorage.setItem('score_evil', score_evil);
}

function update_score()
{
	document.getElementById('score').textContent = `Добро: ${score_good} | Зло: ${score_evil}`
}

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
		const resultdiv = document.getElementById('result')
		if (draw == 9) {
			document.querySelectorAll('.btn').forEach(btn => btn.remove());
			resultdiv.textContent = 'Победили атеисты'
		}

		//@brief проверка равен ли какой-то ряд 3
		line_sum_count.forEach(function(n, i, _) {
			if (n == 3) {
				//@brief сообщение о том кто победил
				if (i <= 7) {
					resultdiv.textContent = 'Победило добро';
					score_good++;
					save_score();
					update_score();
					document.querySelectorAll('.btn').forEach(btn => btn.remove())
				} else {
					resultdiv.textContent = 'Победило зло';
					score_evil++;
					save_score();
					update_score();
					document.querySelectorAll('.btn').forEach(btn => btn.remove())
				}
			}
		});
	});
});
document.addEventListener('keydown', function(event)
{
	if (event.key >= '1' && event.key <= '9')
		{
			const input = (event.key-1);
			const button = btn_massive[input];
			if (button && button.isConnected)
			button.click();
		}
	if (event.key == 'r')
	{
		const button = document.querySelector('.corner-btn')
		button.click()
	}
})