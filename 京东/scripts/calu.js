function sameSign(a,b){
	return (a ^ b)>=0;
}

function vector(a,b){
	return {
		x: b.x-a.x,
		y: b.y-a.y
	}
}

function vectorProduct(v1,v2){
	return v1.x*v2.y-v1.y*v2.x;
}

function isPointInTrangle(p,a,b,c){
	var pa=vector(p,a);
	var pb=vector(p,b);
	var pc=vector(p,c);

	var t1=vectorProduct(pa,pb);
	var t2=vectorProduct(pb,pc);
	var t3=vectorProduct(pc,pa);

	return sameSign(t1,t2)&&sameSign(t2,t3);
}

function needDelay(elem,currentPos,leftCorner){
	var offset=elem.offset();

	var topLeft={
		x: offset.left+elem.width(),
		y: offset.top
	}

	var bottomLeft={
		x: offset.left+elem.width(),
		y: offset.top+elem.height()
	}

	return isPointInTrangle(currentPos,leftCorner,topLeft,bottomLeft);
}