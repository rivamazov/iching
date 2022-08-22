'use strict'

function setLineCssClass(line) {
  switch(line) {
    case 6: return 'yin old'
    case 7: return 'yang'
    case 8: return 'yin' 
    case 9: return 'yang old'
  }
}

async function populate() {
  const requestUrl = 'hexArr.json'
  const request = new Request(requestUrl)

  const response = await fetch(request);
  const hexagramsArr = await response.json()

  populateHexagrams(hexagramsArr)
}

function populateHexagrams(arr) {
  const section = document.querySelector('section')
  const hexagrams = arr
  for (const hexagram of hexagrams) {
    const article = document.createElement('article')
    const h2 = document.createElement('h2')
    const linesList = document.createElement('ul')

    h2.textContent = hexagram.number

    const hexLinesStr = hexagram.lines
    for (const i in hexLinesStr) {
      const line = hexLinesStr[i]
      const listItem = document.createElement('li')
      listItem.setAttribute('class', `${setLineCssClass(parseInt(line))}`)
      linesList.appendChild(listItem)
    }
    article.appendChild(h2)
    article.appendChild(linesList)

    section.appendChild(article)
  }
}

populate()
