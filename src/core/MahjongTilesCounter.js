const htmlRegex = /(?:<.*?>)+/g;

export function doSomething(convertedHtml) {
  const tempConvertedHtml = convertedHtml.replace(htmlRegex, addCountString);

  return tempConvertedHtml;

  function addCountString(html) {
    const MahjongTilesCount = html.match(/<img.*?>/g).length;

    return `
      <span style="position: relative">
        <span>${html}</span>
        <span style="position: absolute; left: 50%; bottom: -30px; transform: translateX(-50%); white-space: nowrap;">(${MahjongTilesCount}枚)</span>
      </span>
    `.replace(/>\s+?</g,"><").replace(/\n/g, "");
  }
}