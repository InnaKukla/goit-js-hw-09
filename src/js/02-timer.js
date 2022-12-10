import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const refs = {
    inputEl: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    timer: document.querySelector('.timer'),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
}
refs.btnStart.setAttribute('disabled', 'disabled');



let chooseDate = 0;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        chooseDate = selectedDates[0];
    //   console.log(chooseDate);
        if (selectedDates[0] <= Date.now()) {
            Notiflix.Notify.failure ("Please choose a date in the future");
            refs.btnStart.setAttribute('disabled', 'disabled');
        } else{
            refs.btnStart.removeAttribute('disabled', 'disabled');  
            refs.btnStart.addEventListener('click', onClickStart); 
        }
    }
};
flatpickr("#datetime-picker", options)


function onClickStart(e) {
    timerId = setInterval(() => {
        refs.btnStart.setAttribute('disabled', 'disabled');
        const timer = convertMs(chooseDate - Date.now())
        refs.daysEl.textContent = timer.days;
        refs.hoursEl.textContent = timer.hours;
        refs.minutesEl.textContent = timer.minutes;
        refs.secondsEl.textContent = timer.seconds;

        if (chooseDate - Date.now() < 1000) {
            clearInterval(timerId);
            refs.btnStart.removeAttribute('disabled', 'disabled');
        }
    }, 1000);       
}



function addLeadingZero(value){
    return  String(value).padStart(2, '0')
   };
   
    function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  

 


