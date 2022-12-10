import Notiflix from 'notiflix';

const refs ={
  formEl: document.querySelector('.form'),
}


let firstDelay = 0;
let delayStep = 0;
let amountRepetitions = 0;
let position = 0;

refs.formEl.addEventListener('submit', onSubmit)
function onSubmit(e) {
  e.preventDefault();
  const {delay, step, amount} = refs.formEl.elements;
  firstDelay = Number(delay.value);
  delayStep = Number(step.value);
  amountRepetitions = Number(amount.value);
  refs.formEl.reset();

  for (let i = 1; i <= amountRepetitions; i+=1) {
    position = i;
    createPromise(position, firstDelay)
      .then(({ position, firstDelay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${firstDelay}ms`);
      })
      .catch(({ position, firstDelay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${firstDelay}ms`);
      })
    firstDelay += delayStep;
  }
};

function createPromise(position, firstDelay) {
  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
  setTimeout(() => {
    if (shouldResolve) {
        resolve({ position, firstDelay })
      } else {
        reject({ position, firstDelay })
      }
    }, firstDelay)
  })
};
  
