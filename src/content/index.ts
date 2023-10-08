console.info('chrome-ext template-vue-ts content script')

type Ad = {
  title: string,
  url: string,
  imageUrl: string
}

const ADS: Ad[] = [
  {
    title: 'Coca Cola - Taste of coke',
    url: 'https://coca-cola.com',
    imageUrl: chrome.runtime.getURL('img/ads/coca-cola.jpg')
  },
  {
    title: 'Dominos - Best Pizza Ukraine',
    url: 'https://dominos.ua',
    imageUrl: chrome.runtime.getURL('img/ads/dominos.jpg')
  },
  {
    title: 'Квіти по доступним цінам',
    url: 'https://kvitkoviy-ray.com.ua/ua/',
    imageUrl: chrome.runtime.getURL('img/ads/flower-heaven.jpg')
  },
  {
    title: 'Розблокуйте свій компʼютер',
    url: 'https://myrotvorets.center/',
    imageUrl: chrome.runtime.getURL('img/ads/gay-porn.jpg')
  },
  {
    title: 'Золотий Вік - тобі личить моє кохання 🥰',
    url: 'https://zolotoyvek.ua/ua',
    imageUrl: chrome.runtime.getURL('img/ads/golden-age.jpg')
  },
  {
    title: 'Inc-Dev - make software great again',
    url: 'https://www.linkedin.com/company/98501224',
    imageUrl: chrome.runtime.getURL('img/ads/inc-dev.jpg')
  },
  {
    title: 'Ласунка - ням ням бом бом',
    url: 'https://lasunka.com',
    imageUrl: chrome.runtime.getURL('img/ads/lasunka.jpg')
  },
  {
    title: 'Містер Пропер - лисий і сильний',
    url: 'https://eva.ua/brnd-73018/',
    imageUrl: chrome.runtime.getURL('img/ads/mister-muscle.jpg')
  },
  {
    title: 'Несквік - Гаряча штучка',
    url: 'https://www.nestle.ua/brands/fast_breakfasts/nesquik',
    imageUrl: chrome.runtime.getURL('img/ads/nesquick.jpg')
  },
  {
    title: 'Армія, мова, віра!',
    url: 'https://www.roshen.com/en',
    imageUrl: chrome.runtime.getURL('img/ads/powder.jpg')
  },
  {
    title: 'Sweet.tv - не забудьте відмінити підписку',
    url: 'https://sweet.tv',
    imageUrl: chrome.runtime.getURL('img/ads/sweet-tv.jpg')
  },
  {
    title: 'Не пий пиво - будь як риба',
    url: 'https://us.budweiser.com/',
    imageUrl: chrome.runtime.getURL('img/ads/wwf.jpg')
  },
]

const css = `

`

const dominosImageUrl = chrome.runtime.getURL('img/ads/dominos.jpg')

const AD_LENGTH_SECONDS = 10

const ICON_DISABLED_COLOR = 'rgba(0, 0, 0, 0.5)'
const ICON_ENABLED_COLOR = 'rgba(0, 0, 0, 1)'

const cssElement = document.createElement('style') as HTMLStyleElement

