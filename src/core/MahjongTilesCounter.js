const htmlRegex = /(?:<.*?>)+/g;

export function addCount(convertedHtml) {
  const convertedHtmlWithTilesCount = convertedHtml.replace(htmlRegex, addCountForOneGroup);

  return convertedHtmlWithTilesCount;

  function addCountForOneGroup(html) {
    const matchResult = html.match(/<img.*?>/g);
    if (matchResult) {
      const MahjongTilesCount = matchResult.length;

      return `
        <span style="position: relative">
          <span>${html}</span>
          <span style="position: absolute; left: 50%; bottom: -30px; transform: translateX(-50%); white-space: nowrap;">(${MahjongTilesCount}枚)</span>
        </span>
      `.replace(/>\s+?</g,"><").replace(/\n/g, "");
    } else {
      return html;
    }
  }
}