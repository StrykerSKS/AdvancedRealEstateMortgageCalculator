function addSeparatorsNF(nStr, inD, outD, sep)
{
	nStr += '';
	var dpos = nStr.indexOf(inD);
	var nStrEnd = '';
	if (dpos != -1) {
		nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
		nStr = nStr.substring(0, dpos);
	}
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + sep + '$2');
	}

	return nStr + nStrEnd;
}

function stripcomma(str){
	if (str.indexOf(',') != -1)
	{
		temp = str.split(',');
		var i = temp.length;
		var j = 0;
		var tmpStr = "";
		
		while ( i > j)
			{tmpStr += temp[j]; j++;	}
		str = tmpStr;
	} 
	return str;
}


function xdelay(value) {

	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value, d=z.textD.value, x=z.resultbox.value;

	if (value == 'a'){str = a;}
	if (value == 'b'){str = b;}
	if (value == 'c'){str = c;}
	if (value == 'd'){str = d;}	
	if (value == 'x'){str = x;}	
	
	str = stripcomma(str);

	if (value == 'a'){	z.textA.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'b'){	z.textB.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'c'){	z.textC.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'd'){	z.textD.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'x'){	z.resultbox.value = addSeparatorsNF(str, '.', '.', ',');}

	if(value == 'x'){		setTimeout("revcall()",200);	}
	else			{		setTimeout("call()",200);		}

	//alert("eer");
}
function call() {
	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value, d=z.textD.value;
  
	as = stripcomma(a);	z.textA.value = addSeparatorsNF(as, '.', '.', ',');
	bs = stripcomma(b);	z.textB.value = addSeparatorsNF(bs, '.', '.', ',');
	cs = stripcomma(c);	z.textC.value = addSeparatorsNF(cs, '.', '.', ',');
	ds = stripcomma(d);	z.textD.value = addSeparatorsNF(ds, '.', '.', ',');
	//alert (as +"  "+ bs+"  "+cs+"  "+ds);
	calc(as,bs,cs,ds);
}

function revcall() {
	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value, d=z.textD.value, x=z.resultbox.value;
  
	bs = stripcomma(b);	z.textB.value = addSeparatorsNF(bs, '.', '.', ',');
	cs = stripcomma(c);	z.textC.value = addSeparatorsNF(cs, '.', '.', ',');
	ds = stripcomma(d);	z.textD.value = addSeparatorsNF(ds, '.', '.', ',');
	xs = stripcomma(x);	z.resultbox.value = addSeparatorsNF(xs, '.', '.', ',');
    //alert (xs +"  "+ bs+"  "+cs+"  "+ds);
    revcalc(xs,bs,cs,ds);
}

function calc(a, b, c, d) {
//alert (a +"  "+ b+"  "+c+"  "+d);
	var loan = a;
	var i = b/(12 * 100);  //interest_rate
	var years = c;
	var down_payment = d;

	var loan = loan - down_payment;
	var n = years * 12;
	var one = ( i * Math.pow((1 + i), n) );
	var two = ( Math.pow((1 + i), n) - 1 );
	var result = (loan * one / two);
	    result = roundNumber(result, 2);

	var z=document.getElementById("aremc");
		z.resultbox.value = addSeparatorsNF(result, '.', '.', ',');
	if(z.resultbox.value == "NaN"){	z.resultbox.value = "";	}
	//alert (result +"  "+ monthly);

}

function revcalc(x, b, c, d) {
//alert (x +"  "+ b+"  "+c+"  "+d);
	var monthly = x;
	var i = b/(12 * 100);  //interest_rate
	var years = c;
	var down_payment = parseFloat(d);	
	
	var n = years * 12;
	var one = ( i * Math.pow((1 + i), n) );
	var two = ( Math.pow((1 + i), n) - 1 );
	var loan = 0;
	loan = down_payment + (monthly * two / one);
    loan = roundNumber(loan, 2);

	var z=document.getElementById("aremc");
		z.textA.value = addSeparatorsNF(loan, '.', '.', ',');
	if(z.textA.value == "NaN"){	z.textA.value = "";	}
	//alert (result +"  "+ monthly);
}

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);	return result;
}

