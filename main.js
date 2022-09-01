'use strict'

const PROBABILITY_ARR = [6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9]
const HEX_LOOKUP_ARR = getLookupArr()
const HEX_MAX = 6

const hexagram = {
  lines: [],
  isFull: function() {
    if (this.lines.length >= HEX_MAX) return true
    else false
  },
  isChanging: function() {
    if (this.lines.contains(6) || this.lines.contains(9)) return true
    return false
  },
  castLine: function() {
    this.lines.push(PROBABILITY_ARR[Math.floor(Math.random()*PROBABILITY_ARR.length)])
  },
  calculateBase: function() {
    this.lines.map(x => {
      if (x === 6) return 8
      if (x === 9) return 7
      return x
    })
  },
  calculateChanging: function() {
    return this.lines.map(x => {
      if (x === 6) return 9
      if (x === 9) return 6
      return x
    })
  }
}

function hexArrToArticle(hexObjArr) {
  const article = document.createElement('article')
  const ul = document.createElement('ul')
  for (const line of hexObjArr) {
    const lineLi = document.createElement('li')
    lineLi.setAttribute('class', `${hexLineToCssClass(line)}`)
    ul.prepend(lineLi)
  }
  article.appendChild(ul)
  if (hexObjArr.length === HEX_MAX) {
     
  }
  return article
}

function hexLineToCssClass(line) {
  switch(line) {
    case 0: return 'yin placeholder'
    case 6: return 'yin old'
    case 7: return 'yang'
    case 8: return 'yin' 
    case 9: return 'yang old'
  }
}

function update() {
  const section = document.querySelector('section')
  section.removeChild(document.querySelector('section article'))
  const article = hexArrToArticle(hex.lines)
  section.appendChild(article)

  if (hex.isFull()) {
    secondary.lines = hex.calculateChanging()
    if (JSON.stringify(hex.lines) !== JSON.stringify(secondary.lines)) {
      section.appendChild(hexArrToArticle(secondary.lines))
    }
  }
}

async function getLookupArr() {
  const requestUrl = 'hexArr.json'
  const request = new Request(requestUrl)
  const response = await fetch(request);
  const hexLookupArr = await response.json()
  return hexLookupArr
}

const hex = hexagram
const secondary = Object.assign({}, hexagram)
