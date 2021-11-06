//Game play management;
if (document.readyState == "complete" || "interactive") {
    console.log("DOM is ready...")
    domReady();
} else {
    console.log("Dom loading not complete yet...");
}

function domReady() {
  const squares1 = document.querySelector(".squares1");
  console.log(squares1.children);
  let rankFile1 = squares1.children; //NodeList Object;

    //for the index of each child node, divide by 2; 
    //if no remainder, leave the background white;

  for (let i = 0; i < rankFile1.length; ++i) {
    //access the first child's id and turn into an integer;
    let child = squares1.children[i];
    let childId = parseInt(child.id); //integer;
    if (childId % 2 !== 0) {
      child.style.backgroundColor = "black";
    }
  }
}







