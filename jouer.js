// function changeImage1(){
//                         let image1 = document.getElementById("img1");
//                         if(image1.src.match("img/question.svg")){
//                             image1.src = "img/memory-legume/1.svg";
//                         }else {
//                             image1.src = "img/question.svg";
//                         }
//                     }         
//  function changeImage2(){
//                         let image2 = document.getElementById("img2");
//                         if(image2.src.match("question.svg")){
//                             image2.src = "img/memory-legume/2.svg";
//                         }else {
//                             image2.src = "img/question.svg";
//                         }
//                     }
//  function changeImage3(){
//                         let image3 = document.getElementById("img3");
//                         if(image3.src.match("question.svg")){
//                             image3.src = "img/memory-legume/3.svg";
//                         }else {
//                             image3.src = "img/question.svg";
//                         }
//                     }
// function changeImage4(){
//                         let image4 = document.getElementById("img4");
//                         if(image4.src.match("question.svg")){
//                             image4.src="img/memory-legume/4.svg";
//                         }else{
//                             image4.src="img/question.svg";
//                         }
//                     }
// function changeImage5(){
//                         let image5=document.getElementById("img5");
//                         if(image5.src.match("question.svg")){
//                             image5.src="img/memory-legume/5.svg";
//                         }else{
//                             image5.src="img/question.svg";
//                         }
//                     }
// function changeImage6(){
//                         let image6=document.getElementById("img6");
//                         if(image6.src.match("question.svg")){
//                             image6.src="img/memory-legume/6.svg";
//                         }else{
//                             image6.src="img/question.svg";
//                         }
//                     }


 
            const legums = ["img/memory-legume/1.svg","img/memory-legume/2.svg","img/memory-legume/3.svg","img/memory-legume/4.svg","img/memory-legume/5.svg","img/memory-legume/6.svg"];
const tab = legums.concat(legums);

    const plateau = document.getElementById("plateau_animaux");
    let premiere = null;
    let deuxieme = null;
    let verr = false;

    function afficherCartes(){
        plateau.innerHTML = "";

    tab.forEach(function(nombre){
    const carr = document.createElement("div");
    carr.classList.add("card");
    carr.dataset.valeur = nombre;

const dos = document.createElement("div");
    dos.classList.add("face","dos");  

 const avant = document.createElement("div");
    avant.classList.add("face","avant");
    const img = document.createElement("img");
    img.src = nombre;
    avant.appendChild(img);

    carr.appendChild(dos);
    carr.appendChild(avant);
    carr.addEventListener("click",function(){
        if(verr || carr.classList.contains("retournee")){
            return;
        }
        carr.classList.add("retournee");
        if(premiere === null) {
            premiere = carr;
            return;
        }
        deuxieme = carr;
        if(premiere.dataset.valeur === deuxieme.dataset.valeur){
            premiere = null;
            deuxieme = null;
        }else {
            verr = true;
            setTimeout(function(){
                premiere.classList.remove("retournee");
                deuxieme.classList.remove("retournee");
                premiere = null;
                deuxieme = null;
                verr = false;
            },1000);
        }
    })
        plateau.appendChild(carr);

    });
}

function melanger(){
    for (let i = tab.length -1; i > 0;i--){
        let j = Math.floor(Math.random()*(i+1));
        let k = tab[i];
        tab[i]=tab[j];
        tab[j]=k;
    }
}
function melangerEtAfficher(){
    premiere = null;
    deuxieme = null;
    verr = false;
    melanger();
    afficherCartes();
    
}
afficherCartes();







