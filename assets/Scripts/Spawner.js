#pragma strict
var Prefab : GameObject;
var SpawnRate : int;
private var starttime : int = 2;

function Start () {
	starttime = Time.time;
}

function Update () {
	if(Time.time > starttime + SpawnRate){
		var trans = this.transform;
		//trans.position.x += Random.Range(0.0,10.0); 
		trans.position.y += Random.Range(-4.0,4.0);
		GameObject.Instantiate(Prefab, trans.position, Quaternion.identity);
		starttime = Time.time;
	}
}