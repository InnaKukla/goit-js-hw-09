const bodyEl = document.querySelector('body')
const btnStart = document.querySelector('button[data-start]')
const btnStop = document.querySelector('button[data-stop]')


let timerId = null;

btnStart.addEventListener('click', () => {
    btnStart.setAttribute('disabled', 'disabled');
    timerId = setInterval(() => {
        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      }
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
})

btnStop.addEventListener('click', () => {
    btnStart.removeAttribute('disabled', 'disabled');
    clearInterval(timerId);
});

