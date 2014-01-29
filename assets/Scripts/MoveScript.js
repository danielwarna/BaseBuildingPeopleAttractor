#pragma strict

var GoToLocation : Transform;
var force : float = 200;

var positionOffset:Vector3;

function Start () {
	var middleAreas: GameObject[];
	middleAreas = GameObject.FindGameObjectsWithTag("MiddleArea");
	
	positionOffset.x = Random.Range(-0.4,0.4);
	positionOffset.y = Random.Range(-0.15,0.15);

	SetGoToLocation(middleAreas[Random.Range(0,middleAreas.length)].transform);
}

function FixedUpdate () {
	GoToLocation.transform.position += positionOffset;

	var rotation : Quaternion = Quaternion.LookRotation(GoToLocation.transform.position - transform.position, transform.TransformDirection(Vector3.up));
	
	transform.rotation = new Quaternion(0, 0, rotation.z, rotation.w);
	
	var dir = GoToLocation.transform.position - transform.position;
	dir = dir.normalized;
	rigidbody2D.AddForce(dir*force);
	
	GoToLocation.transform.position -= positionOffset;


}

function AttractTo(player : GameObject){
	if(Random.Range(0,100) <= 5 || GetComponent(GubbeStats).Target.tag.Equals(player.tag)){
		if(player.tag == "Base1"){
			switch (GoToLocation.tag){
				case "MiddleArea22":
				SetGoToLocation(GameObject.FindGameObjectsWithTag("MiddleArea21")[Random.Range(0,3)].transform);
				break;
				case "MiddleArea21":
				SetGoToLocation(GameObject.FindGameObjectsWithTag("MiddleArea")[Random.Range(0,3)].transform);
				break;
				case "MiddleArea":
				SetGoToLocation(GameObject.FindGameObjectsWithTag("MiddleArea11")[Random.Range(0,3)].transform);
				break;
				case "MiddleArea11":
				SetGoToLocation(GameObject.FindGameObjectsWithTag("MiddleArea12")[Random.Range(0,3)].transform);
				break;
				case "MiddleArea12":
				SetGoToLocation(GameObject.FindGameObjectWithTag("base1Finish").transform);
				break;
				default:
				break;
			}
		}
		else{
			switch (GoToLocation.tag){
				case "MiddleArea22":
				SetGoToLocation(GameObject.FindGameObjectWithTag("base2Finish").transform);
				break;
				case "MiddleArea21":
				SetGoToLocation(GameObject.FindGameObjectsWithTag("MiddleArea22")[Random.Range(0,3)].transform);
				break;
				case "MiddleArea":
				SetGoToLocation(GameObject.FindGameObjectsWithTag("MiddleArea21")[Random.Range(0,3)].transform);
				break;
				case "MiddleArea11":
				SetGoToLocation(GameObject.FindGameObjectsWithTag("MiddleArea")[Random.Range(0,3)].transform);
				break;
				case "MiddleArea12":
				SetGoToLocation(GameObject.FindGameObjectsWithTag("MiddleArea11")[Random.Range(0,3)].transform);
				break;
				default:
				break;
			}
		}
	}
}

function SetGoToLocation(location:Transform) {
	GoToLocation = location;
}