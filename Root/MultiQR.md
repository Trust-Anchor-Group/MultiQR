Title: {{
if empty(Code) then
(
	MultiQrCode:=
	{
		"Title": "Multi-purpose QR-code",
		"Description": "Displays a multi-purpose QR-code",
		"Master": "/Master.md"
	}
)
else
(
	MultiQrCode:=select top 1 * from MultiQr_Codes where Code=Code;
	if !exists(MultiQrCode) then NotFound("Code not found.");
);
MultiQrCode.Title
}}
Description: {{MultiQrCode.Description}}
Master: {{MultiQrCode.Master}}
Parameter: Code

========================================================

{{MultiQrCode.Title}}
========================

{{MultiQrCode.Description}}

