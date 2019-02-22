// Bareme:

//Calculette
// affichage des boutons et mise en place d'un ecouteur sur chacun d'eux: 3 points
// Affichage de la croix et mise en place de l'ecouteur permettant d'effacer la calculette et de supprimer l' objet correspondant: 2 points
// Traitement en fonction de la touche pressee : 0.5 point par contrainte respectee

//Calculette2
// drag de la calculette : 4
// eviter la propagation des evenements pour ne pas pouvoir deplacer la calculette e partie des boutons ou de l'afficheur: 1

//Calculette3   + 1 point moyenne JS si fonctionne.

class Calculette {
  constructor(color){
	    this.color=color; // couleur de la calculette
	    this.formule="";  // formule de calcul saisie dans l'afficheur

	    this.pO=0;        // indique le nombre de parentheses ouvrantes
	    this.pF=0;        // indique le nombre de parentheses fermantes
	   	  

		if (typeof(Calculette.zi)=="undefined" )  Calculette.zi=0;    
		// la propriete statique Calculette.zi permettra de mettre en premier plan les nouvelles calculettes ou les calculettes en cours de deplacement
 	}

	// Methode pour afficher la calculette et mettre en place les ecouteurs
	display(x,y){ 
				Calculette.zi++;

				// la classe String est etendue avec la methode right(n) qui permet d'extraire le n caracteres de droite d'une chaine
				String.prototype.right= function(n){
					return this.substring(this.length-n)
				}

				// mise en place de la div contenant la calculette
				this.div= document.createElement("div");
				let div =this.div;
					div.style.borderRadius="10px";
					div.style.zIndex=Calculette.zi;
					div.style.position ="absolute";										
					div.style.left=x+"px";
					div.style.top=y+"px";
					div.style.width="260px";										
					div.style.height="350px";
					div.style.backgroundColor=this.color;
				document.querySelector("body").appendChild(div);

				// Mise en place de la croix permettant d'effacer la calculette et de supprinmer l'objet correspondant en memoire
				// Il faut mettre en place un ecouteur
				this.croix = document.createElement("img");
				let croix= this.croix;
					croix.src="croix.jpg";
					croix.style.borderRadius="10px";
					croix.style.position="absolute";
					croix.style.left="235px";
					croix.style.top="8px";
					croix.style.width="18px";
					croix.style.height="18px";
					croix.style.cursor="pointer";
				div.appendChild(croix);
				croix.addEventListener("click", () => { this.close(this) })
				//........
				//........
		
				// Mise en place de l'afficheur qui contiendra la formule saisie ou le resultat du calcul
				this.afficheur=document.createElement("input");
				let afficheur= this.afficheur;
					afficheur.type="text";
					afficheur.readOnly="readonly";
					afficheur.style.borderRadius="10px";
					afficheur.style.fontSize="large";	
					afficheur.style.textAlign="right";	
					afficheur.style.position="absolute";
					afficheur.style.left="5px";										
					afficheur.style.top="35px";
					afficheur.style.width="245px";
					afficheur.style.height="50px";
					afficheur.style.size="30";
					afficheur.style.maxlength="30";	
				div.appendChild(afficheur);

				// tableau permettant de generer les boutons de la calculette
				let t=["1","2","3","(","/","4","5","6",")","*","7","8","9","E","-",".","0","=","C","+"];

				// Mise en place du clavier qui contiendra les bouton
				this.clavier=document.createElement("div");
				let clavier=this.clavier;
					clavier.style.position="absolute"
					clavier.style.left="5px";
					clavier.style.top="105px";
				div.appendChild(clavier);

				
				this.button=[];

				// boucle permettant de mettre en place les 20 boutons de la calculette
				// Il faut completer cette creation de boutons et mettre en place les ecouteurs
				// Chaque bouton aura une largeur et une hauteur de 50px
				for(let i=0;i<=19;i++){
					this.button[i]=document.createElement("input");
					let button = this.button[i];
					button.value = t[i];
					button.type = "button";
					button.style.width = "50px";
					button.style.height = "50px";

					clavier.appendChild(button)
					button.addEventListener("click", () => { this.affiche(button.value) })
				}
	}

