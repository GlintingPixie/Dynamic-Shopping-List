document.addEventListener('DOMContentLoaded',()=>{
    const expenseForm = document.getElementById('expense-form')
    const expenseNameInput = document.getElementById('expense-name')
    const expenseAmountInput = document.getElementById('expense-amount')
    const expenseList = document.getElementById('expense-list')
    const totalAmountDisplay = document.getElementById('total-amount')

    let expenses = JSON.parse(localStorage.getItem('expenses'))||[]

    // Event listener for the Form on submission
    expenseForm.addEventListener('submit',(event)=>{
        event.preventDefault()
        const name  = expenseNameInput.value.trim()
        const amount = parseFloat(expenseAmountInput.value.trim())

        if(name === "" || isNaN(amount) || amount <= 0) return;

        const newExpense = {
            id: Date.now(),
            name:name,
            amount:amount 
        }

        expenses.push(newExpense)

        //Clear input
        expenseNameInput.value = ""
        expenseAmountInput.value = ""

        //Update expenses in local storage and display
        saveExpenses()
        renderExpenses()
    })

    // Renders the expense list on the display
    function renderExpenses(){
        // Clear the expense list before loading it 
        expenseList.innerHTML = ""

        let totalAmount = 0
        if (expenses.length){
            expenses.forEach((expense)=>{
                const li = document.createElement('li')
                li.innerHTML = `
                <span>${expense.name} - $${expense.amount}</span>
                <button data-id = "${expense.id}">Remove</button>
                `
                expenseList.appendChild(li);
                totalAmount += expense.amount
            })
        }
        totalAmountDisplay.textContent = `${totalAmount.toFixed(2)}`
    }

    // Event listener for delete button in expense list
    expenseList.addEventListener('click',(event)=>{
        if(event.target.tagName !== "BUTTON") return;

        const productId = parseInt(event.target.getAttribute('data-id'))
        expenses = expenses.filter((e)=> e.id !== productId)
        saveExpenses()
        renderExpenses()
    })

    // Function to save the expenses in the local storage
    function saveExpenses(){
        localStorage.setItem('expenses',JSON.stringify(expenses))
    }
    
    // Render the expenses 
    renderExpenses()

})