function xdelay1(value) {

	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value, x=z.resultbox.value;

	if (value == 'a'){str = a;}
	if (value == 'b'){str = b;}
	if (value == 'c'){str = c;}
	if (value == 'x'){str = x;}	
	
	str = stripcomma(str);

	if (value == 'a'){	z.textA.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'b'){	z.textB.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'c'){	z.textC.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'x'){	z.resultbox.value = addSeparatorsNF(str, '.', '.', ',');}

	if(value == 'x'){		setTimeout("revcall1()",200);	}
	else			{		setTimeout("call1()",200);		}

	//alert("eer");
}
function call1() {
	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value;
  
	as = stripcomma(a);	z.textA.value = addSeparatorsNF(as, '.', '.', ',');
	bs = stripcomma(b);	z.textB.value = addSeparatorsNF(bs, '.', '.', ',');
	cs = stripcomma(c);	z.textC.value = addSeparatorsNF(cs, '.', '.', ',');
	//alert (as +"  "+ bs+"  "+cs+"  "+ds);
	calc1(as,bs,cs);
}

function revcall1() {
	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value, x=z.resultbox.value;
  
	bs = stripcomma(b);	z.textB.value = addSeparatorsNF(bs, '.', '.', ',');
	cs = stripcomma(c);	z.textC.value = addSeparatorsNF(cs, '.', '.', ',');
	xs = stripcomma(x);	z.resultbox.value = addSeparatorsNF(xs, '.', '.', ',');
    //alert (xs +"  "+ bs+"  "+cs+"  "+ds);
    revcalc1(xs,bs,cs);
}

function calc1(a, b, c) {
//alert (a +"  "+ b+"  "+c+"  "+d);
	var loan = a;
	var i = b/(12 * 100);  //interest_rate
	var down_payment = 0;

	var loan = loan - down_payment;
	var n = c;
	var one = ( i * Math.pow((1 + i), n) );
	var two = ( Math.pow((1 + i), n) - 1 );
	var result = (loan * one / two);
	    result = roundNumber(result, 2);

	var z=document.getElementById("aremc");
		z.resultbox.value = addSeparatorsNF(result, '.', '.', ',');
	if(z.resultbox.value == "NaN"){	z.resultbox.value = "";	}
	//alert (result +"  "+ monthly);

}

function revcalc1(x, b, c) {
//alert (x +"  "+ b+"  "+c+"  "+d);
	var monthly = x;
	var i = b/(12 * 100);  //interest_rate
	var down_payment = 0;
	
	var n = c;
	var one = ( i * Math.pow((1 + i), n) );
	var two = ( Math.pow((1 + i), n) - 1 );
	var loan = (monthly * two / one) + down_payment;
	    loan = roundNumber(loan, 2);

	var z=document.getElementById("aremc");
		z.textA.value = addSeparatorsNF(loan, '.', '.', ',');
	if(z.textA.value == "NaN"){	z.textA.value = "";	}
	//alert (result +"  "+ monthly);
}
function xdelay2(value) {

	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value, x=z.resultbox.value;

	if (value == 'a'){str = a;}
	if (value == 'b'){str = b;}
	if (value == 'c'){str = c;}
	if (value == 'x'){str = x;}	
	
	str = stripcomma(str);

	if (value == 'a'){	z.textA.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'b'){	z.textB.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'c'){	z.textC.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'x'){	z.resultbox.value = addSeparatorsNF(str, '.', '.', ',');}

	if(value == 'x'){		setTimeout("revcall2()",200);	}
	else			{		setTimeout("call2()",200);		}

	//alert("eer");
}
function call2() {
	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value;
  
	as = stripcomma(a);	z.textA.value = addSeparatorsNF(as, '.', '.', ',');
	bs = stripcomma(b);	z.textB.value = addSeparatorsNF(bs, '.', '.', ',');
	cs = stripcomma(c);	z.textC.value = addSeparatorsNF(cs, '.', '.', ',');
	//alert (as +"  "+ bs+"  "+cs+"  "+ds);
	calc2(as,bs,cs);
}

