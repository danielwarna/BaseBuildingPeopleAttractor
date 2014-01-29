#pragma strict


//These have a range from 1-100
var entertainment:int = 50;
var politics:int      = 50;
var security:int      = 50;
var economics:int     = 50;

function Start () {

}

function Update () {

}

function updateStats(entertainment:int, politics:int, security:int, economics:int) {
	this.entertainment += entertainment;
	this.politics += politics;
	this.security += security;
	this.economics += economics;
}