	// Methode pour faire les traitements en fonction de la touche selectionnee sur le clavier
	affiche(c){
		let lastCharacter = this.formule.right(1);
		console.log(lastCharacter);
		switch (c) {            
			
			case "0": 	
			case "1": 	
			case "2": 	
			case "3": 	
			case "4": 	
			case "5": 	
			case "6": 	
			case "7": 	
			case "8": 	
			case "9": 	this.formule += c;
						this.afficheur.value = this.formule;
						break;
			case "C": 	this.formule = '';
						this.afficheur.value = this.formule;
						break;

			case "E":   let newFormule = this.formule.replace(this.formule.right(1), '');
						this.formule = newFormule;
						this.afficheur.value = this.formule;
						break;
						/* un peu cassé dans des cas que je réussis pas à déterminer ... */

			case "-": 	
			case "+":  	if (lastCharacter == "-" || lastCharacter == "+" || lastCharacter == "*" || lastCharacter == "/" || lastCharacter == "."){
							break;
						} else {
							this.formule += c;
							this.afficheur.value = this.formule;
							break;
						}

			case "/": 	
			case "*": 	if ( this.formule.length == 0 || lastCharacter == "-" || lastCharacter == "+" || lastCharacter == "*" || lastCharacter == "/" || lastCharacter == "." || lastCharacter == "("){
							break;
						} else {
							this.formule += c;
							this.afficheur.value = this.formule;
							break;
						}
			case ".": 	if (lastCharacter == "." || lastCharacter == ")") {
							break;
						} else {
							this.formule += c;
							this.afficheur.value = this.formule;
							break;
						}
			case "(": 	if (lastCharacter ==")" || lastCharacter == "0" ||  lastCharacter == "1" || lastCharacter == "2" || lastCharacter == "3" || lastCharacter == "4" ||lastCharacter == "5" ||lastCharacter == "6" || lastCharacter == "7" || lastCharacter == "8" || lastCharacter == "9" || lastCharacter == ".") {
							break;
						} else {
							this.formule += c;
							this.afficheur.value = this.formule;
							this.pO++;
							break;
						}
			case ")": 	if (this.pO > this.pF) 
							if (this.formule.length == 0 || lastCharacter =="(" || lastCharacter == ")" || lastCharacter == "+" || lastCharacter == "-" || lastCharacter == "/" || lastCharacter == "*" ) {
								break;
							} else {
								this.formule += c;
								this.afficheur.value = this.formule;
								this.pF++;
								break;
							}
			case "=":	try {
							let res = eval(this.formule);
							res = res.toString()
							this.formule = res;
							this.afficheur.value = this.formule;
							break;
						} catch (err) {
							console.log(err);
							this.formule = "ERROR";
							this.afficheur.value = this.formule;
							break;
						}
		}
	}


	close(obj) {
    	for(var i in obj){delete obj[i]};
    	console.log(this);

		let body = document.getElementsByTagName('body')[0];
		body.removeChild(body.lastChild);
	}
}

class Calculette2 extends Calculette {
		//...........
		//...........


		display(x,y) {
			super.display(x,y);
			let div = this.div;
			let obj = this;
			div.addEventListener("mouseover", () => { div.style.cursor="move" })
			div.addEventListener("mousedown", (ev) => {
				let dx = ev.clientX-parseInt(x);
				let dy = ev.clientY-parseInt(y);

				let windowMousemove = function(e){
					obj.deplace(e.clientX-dx+"px", e.clientY-dy+"px")
				}
				window.addEventListener('mousemove', windowMousemove, false);

				let divMouseup= function(){window.removeEventListener("mousemove",windowMousemove,false);};
				div.addEventListener("mouseup",divMouseup,false);

			});

			console.log(this)

			this.afficheur.addEventListener("mousedown", (e) => {
				e.stopPropagation();
			})

			this.croix.addEventListener("mousedown", (e) => {
				e.stopPropagation();
			})

			for (let j=0; j < this.button.length; j++) {
				this.button[j].addEventListener("mousedown", (e) => {
					e.stopPropagation();
				})
			}

		}

		deplace(x,y){
			this.x=x;
			this.y=y;
		   	this.div.style.left= this.x;
		  	this.div.style.top = this.y;
		}

		

  
}

class Calculette3 extends Calculette2 {
		//...........
		//...........
}