function revcall2() {
	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value, x=z.resultbox.value;
  
	bs = stripcomma(b);	z.textB.value = addSeparatorsNF(bs, '.', '.', ',');
	cs = stripcomma(c);	z.textC.value = addSeparatorsNF(cs, '.', '.', ',');
	xs = stripcomma(x);	z.resultbox.value = addSeparatorsNF(xs, '.', '.', ',');
    //alert (xs +"  "+ bs+"  "+cs+"  "+ds);
    revcalc2(xs,bs,cs);
}

function calc2(a, b, c) {
//alert (a +"  "+ b+"  "+c+"  "+d);
	var loan = a;
	var i = b/(12 * 100);  //interest_rate
	var years = c;
	var down_payment = 0;

	var loan = loan - down_payment;
	var n = years * 12;
	var one = ( i * Math.pow((1 + i), n) );
	var two = ( Math.pow((1 + i), n) - 1 );
	var result = (loan * one / two);
	    result = roundNumber(result, 2);

	var z=document.getElementById("aremc");
		z.resultbox.value = addSeparatorsNF(result, '.', '.', ',');
	if(z.resultbox.value == "NaN"){	z.resultbox.value = "";	}
	//alert (result +"  "+ monthly);

}

function revcalc2(x, b, c) {
//alert (x +"  "+ b+"  "+c+"  "+d);
	var monthly = x;
	var i = b/(12 * 100);  //interest_rate
	var years = c;
	var down_payment = 0;
	
	var n = years * 12;
	var one = ( i * Math.pow((1 + i), n) );
	var two = ( Math.pow((1 + i), n) - 1 );
	var loan = (monthly * two / one) + down_payment;
	    loan = roundNumber(loan, 2);

	var z=document.getElementById("aremc");
		z.textA.value = addSeparatorsNF(loan, '.', '.', ',');
	if(z.textA.value == "NaN"){	z.textA.value = "";	}
	//alert (result +"  "+ monthly);
}
function xdelay3(value) {

	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value, d=z.textD.value, x=z.resultbox.value;

	if (value == 'a'){str = a;}
	if (value == 'b'){str = b;}
	if (value == 'c'){str = c;}
	if (value == 'd'){str = d;}
	if (value == 'x'){str = x;}	
	
	str = stripcomma(str);

	if (value == 'a'){	z.textA.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'b'){	z.textB.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'c'){	z.textC.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'd'){	z.textD.value = addSeparatorsNF(str, '.', '.', ',');}
	if (value == 'x'){	z.resultbox.value = addSeparatorsNF(str, '.', '.', ',');}

	if(value != 'a'){		setTimeout("revcall3()",200);	}
}


function revcall3() {
	var z=document.getElementById("aremc"), a=z.textA.value, b=z.textB.value, c=z.textC.value, d=z.textD.value, x=z.resultbox.value;
  
	bs = stripcomma(b);	z.textB.value = addSeparatorsNF(bs, '.', '.', ',');
	cs = stripcomma(c);	z.textC.value = addSeparatorsNF(cs, '.', '.', ',');
	ds = stripcomma(d);	z.textD.value = addSeparatorsNF(ds, '.', '.', ',');
	xs = stripcomma(x);	z.resultbox.value = addSeparatorsNF(xs, '.', '.', ',');
    //alert (xs +"  "+ bs+"  "+cs);
    revcalc3(xs,bs,cs,ds);
}

function revcalc3(x, b, c, d) {
//alert (x +"  "+ b+"  "+c+"  "+d);
	var monthly = x;
	var i = b/1200;  //interest_rate
	var years = c;
	var down_payment = parseFloat(d);	
	var n = years * 12;

    //var loan = monthly*((Math.pow((1+i),n)-1)/i);
    var PV = 0;
    PV = down_payment + monthly*((1-(1/Math.pow((1+i),n)))/i);
    //alert (down_payment + " " + PV);
    var loan = PV*Math.pow((1+i),n);
    loan = roundNumber(loan, 2);
	    
	var z=document.getElementById("aremc");
		z.textA.value = addSeparatorsNF(loan, '.', '.', ',');
	if(z.textA.value == "NaN"){	z.textA.value = "";	}
}
window.onload = function() {
	call();
}