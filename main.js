'use strict'

const PROBABILITY_ARR = [6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9]
const HEX_LOOKUP_ARR = 'hexArr.json'
const Hexagram = []

function randomIndexFromArr(arr) {
  return arr[Math.floor(Math.random()*arr.length)]
}

function cast() {
  Hexagram.push(randomIndexFromArr(PROBABILITY_ARR))
  const lineNumber = Hexagram.length
  const lineLi = document.getElementById('line' + lineNumber)
  lineLi.setAttribute('class', `${getLineCssClass(Hexagram[lineNumber-1])}`)

  if (lineNumber == 6) {
    const castBtn = document.getElementById('castBtn')
    castBtn.setAttribute('onClick', 'reset()')
    castBtn.innerHTML = 'Reset'
  }
}

function getLineCssClass(line) {
  switch(line) {
    case 6: return 'yin old'
    case 7: return 'yang'
    case 8: return 'yin' 
    case 9: return 'yang old'
  }
}

function reset() {
  const lineLiList = document.querySelectorAll('[id^=line]')
  for (const lineElement of lineLiList) {
    lineElement.setAttribute('class', 'yin placeholder')
  }
  Hexagram.length = 0
  const castBtn = document.getElementById('castBtn')
  castBtn.setAttribute('onClick', 'cast()')
  castBtn.innerHTML = "Cast Line"
}

async function getHexLookupArr() {
  const request = new Request(HEX_LOOKUP_ARR)
  const response = await fetch(request)
  const hexagramsArr = await response.json()
  return hexagramsArr
}

const hexArr = getHexLookupArr()
