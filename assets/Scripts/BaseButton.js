	#pragma strict

var xLocation = 10;
var yLocation = 10;
var rotate:boolean;
var parent : GameObject;

var rotAngle:int;

var Money:int = 250;

var upgrade1Text:String;
var upgrade2Text:String;
var upgrade3Text:String;
var upgrade4Text:String;

var upgrade1:Upgrade;
var upgrade2:Upgrade;
var upgrade3:Upgrade;
var upgrade4:Upgrade;

var container:UpgradeContainer;

var audio1:AudioSource;
var audio2:AudioSource;

var nextAttract:float = 0.0;
var nextMoney:float = 0.0;

//var content = new GUIContent();
var testingTex:Texture2D;

var button1Content = new GUIContent();
var button2Content = new GUIContent();
var button3Content = new GUIContent();
var button4Content = new GUIContent();

var attractTexture:Texture2D;

function Start() {
	container = new UpgradeContainer();

	upgrade1 = new container.loadRandom();
	upgrade2 = new container.loadRandom();
	upgrade3 = new container.loadRandom();
	upgrade4 = new container.loadRandom();
	
	button1Content.image = upgrade1.getIcon();
	button2Content.image = upgrade2.getIcon();
	button3Content.image = upgrade3.getIcon();
	button4Content.image = upgrade4.getIcon();
	
	var aSources = GetComponents(AudioSource);
	audio1 = aSources[0];
	audio2 = aSources[1];
	
	attractTexture = Resources.LoadAssetAtPath("Assets/Art/Icons/attract.png", Texture2D);
	attractTexture = Resources.Load("attract", Texture2D);
//	testingTex = Resources.LoadAssetAtPath("Assets/test.png", Texture2D);
}

function OnGUI() {
	xLocation = Screen.width/2-(80/2);
	yLocation = Screen.height-100;
	
	var container = new UpgradeContainer();
	
	if(rotate) {
		//GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.Euler(0, 0, 180), new Vector3(1.0f, 1.0f, 1.0f)); // No translation, 180 rotation on Z, no scaling.
		//GUIUtility.RotateAroundPivot(180, new Vector2(xLocation, yLocation));
		GUIUtility.RotateAroundPivot(180, new Vector2(Screen.width/2, Screen.height/2));
	}
	
	GUI.skin.button.wordWrap = true;
	GUI.skin.button.fontStyle = FontStyle.Bold;
	GUI.skin.button.fontSize = 15;
	GUI.skin.button.alignment = TextAnchor.LowerCenter;
	
	if(Time.time > nextAttract){
		if(GUI.Button(Rect(xLocation, yLocation-20, 80,80),"Attract")){
			var units = GameObject.FindGameObjectsWithTag("Unit");
			for (var unit : GameObject in units){
				unit.GetComponent(GubbeStats).CompareBases();
				unit.GetComponent(MoveScript).AttractTo(parent);
			}
			audio2.Play();
			nextAttract = Time.time + 5;
		}
	}
	
	if(Time.time > nextMoney) {
		Money += 1;
		nextMoney = Time.time + 1;
	} 	

//	content = new GUIContent();
//	content.text = "Testing";
//	content.image = Resources.LoadAssetAtPath("Assets/Art/tutorial_sample31d.png",Texture2D);
	//GUI.skin.button.normal.background = content.image;
//	GUI.Button(Rect(xLocation-120, yLocation-500, 80,80),content);
//	var upgrade1Text:String = upgrade1.name;
//	var upgrade2Text:String = upgrade2.name;
//	var upgrade3Text:String = upgrade3.name;
//	var upgrade4Text:String = upgrade4.name;

//	upgrade1Text = upgrade1.name;
//	upgrade2Text = upgrade2.name;
//	upgrade3Text = upgrade3.name;
//	upgrade4Text = upgrade4.name;
	GUI.skin.button.normal.background = button1Content.image;	
	if(GUI.Button(Rect(xLocation-240, yLocation, 80,80),upgrade1.name)){
		if(applyUpgrade(upgrade1)){
			upgrade1 = container.loadRandom();
			button1Content.image = upgrade1.getIcon();
		}
		//upgrade1Text = upgrade1.name;
	}
	
	GUI.skin.button.normal.background = button2Content.image;	
	if(GUI.Button(Rect(xLocation-120, yLocation, 80,80),upgrade2.name)){
		if(applyUpgrade(upgrade2)) {
			upgrade2 = container.loadRandom();
			button2Content.image = upgrade2.getIcon();
		}
	
	}
	
	GUI.skin.button.normal.background = button3Content.image;	
	if(GUI.Button(Rect(xLocation+120, yLocation, 80,80),upgrade3.name)){
		if(applyUpgrade(upgrade3)){
			upgrade3 = container.loadRandom();
			button3Content.image = upgrade3.getIcon();
		}
	}
	
	GUI.skin.button.normal.background = button4Content.image;	
	if(GUI.Button(Rect(xLocation+240, yLocation, 80,80),upgrade4.name)){
		if(applyUpgrade(upgrade4)) {
			upgrade4 = container.loadRandom();
			button4Content.image = upgrade4.getIcon();
		}
	}
	
	GUI.skin.label.fontSize = 30;
	GUI.skin.button.normal.background = attractTexture;
	GUI.Label(Rect(xLocation-240,Screen.height-135, 200,90), Money.ToString());
	
}

