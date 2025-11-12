let blownOutCandles = 0;
const totalCandles = document.querySelectorAll('.candle').length;
const giftButton = document.getElementById('gift-button');
const heartsContainer = document.querySelector('.hearts-explosion');
const bigHeart = document.querySelector('.big-heart'); // Büyük kalbi seçtik

const photoPaths = [
    'img/1.PNG',
    'img/2.JPG',
    'img/3.JPG',
    'img/4.JPG',
    'img/5.PNG',
    'img/6.PNG',
    'img/7.jpg',
    'img/8.PNG',
    'img/9.PNG',
    'img/10.PNG',
    'img/11.PNG',
    'img/12.PNG',
    'img/13.PNG',
    'img/14.PNG',
    'img/15.PNG',
    'img/16.PNG',
    'img/17.PNG'
];

const backgroundSquaresContainer = document.querySelector('.background-squares-container');

function createBackgroundSquares() {
    backgroundSquaresContainer.innerHTML = ''; 
    
    const squareSize = 108; // 100px minmax + 8px gap'ten yaklaşık değer
    const columns = Math.ceil(window.innerWidth / squareSize);
    const rows = Math.ceil(window.innerHeight / squareSize);
    const totalSquares = columns * rows;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('bg-square');

        const randomIndex = Math.floor(Math.random() * photoPaths.length);
        const randomPhoto = photoPaths[randomIndex];
        square.style.backgroundImage = `url('${randomPhoto}')`;
        
        backgroundSquaresContainer.appendChild(square);
    }
}

window.addEventListener('load', createBackgroundSquares);
window.addEventListener('resize', createBackgroundSquares);

function blowOutCandle(candleElement) {
    const flame = candleElement.querySelector('.flame');
    if (flame && flame.classList.contains('active')) {
        flame.classList.remove('active');
        flame.classList.add('hidden-flame');
        
        blownOutCandles++;

        if (blownOutCandles === totalCandles) {
            giftButton.classList.remove('hidden');
        }
    }
}

function goToGiftPage() {
    const cakePage = document.getElementById('cake-page');
    const giftPage = document.getElementById('gift-page');

    cakePage.classList.remove('active');
    cakePage.classList.add('hidden');
    
    setTimeout(() => {
        giftPage.classList.remove('hidden');
        giftPage.classList.add('active');
    }, 500); 
}

function openGiftBox() {
    const giftBox = document.getElementById('gift-box');
    const giftPage = document.getElementById('gift-page');
    const heartsPage = document.getElementById('hearts-page');

    giftBox.classList.add('box-open');

    setTimeout(() => {
        giftPage.classList.remove('active');
        giftPage.classList.add('hidden');
        
        setTimeout(() => {
            heartsPage.classList.remove('hidden');
            heartsPage.classList.add('active');
            createHeartsExplosion(30); 
            
            // HIZLANDIRILDI: 3 saniye sonra göster
            setTimeout(() => {
                bigHeart.classList.remove('hidden-big-heart');
                bigHeart.classList.add('show-big-heart');
            }, 3000); 
            
        }, 500);

    }, 1000); 
}

function createHeartsExplosion(count) {
    const heartIcon = '<i class="fas fa-heart"></i>'; 
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = heartIcon;
        
        const startX = heartsContainer.clientWidth / 2;
        const startY = heartsContainer.clientHeight;
        
        heart.style.left = `${startX + (Math.random() * 50 - 25)}px`; 
        heart.style.top = `${startY}px`; 
        
        heart.style.setProperty('--x', `${Math.random() * 400 - 200}px`);
        heart.style.setProperty('--y', `${Math.random() * -300 - 50}px`);
        heart.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
        
        heart.style.animationDelay = `${i * 0.1}s`; 
        
        heartsContainer.appendChild(heart);
    }
}