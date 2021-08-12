// ==UserScript==
// @name        Alt Text Inject
// @namespace   0az.io
// @match       https://www.cassiopeiaquinn.com/comic/*
// @grant       none
// @version     1.0
// @author      -
// @description 5/4/2021, 11:21:07 AM
// ==/UserScript==
;(() => {
  const img = document.getElementById('cc-comic')

  const alt = document.createElement('div')
  alt.id = 'alt-text-inject'
  let text = img.title
  // Vim Syntax breaks
  // if (
  //   new RegExp("^'[^\"]+'$").test(text)
  // ) {
  //   let tmp = text.slice(1, -1)
  //   if (!/'.+'/.test(tmp)) {
  //     text = `"${tmp}"`
  //   }
  // }
  alt.textContent = text

  const style = document.createElement('style')
  style.id = 'alt-text-style-inject'
  style.textContent = `
  .cc-nav::after {
    content: "";
    display: table;
    clear: both;
  }
  #alt-text-inject {
    font-size: 16px;
    margin-top: 1ex;
  }
  `

  const existingAlt = document.getElementById('alt-text-inject')
  if (existingAlt) {
    existingAlt.replaceWith(alt)
  } else {
    rightside.append(alt)
  }
  const existingStyle = document.getElementById('alt-text-style-inject')
  if (existingStyle) {
    existingStyle.replaceWith(style)
  } else {
    rightside.append(style)
  }
})()
