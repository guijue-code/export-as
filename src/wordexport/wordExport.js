const wordexport = function (wrap, config) {
  const static_word = {
    mhtml: {
      top:
        "Mime-Version: 1.0\nContent-Base: " +
        location.href +
        '\nContent-Type: Multipart/related; boundary="NEXT.ITEM-BOUNDARY";type="text/html"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset="utf-8"\nContent-Location: ' +
        location.href +
        "\n\n<!DOCTYPE html>\n" +
        '<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40">\n_html_</html>',
      head:
        '<head>\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n<style>\n_styles_\n</style>\n<style>\n#medo-footer{width:100%;text-align:\n_footerAlign_\n}#medo-header{width:100%;text-align:\n_headerAlign_\n}\n</style>\n<style>\n<!--@page Container{mso-header:medo-header;mso-footer:medo-footer;' +
        (config.landscape ? "mso-page-orientation:landscape;size:841.9pt 595.3pt;" : "") +
        '}div.Container{page:Container}-->\n</style>\n<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val="Cambria Math"/><m:brkBin m:val="before"/><m:brkBinSub m:val="--"/><m:smallFrac m:val="off"/><m:dispDef/><m:lMargin m:val="0"/> <m:rMargin m:val="0"/><m:defJc m:val="centerGroup"/><m:wrapIndent m:val="1440"/><m:intLim m:val="subSup"/><m:naryLim m:val="undOvr"/></m:mathPr></w:WordDocument></xml><![endif]--></head>\n',
      body:
        "<body><div class='Container'>\n_body_\n<div class='medo-wrapper'><div style='mso-element: header'id='medo-header'><p class='MsoHeader'>" +
        config.headerName +
        "</p></div><div style='mso-element: footer'id='medo-footer'><p class='currentpage'><!--[if supportFields]><span class='MsoPageNumber'><span style='mso-element: field-begin'></span><span style='mso-spacerun: yes'></span>PAGE<span style='mso-element: field-separator'></span></span><![endif]--><span class='MsoPageNumber'><span style='mso-no-proof: yes'>1</span></span><!--[if supportFields]><span class='MsoPageNumber'><span style='mso-element: field-end'></span></span><![endif]--></p></div></div></body>",
    },
  };
  const images = [];

  const img = wrap.querySelectorAll("img");

  for (let i = 0; i < img.length; i++) {
    const uri = img[i].src;

    // Save encoded image to array
    images[i] = {
      type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
      encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
      location: img[i].src,
      data: uri.substring(uri.indexOf(",") + 1),
    };
  }
  let mhtmlBottom = "\n";
  for (let i = 0; i < images.length; i++) {
    mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
    mhtmlBottom += "Content-Location: " + images[i].location + "\n";
    mhtmlBottom += "Content-Type: " + images[i].type + "\n";
    mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
    mhtmlBottom += images[i].data + "\n\n";
  }
  mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

  const styles = "";
  const fileContent =
    static_word.mhtml.top.replace(
      "_html_",
      static_word.mhtml.head.replace("_styles_", styles) +
        static_word.mhtml.head.replace("_headerAlign_", config.headerAlign) +
        static_word.mhtml.head.replace("_footerAlign_", config.footerAlign) +
        static_word.mhtml.body.replace("_body_", wrap.innerHTML)
    ) + mhtmlBottom;

  const fileSuffix = config.suffix
    ? config.suffix == "doc"
      ? "application/msword;charset=utf-8"
      : config.suffix == "docx"
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "application/msword;charset=utf-8"
    : "application/msword;charset=utf-8";
  // Create a Blob with the file contents
  const blob = new Blob([fileContent], {
    type: fileSuffix,
  });
  return blob;
};
// export default wordexport;
module.exports = wordexport;
