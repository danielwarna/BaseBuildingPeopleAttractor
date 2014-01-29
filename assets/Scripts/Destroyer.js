#pragma strict
var Owner : GameObject;

function Start () {

}

function OnTriggerEnter2D (other : Collider2D) {
		Destroy(other.gameObject);
		Owner.GetComponentInChildren(BaseButton).addMoney(25);
}