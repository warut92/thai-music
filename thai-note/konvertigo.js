function sxaven(kiu)
{
	// konverti al la sxava
	// var certa = confirm("\u0108u vi certas ke vi volas konverti al la ŝava?");
	// if (!certa) {return;}

	var teksto = document.getElementById(kiu).value;
			//สัญลักษณ์
			teksto = teksto.replace(/\//g,"");


			teksto = teksto.replace(/-{4,}/g,"6");
			teksto = teksto.replace(/-{3,}/g,"4");
			teksto = teksto.replace(/-{2,}/g,"3");
			teksto = teksto.replace(/-/g,"2");








			//ตัวโน้ต เสียงกลาง
			teksto = teksto.replace(/ด/g,"C");
			teksto = teksto.replace(/ร/g,"D");
			teksto = teksto.replace(/ม/g,"E");
			teksto = teksto.replace(/ฟ/g,"F");
			teksto = teksto.replace(/ซ/g,"G");
			teksto = teksto.replace(/ล/g,"A");
			teksto = teksto.replace(/ท/g,"B");

			//ตัวโน้ต เสียงกลาง
			teksto = teksto.replace(/ดํ/g,"c");



	document.getElementById(kiu).value=teksto;
	kiom();
}
