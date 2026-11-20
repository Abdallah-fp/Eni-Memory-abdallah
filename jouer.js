// ===== 1. LES DONNÉES DU JEU =====

// Liste des 6 images (une par légume). Chaque chemin est une chaîne de caractères.
const legums = ["img/memory-legume/1.svg","img/memory-legume/2.svg",
                "img/memory-legume/3.svg","img/memory-legume/4.svg","img/memory-legume/5.svg","img/memory-legume/6.svg"];

// On colle la liste à elle-même pour obtenir 12 éléments : chaque image existe en double (les paires).
const tab = legums.concat(legums);

// On attrape la div vide du HTML où les cartes seront placées.
    const plateau = document.getElementById("plateau_animaux");

// ===== 2. LES VARIABLES D'ÉTAT (la mémoire du jeu) =====

    // La première carte retournée (null = aucune carte en attente).
    let premiere = null;
    // La deuxième carte retournée.
    let deuxieme = null;
    // Le verrou : true = les clics sont bloqués (pendant que les cartes différentes restent visibles).
    let verr = false;
    // Le nombre de coups joués (un coup = deux cartes retournées).
    let coups = 0;
    // Le nombre de paires trouvées.
    let paires = 0;
//afficher les nombres des coups jouer.
    // On attrape le <span> du HTML qui affiche le compteur.
    const affichagecoups = document.getElementById("coups");
    //afficher le message.
    // On attrape le <p> du HTML qui affiche le message de victoire.
    const affichageMessage = document.getElementById("message");

// ===== 3. AFFICHER LES CARTES =====

    // Cette fonction crée les 12 cartes dans la page.
    function afficherCartes(){
        // On vide le plateau pour ne pas empiler les cartes quand on rejoue.
        plateau.innerHTML = "";

    // Pour chaque élément de tab, on fabrique une carte.
    // "nombre" est l'élément en cours (ici, le chemin d'une image).
    tab.forEach(function(nombre){
    // La grande boîte : la carte entière (celle qui pivote).
    const carr = document.createElement("div");
    carr.classList.add("card");
    // On mémorise le chemin de l'image dans la carte, pour comparer les paires plus tard.
    carr.dataset.valeur = nombre;

// La face "dos" : ce qu'on voit quand la carte est cachée.
const dos = document.createElement("div");
    dos.classList.add("face","dos");  

 // La face "avant" : elle contient l'image de l'animal/légume.
 const avant = document.createElement("div");
    avant.classList.add("face","avant");
    // On crée la balise <img> et on lui donne le chemin de l'image.
    const img = document.createElement("img");
    img.src = nombre;
    // On place l'image dans la face avant.
    avant.appendChild(img);


    // On glisse les deux faces dans la carte.
    carr.appendChild(dos);
    carr.appendChild(avant);

    // ----- Ce qui se passe quand on clique sur cette carte -----
    carr.addEventListener("click",function(){
        // On ignore le clic si le jeu est verrouillé ou si la carte est déjà retournée.
        if(verr || carr.classList.contains("retournee")){
            return;
        }
        // On retourne la carte (la classe "retournee" déclenche la rotation en CSS).
        carr.classList.add("retournee");

        // Si c'est la première carte : on la mémorise et on s'arrête là.
        if(premiere === null) {
            premiere = carr;
            return;
        }

        // Sinon c'est la deuxième carte : on la mémorise.
        deuxieme = carr;
        // Un coup de plus, et on met à jour l'affichage du compteur.
        coups++;
        affichagecoups.textContent = coups;

        // On compare les images des deux cartes.
        if(premiere.dataset.valeur === deuxieme.dataset.valeur){
            // ----- CAS 1 : c'est une paire -----
            // Les cartes restent retournées ; on vide les variables pour la paire suivante.
            premiere = null;
            deuxieme = null;

            // Une paire de plus trouvée.
            paires++;
            // Si on a trouvé toutes les paires (6), c'est gagné.
            if(paires === legums.length){
                // On attend 0,6 seconde pour laisser la dernière carte pivoter, puis on affiche le message.
                setTimeout(function(){
                    affichageMessage.textContent = "Tu as gagné en " + coups + "coups ! Appuie sur espace pour rejouer.";
                }, 600);
            }
        }else {
            // ----- CAS 2 : ce n'est pas une paire -----
            // On bloque les clics pendant que le joueur regarde les cartes.
            verr = true;
            // Après 1 seconde (1000 millisecondes) :
            setTimeout(function(){
                // on recache les deux cartes,
                premiere.classList.remove("retournee");
                deuxieme.classList.remove("retournee");
                // on vide les variables,
                premiere = null;
                deuxieme = null;
                // et on débloque les clics.
                verr = false;
            },1000);
        }
    })
        // Quand la carte est prête (faces + clic), on la place dans le plateau.
        plateau.appendChild(carr);

    });
}

// ===== 4. MÉLANGER (algorithme de Fisher-Yates) =====

function melanger(){
    // On part de la fin du tableau et on recule jusqu'au début.
    for (let i = tab.length -1; i > 0;i--){
        // j = une position au hasard entre 0 et i.
        let j = Math.floor(Math.random()*(i+1));
        // On échange les éléments en position i et j (k sert de variable temporaire).
        let k = tab[i];
        tab[i]=tab[j];
        tab[j]=k;
    }
}

// ===== 5. REJOUER =====

// Fonction appelée par le bouton et par la touche espace : elle remet tout à zéro, mélange, puis réaffiche.
function melangerEtAfficher(){
    // Remise à zéro de l'état du jeu.
    premiere = null;
    deuxieme = null;
    verr = false;
    coups = 0;
    paires = 0;
    // Remise à zéro de ce que le joueur voit.
    affichagecoups.textContent = 0;
    affichageMessage.textContent="";
    // D'abord on mélange, ensuite on affiche (toujours dans cet ordre).
    melanger();
    afficherCartes();
}

// Affichage des 12 cartes au chargement de la page.
afficherCartes();

// ===== 6. LA TOUCHE ESPACE =====

//appuie sur espace pour rejouer.
// On écoute les touches pressées sur toute la page.
document.addEventListener("keydown", function (event){
    // console.log("click", event.code);
    // Si la touche est la barre d'espace (S majuscule obligatoire) :
    if(event.code === "Space"){
        // On empêche le comportement normal (faire défiler la page).
        event.preventDefault();
        // On relance une partie.
        melangerEtAfficher();
    }
});
 