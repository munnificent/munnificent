class StickyNavigation {
	constructor() {
	  this.currentId = null;
	  this.currentTab = null;
	  this.tabContainerHeight = 70;
  
	  $('.et-hero-tab').on('click', (event) => this.onTabClick(event, $(event.currentTarget)));
	  $(window).on('scroll', () => this.onScroll());
	  $(window).on('resize', () => this.onResize());
  
	  // Обработчик клика для плавающей кнопки "Обо мне"
	  $('.about-fab').on('click', () => {
		$('html, body').animate({
		  scrollTop: $('#tab-projects').offset().top - this.tabContainerHeight,
		}, 600);
	  });
	}
  
	onTabClick(event, element) {
	  event.preventDefault();
	  const scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
	  $('html, body').animate({ scrollTop }, 600);
	}
  
	onScroll() {
	  this.checkTabContainerPosition();
	  this.findCurrentTabSelector();
	}
  
	onResize() {
	  if (this.currentId) {
		this.setSliderCss();
	  }
	}
  
	checkTabContainerPosition() {
	  const $tabs = $('.et-hero-tabs');
	  const $tabsContainer = $('.et-hero-tabs-container');
	  const offset = $tabs.offset().top + $tabs.height() - this.tabContainerHeight;
  
	  if ($(window).scrollTop() > offset) {
		$tabsContainer.addClass('et-hero-tabs-container--top');
	  } else {
		$tabsContainer.removeClass('et-hero-tabs-container--top');
	  }
	}
  
	findCurrentTabSelector() {
	  let newCurrentId = null;
	  let newCurrentTab = null;
	  const scrollTop = $(window).scrollTop();
	  const $tabs = $('.et-hero-tab');
  
	  $tabs.each((index, element) => {
		const $element = $(element);
		const id = $element.attr('href');
		const $section = $(id);
		const offsetTop = $section.offset().top - this.tabContainerHeight;
		const offsetBottom = offsetTop + $section.outerHeight();
  
		if (scrollTop > offsetTop && scrollTop < offsetBottom) {
		  newCurrentId = id;
		  newCurrentTab = $element;
		  return false; // Прерываем each
		}
	  });
  
	  if (this.currentId !== newCurrentId) {
		this.currentId = newCurrentId;
		this.currentTab = newCurrentTab;
		this.setSliderCss();
	  }
	}
  
	setSliderCss() {
	  if (this.currentTab) {
		const width = this.currentTab.outerWidth();
		const left = this.currentTab.offset().left;
		$('.et-hero-tab-slider').css({ width, left });
	  }
	}
  }
  
  // Код для функциональности карточек статей
  (() => {
	// Данные статей в виде массива объектов
	const posts = [
	  {
		postTitle: 'Физмыты',
		postAbstract: 'Физматы: Почему они на самом деле Пушистые Единороги Академического Мира',
		postContent: '<p><a href="https://vc.ru/u/1529828-your-name-1-your-name/948110-fizmaty-pochemu-oni-na-samom-dele-pushistye-edinorogi-akademicheskogo-mira">Почему Физматы на самом деле Пушистые Единороги Академического Мира</a></p>',
		postThumb: 'https://picsum.photos/seed/article1/400/200',
		postImg: 'https://picsum.photos/seed/article1/800/400',
		postLink: 'https://vc.ru/u/1529828-your-name-1-your-name/948110-fizmaty-pochemu-oni-na-samom-dele-pushistye-edinorogi-akademicheskogo-mira',
	  },
	  {
		postTitle: 'Чем дышит гуманитарий',
		postAbstract: 'Вся таблица веществ.',
		postContent: '<p>Когда нибудь ее допишу.</p>',
		postThumb: 'https://picsum.photos/seed/article2/400/200',
		postImg: 'https://picsum.photos/seed/article2/800/400',
		postLink: 'https://vc.ru/u/1529828-your-name-1-your-name/948110-fizmaty-pochemu-oni-na-samom-dele-pushistye-edinorogi-akademicheskogo-mira',
	  },
	  // Добавьте дополнительные статьи по аналогии
	];
  
	// Кэширование часто используемых элементов
	const $postsBox = $('.posts-box');
	const $modal = $('.modal');
	const $innerImg = $('.inner-img');
	const $innerTitle = $('.inner-title');
	const $innerText = $('.inner-text');
	const $prevPost = $('.prev-post');
	const $nextPost = $('.next-post');
  
	// Функция для отображения карточек статей
	function renderPosts() {
	  $postsBox.empty();
  
	  posts.forEach((post, index) => {
		const listItem = `
		  <li>
			<div class="card">
			  <a class="button open-post" href="${post.postLink}" data-obj="${index}">
				<img src="${post.postThumb}" alt="">
			  </a>
			  <div>
				<h3>${post.postTitle}</h3>
				<p>${post.postAbstract}</p>
			  </div>
			  <div>
				<a class="button open-post" href="${post.postLink}" data-obj="${index}">Подробнее</a>
			  </div>
			</div>
		  </li>`;
		$postsBox.append(listItem);
	  });
	}
  
	// Функции для управления модальным окном
	let currentPostIndex = 0;
  
	function openModal(index) {
	  currentPostIndex = index;
	  updateModalContent(index);
	  $modal.css('display', 'block');
	  updateModalButtons();
	}
  
	function closeModal() {
	  $modal.css('display', 'none');
	}
  
	function updateModalContent(index) {
	  const post = posts[index];
	  $innerImg.attr('src', post.postImg);
	  $innerTitle.html(post.postTitle);
	  $innerText.html(post.postContent);
	}
  
	function updateModalButtons() {
	  $prevPost.add($nextPost).removeClass('disabled');
	  if (currentPostIndex <= 0) {
		$prevPost.addClass('disabled');
	  }
	  if (currentPostIndex >= posts.length - 1) {
		$nextPost.addClass('disabled');
	  }
	}
  
	// Обработчики событий
	$(document).on('click', '.open-post', function (e) {
	  e.preventDefault();
	  const index = parseInt($(this).attr('data-obj'), 10);
	  openModal(index);
	});
  
	$('.close-post, .modal-sandbox').on('click', closeModal);
  
	$nextPost.on('click', function (e) {
	  e.preventDefault();
	  if (currentPostIndex < posts.length - 1) {
		currentPostIndex++;
		updateModalContent(currentPostIndex);
		updateModalButtons();
	  }
	});
  
	$prevPost.on('click', function (e) {
	  e.preventDefault();
	  if (currentPostIndex > 0) {
		currentPostIndex--;
		updateModalContent(currentPostIndex);
		updateModalButtons();
	  }
	});
  
	// Инициализация
	$(document).ready(renderPosts);
  })();
  
  new StickyNavigation();
  