import "./index.css";

/**
 * Creating the list of available and unavailable buttons
 */
const buttons = document.querySelectorAll("button");
const button = Array.from(buttons)


/**
 * Getting data from local storage
 */
const lista = JSON.parse(localStorage.getItem("doctors")) 

/**
 * Passing through each button to assign function and style
 */
button.map((e, i) => { 
  /**
   * Assigning a new text and a new class
   * Comparing with the last changes of the last edition that was saved
   */

  if(lista != null ){
    console.log(lista[i]['availabel']);

    /**
     * Taking the element from the index
     * With your key defined in the local storage
     */
    e.innerHTML = lista[i]['availabel'];
    e.className = lista[i]['availabel'] == 'currently available'.toUpperCase() ? 'button availabel' : 'button unavailabel';
  }else {

    /**
     * Defining if the list in local storage is empty
     */
    e.innerHTML = e.innerHTML == 'Mark as Available' ?'currently UNAVAILABLE'.toUpperCase() : 'currently available'.toUpperCase()
    e.className = e.innerHTML == 'currently available'.toUpperCase() ? 'button availabel' : 'button unavailabel'   

  }

  /**
   * Adding event from available to unavailable
   */
  e.onclick = () => {
    event.preventDefault()
    e.className = e.className == 'button unavailabel'? 'button availabel':'button unavailabel'
    e.innerHTML = e.innerHTML == 'currently AVAILABLE'.toUpperCase()? 'currently UNAVAILABLE'.toUpperCase() : 'currently AVAILABLE'.toUpperCase()
    filter(select.value)
    storage()
  }
}) 

/**
 * Selecting the filter button and taking the value
 * Along with each line of doctors
 */
const select = document.getElementById("availabilityFilterSelect");
const doctors = document.querySelectorAll("tr")
const linhas = Array.from(doctors);

/**
 * Applying function whenever the filter option changes
 */
select.onchange = () => {
  filter(select.value)
}

/**
 * Creating the filter function 
 */
function filter(valor) { 

  /**
   * From the filter value go through each button checking its state
   * from the class to set to be visible or not
   */

  if(valor == "available"){
    button.map((e, i) => {
      const bool = e.className == 'button unavailabel'? false : true

      doctors[i + 1].style.display = bool? "":"none"
    })
  }
  
  if(valor == "all"){
    button.map((e, i) => {
      doctors[i + 1].style.display = ""
    })
  }

  codeDoctor.value = '';  
}

/**
 * Creating input within the searchContainer class
 * and applying your class
 */
const searchContainer = document.getElementById("searchContainer")
const codeDoctor = document.createElement("input")
codeDoctor.className = 'searchDoctor'
codeDoctor.placeholder = "Search by Name or UPIN..."
searchContainer.append(codeDoctor)

/**
 * Creating a function for each key pressed inside the input
 */
codeDoctor.onkeyup = () => {
  search()
  select.value = "all"
}


/**
 * Search function
 */
function search() {
  /**
   * Collecting the input value
   */
  const dado = codeDoctor.value;

  /**
   * Scrolling each row in the table
   */
  linhas.map(e => {
    /**
     * In the variable name, stores the value of doctor's name
     * in the code variable stores the doctor's UPIN value 
     * Regarding the line at the moment
     */
    const nome= e.querySelector("td");
    const codigo = e.getAttributeNode("data-upin")

    /**
     * Check if it is a number or text and apply the search against the value
     * Typed in the input
     */
    if(!Number(dado) && nome){
      e.style.display = nome.innerHTML.toUpperCase().includes(dado.toUpperCase())? "":"none";
    }

    if(Number(dado) && codigo){
      e.style.display = codigo.value.includes(dado)? "":"none";
    }
  })
}

function storage() {
  /**
   * Created a set to store the lists
   * from doctor's data
   */
  const list = []

  /**
   * Scrolling the table rows
   */
  linhas.map((e,i) => {
    /**
     * Collected all cell lines
     * and checking if it is equal to the number of columns
     */
    const dados= e.querySelectorAll("td");   
  
    if(dados.length == 4){

      /**
       * Passing through all td into data and taking values
       */
      const codigo = e.getAttributeNode("data-upin").value;
      const nome = dados[0].innerHTML;
      const zipCode = dados[1].innerHTML;
      const city = dados[2].innerHTML;
      const availabel = dados[3].querySelector('button').innerHTML == 'CURRENTLY UNAVAILABLE'? 'CURRENTLY UNAVAILABLE' : 'CURRENTLY AVAILABLE'
    
      /**
       * Creating a list and storing the values
       */
      const lista = {
        "upin": codigo,
        "nome": nome,
        "zipCode": zipCode,
        "city": city,
        "availabel": availabel
      }

      /**
       * Adding the list to a set of lists
       */
      list.push(lista);      
    }  
  })

  /**
   * Setting the 'doctors' key to store a
   * list set within localStorage 
   */
  localStorage.setItem("doctors", JSON.stringify(list))
}

