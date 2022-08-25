'use strict'

const PROBABILITY_ARR = [6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9]
const HEX_LOOKUP_ARR = getLookupArr()
const HEX_MAX = 6

class Hexagram {
  constructor(...lines) {
    this.lines = lines
    this.number = 0
  }
  *getLines() {
    for (const line of this.lines) {
      yield line
    }
  }
  pushLine(line) {
    if (this.isFull()) return
    this.lines.push(line)
    console.log(this.lines)
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
  setNumber(hexNumber) {
    this.number = hexNumber
  }
  getNumber() {
    return this.number
  }
}

function randomIndexFromArr(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

function cast(hexObj) {
  if (hexObj.isFull()) return
  hexObj.pushLine(randomIndexFromArr(PROBABILITY_ARR))
  update(hexObj)
}

function hexArrToArticle(hexObjArr) {
  const article = document.createElement('article')
  const ul = document.createElement('ul')
  for (const line of hexObjArr) {
    console.log(line)
    const lineLi = document.createElement('li')
    lineLi.setAttribute('class', `${getLineCssClass(line)}`)
    ul.prepend(lineLi)
  }
  article.appendChild(ul)
  return article
}

function getLineCssClass(line) {
  switch(line) {
    case 0: return 'yin placeholder'
    case 6: return 'yin old'
    case 7: return 'yang'
    case 8: return 'yin' 
    case 9: return 'yang old'
  }
}

const hex = new Hexagram()


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
  return [...hexObj.getLines()].map(x => {
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
