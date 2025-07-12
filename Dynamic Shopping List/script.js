const list = document.querySelector("ul");
const input = document.querySelector("input");
const button  = document.querySelector("button");

button.classList.add("btn");
button.addEventListener("click",function(){
    const temp = input.value; // Reads the input from the input field
    input.value = "";

    const listItm  = document.createElement("li"); // Adds a new list item 
    const listText = document.createElement("span"); // Adds a span to show the input text
    const listBtn = document.createElement("button"); // Adds a button for deleting the item later
    
    listItm.appendChild(listText); // Adds the text-span element in the list-item
    listText.textContent = temp; // Updates the text-content of the span element

    listItm.appendChild(listBtn);
    listBtn.textContent = "Delete";
    
    
    list.appendChild(listItm); // Adds the list item into the list of HTML

    listBtn.addEventListener("click",()=>{ // Event Listener to use delete button 
        list.removeChild(listItm);
    });
    
    input.focus();

});



