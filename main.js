'use strict'

const PROBABILITY_ARR = [6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9]
const HEX_LOOKUP_ARR = getLookupArr()
const HEX_MAX = 6

class Hexagram {
  constructor(...lines) {
    this.lines = lines
    this.number
  }
  castLine() {
    if (this.isFull()) return
    this.lines.push(PROBABILITY_ARR[Math.floor(Math.random()*PROBABILITY_ARR.length)])
  }
  isFull() {
    if (this.lines.length >= HEX_MAX) {
      return true
    }
    else return false
  }
  isChanging() {
    if (this.lines.includes(6) || this.lines.includes(9)) return true
    else return false
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

function update(hexObj) {
  const section = document.querySelector('section')
  section.removeChild(document.querySelector('section article'))
  const article = hexArrToArticle(hexObj.lines)
  section.appendChild(article)

  if (hexObj.isFull()) {
    if (hexObj.isChanging()) {
      section.appendChild(hexArrToArticle(getSecondary(hexObj)))
    }
  }
}

function getSecondary(hexObj) {
  return hexObj.lines.map(x => {
    if (x == 6) return x+3
    else if (x == 9) return x-3
    else return x
  })
}

async function getLookupArr() {
  const requestUrl = 'hexArr.json'
  const request = new Request(requestUrl)
  const response = await fetch(request);
  const hexLookupArr = await response.json()
  return hexLookupArr
}

const hex = new Hexagram()
