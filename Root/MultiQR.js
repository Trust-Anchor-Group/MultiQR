function AddLink()
{
	var i = 1;
	var FieldSet = document.getElementById("Link" + i);
	var LastFieldSet;

	while (FieldSet)
	{
		i++;
		LastFieldSet = FieldSet;
		FieldSet = document.getElementById("Link" + i);
	}

	FieldSet = document.createElement("FIELDSET");
	FieldSet.setAttribute("id", "Link" + i);
	LastFieldSet.parentNode.insertBefore(FieldSet, LastFieldSet.nextSibling);

	var Legend = document.createElement("LEGEND");
	Legend.innerText = "Link " + i;
	FieldSet.appendChild(Legend);

	var P = document.createElement("P");
	FieldSet.appendChild(P);

	var Label = document.createElement("LABEL");
	Label.setAttribute("for", "Label" + i);
	Label.innerText = "Label:";
	P.appendChild(Label);

	var Br = document.createElement("BR");
	P.appendChild(Br);

	var Input = document.createElement("INPUT");
	Input.setAttribute("type", "text");
	Input.setAttribute("id", "Label" + i);
	Input.setAttribute("name", "Label" + i);
	Input.setAttribute("value", "Link " + i);
	Input.setAttribute("required", "required");
	P.appendChild(Input);

	P = document.createElement("P");
	FieldSet.appendChild(P);

	Label = document.createElement("LABEL");
	Label.setAttribute("for", "Text" + i);
	Label.innerText = "Text:";
	P.appendChild(Label);

	Br = document.createElement("BR");
	P.appendChild(Br);

	Input = document.createElement("INPUT");
	Input.setAttribute("type", "text");
	Input.setAttribute("id", "Text" + i);
	Input.setAttribute("name", "Text" + i);
	Input.setAttribute("value", "Description of Link " + i);
	Input.setAttribute("required", "required");
	P.appendChild(Input);

	P = document.createElement("P");
	FieldSet.appendChild(P);

	Label = document.createElement("LABEL");
	Label.setAttribute("for", "Link" + i);
	Label.innerText = "Link:";
	P.appendChild(Label);

	Br = document.createElement("BR");
	P.appendChild(Br);

	Input = document.createElement("INPUT");
	Input.setAttribute("type", "url");
	Input.setAttribute("id", "Link" + i);
	Input.setAttribute("name", "Link" + i);
	Input.setAttribute("required", "required");
	P.appendChild(Input);

	P = document.createElement("P");
	FieldSet.appendChild(P);

	Input = document.createElement("INPUT");
	Input.setAttribute("type", "checkbox");
	Input.setAttribute("id", "MultiMedia" + i);
	Input.setAttribute("name", "MultiMedia" + i);
	P.appendChild(Input);

	Label = document.createElement("LABEL");
	Label.setAttribute("for", "MultieMedia" + i);
	Label.innerText = "Embed as multi-media.";
	P.appendChild(Label);

	P = document.createElement("P");
	FieldSet.appendChild(P);

	Label = document.createElement("LABEL");
	Label.setAttribute("for", "Width" + i);
	Label.innerText = "Width: (Optional)";
	P.appendChild(Label);

	Br = document.createElement("BR");
	P.appendChild(Br);

	Input = document.createElement("INPUT");
	Input.setAttribute("type", "number");
	Input.setAttribute("min", "1");
	Input.setAttribute("id", "Width" + i);
	Input.setAttribute("name", "Width" + i);
	P.appendChild(Input);

	P = document.createElement("P");
	FieldSet.appendChild(P);

	Label = document.createElement("LABEL");
	Label.setAttribute("for", "Height" + i);
	Label.innerText = "Height: (Optional)";
	P.appendChild(Label);

	Br = document.createElement("BR");
	P.appendChild(Br);

	Input = document.createElement("INPUT");
	Input.setAttribute("type", "number");
	Input.setAttribute("min", "1");
	Input.setAttribute("id", "Height" + i);
	Input.setAttribute("name", "Height" + i);
	P.appendChild(Input);
}
