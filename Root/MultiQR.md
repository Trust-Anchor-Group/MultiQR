Title: {{
QR:=null;
if !Request.Header.TryGetQueryParameter("QR",QR) or empty(QR) then
(
	if exists(Posted) then
	(
		Links:=Global.CreateMultiQR(Posted,Request.Header.Resource);

		if Boolean(Posted.OnlyImage) then
			SeeOther(Links.Image)
		else
			SeeOther(Links.Page);
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
			"ExpiryDate": null,
			"CountLimit": null,
			"CountCategory": null,
			"Label1": "Link 1",
			"Text1": "Description of Link 1",
			"Link1": ""
		}
	)
)
else
(
	if !exists(MultiQrCode) or MultiQrCode.Code!=QR then
	(
		MultiQrCode:=select top 1 * from MultiQr_Codes where Code=QR;
		if !exists(MultiQrCode) then NotFound("Code was not found, or it has expired.");

		if exists(MultiQrCode.ExpiryDate) and Today>MultiQrCode.ExpiryDate then
		(
			DeleteObject(MultiQrCode);
			Destroy(MultiQrCode);
			
			NotFound("Code was not found, or it has expired.");
		);

		if exists(MultiQrCode.CountLimit) then
		(
			if (--MultiQrCode.CountLimit)<0 then
			(
				DeleteObject(MultiQrCode);
				Destroy(MultiQrCode);
				NotFound("Code was not found, or it has expired.");
			)
			else
				UpdateObject(MultiQrCode)
		);

		if !empty(MultiQrCode.CountCategory) then IncCounter("MultiQR."+MultiQrCode.CountCategory);
	)
);

OneRow(s):=s.Replace('&','&amp;').Replace('<','&lt;').Replace('>','&gt;').Replace('\n',' ').Replace('\r',' ');

OneRow(MultiQrCode.Title)
}}
Description: {{OneRow(MultiQrCode.Description)}}
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

<p>
<label for="ExpiryDate">Expiry Date: (optional)</label>  
<input type="date" id="ExpiryDate" name="ExpiryDate" value="((exists(MultiQrCode.ExpiryDate) ? MultiQrCode.ExpiryDate.ToShortDateString() : ''))"/>
</p>

<p>
<label for="CountLimit">Usage limit: (optional)</label>  
<input type="number" min="1" step="1" id="CountLimit" name="CountLimit" value="((exists(MultiQrCode.CountLimit) ? Str(MultiQrCode.CountLimit) : ''))"/>
</p>

<p>
<label for="CountCategory">Count Category: (optional)</label>  
<input type="text" id="CountCategory" name="CountCategory" value="((exists(MultiQrCode.CountCategory) ? Str(MultiQrCode.CountCategory) : ''))"/>
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