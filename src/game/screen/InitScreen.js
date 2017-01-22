import PIXI from 'pixi.js';
import TweenLite from 'gsap';
import config  from '../../config';
import utils  from '../../utils';
import Screen from '../../screenManager/Screen'
import Salsichinha from '../entity/Salsichinha'
import Obstaculo from '../entity/Obstaculo'
import InputManager from '../InputManager'

export default class InitScreen extends Screen{
	screenContainer;
	background;
	logoTimer;
	constructor(label){
		super(label);
	}
	build(){
		super.build();

		this.backgroundContaier = new PIXI.Container();
		this.addChild(this.backgroundContaier);

		this.background = new PIXI.Graphics();
		this.background.beginFill(0xababab);
	    this.background.drawRect( 0, 0, config.width, config.height);
		this.backgroundContaier.addChild(this.background);

		this.backgroundImg = new PIXI.Sprite(PIXI.Texture.fromImage('assets/images/bg.png'));
		this.backgroundContaier.addChild(this.backgroundImg);
		this.backgroundImg.anchor.set(0.5);
		this.backgroundImg.x = config.width / 2;
		this.backgroundImg.y = config.height / 2;

		// this.backgroundImg.scale.set(2)

		this.backgroundImg.width = config.width;
		this.backgroundImg.height = config.height;
		
		this.screenContainer = new PIXI.Container();
		this.addChild(this.screenContainer);


		this.entityContainer = new PIXI.Container();
		this.screenContainer.addChild(this.entityContainer)

		
		this.ingameUIContainer = new PIXI.Container();
		this.screenContainer.addChild(this.ingameUIContainer)

		// this.salsichinha.scale.set(config.height/this.salsichinha.height   / 6)


		this.input = new InputManager(this);
		

		this.interactive = true;

		// this.click = function(mouseData){
		//    this.salsichinha.attack();
		// }

		this.displacmentsList = [];


		// this.graphic2 = new PIXI.Graphics().beginFill(0xff0C29).drawCircle(0,0,50);
		// this.addChild(this.graphic2);
		// this.graphic2.x = config.width/2;
		// this.graphic2.y = config.height/2;


		this.entityList = [];
    	this.salsichas = [];
    	this.salsichasID = [0,1,2];

    	this.shuffle(this.salsichasID)

    	this.spawPoints = []
    	this.spawPoints.push({x:config.width/2 - 300, y:config.height/2})
    	this.spawPoints.push({x:config.width/2 + 300, y:config.height/2})

    	// let obstaculo = new Obstaculo(this);
    	// obstaculo.x = config.width/2;
    	// obstaculo.y = config.height/2;
    	// this.entityContainer.addChild(obstaculo)
    	// this.entityList.push(obstaculo)


    	let obstaculo2 = new Obstaculo(this);
    	obstaculo2.x = config.width/2 - 150;
    	obstaculo2.y = config.height/2 - 150;
    	this.entityContainer.addChild(obstaculo2)
    	this.entityList.push(obstaculo2)


    	let obstaculo3 = new Obstaculo(this);
    	obstaculo3.x = config.width/2 + 150;
    	obstaculo3.y = config.height/2 - 150;
    	this.entityContainer.addChild(obstaculo3)
    	this.entityList.push(obstaculo3)

    	let obstaculo4 = new Obstaculo(this);
    	obstaculo4.x = config.width/2 - 150;
    	obstaculo4.y = config.height/2 + 150;
    	this.entityContainer.addChild(obstaculo4)
    	this.entityList.push(obstaculo4)


    	let obstaculo5 = new Obstaculo(this);
    	obstaculo5.x = config.width/2 + 150;
    	obstaculo5.y = config.height/2 + 150;
    	this.entityContainer.addChild(obstaculo5)
    	this.entityList.push(obstaculo5)


    	this.player1Status = new PIXI.Text('PRESS START',{font : '48px luckiest_guyregular', fill : 0x000, align : 'left'});
		this.ingameUIContainer.addChild(this.player1Status);
		this.player1Status.x = 20;
		this.player1Status.y = 20;

		this.player2Status = new PIXI.Text('PRESS START',{font : '48px luckiest_guyregular', fill : 0x000, align : 'right'});
		this.ingameUIContainer.addChild(this.player2Status);
		this.player2Status.x = config.width - this.player2Status.width - 20;
		this.player2Status.y = 20;
	}

	shuffle(a) {
	    for (let i = a.length; i; i--) {
	        let j = Math.floor(Math.random() * i);
	        [a[i - 1], a[j]] = [a[j], a[i - 1]];
	    }
	}
	
