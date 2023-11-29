Title: {{
QR:=null;
if !Request.Header.TryGetQueryParameter("QR",QR) or empty(QR) then
(
	if exists(Posted) then
	(
		MultiQrCode:=
		{
			"Code": Base64UrlEncode(RandomBytes(32)),
			"Title": Str(Posted.Title),
			"Description": Str(Posted.Description),
			"Master": Str(Posted.Master),
			"Scheme": Str(Posted.Scheme),
			"Created": NowUtc,
			"Label1": Str(Posted.Label1),
			"Text1": Str(Posted.Text1),
			"Link1": Str(Posted.Link1)
		};

		k:=2;
		while exists(Posted["Label"+(s:=Str(k))]) and exists(Posted["Text"+s]) and exists(Posted["Link"+s]) do
		(
			MultiQrCode["Label"+s]:=Posted["Label"+s];
			MultiQrCode["Text"+s]:=Posted["Text"+s];
			MultiQrCode["Link"+s]:=Posted["Link"+s];
			k++
		);

		insert into MultiQr_Codes object MultiQrCode;

		if Boolean(Posted.OnlyImage) then
			SeeOther("/QR/"+UrlEncode(Waher.IoTGateway.Gateway.GetUrl(Request.Header.Resource+"?QR="+MultiQrCode.Code+"&Scheme="+MultiQrCode.Scheme)))
		else
			SeeOther(Request.Header.Resource+"?QR="+MultiQrCode.Code);
	)
	else
	(
		MultiQrCode:=
		{
			"Code": null,
			"Title": "Multi-purpose QR-code",
			"Description": "Displays a multi-purpose QR-code",
			"Master": "/Master.md",
			"Scheme": "",
			"Created": null,
			"Links": null,
			"Label1": "Link 1",
			"Text1": "Description of Link 1",
			"Link1": ""
		}
	)
)
else
(
	MultiQrCode:=select top 1 * from MultiQr_Codes where Code=QR;
	if !exists(MultiQrCode) then NotFound("Code not found.");
);

MarkdownEncode(MultiQrCode.Title)
}}
Description: {{MarkdownEncode(MultiQrCode.Description)}}
Master: {{MultiQrCode.Master}}
Javascript: MultiQR.js

========================================================

{{MarkdownEncode(MultiQrCode.Title)}}
======================================

{{
if !empty(MultiQrCode.Code) then
(
	]]

((MarkdownEncode(MultiQrCode.Description) ))

[[;

	k:=1;
	while (
		!empty(Label:=MultiQrCode["Label"+(s:=Str(k++))]) and
		!empty(Text:=MultiQrCode["Text"+s]) and
		!empty(Link:=MultiQrCode["Link"+s])) do
	(
		]]((MarkdownEncode(Label) ))
-----------------------------------------

((MarkdownEncode(Text) ))

<p><a href="((Link))" target="_blank">((MarkdownEncode(Link) ))</a></p>
<a href="((Link))" target="_blank">

![((MarkdownEncode(Label) ))](/QR/[[;
	]]((UrlEncode(Link) ))[[;
	]])

</a>

[[
	);

	]]This page
-------------------

![This page](/QR/[[;
	]]((UrlEncode(Waher.IoTGateway.Gateway.GetUrl(Request.Header.Resource+"?QR="+MultiQrCode.Code+"&Scheme="+MultiQrCode.Scheme) ) ))[[;
	]])
[[
)
else
(
	]]
You can create your own Multi-purpose QR-code, by filling in the relevant information below. You add links by pressing the *Add Link* button.
When you have added all the links you require, press the *Create* button to create the multi-purpose QR-code.

<form action="MultiQR.md" method="post" enctype="multipart/form-data">
<fieldset>
<legend>Definition</legend>

<p>
<label for="Title">Title:</label>  
<input type="text" id="Title" name="Title" value="((MultiQrCode.Title))" autofocus required/>
</p>

<p>
<label for="Description">Description:</label>  
<input type="text" id="Description" name="Description" value="((MultiQrCode.Description))" required/>
</p>

<p>
<label for="Master">Master file: (Local [Markdown](/Markdown.md) file responsible for displaying the QR-code. Change only if you want to customize page.)</label>  
<input type="text" id="Master" name="Master" value="((MultiQrCode.Master))" required/>
</p>

<p>
<label for="Scheme">Coloring scheme:</label>  
<select name="Scheme" id="Scheme">
<option value="">Normal</option>
<option value="tagsign">Signature request</option>
<option value="iotid">Legal ID</option>
<option value="iotsc">Smart Contract</option>
<option value="iotdisco">Device</option>
<option value="edaler">eDaler(R)</option>
<option value="nfeat">Neuro-Feature^TM token</option>
<option value="obinfo">Onboarding information</option>
<option value="aes256">Encrypted information</option>
</select>
</p>

<input type="hidden" name="OnlyImage" value="false"/>

<fieldset id="Link1">
<legend>Link 1</legend>

<p>
<label for="Label1">Label:</label>  
<input type="text" id="Label1" name="Label1" value="((MultiQrCode.Label1))" required/>
</p>

<p>
<label for="Text1">Text:</label>  
<input type="text" id="Text1" name="Text1" value="((MultiQrCode.Text1))" required/>
</p>

<p>
<label for="Link1">Link:</label>  
<input type="url" id="Link1" name="Link1" value="((MultiQrCode.Link1))" required/>
</p>

</fieldset>

<button type="button" class="posButton" onclick="AddLink()">Add Link</button>
<button type="submit" class="posButton">Create</button>

</form>
[[
)
}}