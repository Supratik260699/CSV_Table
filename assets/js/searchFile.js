console.log('this is search script');
const input = document.getElementById('inpBar');
let rows = document.querySelectorAll('tbody tr');

function filterTable() {
 
  input.addEventListener('keyup', function (e) {
    const text1 = e.target.value.toLowerCase();
    rows.forEach((row) => {
      row.querySelector('td').textContent.toLowerCase().startsWith(text1)
        ? ( 
          row.style.display = '',
          row.style.backgroundColor = 'grey'
          )
        : (row.style.display = 'none' );
    });
  });
}
$(filterTable());

// To change back the results searched to normal state t.e. changing the colour of background
input.addEventListener('keyup', function (e) {
if(input.value.length<=0){
  let rowtest = document.querySelectorAll("#mainData > tr");
  rowtest.forEach((row)=>{
     row.style.backgroundColor = "white";
  });
 }
});

//Setting up the sort filter
// Up arrow means Descending order 
// Down arrow means Ascending order

function sort(type,colInd){
  console.log("Button Clicked!!");
  let allsides = (type=="asc") ? 1 : -1;
  rows = document.querySelectorAll('tbody tr');
  let rowList = Array.from(rows);

  let sortedRow = rowList.sort((a,b)=>{
    let firstTd = a.querySelector(`td:nth-child(${colInd})`).textContent.trim();
    let secondTd = b.querySelector(`td:nth-child(${colInd})`).textContent.trim(); 

       return (firstTd > secondTd) ? (1*allsides) : ((-1)*allsides);
    
  });
  
  console.log(sortedRow);   
  let tbody = document.querySelector('tbody'); 
  
  while(tbody.hasChildNodes()){
     tbody.removeChild(tbody.firstChild);  
  }
  
  tbody.append(...sortedRow);
  
  }
  
