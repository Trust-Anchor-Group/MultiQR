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
			"Links": []
		};

		insert into MultiQr_Codes object MultiQrCode;

		SeeOther("MultiQR.md?QR="+MultiQrCode.Code);
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
			"Links": null
		}
	)
)
else
(
	MultiQrCode:=select top 1 * from MultiQr_Codes where Code=QR;
	if !exists(MultiQrCode) then NotFound("Code not found.");
);

MultiQrCode.Title
}}
Description: {{MultiQrCode.Description}}
Master: {{MultiQrCode.Master}}
Javascript: MultiQR.js

========================================================

{{MultiQrCode.Title}}
========================

{{
if !empty(MultiQrCode.Code) then
(
	]]

((MultiQrCode.Description))

![This page](/QR/[[;
	]]((Waher.IoTGateway.Gateway.GetUrl("/QR/"+UrlEncode("/MultiQR.md?Code="+MultiQrCode.Code+"&Scheme="+MultiQrCode.Scheme) ) ))[[;
	]])

[[
)
else
(
	]]
You can create your own Multi-purpose QR-code, by filling in the relevant information below, and press the `Create` button.

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

<button type="submit" class="posButton">Create</button>

</form>
[[
)
}}