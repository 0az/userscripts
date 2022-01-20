// ==UserScript==
// @name        Webcomic Instant Page
// @namespace   0az.io
// @match       https://www.schlockmercenary.com/*
// @match       https://reallifecomics.com/index.php
// @match       https://reallifecomics.com/comic.php*
// @grant       none
// @version     1.0
// @author      -
// @description
// ==/UserScript==

const CACHE = Symbol('webcomic-instant-page-cache')
if (!window[CACHE]) {
  window[CACHE] = new Set()
}
const prefetches = window[CACHE]

function preload(url) {
  if (prefetches.has(url)) {
    return
  }

  const el = document.createElement('link')
  el.rel = 'prefetch'
  el.href = url
  document.head.appendChild(el)

  prefetches.add(url)
}

const onclickRegex =
  /(?:window\.)?location\.href\s*=\s*(['"])([^'"]+)(\1)\s*;*/
window.requestIdleCallback(() => {
  Array.from(document.querySelectorAll('a[class*=prev], a[class*=next]'))
    .map((e) => {
      if (e.href) {
        return e.href
      }
      if (e.onclick) {
        return e.getAttribute('onclick').match(onclickRegex)?.[2]
      }
    })
    .forEach((url) => {
      if (url) preload(url)
    })
})
