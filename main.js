'use strict'

const PROBABILITY_ARR = [6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9]
const HEX_MAX = 6

const hexagram = {
  lines: [],
  number: 0,
  article: null,
  isFull: function() {
    if (this.lines.length >= HEX_MAX) return true
    else false
  },
  isChanging: function() {
    if (this.lines.includes(6) || this.lines.includes(9)) return true
    return false
  },
  castLine: async function() {
    this.lines.push(PROBABILITY_ARR[Math.floor(Math.random()*PROBABILITY_ARR.length)])
    if (this.isFull()) {
      this.number = await getNumber(this)     
    }
    this.article = hexObjToArticle(this)
    update()
  },
  calculateBase: function() {
    return this.lines.map(x => {
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

function hexLineToCssClass(line) {
  switch(line) {
    case 0: return 'yin placeholder'
    case 6: return 'yin old'
    case 7: return 'yang'
    case 8: return 'yin' 
    case 9: return 'yang old'
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
    p.innerHTML = hexObj.number
    article.appendChild(p)
  }
  return article
}

async function fetchHexagramArray() {
  return fetch('hexArr.json')
    .then(result => result.json())
    .then(data => {
        return data
    })
}

async function getNumber(hexObj) {
  let hexagrams = await fetchHexagramArray()
  for (const hexagram of hexagrams) {
    if (sameArray(hexObj.calculateBase(), hexagram.lines)) {
      return hexagram.number
    }
  }
}

async function update() {
  const section = document.querySelector('section')
  section.removeChild(document.querySelector('section article'))
  section.appendChild(hex.article)
  if (hex.isFull() && hex.isChanging()) {
    secondary.lines = hex.calculateChanging()
    secondary.number = await getNumber(secondary)
    secondary.article = hexObjToArticle(secondary)
    section.appendChild(secondary.article)
  }
}

const hex = hexagram
const secondary = Object.assign({}, hexagram)

function sameArray(x, y) {
  if (JSON.stringify(x) === JSON.stringify(y)) return true
  else false
}