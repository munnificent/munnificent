// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    // Анимация при загрузке
    document.body.classList.add('loaded');

    // Плавный переход по ссылке
    const btn = document.querySelector('.btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.remove('loaded');
            setTimeout(() => {
                window.location.href = btn.getAttribute('href');
            }, 500);
        });
    }

    // Регистрация сервисного работника для PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker зарегистрирован с областью: ', registration.scope);
            })
            .catch((error) => {
                console.error('Ошибка при регистрации ServiceWorker:', error);
            });
    }
});
