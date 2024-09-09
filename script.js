const All_checkbox = document.querySelectorAll('.custom-checkbox');
const All_inputtext = document.querySelectorAll('.inputtext');
const error_lable = document.querySelector('.error-lable');
const progressbar = document.querySelector('.progressbar');
const progressvalue = document.querySelector('.progressvalue');
const progresstitle = document.querySelector('.progresstitle')
// console.log(All_checkbox);
const allQuotes = [
    "Raise the bar by completing your goals!",
    "Well begun is half done!",
    "Just a step away, keep going!",
    "Whoa! You just completed all the goals, time for chill 😃"
]


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || { 
    first:{
        name:'',
        completed: false
    },
    second:{
        name:'',
        completed: false
    },
    third:{
        name:'',
        completed: false
    }
}
let completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length
progressvalue.style.width = `${completedGoalsCount / 3 * 100}%`
progressvalue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`

progresstitle.innerHTML = allQuotes[completedGoalsCount]
// console.log(allGoals);


    

All_checkbox.forEach((chcekbox)=>{
    // console.log(chcekbox);
    chcekbox.addEventListener('click',(e)=>{
        // console.log(e.target);
        const allGoalsAdded = [...All_inputtext].every((input)=>{
            // console.log(input.value);
            return input.value;
        })
        // console.log(allGoalsAdded);
        if(allGoalsAdded){
            chcekbox.parentElement.classList.toggle('completed');
            const inputId = chcekbox.nextElementSibling.id
            // console.log(inputId);
            // console.log(allGoals[inputId])
            allGoals[inputId].completed = !allGoals[inputId].completed 
            completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length
            progressvalue.style.width = `${completedGoalsCount / 3 * 100}%`
            progressvalue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`

            progresstitle.innerHTML = allQuotes[completedGoalsCount]
            localStorage.setItem('allGoals',JSON.stringify(allGoals))
        }
        else{
            progressbar.classList.add('show-error');
        }
    })
})

All_inputtext.forEach((input)=>{
    // console.log(allGoals[input.id]);
    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }
    input.addEventListener('focus',()=>{
        progressbar.classList.remove('show-error');
    })

    input.addEventListener('input',(e)=>{
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
        }

        allGoals[input.id].name = input.value
        localStorage.setItem('allGoals',JSON.stringify(allGoals))
    })
})

