function sxaven(kiu)
{
	// konverti al la sxava
	// var certa = confirm("\u0108u vi certas ke vi volas konverti al la ŝava?");
	// if (!certa) {return;}

	var teksto = document.getElementById(kiu).value;
			//สัญลักษณ์
			teksto = teksto.replace(/\//g,"");

			teksto = teksto.replace(/-{5,}/g,"7");

			teksto = teksto.replace(/-{4,}/g,"6");
			teksto = teksto.replace(/-{3,}/g,"4");
			teksto = teksto.replace(/-{2,}/g,"3");
			teksto = teksto.replace(/-/g,"2");

			//ตัวโน้ต เสียง1สูง
			teksto = teksto.replace(/ดํ/g,"c");
			teksto = teksto.replace(/รํ/g,"d");
			teksto = teksto.replace(/มํ/g,"e");
			teksto = teksto.replace(/ฟํ/g,"f");
			teksto = teksto.replace(/ซํ/g,"g");

			//ตัวโน้ต เสียงกลาง
			teksto = teksto.replace(/ด/g,"C");
			teksto = teksto.replace(/ร/g,"D");
			teksto = teksto.replace(/ม/g,"E");
			teksto = teksto.replace(/ฟ/g,"F");
			teksto = teksto.replace(/ซ/g,"G");
			teksto = teksto.replace(/ล/g,"A");
			teksto = teksto.replace(/ท/g,"B");

			teksto = teksto.replace(/พ1/g,"V:1");
			teksto = teksto.replace(/พ2/g,"V:2");





	document.getElementById(kiu).value=teksto;
}
