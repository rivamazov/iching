'use strict'

const PROBABILITY_ARR = [6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9]
const HEX_MAX = 6

const hexagram = {
  lines: [],
  number: 0,
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
  },
  compareLines: function(hexObj) {
    if (JSON.stringify(this.lines) === JSON.stringify(hexObj.lines)) return true
    else return false
  }
}

function hexObjToArticle(hexObj) {
  const article = document.createElement('article')
  const ul = document.createElement('ul')
  for (const line of hexObj.lines) {
    const lineLi = document.createElement('li')
    lineLi.setAttribute('class', `${hexLineToCssClass(line)}`)
    ul.prepend(lineLi)
  }
  article.appendChild(ul)
  if (hexObj.isFull()) {
    const p = document.createElement('p')
    p.innerHTML = getNumber(hexObj)
    console.log(p.innerHTML)
    article.appendChild(p)
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

async function fetchHexagramsJSON() {
  const response = await fetch('./hexArr.json')
  const hexagrams = await response.json()
  return hexagrams
}

function getNumber(hexObj) {
  fetchHexagramsJSON().then(hexagrams => {
    for (const hexagram of hexagrams) {
      if (hexObj.compareLines(hexagram)) {
        console.log(hexagram.number)
      }
    }
  })
}

function update() {
  const section = document.querySelector('section')
  section.removeChild(document.querySelector('section article'))
  const article = hexObjToArticle(hex)
  section.appendChild(article)

  if (hex.isFull()) {
    secondary.lines = hex.calculateChanging()
    if (!hex.compareLines(secondary)) {
      section.appendChild(hexObjToArticle(secondary))
    }
  }
}

const hex = hexagram
const secondary = Object.assign({}, hexagram)