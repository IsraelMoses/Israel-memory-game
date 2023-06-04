
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function reload()
{
    console.log("it going to refreshing func");
    window.location.reload();
}
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');


    if (!hasFlippedCard) {
        //first card
        hasFlippedCard = true;
        firstCard = this
    } else {
        //second click
        hasFlippedCard = false;
        secondCard = this

        checkForWatch(firstCard, secondCard);
    }
}

//do cards match?
function checkForWatch(firstCard, secondCard) {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards(firstCard)
        disableCards(secondCard)
    } else {
        unFlipCards(firstCard, secondCard);
    }
}

//it's a match!!
function disableCards(card) {
    card.removeEventListener('click', flipCard);

    resetBoard();
}

//it's not a match!!
function unFlipCards(firstCard, secondCard) {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() 
{
    const height = serverRows;
    const width = serverCols; 
    const sumOfCards = height * width;

    for (let i = 0; i < height * width / 2; i++) {
        window.fetch(`https://picsum.photos/200/300`).then(res =>
         {
            createDivOfImg(`img${i}`, res.url, height, width)
            createDivOfImg(`img${i}`, res.url, height, width)
        }).then(() => {
            const cards = document.querySelectorAll('.memory-card');

            cards.forEach(card => {
                let randomPos = Math.floor(Math.random() * sumOfCards);
                card.style.order = randomPos;
            });
        })
    }
    
}


function createDivOfImg(dataFramework, src, width, height) {     //height, width
    const section = document.getElementById('section-of-cards')
    const div = document.createElement('div')
    div.addEventListener('click', flipCard)
    div.className = "memory-card"
    div.style.width = `${parseInt(90 / width)}%`
    div.style.height = `${parseInt(70 / height)}%`
    div.setAttribute('data-framework', dataFramework)

    const frontImg = document.createElement('img')
    frontImg.className = 'front-face'
    frontImg.src = src
    
    const backImg = document.createElement('img')
    backImg.className = 'back-face'
    backImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLQwK_voyl2USR80XJSpZ9W9DUr5ePaumgsA&usqp=CAU'
    

    div.innerHTML += frontImg.outerHTML
    div.innerHTML += backImg.outerHTML

    section.appendChild(div)
    
    //asd(caches);
}
function reload()
{
    console.log("it going to refreshing func");
    window.location.reload();
}