function applyUpgrade(upgrade:Upgrade) {
	if(upgrade.cost>Money) {
		return false;
	}
	else {
		Money -= upgrade.cost;
		var baseStats = parent.GetComponent(BaseStats);
		baseStats.updateStats(upgrade.entertainment, upgrade.politics, upgrade.security, upgrade.economics);
		audio1.Play();
		return true;
	}
}

function addMoney(amount:int){
	Money += amount;
}

class UpgradeContainer {
	var upgradeList = new Array();
	
	function UpgradeContainer() {
		upgradeList.Push(new Upgrade("Public Hangings",10,3,-5,0));
		upgradeList.Push(new Upgrade("Guillotine",8,-2,5,-4));
		upgradeList.Push(new Upgrade("Armed Guards",-5,3,10,-4));
		upgradeList.Push(new Upgrade("Market Place",2,-4,-2,10));
		upgradeList.Push(new Upgrade("Brothel",10,4,-10,3));
		upgradeList.Push(new Upgrade("Tavern",7,-2,-5,3));
		upgradeList.Push(new Upgrade("Healthcare",-3,4,0,-10));
		upgradeList.Push(new Upgrade("Interwebs",9,5,-6,5));
		upgradeList.Push(new Upgrade("Courthouse",-5,5,7,-7));
		upgradeList.Push(new Upgrade("Game Jam",10,5,-5,-3));
		upgradeList.Push(new Upgrade("Free Food",0,10,-4,-7));
		upgradeList.Push(new Upgrade("Candy Shop",-4,-5,4,10));
		upgradeList.Push(new Upgrade("Saga Store",-4,-5,4,10));
		upgradeList.Push(new Upgrade("NSA",-10,-7,10,-7));
	}
	
	function addUpgrade(upgrade:Upgrade) {
		upgradeList.Push(upgrade);
	}
	
	function loadSpecific(name:String) {
		
		return upgradeList[0];
	}
	
	function loadRandom() {
		return upgradeList[Random.Range(0,upgradeList.length)];
	}
}

class Upgrade {
	var name:String;
	var entertainment:int;
	var politics:int;
	var security:int;
	var economics:int;
	
	var cost:int = 100;
	
	var texture:Texture2D;
	
	function Upgrade(name:String,ent:int, pol:int, sec:int, eco:int) {
		this.name = name;
		
		this.entertainment = ent;
		this.politics = pol;
		this.security = sec;
		this.economics = eco;
	}
	
	function getIcon() {
		Debug.Log("Assets/Art/Icons/"+name.Replace(" ","_")+".png");
		//this.texture = Resources.LoadAssetAtPath("Assets/Art/Icons/"+name.Replace(" ","_")+".png", Texture2D);
		this.texture = Resources.Load(name.Replace(" ","_"), Texture2D);
		if(this.texture) {
			return this.texture;
		}
		else {
			//return Resources.LoadAssetAtPath("Assets/Art/Icons/defaultIcon.png", Texture2D);
			return Resources.Load("default", Texture2D);

			}
//		return "Assets/test.png";
//		return "Assets/"+name.Replace(" ","_")+".png";
	}
}