	updateKeyUp(key) {
	}
	attack(id) {

		for (var i = 0; i < this.salsichas.length; i++) {
			let sals = this.salsichas[i];
			if(sals.inputID == id){
				sals.attack();
			}
		}
	}
	updateKeyDown(key) {

		// for (var i = 0; i < this.salsichas.length; i++) {
		// 	let sals = this.salsichas[i];
		// 	let keys = this.input.getInput(sals.inputID).keys;
		// 	console.log(keys);
		// 	// for (var i = this.input.getInput(sals.inputID).keys.length - 1; i >= 0; i--) {
		// 	// 	//this.input.getInput(sals.inputID).attack();
		// 	// 	console.log(this.input.getInput(sals.inputID).keys[i]);
		// 	// }
			
		// }
		// console.log(key);
		// console.log(this.input.leftAxes);
	}
	removeDisplace(displacement, displaceImage){
		if(displaceImage && displaceImage.parent){
			//displaceImage.parent.removeChild(displaceImage);
		}
		for (var i = 0; i < this.displacmentsList.length; i++) {
			if(this.displacmentsList[i] == displacement){
				this.displacmentsList.splice(i, 1);
			}
		}
		// console.log(this.displacmentsList);
		// this.backgroundContaier.filters = null;
		if(this.displacmentsList.length){
			this.backgroundContaier.filters = this.displacmentsList;
		}else{
			this.backgroundContaier.filters = null
		}
        // if(this.displaceImage.parent){
        //     this.displaceImage.parent.removeChild(this.displaceImage)
        // }
        // this.parent.filters = null;
    }
    addDisplace(position, object)
    {
    	if(!this.parent){
    		return
    	}

        let displaceImage = new PIXI.Sprite.fromFrame('./assets/images/ringDisplaceMap.jpg')
        // object.addChild(displaceImage);
        this.backgroundContaier.addChild(displaceImage);
        displaceImage.x = position.x
        displaceImage.y = position.y - 30
        displaceImage.anchor.set(0.5)
        displaceImage.scale.set(0.1);
        let displacement = new PIXI.filters.DisplacementFilter(displaceImage, 150);
        this.displacmentsList.push(displacement)
        TweenLite.to(displaceImage.scale, 0.5,{x:0.8, y:0.8, alpha:0, onComplete:this.removeDisplace, onCompleteParams:[displacement, displaceImage], onCompleteScope:this});
        TweenLite.to(displacement.scale, 0.5,{x:0, y:0});


        this.backgroundContaier.filters = this.displacmentsList;

    }
	goToPortfolio() {
		 window.open('http://www.jefframos.me', '_blank');
	}
	onPlayButtonClick() {
		config.effectsLayer.shakeSplitter(0.4,10,0.5, true);
		config.effectsLayer.shakeSplitter(1,4,0.5);
	}
	toGame(){		
		utils.setGameScreen80(this.targetColor);
		this.screenManager.change("GAME");
	}
	onLogoClick(){
		config.effectsLayer.shake(1,15,1);
		config.effectsLayer.addShockwave(0.5,0.5,0.8);
		config.effectsLayer.shakeSplitter(1,10,1.8);
		config.effectsLayer.fadeBloom(20,0,0.5,0, true);
	}
	shuffleText(label){
		let rnd1 = String.fromCharCode(Math.floor(Math.random()*20) + 65);
		let rnd2 = Math.floor(Math.random()* 9);
		let rnd3 = String.fromCharCode(Math.floor(Math.random()*20) + 65);
		let tempLabel = label.split('');
		let rndPause = Math.random();
		if(rndPause < 0.2){
			tempLabel[Math.floor(Math.random()*tempLabel.length)] = rnd2;
			tempLabel[Math.floor(Math.random()*tempLabel.length)] = rnd3;
		}else if(rndPause < 0.5){
			tempLabel[Math.floor(Math.random()*tempLabel.length)] = rnd3;
		}
		let returnLabel = '';
		for (var i = 0; i < tempLabel.length; i++) {
			returnLabel+=tempLabel[i];
		}
		return returnLabel
	}
	addSalsicha(id){

		let salsichinha = new Salsichinha(this, id, this.salsichasID[this.salsichas.length]);
		this.entityContainer.addChild(salsichinha)

		let point = this.spawPoints[this.salsichas.length]
		salsichinha.x = point.x;
		salsichinha.y = point.y;

		salsichinha.startPoint = point

		salsichinha.scale.set(0.6);

		salsichinha.reset();

		this.entityList.push(salsichinha)
		this.salsichas.push(salsichinha)


	}
	update(delta){
		super.update(delta);

		if(this.salsichas.length > 0)
			this.player1Status.text = '0'
		if(this.salsichas.length > 1){
			this.player2Status.text = this.salsichas[0].kills;
			this.player1Status.text = this.salsichas[1].kills;

			this.player2Status.x = config.width - this.player2Status.width - 20;
		}

		// console.log(this.entityList.length);
		for (var i = this.entityList.length - 1; i >=0 ; i--) {
    		if(this.entityList[i].kill){
    			this.entityList.splice(i,1);
    		}else{
    			//this.entityList[i].update(delta);
    		}
    	}

		let mousePosition = renderer.plugins.interaction.mouse.global;


		if(this.salsichas.length){
			for (var i = this.salsichas.length - 1; i >= 0; i--) {
				let tempSalsicha = this.salsichas[i]
				if(this.input.getInput(tempSalsicha.inputID).rightAxes){
					tempSalsicha.updateHeadPositionController(this.input.getInput(tempSalsicha.inputID).rightAxes);
				}else{
					tempSalsicha.updateHeadPosition(mousePosition);
				}
				// if(this.input.leftAxes){
				tempSalsicha.updateInputs(this.input.getInput(tempSalsicha.inputID).leftAxes);
				// }
				// console.log(this.input.leftAxes);
				tempSalsicha.updateBodyPosition();
				// tempSalsicha.update(delta);
			}
			// console.log(this.input.rightAxes);
		}
		this.input.update();
		// this.updateParticles(delta);
	}

	createButton (label) {
	    let button = new PIXI.Container()
	    this.buttonShape = new PIXI.Graphics();
	    let color = 0xFFFFFF;
	   
	   	let alphaBG = new PIXI.Graphics();
	    alphaBG.beginFill(0xFF0000);	    
	    alphaBG.drawCircle( -5, -5, config.buttonRadius );
	    alphaBG.alpha = 1;
	    //utils.applyPositionCorrection(button.addChild( utils.addToContainer(alphaBG) ));
	    this.buttonShape.beginFill(color);	    
	    this.buttonShape.drawCircle(0, 0, config.buttonRadius );
	    button.addChild( this.buttonShape)
	    button.interactive = true
	    button.buttonMode = true

	    // utils.addMockObject(button);
	    return button
	}
	
}
