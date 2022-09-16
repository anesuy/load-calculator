//elements-variables
submit = document.getElementById('loan-form')
amount = document.getElementById('amount')
interest = document.getElementById('interest')
years = document.getElementById('years')
monthlyPayment = document.getElementById('monthly-payment')
totalPayment = document.getElementById('total-payment')
totalInterest = document.getElementById('total-interest')

//Listen to submit 
submit.addEventListener('submit', initiationByUser)

//function initiationByUser
function initiationByUser(e){
  //hide results
  const hide = document.getElementById('results')
  hide.style.display='none'
  //show loader
  const loader = document.getElementById('loading').style.display = 'block'

  setTimeout(calculateResults, 1000)
  e.preventDefault();
}

//Calculate Results
function calculateResults(){
  console.log('Calculating')
  
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //monthly payment
  //@pow() = Math.pow(base, expoente)
  //@pow() = Math.pow(7, 2) = 49
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1)

  //is monthly a finite number?
  if (isFinite(monthly)){
    try {
      monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    //unhide results
    const unhide = document.getElementById('results')
    unhide.style.display='block'
    //hide loader
    const loader = document.getElementById('loading').style.display = 'none'
    } catch (error) {
      console.log(error)
    }
  } else {
    showError('Please, check your numbers')
  }
}

//show error
function showError(error){

  //hide results
  const hide = document.getElementById('results')
  hide.style.display='none'
  //hide loader
  const loader = document.getElementById('loading').style.display = 'none'


  //creating a div
  const errorDiv = document.createElement('div');

  //add class to that div
  errorDiv.className = 'alert alert-danger';

  //create text node and append to div
  const nodeDiv = document.createTextNode(error)
  errorDiv.appendChild(nodeDiv)
  
  //get elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')
  console.log(card)
  const card2 = document.getElementsByClassName('.card')
  console.log(card2)

  //insert error above heading
  card.insertBefore(errorDiv, heading);
    //@(element u wanna put in, element which u wanna put after)
  
  //setTimeOut
  setTimeout(() => {
    //grab alert 
    const alert = document.querySelector('.alert');
    //remove it
    alert.remove();
  }, 3000)
}
