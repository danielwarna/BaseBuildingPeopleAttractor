#pragma strict

var entertainment:int;
var politics:int;
var security:int;
var economics:int;

var Base1:GameObject;
var Base2:GameObject;

var base1Stats:BaseStats;
var base2Stats:BaseStats;

var Target:GameObject;
var renderers:Component[];

function Start () {
	
	Base1 = GameObject.FindGameObjectWithTag("Base1");
	Base2 = GameObject.FindGameObjectWithTag("Base2");
	
	base1Stats = Base1.GetComponent(BaseStats);
	base2Stats = Base2.GetComponent(BaseStats);

	entertainment = Random.Range(1,100);
	politics      = Random.Range(1,100);
	security  	  = Random.Range(1,100);
	economics	  = Random.Range(1,100);
	
	CompareBases();
	setColour();
}

function Update () {

}

function CompareBases() {
	var Base1Score:int = 0;
	var Base2Score:int = 0;
	
	Base1Score += Mathf.Abs(this.entertainment - this.base1Stats.entertainment);
	Base1Score += Mathf.Abs(this.politics - this.base1Stats.politics);
	Base1Score += Mathf.Abs(this.security - this.base1Stats.security);
	Base1Score += Mathf.Abs(this.economics - this.base1Stats.economics);
	
	Base2Score += Mathf.Abs(this.entertainment - this.base2Stats.entertainment);
	Base2Score += Mathf.Abs(this.politics - this.base2Stats.politics);
	Base2Score += Mathf.Abs(this.security - this.base2Stats.security);
	Base2Score += Mathf.Abs(this.economics - this.base2Stats.economics);
	
	//Debug.Log(Base1Score);
	//Debug.Log(Base2Score);
	
	if (Base1Score>Base2Score) {
		Target = Base1;
	}
	else {
		Target = Base2;
		}
}

function setColour() {
	renderers = gameObject.GetComponentsInChildren(SpriteRenderer);
	
	var shoulder1:SpriteRenderer;// = renderers[1];
	var shoulder2:SpriteRenderer;// = renderers[2];
	
	for(var r:SpriteRenderer in renderers){
		if (r.name=="gubbeSpritesheet_0"){
			shoulder1 = r;
		}
		if(r.name=="gubbeSpritesheet_2"){
			shoulder2 = r;
		}
	}
	
	
	shoulder1.color = new Color(this.entertainment/100f,this.politics/100f,this.security/100f,1f);
	shoulder2.color = new Color(this.entertainment/100f,this.politics/100f,this.security/100f,1f);
}