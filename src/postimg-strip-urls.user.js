// ==UserScript==
// @name        PostImg - Remove backlinks
// @namespace   0az.io
// @match       https://postimg.cc/*
// @grant       none
// @version     1.0
// @author      -
// @description 4/19/2021, 6:10:34 PM
// ==/UserScript==

;(() => {
  const elements = Array.from(
    document.querySelectorAll('input[readonly][type=text][id^=code_]'),
  )

  const transforms = {
    // bb_hotlink: ['[url=https://postimages.org/]', '[/url]'],
    bb: /^\[url=https?:..post.+\.\w+\/?\](\[img\].+\[\/img\])\[\/url\]$/,
    so: /^\[(!\[.+\))\]\(https:..postimg\..*\/.+\)$/,
    // web_hotlink: [`<a href='https://postimages.org/' target='_blank'>`, '</a>'],
    web: /^<a href=.+?>(<img src=.+?\/>)<\/a>$/,
  }

  function tryReplace(el, spec) {
    const initial = el.value
    if (spec instanceof RegExp) {
      const result = spec.exec(initial)
      if (!result[1]) {
        return false
      }
      el.value = result[1]
      return true
    }
    return false
  }

  elements.forEach((el) => {
    const id = el.id.substring(5)
    for (const [prefix, spec] of Object.entries(transforms)) {
      if (id.startsWith(prefix) && tryReplace(el, spec)) {
        break
      }
    }
  })
})()