if ('styleSheet' in cssElement) {
  (cssElement.styleSheet as {cssText: string}).cssText = css;
} else {
  cssElement.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(cssElement);

const getRandomAd = () => {
  const adsCount = ADS.length
  const adIndex = Math.floor(Math.random() * adsCount)
  return ADS[adIndex]
}

const createModal = () => {
  let closeButtonEnableSecondsLeft: number

  const modalElement = document.createElement('div')

  modalElement.style.position = 'fixed'
  modalElement.style.width = '100vw'
  modalElement.style.height = '100vh'
  modalElement.style.top = '0'
  modalElement.style.left = '0'
  modalElement.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'
  modalElement.style.zIndex = '2140000000'
  modalElement.style.display = 'grid'
  modalElement.style.placeItems = 'center'

  const modalContentElement = document.createElement('a') as HTMLAnchorElement

  modalContentElement.href = '#'
  modalContentElement.target = '_blank'

  modalContentElement.style.backgroundColor = 'rgba(240, 240, 240, 1)'
  modalContentElement.style.width = '50vw'
  modalContentElement.style.borderRadius = '12px'
  modalContentElement.style.overflow = 'hidden'
  modalContentElement.style.position = 'relative'
  modalContentElement.style.display = 'grid'

  const closeButtonWrapper = document.createElement('div')

  closeButtonWrapper.style.position = 'absolute'
  closeButtonWrapper.style.background = 'white'
  closeButtonWrapper.style.paddingRight = '3px'
  closeButtonWrapper.style.paddingLeft = '15px'
  closeButtonWrapper.style.paddingBlock = '3px'
  closeButtonWrapper.style.borderRadius = '80px'
  closeButtonWrapper.style.top = '20px'
  closeButtonWrapper.style.right = '20px'
  closeButtonWrapper.style.display = 'flex'
  closeButtonWrapper.style.flexDirection = 'row-reverse'
  closeButtonWrapper.style.alignItems = 'center'
  closeButtonWrapper.style.boxShadow = '0px 0px 10px 0px rgba(16,16,16,0.1)'
  closeButtonWrapper.style.gap = '10px'
  closeButtonWrapper.style.zIndex = '2140000020'

  const closeButton = document.createElement('button') as HTMLButtonElement
  closeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="var(--icon-color)" d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m2.59 6L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41L14.59 8Z"/></svg>
  `

  closeButton.style.display = 'grid'
  closeButton.style.placeItems = 'center'
  closeButton.style.outline = 'none'
  closeButton.style.border = 'none'
  closeButton.style.aspectRatio = '1 / 1'
  closeButton.style.cursor = 'pointer'
  closeButton.style.padding = '0'
  closeButton.style.background = 'none'

  const onCloseButtonCLick = (event: Event) => {
    hideModal()
    event.stopPropagation()
  }

  const enableCloseButton = () => {
    closeButton.style.setProperty('--icon-color', ICON_ENABLED_COLOR)
    closeButton.disabled = false

    closeButton.addEventListener('click', onCloseButtonCLick)
  }

  const disableCloseButton = () => {
    closeButton.style.setProperty('--icon-color', ICON_DISABLED_COLOR)
    closeButton.disabled = true

    closeButton.removeEventListener('click', onCloseButtonCLick)
  }

  disableCloseButton()

  closeButtonWrapper.appendChild(closeButton)

  const closeButtonTimeLeft = document.createElement('div')

  closeButtonTimeLeft.style.fontWeight = '600'
  closeButtonTimeLeft.style.color = 'rgb(20, 20, 20)'
  closeButtonTimeLeft.style.fontFamily = 'Open Sans, sans-serif'
  closeButtonTimeLeft.style.fontSize = '12px'

  const updateTimeLeftText = (timeLeft: number) => {
    if(timeLeft > 0) {
      closeButtonTimeLeft.innerText = `${timeLeft} seconds left`
      return
    }

    closeButtonTimeLeft.innerText = `You can close this now`
  }

  closeButtonWrapper.appendChild(closeButtonTimeLeft)

  modalContentElement.appendChild(closeButtonWrapper)


  const adImage = document.createElement('img') as HTMLImageElement

  adImage.src = dominosImageUrl
  adImage.style.width = '100%'

  modalContentElement.appendChild(adImage)

  const adMeta = document.createElement('div') as HTMLDivElement

  adMeta.style.position = 'absolute'
  adMeta.style.boxSizing = 'border-box'
  adMeta.style.paddingBottom = '50px'
  adMeta.style.display = 'flex'
  adMeta.style.flexDirection = 'column'
  adMeta.style.alignItems = 'center'
  adMeta.style.justifyContent = 'end'
  adMeta.style.bottom = '0'
  adMeta.style.left = '0'
  adMeta.style.width = '100%'
  adMeta.style.height = '100%'
  adMeta.style.background = 'linear-gradient(rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0.8) 100%)'
  adMeta.style.opacity = '0'
  adMeta.style.transition = '.4s all ease-in-out'
  adMeta.style.zIndex = '2140000010'

  const adMetaTitle = document.createElement('div')

  adMetaTitle.innerText = 'Ad title'
  adMetaTitle.style.fontSize = '30px'
  adMetaTitle.style.color = 'white'
  adMetaTitle.style.fontFamily= 'Roboto, sans-serif'

  adMeta.appendChild(adMetaTitle)

  modalContentElement.appendChild(adMeta)

  modalContentElement.addEventListener('mouseenter', () => {
    adMeta.style.opacity = '1'
  })

  modalContentElement.addEventListener('mouseleave', () => {
    adMeta.style.opacity = '0'
  })

  modalElement.appendChild(modalContentElement)

  const setCurrentAd = (ad: Ad) => {
    adImage.src = ad.imageUrl
    adMetaTitle.innerText = ad.title
    modalContentElement.href = ad.url
  }

  const showModal = () => {
    closeButtonEnableSecondsLeft = AD_LENGTH_SECONDS
    updateTimeLeftText(closeButtonEnableSecondsLeft)

    disableCloseButton()
    setCurrentAd(getRandomAd())

    const enableCloseButtonInterval = setInterval(() => {
      closeButtonEnableSecondsLeft--
      updateTimeLeftText(closeButtonEnableSecondsLeft)

      if(closeButtonEnableSecondsLeft === 0) {
        enableCloseButton()
        clearInterval(enableCloseButtonInterval)
      }
    }, 1000)

    document.body.prepend(modalElement)
    document.documentElement.style.overflow = 'hidden'
  }

  const hideModal = () => {
    document.body.removeChild(modalElement)
    document.documentElement.style.overflow = 'auto'
  }

  return { 
    modalElement,
    showModal,
    hideModal
  }
}

const { showModal } = createModal()
showModal()

window.scrollTo({
  top: 0
})

export {}
