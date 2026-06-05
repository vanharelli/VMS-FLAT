import { useEffect, useMemo, useState } from 'react'

type Translations = Record<string, string>

const translations = {
  pt: {
    reservar: 'Reservar',
    hero_eyebrow: '<strong>Summer Park Brasília - DF</strong>',
    hero_sub: 'Sofisticação & Conforto — Por Diária ou Temporada',
    verificar_disponibilidade: 'Verificar Disponibilidade',
    conhecer_flat: 'Conhecer o Flat',
    scroll: 'Scroll',
    galeria_label: 'O Espaço',
    galeria_title: 'Cada detalhe cuidadosamente pensado',
    galeria_desc:
      'Ambientes amplos e modernos, decoração premium, equipamentos de última geração — tudo para transformar sua estadia em uma experiência inesquecível.',
    reserva_direta_label: 'Reserva Direta',
    desconto_headline: 'Economize até <strong>20%</strong><br>reservando diretamente',
    reservar_agora: 'Reservar Agora',
    comodidades_label: 'Comodidades',
    comodidades_title: 'Tudo o que você precisa e merece',
    wifi: 'Wi‑Fi Ultra Rápido',
    wifi_desc: 'Fibra 500 Mbps',
    parking: 'Estacionamento',
    parking_desc: 'Garagem coberta privativa',
    ac: 'Climatização',
    ac_desc: 'Ar-condicionado split',
    kitchen: 'Cozinha Equipada',
    kitchen_desc: 'Completa e moderna',
    laundry: 'Lavanderia',
    laundry_desc: 'Máquina de lavar e secar',
    security: 'Segurança 24h',
    security_desc: 'Portaria e câmeras',
    tv: 'Smart TV',
    tv_desc: 'Netflix e streamings',
    bed: 'Roupa de Cama',
    bed_desc: 'Enxoval premium incluso',
    superhost: 'Superhost',
    host_role: 'Anfitriã · Brasília, Brasil',
    host_bio:
      'Referência em hospitalidade em Brasília, Marina combina eficiência e acolhimento para garantir que cada estadia seja impecável. Seja para viagens de negócios ou lazer, sua dedicação transforma o VMS Flat em um lar temporário perfeito.',
    avaliacao: 'Avaliação',
    resposta: 'Profissional',
    resposta_rapida: '+3 anos hospedando',
    reviews_label: 'Avaliações',
    reviews_title: 'O que dizem nossos hóspedes',
    location_label: 'Localização',
    location_title: 'No coração de Brasília',
    endereco: 'Endereço',
    dist_park: '~7 km · ~10 min',
    dist_airport: '~16 km · ~25 min',
    dist_rod: '~11 km · ~15 min',
    dist_pp: '~8 km · ~12 min',
    dist_zoo: '~13 km · ~18 min',
    dist_pontao: '~12 km · ~20 min',
    reservar_local: 'Reservar Este Flat',
    brasilia_df: 'Brasília, DF',
    ver_mapa: 'Ver no Mapa ↗',
    footer_desc:
      'Flat de alto padrão em Brasília para estadias curtas e temporadas. Reserva direta, sem intermediários.',
    superhost_footer: '★ Superhost — Avaliação 5.0',
    navegacao: 'Navegação',
    o_flat: 'O Flat',
    comodidades_nav: 'Comodidades',
    avaliacoes_nav: 'Avaliações',
    localizacao_nav: 'Localização',
    reservas_nav: 'Reservas',
    contato: 'Contato',
    brasilia_footer: 'Brasília, DF — Brasil',
    check_in: 'Check-in: flexível',
    politica: 'Política de cancelamento',
    privacidade: 'Privacidade',
    todos_direitos: 'Todos os direitos reservados',
    termos: 'Termos',
    privacidade_footer: 'Privacidade',
    mapa_footer: 'Mapa',
    reserve_agora_float: 'Reserve Agora',
  },
  en: {
    reservar: 'Book Now',
    hero_eyebrow: '<strong>Summer Park Brasília - DF</strong>',
    hero_sub: 'Sophistication & Comfort — Daily or Extended Stays',
    verificar_disponibilidade: 'Check Availability',
    conhecer_flat: 'Explore the Flat',
    scroll: 'Scroll',
    galeria_label: 'The Space',
    galeria_title: 'Every detail thoughtfully designed',
    galeria_desc:
      'Spacious modern rooms, premium decor, state-of-the-art equipment — everything to make your stay unforgettable.',
    reserva_direta_label: 'Direct Booking',
    desconto_headline: 'Save up to <strong>20%</strong><br>booking directly',
    reservar_agora: 'Book Now',
    comodidades_label: 'Amenities',
    comodidades_title: 'Everything you need and deserve',
    wifi: 'Ultra-Fast Wi‑Fi',
    wifi_desc: '500 Mbps fiber',
    parking: 'Parking',
    parking_desc: 'Private covered garage',
    ac: 'Air Conditioning',
    ac_desc: 'Split AC units',
    kitchen: 'Full Kitchen',
    kitchen_desc: 'Fully equipped & modern',
    laundry: 'Laundry',
    laundry_desc: 'Washer and dryer',
    security: '24h Security',
    security_desc: 'Concierge & cameras',
    tv: 'Smart TV',
    tv_desc: 'Netflix & streaming',
    bed: 'Bed Linen',
    bed_desc: 'Premium linens included',
    superhost: 'Superhost',
    host_role: 'Host · Brasília, Brazil',
    host_bio:
      'A reference in Brasília hospitality, Marina blends efficiency with warmth to ensure every stay is flawless — whether for business or leisure.',
    avaliacao: 'Rating',
    resposta: 'Professional',
    resposta_rapida: '3+ years hosting',
    reviews_label: 'Reviews',
    reviews_title: 'What our guests say',
    location_label: 'Location',
    location_title: 'In the heart of Brasília',
    endereco: 'Address',
    dist_park: '~7 km · ~10 min',
    dist_airport: '~16 km · ~25 min',
    dist_rod: '~11 km · ~15 min',
    dist_pp: '~8 km · ~12 min',
    dist_zoo: '~13 km · ~18 min',
    dist_pontao: '~12 km · ~20 min',
    reservar_local: 'Book This Flat',
    brasilia_df: 'Brasília, DF',
    ver_mapa: 'View on Map ↗',
    footer_desc:
      'Premium flat in Brasília for short stays and extended seasons. Direct booking, no intermediaries.',
    superhost_footer: '★ Superhost — 5.0 Rating',
    navegacao: 'Navigation',
    o_flat: 'The Flat',
    comodidades_nav: 'Amenities',
    avaliacoes_nav: 'Reviews',
    localizacao_nav: 'Location',
    reservas_nav: 'Reservations',
    contato: 'Contact',
    brasilia_footer: 'Brasília, DF — Brazil',
    check_in: 'Check-in: flexible',
    politica: 'Cancellation policy',
    privacidade: 'Privacy',
    todos_direitos: 'All rights reserved',
    termos: 'Terms',
    privacidade_footer: 'Privacy',
    mapa_footer: 'Map',
    reserve_agora_float: 'Book Now',
  },
  es: {
    reservar: 'Reservar',
    hero_eyebrow: '<strong>Summer Park Brasília - DF</strong>',
    hero_sub: 'Sofisticación & Confort — Por Noche o Temporada',
    verificar_disponibilidade: 'Verificar Disponibilidad',
    conhecer_flat: 'Conocer el Flat',
    scroll: 'Scroll',
    galeria_label: 'El Espacio',
    galeria_title: 'Cada detalle cuidadosamente pensado',
    galeria_desc:
      'Ambientes modernos y amplios, decoración premium, equipamiento de última generación — todo para que tu estancia sea inolvidable.',
    reserva_direta_label: 'Reserva Directa',
    desconto_headline: 'Ahorra hasta <strong>20%</strong><br>reservando directamente',
    reservar_agora: 'Reservar Ahora',
    comodidades_label: 'Comodidades',
    comodidades_title: 'Todo lo que necesitas y mereces',
    wifi: 'Wi‑Fi Ultra Rápido',
    wifi_desc: 'Fibra 500 Mbps',
    parking: 'Estacionamiento',
    parking_desc: 'Garaje cubierto privado',
    ac: 'Climatización',
    ac_desc: 'Aire acondicionado split',
    kitchen: 'Cocina Equipada',
    kitchen_desc: 'Completa y moderna',
    laundry: 'Lavandería',
    laundry_desc: 'Lavadora y secadora',
    security: 'Seguridad 24h',
    security_desc: 'Portería y cámaras',
    tv: 'Smart TV',
    tv_desc: 'Netflix y streaming',
    bed: 'Ropa de Cama',
    bed_desc: 'Ajuar premium incluido',
    superhost: 'Superanfitriona',
    host_role: 'Anfitriona · Brasília, Brasil',
    host_bio:
      'Referente en hospitalidad en Brasília, Marina combina eficiencia y calidez para garantizar que cada estadía sea impecable — para negocios o placer.',
    avaliacao: 'Calificación',
    resposta: 'Profesional',
    resposta_rapida: '3+ años hospedando',
    reviews_label: 'Valoraciones',
    reviews_title: 'Lo que dicen nuestros huéspedes',
    location_label: 'Ubicación',
    location_title: 'En el corazón de Brasília',
    endereco: 'Dirección',
    dist_park: '~7 km · ~10 min',
    dist_airport: '~16 km · ~25 min',
    dist_rod: '~11 km · ~15 min',
    dist_pp: '~8 km · ~12 min',
    dist_zoo: '~13 km · ~18 min',
    dist_pontao: '~12 km · ~20 min',
    reservar_local: 'Reservar Este Flat',
    brasilia_df: 'Brasília, DF',
    ver_mapa: 'Ver en el Mapa ↗',
    footer_desc:
      'Apartamento de lujo en Brasília para estancias cortas y temporadas. Reserva directa, sin intermediarios.',
    superhost_footer: '★ Superanfitriona — Calificación 5.0',
    navegacao: 'Navegación',
    o_flat: 'El Flat',
    comodidades_nav: 'Comodidades',
    avaliacoes_nav: 'Valoraciones',
    localizacao_nav: 'Ubicación',
    reservas_nav: 'Reservas',
    contato: 'Contacto',
    brasilia_footer: 'Brasília, DF — Brasil',
    check_in: 'Check-in: flexible',
    politica: 'Política de cancelación',
    privacidade: 'Privacidad',
    todos_direitos: 'Todos los derechos reservados',
    termos: 'Términos',
    privacidade_footer: 'Privacidad',
    mapa_footer: 'Mapa',
    reserve_agora_float: 'Reservar Ahora',
  },
} as const satisfies Record<string, Translations>

type Lang = keyof typeof translations

export default function HomeScreen() {
  const address =
    'SGAS 910 Sul, Bloco H, AP 39 – Summer Park, Brasília – DF'
  const hostWhatsappE164 = '5561999999999'
  const mapsQuery = `Summer Park ${address}`
  const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`

  const [lang, setLangState] = useState<Lang>('pt')
  const [bookingOpen, setBookingOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState('')
  const [lightboxAlt, setLightboxAlt] = useState('')
  const [bookingStep, setBookingStep] = useState<0 | 1 | 2 | 3>(0)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState<1 | 2 | 3>(2)
  const [contactWhatsapp, setContactWhatsapp] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  const nearbyPlaces = useMemo(
    () => [
      {
        id: 'park',
        name: 'ParkShopping',
        imgSrc: '/parkshopping.webp',
        alt: 'ParkShopping',
        distKey: 'dist_park',
        mapsUrl: 'https://maps.google.com/?q=ParkShopping%20Bras%C3%ADlia',
      },
      {
        id: 'airport',
        name: 'Aeroporto JK',
        imgSrc: '/aeroporto.jpg',
        alt: 'Aeroporto JK',
        distKey: 'dist_airport',
        mapsUrl: 'https://maps.google.com/?q=Aeroporto%20Internacional%20de%20Bras%C3%ADlia%20JK',
      },
      {
        id: 'rod',
        name: 'Rodoviária',
        imgSrc: '/RodoviariaInterestadualde.jpg',
        alt: 'Rodoviária',
        distKey: 'dist_rod',
        mapsUrl: 'https://maps.google.com/?q=Rodovi%C3%A1ria%20de%20Bras%C3%ADlia',
      },
      {
        id: 'pp',
        name: 'Plano Piloto',
        imgSrc: '/planopiloto.jpg',
        alt: 'Plano Piloto',
        distKey: 'dist_pp',
        mapsUrl: 'https://maps.google.com/?q=Plano%20Piloto%20Bras%C3%ADlia',
      },
      {
        id: 'zoo',
        name: 'Zoológico de Brasília',
        imgSrc:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Monkey_island_-_Jardim_Zool%C3%B3gico_de_Bras%C3%ADlia_-_DSC09932.JPG/960px-Monkey_island_-_Jardim_Zool%C3%B3gico_de_Bras%C3%ADlia_-_DSC09932.JPG',
        alt: 'Zoológico de Brasília',
        distKey: 'dist_zoo',
        mapsUrl:
          'https://www.google.com/maps/place/Zool%C3%B3gico+de+Bras%C3%ADlia/@-15.8419417,-47.9688456,14z/data=!4m10!1m2!2m1!1szoologico!3m6!1s0x935a2feafc661aeb:0x99fba815a7ac0ef0!8m2!3d-15.8446334!4d-47.9433209!15sCgl6b29sb2dpY29aCyIJem9vbG9naWNvkgEDem9vmgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5hTVhGVVMwNW5FQUXgAQD6AQQIYxA1!16s%2Fg%2F11r_pmjcf?entry=ttu',
      },
      {
        id: 'pontao',
        name: 'Pontão do Lago Sul',
        imgSrc:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Brasilia_DF_Brasil_-_Pont%C3%A3o_do_Lago_Sul%2C_buganvilia_-_panoramio.jpg/960px-Brasilia_DF_Brasil_-_Pont%C3%A3o_do_Lago_Sul%2C_buganvilia_-_panoramio.jpg',
        alt: 'Pontão do Lago Sul',
        distKey: 'dist_pontao',
        mapsUrl:
          'https://www.google.com/maps/place/Pont%C3%A3o+Lago+Sul/@-15.8263411,-47.8760157,17z/data=!3m1!4b1!4m6!3m5!1s0x935a24dadcd2f683:0x113d72b3f829d11d!8m2!3d-15.8263463!4d-47.8734408!16s%2Fg%2F1pty6z59r?entry=ttu',
      },
    ],
    [],
  )

  const galleryTrackImages = useMemo(() => {
    if (galleryImages.length === 0) return []
    return [...galleryImages, ...galleryImages]
  }, [galleryImages])

  const resetBooking = () => {
    setBookingStep(0)
    setCheckIn('')
    setCheckOut('')
    setGuests(2)
    setContactWhatsapp('')
    setContactEmail('')
  }

  const openBooking = () => {
    resetBooking()
    setBookingOpen(true)
  }

  const closeBooking = () => {
    setBookingOpen(false)
  }

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src)
    setLightboxAlt(alt)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxSrc('')
    setLightboxAlt('')
  }

  const goNext = () => {
    if (!canGoNext) return
    setBookingStep((s) => (s < 3 ? ((s + 1) as 0 | 1 | 2 | 3) : s))
  }

  const goBack = () => {
    setBookingStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2 | 3) : s))
  }

  const canGoNext = useMemo(() => {
    if (bookingStep === 0) {
      if (!checkIn || !checkOut) return false
      return checkOut > checkIn
    }
    if (bookingStep === 1) return guests >= 1 && guests <= 3
    if (bookingStep === 2) {
      return contactWhatsapp.trim().length >= 8 && contactEmail.includes('@')
    }
    return true
  }, [bookingStep, checkIn, checkOut, guests, contactWhatsapp, contactEmail])

  const bookingMessage = useMemo(() => {
    const intro =
      lang === 'en'
        ? 'Hello! I would like to book the VMS Flat.'
        : lang === 'es'
          ? '¡Hola! Me gustaría reservar el VMS Flat.'
          : 'Olá! Gostaria de reservar o VMS Flat.'

    const lines = [
      intro,
      '',
      `Endereço: ${address}`,
      `Check-in: ${checkIn || '-'}`,
      `Check-out: ${checkOut || '-'}`,
      `Hóspedes: ${guests}`,
      '',
      'Contato:',
      `WhatsApp: ${contactWhatsapp || '-'}`,
      `E-mail: ${contactEmail || '-'}`,
      '',
      'Pode confirmar disponibilidade e valores?',
    ]
    return lines.join('\n')
  }, [lang, address, checkIn, checkOut, guests, contactWhatsapp, contactEmail])

  const sendToWhatsapp = () => {
    const url = `https://wa.me/${hostWhatsappE164}?text=${encodeURIComponent(bookingMessage)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  useEffect(() => {
    let cancelled = false

    const imageExists = (src: string) =>
      new Promise<boolean>((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = src
      })

    const loadGallery = async () => {
      const found: string[] = []
      let i = 1
      let misses = 0
      while (i <= 200 && misses < 2) {
        const src = `/images/${i}.webp`
        const ok = await imageExists(src)
        if (ok) {
          found.push(src)
          misses = 0
        } else {
          misses += 1
        }
        i += 1
      }

      if (!cancelled) setGalleryImages(found)
    }

    void loadGallery()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!bookingOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      closeBooking()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [bookingOpen])

  useEffect(() => {
    if (!lightboxOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      e.stopPropagation()
      if ('stopImmediatePropagation' in e) e.stopImmediatePropagation()
      closeLightbox()
    }

    document.addEventListener('keydown', onKeyDown, { capture: true })
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown, { capture: true })
    }
  }, [lightboxOpen])

  useEffect(() => {
    const setLang = (lang: Lang) => {
      setLangState(lang)
      document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((b) => {
        b.classList.remove('active')
      })
      document.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((b) => {
        if (b.textContent?.toLowerCase() === lang) b.classList.add('active')
      })

      const t = translations[lang]
      document.querySelectorAll<HTMLElement>('[data-lang-key]').forEach((el) => {
        const key = el.dataset.langKey
        if (!key) return
        const val = t[key]
        if (val !== undefined) el.innerHTML = val
      })

      document.documentElement.lang = lang
    }

    setLang('pt')

    const langButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.lang-btn'))
    const onLangClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement | null
      const lang = btn?.textContent?.trim().toLowerCase()
      if (lang === 'pt' || lang === 'en' || lang === 'es') setLang(lang)
    }

    langButtons.forEach((b) => b.addEventListener('click', onLangClick))

    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    const cursorEnabled = window.matchMedia('(pointer: fine)').matches

    if (!cursorEnabled) {
      if (cursor) cursor.style.display = 'none'
      if (ring) ring.style.display = 'none'
      document.body.style.cursor = 'auto'
    }

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let rafId = 0

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (cursor) {
        cursor.style.left = `${mx}px`
        cursor.style.top = `${my}px`
      }
    }

    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring) {
        ring.style.left = `${rx}px`
        ring.style.top = `${ry}px`
      }
      rafId = window.requestAnimationFrame(animRing)
    }

    const interactive = cursorEnabled
      ? Array.from(document.querySelectorAll<HTMLElement>('a,button,[data-zoomable="true"]'))
      : []
    const enterHandlers = new Map<HTMLElement, () => void>()
    const leaveHandlers = new Map<HTMLElement, () => void>()

    if (cursorEnabled) {
      document.addEventListener('mousemove', onMouseMove)
      rafId = window.requestAnimationFrame(animRing)

      interactive.forEach((el) => {
        const onEnter = () => {
          if (cursor) {
            cursor.style.width = '20px'
            cursor.style.height = '20px'
          }
          if (ring) {
            ring.style.width = '60px'
            ring.style.height = '60px'
          }
        }

        const onLeave = () => {
          if (cursor) {
            cursor.style.width = '10px'
            cursor.style.height = '10px'
          }
          if (ring) {
            ring.style.width = '38px'
            ring.style.height = '38px'
          }
        }

        enterHandlers.set(el, onEnter)
        leaveHandlers.set(el, onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    const langBar = document.getElementById('lang-bar')
    const floatCta = document.getElementById('float-cta')
    const progressLine = document.getElementById('progress-line')
    const heroContent = document.querySelector<HTMLElement>('#hero .hero-content')

    const onScroll = () => {
      const st = window.scrollY
      const max = document.body.scrollHeight - window.innerHeight
      if (progressLine) {
        progressLine.style.width = max > 0 ? `${(st / max) * 100}%` : '0%'
      }

      if (langBar) {
        if (st > 80) langBar.classList.add('scrolled')
        else langBar.classList.remove('scrolled')
      }

      if (floatCta) {
        if (st > 400) floatCta.classList.add('show')
        else floatCta.classList.remove('show')
      }

      if (heroContent) {
        heroContent.style.transform = `translateY(${st * 0.35}px)`
        heroContent.style.opacity = `${1 - st / (window.innerHeight * 0.6)}`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return
          window.setTimeout(() => {
            entry.target.classList.add('visible')
          }, i * 60)
        })
      },
      { threshold: 0.12 },
    )

    reveals.forEach((el) => observer.observe(el))

    const track = document.getElementById('reviewsTrack')
    const cards = track ? Array.from(track.querySelectorAll<HTMLElement>('.review-card')) : []
    const total = cards.length
    let idx = 0

    const goTo = (n: number) => {
      if (!track) return
      if (total === 0) return
      idx = (n + total) % total
      const w = cards[0].offsetWidth + 32
      track.style.transform = `translateX(-${idx * w}px)`
    }

    const nextBtn = document.getElementById('nextBtn')
    const prevBtn = document.getElementById('prevBtn')
    const onNext = () => goTo(idx + 1)
    const onPrev = () => goTo(idx - 1)
    nextBtn?.addEventListener('click', onNext)
    prevBtn?.addEventListener('click', onPrev)

    const sliderInterval = window.setInterval(() => goTo(idx + 1), 5500)

    return () => {
      langButtons.forEach((b) => b.removeEventListener('click', onLangClick))
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mousemove', onMouseMove)
      window.cancelAnimationFrame(rafId)

      interactive.forEach((el) => {
        const onEnter = enterHandlers.get(el)
        const onLeave = leaveHandlers.get(el)
        if (onEnter) el.removeEventListener('mouseenter', onEnter)
        if (onLeave) el.removeEventListener('mouseleave', onLeave)
      })

      observer.disconnect()
      nextBtn?.removeEventListener('click', onNext)
      prevBtn?.removeEventListener('click', onPrev)
      window.clearInterval(sliderInterval)
    }
  }, [])

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursor-ring" />
      <div id="progress-line" />

      <header id="lang-bar">
        <div className="logo-nav">
          VMS <span>FLAT</span>
        </div>
        <nav className="nav-right">
          <div>
            <button className="lang-btn active" type="button" aria-label="Português (Brasil)">
              <span className="flag" aria-hidden="true">
                🇧🇷
              </span>
              <span className="lang-code">PT</span>
            </button>
            <span className="lang-sep">|</span>
            <button className="lang-btn" type="button" aria-label="English">
              <span className="flag" aria-hidden="true">
                🇺🇸
              </span>
              <span className="lang-code">EN</span>
            </button>
            <span className="lang-sep">|</span>
            <button className="lang-btn" type="button" aria-label="Español">
              <span className="flag" aria-hidden="true">
                🇪🇸
              </span>
              <span className="lang-code">ES</span>
            </button>
          </div>
          <button
            type="button"
            className="nav-reserve-btn btn-salmon-shimmer whatsapp-link"
            data-lang-key="reservar"
            onClick={openBooking}
          >
            Reservar
          </button>
        </nav>
      </header>

      <section id="hero">
        <div className="hero-video-wrap">
          <div className="hero-bg" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow" data-lang-key="hero_eyebrow">
            Brasília · Flat de Alto Padrão
          </p>
          <div className="hero-title">
            <img
              className="hero-logo"
              src="/logo2.png"
              alt="VMS Flat"
              loading="eager"
              decoding="async"
              data-zoomable="true"
              onClick={() => openLightbox('/logo2.png', 'VMS Flat')}
            />
          </div>
          <p className="hero-sub" data-lang-key="hero_sub">
            Sofisticação & Conforto — Por Diária ou Temporada
          </p>
          <div className="hero-cta-wrap">
            <button type="button" className="btn-primary btn-salmon-shimmer whatsapp-link" onClick={openBooking}>
              <span data-lang-key="verificar_disponibilidade">Verificar Disponibilidade</span>
            </button>
            <a href="#gallery" className="btn-ghost" data-lang-key="conhecer_flat">
              Conhecer o Flat
            </a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span className="scroll-text" data-lang-key="scroll">
            Scroll
          </span>
        </div>
      </section>

      <section id="gallery" className="section-pad">
        <div className="container gallery-header reveal">
          <p className="section-label" data-lang-key="galeria_label">
            O Espaço
          </p>
          <h2 className="section-title" data-lang-key="galeria_title">
            Cada detalhe
            <br />
            <em>cuidadosamente</em> pensado
          </h2>
          <div className="gold-divider" />
          <p
            style={{ fontSize: '.8rem', color: 'var(--text-mid)', maxWidth: 500, lineHeight: 1.9 }}
            data-lang-key="galeria_desc"
          >
            Ambientes amplos e modernos, decoração premium, equipamentos de última geração — tudo para transformar sua
            estadia em uma experiência inesquecível.
          </p>
        </div>
        <div className="gallery-track-wrap" style={{ marginTop: 60 }}>
          <div className="gallery-zoom-hint" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="gallery-zoom-icon">
              <path
                d="M10.5 18a7.5 7.5 0 1 1 5.165-12.94A7.5 7.5 0 0 1 10.5 18Zm0-13a5.5 5.5 0 1 0 3.889 9.389A5.5 5.5 0 0 0 10.5 5Zm7.854 14.146-3.2-3.2 1.414-1.414 3.2 3.2-1.414 1.414Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="gallery-track" id="galleryTrack">
            {galleryTrackImages.length > 0 ? (
              galleryTrackImages.map((src, idx) => {
                const baseIndex = galleryImages.length > 0 ? (idx % galleryImages.length) + 1 : idx + 1
                const label = String(baseIndex).padStart(2, '0')
                return (
                  <div
                    className="gallery-card"
                    key={`${src}-${idx}`}
                    data-zoomable="true"
                    onClick={() => openLightbox(src, `Foto ${label}`)}
                  >
                    <img className="gc-img" src={src} alt={`Foto ${label}`} loading="lazy" decoding="async" />
                    <div className="gcard-overlay">
                      <span className="gc-label">{`VMS Flat · ${label}`}</span>
                    </div>
                  </div>
                )
              })
            ) : (
              <>
                <div className="gallery-card">
                  <div className="gc-ph">Carregando…</div>
                </div>
                <div className="gallery-card">
                  <div className="gc-ph">Carregando…</div>
                </div>
                <div className="gallery-card">
                  <div className="gc-ph">Carregando…</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <div id="cta-banner">
        <div className="container reveal">
          <div className="cta-inner">
            <div className="cta-text">
              <p className="eyebrow" data-lang-key="reserva_direta_label">
                Reserva Direta
              </p>
              <h2 className="headline" data-lang-key="desconto_headline">
                Economize até <strong>20%</strong>
                <br />
                reservando diretamente
              </h2>
            </div>
            <div className="cta-actions">
              <button
                type="button"
                className="btn-dark btn-salmon-shimmer whatsapp-link"
                data-lang-key="reservar_agora"
                onClick={openBooking}
              >
                Reservar Agora
              </button>
            </div>
          </div>
        </div>
      </div>

      <section id="amenities" className="section-pad">
        <div className="container">
          <div className="reveal">
            <p className="section-label" data-lang-key="comodidades_label">
              Comodidades
            </p>
            <h2 className="section-title" data-lang-key="comodidades_title">
              Tudo o que você
              <br />
              <em>precisa e merece</em>
            </h2>
          </div>
          <div className="amenities-grid">
            <div className="amenity-item reveal">
              <span className="amenity-icon">📶</span>
              <div className="amenity-name" data-lang-key="wifi">
                Wi‑Fi Ultra Rápido
              </div>
              <div className="amenity-desc" data-lang-key="wifi_desc">
                Fibra 500 Mbps
              </div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">🚗</span>
              <div className="amenity-name" data-lang-key="parking">
                Estacionamento
              </div>
              <div className="amenity-desc" data-lang-key="parking_desc">
                Garagem coberta privativa
              </div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">❄️</span>
              <div className="amenity-name" data-lang-key="ac">
                Climatização
              </div>
              <div className="amenity-desc" data-lang-key="ac_desc">
                Ar-condicionado split
              </div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">🍳</span>
              <div className="amenity-name" data-lang-key="kitchen">
                Cozinha Equipada
              </div>
              <div className="amenity-desc" data-lang-key="kitchen_desc">
                Completa e moderna
              </div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">🧺</span>
              <div className="amenity-name" data-lang-key="laundry">
                Lavanderia
              </div>
              <div className="amenity-desc" data-lang-key="laundry_desc">
                Máquina de lavar e secar
              </div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">🔒</span>
              <div className="amenity-name" data-lang-key="security">
                Segurança 24h
              </div>
              <div className="amenity-desc" data-lang-key="security_desc">
                Portaria e câmeras
              </div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">📺</span>
              <div className="amenity-name" data-lang-key="tv">
                Smart TV
              </div>
              <div className="amenity-desc" data-lang-key="tv_desc">
                Netflix e streamings
              </div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">🛏️</span>
              <div className="amenity-name" data-lang-key="bed">
                Roupa de Cama
              </div>
              <div className="amenity-desc" data-lang-key="bed_desc">
                Enxoval premium incluso
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="host" className="section-pad">
        <div className="container">
          <div className="host-inner">
            <div className="host-visual reveal-left">
              <h1 className="host-title">Nossa Anfitriã</h1>
              <div className="host-frame">
                <img
                  className="host-photo"
                  src="/fotobio.webp"
                  alt="Foto da anfitriã"
                  loading="lazy"
                  decoding="async"
                  data-zoomable="true"
                  onClick={() => openLightbox('/fotobio.webp', 'Foto da anfitriã')}
                />
              </div>
              <div className="host-badge-wrap">
                <div className="badge-label" data-lang-key="superhost">
                  Superhost
                </div>
                <div className="badge-val">★ 5.0</div>
              </div>
            </div>
            <div className="host-info reveal-right">
              <div className="host-stars">★★★★★</div>
              <h2 className="host-name">Marina</h2>
              <p className="host-role" data-lang-key="host_role">
                Anfitriã · Brasília, Brasil
              </p>
              <p className="host-bio" data-lang-key="host_bio">
                Referência em hospitalidade em Brasília, Marina combina eficiência e acolhimento para garantir que cada
                estadia seja impecável. Seja para viagens de negócios ou lazer, sua dedicação transforma o VMS Flat em um
                lar temporário perfeito.
              </p>
              <div className="host-stats">
                <div className="hstat reveal">
                  <span className="hstat-num">5.0</span>
                  <span className="hstat-label" data-lang-key="avaliacao">
                    Avaliação
                  </span>
                </div>
                <div className="hstat reveal">
                  <span className="hstat-num">100%</span>
                  <span className="hstat-label" data-lang-key="resposta">
                    Resposta
                  </span>
                </div>
                <div className="hstat reveal">
                  <span className="hstat-num">⚡</span>
                  <span className="hstat-label" data-lang-key="resposta_rapida">
                    Resposta Rápida
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="section-pad">
        <div className="container">
          <div className="reveal">
            <p className="section-label" data-lang-key="reviews_label">
              Avaliações
            </p>
            <h2 className="section-title" data-lang-key="reviews_title">
              O que dizem
              <br />
              nossos <em>hóspedes</em>
            </h2>
          </div>
          <div className="reviews-slider">
            <div className="reviews-track" id="reviewsTrack">
              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">
                  "Experiência absolutamente incrível. O flat é lindo, limpo, e a localização é perfeita. Marina respondeu
                  todas as mensagens em minutos. Com certeza voltarei."
                </p>
                <div className="review-author">
                  <div className="review-avatar">A</div>
                  <div>
                    <div className="review-name">Ana Clara S.</div>
                    <div className="review-origin">São Paulo, Brasil</div>
                  </div>
                </div>
              </div>
              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">
                  "Perfect stay for a business trip. Spotless, well-equipped, and Marina was incredibly attentive. The
                  location is ideal for Brasília — close to everything."
                </p>
                <div className="review-author">
                  <div className="review-avatar">J</div>
                  <div>
                    <div className="review-name">James T.</div>
                    <div className="review-origin">London, UK</div>
                  </div>
                </div>
              </div>
              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">
                  "Hospedagem impecável, apartamento decorado com muito gosto e todas as comodidades que precisamos.
                  Recomendo sem hesitar para quem busca conforto em Brasília."
                </p>
                <div className="review-author">
                  <div className="review-avatar">R</div>
                  <div>
                    <div className="review-name">Ricardo M.</div>
                    <div className="review-origin">Belo Horizonte, Brasil</div>
                  </div>
                </div>
              </div>
              <div className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">
                  "Excelente ubicación y apartamento de lujo. Marina es una anfitriona excepcional, muy atenta y eficiente.
                  Volvería sin dudarlo."
                </p>
                <div className="review-author">
                  <div className="review-avatar">C</div>
                  <div>
                    <div className="review-name">Carlos R.</div>
                    <div className="review-origin">Buenos Aires, Argentina</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="slider-controls">
            <button className="slider-btn" id="prevBtn">
              ←
            </button>
            <button className="slider-btn" id="nextBtn">
              →
            </button>
          </div>
        </div>
      </section>

      <section id="location" className="section-pad">
        <div className="container">
          <div className="reveal">
            <p className="section-label" data-lang-key="location_label">
              Localização
            </p>
            <h2 className="section-title" data-lang-key="location_title">
              No coração
              <br />
              <em>de Brasília</em>
            </h2>
          </div>
          <div className="location-grid">
            <div className="location-info reveal-left">
              <div className="nearby-grid">
                {nearbyPlaces.map((p) => (
                  <a
                    key={p.id}
                    className="nearby-card reveal"
                    href={p.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="nearby-media">
                      <img
                        className="nearby-img"
                        src={p.imgSrc}
                        alt={p.alt}
                        loading="lazy"
                        decoding="async"
                        data-zoomable="true"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          openLightbox(p.imgSrc, p.alt)
                        }}
                      />
                    </div>
                    <div className="nearby-content">
                      <div className="nearby-name">{p.name}</div>
                      <div className="nearby-dist" data-lang-key={p.distKey}>
                        —
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ marginTop: 32 }}>
                <button
                  type="button"
                  className="btn-primary btn-salmon-shimmer whatsapp-link"
                  style={{ display: 'inline-block' }}
                  onClick={openBooking}
                >
                  <span data-lang-key="reservar_local">Reservar Este Flat</span>
                </button>
              </div>
            </div>
            <div className="reveal-right">
              <div className="map-placeholder">
                <iframe
                  className="map-embed"
                  title="Mapa — Summer Park"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapsEmbedSrc}
                />
                <div className="map-label">Summer Park</div>
                <div className="map-cta">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(mapsQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-map"
                    data-lang-key="ver_mapa"
                  >
                    Ver no Mapa ↗
                  </a>
                </div>
              </div>
              <div className="location-address location-address-below">
                <div className="addr-label" data-lang-key="endereco">
                  Endereço
                </div>
                <div className="addr-text">{address}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand reveal">
              <span className="logo">VMS Flat</span>
              <p data-lang-key="footer_desc">
                Flat de alto padrão em Brasília para estadias curtas e temporadas. Reserva direta, sem intermediários.
              </p>
              <div className="gold-divider" style={{ marginTop: 24 }} />
              <p style={{ fontSize: '.65rem', color: 'var(--gold)', marginTop: 4 }} data-lang-key="superhost_footer">
                ★ Superhost — Avaliação 5.0
              </p>
            </div>
            <div className="footer-col reveal">
              <h4 data-lang-key="navegacao">Navegação</h4>
              <ul>
                <li data-lang-key="o_flat">O Flat</li>
                <li data-lang-key="comodidades_nav">Comodidades</li>
                <li data-lang-key="avaliacoes_nav">Avaliações</li>
                <li data-lang-key="localizacao_nav">Localização</li>
                <li>
                  <button
                    type="button"
                    className="whatsapp-link"
                    style={{ color: 'inherit', textDecoration: 'none', background: 'none', border: 'none', padding: 0 }}
                    data-lang-key="reservas_nav"
                    onClick={openBooking}
                  >
                    Reservas
                  </button>
                </li>
              </ul>
            </div>
            <div className="footer-col reveal">
              <h4 data-lang-key="contato">Contato</h4>
              <ul>
                <li>
                  <a
                    href="https://wa.me/5561999999999"
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-link"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    WhatsApp
                  </a>
                </li>
                <li>{address}</li>
                <li data-lang-key="brasilia_footer">Brasília, DF — Brasil</li>
                <li data-lang-key="check_in">Check-in: flexível</li>
                <li data-lang-key="politica">Política de cancelamento</li>
                <li data-lang-key="privacidade">Privacidade</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">
              © 2025 VMS Flat — <span data-lang-key="todos_direitos">Todos os direitos reservados</span>
            </div>
            <div className="footer-links">
              <a href="#" data-lang-key="termos">
                Termos
              </a>
              <a href="#" data-lang-key="privacidade_footer">
                Privacidade
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noreferrer"
                data-lang-key="mapa_footer"
              >
                Mapa
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div id="float-cta">
        <button type="button" className="float-btn btn-salmon-shimmer whatsapp-link" onClick={openBooking}>
          <span className="float-icon">💬</span>
          <span data-lang-key="reserve_agora_float">Reserve Agora</span>
        </button>
      </div>

      {bookingOpen && (
        <div
          className="modal-overlay"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeBooking()
          }}
        >
          <div className="modal" role="dialog" aria-modal="true" aria-label="Reserva">
            <div className="modal-head">
              <div className="modal-title">Reserva</div>
              <button type="button" className="modal-close" onClick={closeBooking}>
                ×
              </button>
            </div>

            <div className="modal-stepper">
              <div className={['step', bookingStep === 0 ? 'active' : '', bookingStep > 0 ? 'done' : ''].filter(Boolean).join(' ')}>
                1 · Datas
              </div>
              <div className={['step', bookingStep === 1 ? 'active' : '', bookingStep > 1 ? 'done' : ''].filter(Boolean).join(' ')}>
                2 · Hóspedes
              </div>
              <div className={['step', bookingStep === 2 ? 'active' : '', bookingStep > 2 ? 'done' : ''].filter(Boolean).join(' ')}>
                3 · Contato
              </div>
              <div className={['step', bookingStep === 3 ? 'active' : ''].filter(Boolean).join(' ')}>
                4 · Resumo
              </div>
            </div>

            <div className="modal-body">
              {bookingStep === 0 && (
                <div className="modal-grid">
                  <div className="field">
                    <label className="label" htmlFor="checkin">
                      Check-in
                    </label>
                    <input
                      id="checkin"
                      className="input"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="checkout">
                      Check-out
                    </label>
                    <input
                      id="checkout"
                      className="input"
                      type="date"
                      min={checkIn || undefined}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                  <div className="hint">
                    Endereço: <span className="hint-strong">{address}</span>
                  </div>
                </div>
              )}

              {bookingStep === 1 && (
                <div className="modal-grid">
                  <div className="field">
                    <label className="label" htmlFor="guests">
                      Quantidade de hóspedes (máx. 3)
                    </label>
                    <select
                      id="guests"
                      className="input"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value) as 1 | 2 | 3)}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="modal-grid">
                  <div className="field">
                    <label className="label" htmlFor="contact-whatsapp">
                      WhatsApp
                    </label>
                    <input
                      id="contact-whatsapp"
                      className="input"
                      inputMode="tel"
                      placeholder="(61) 9xxxx-xxxx"
                      value={contactWhatsapp}
                      onChange={(e) => setContactWhatsapp(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="contact-email">
                      E-mail
                    </label>
                    <input
                      id="contact-email"
                      className="input"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="modal-grid">
                  <div className="summary">
                    <div className="summary-row">
                      <span className="summary-k">Check-in</span>
                      <span className="summary-v">{checkIn}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-k">Check-out</span>
                      <span className="summary-v">{checkOut}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-k">Hóspedes</span>
                      <span className="summary-v">{guests}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-k">WhatsApp</span>
                      <span className="summary-v">{contactWhatsapp}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-k">E-mail</span>
                      <span className="summary-v">{contactEmail}</span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="msg">
                      Mensagem (pré-formatada)
                    </label>
                    <textarea id="msg" className="textarea" readOnly value={bookingMessage} rows={8} />
                  </div>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button type="button" className="modal-btn modal-btn-ghost" disabled={bookingStep === 0} onClick={goBack}>
                Voltar
              </button>

              {bookingStep < 3 ? (
                <button
                  type="button"
                  className="modal-btn modal-btn-primary btn-salmon-shimmer"
                  disabled={!canGoNext}
                  onClick={goNext}
                >
                  Continuar
                </button>
              ) : (
                <button
                  type="button"
                  className="modal-btn modal-btn-primary btn-salmon-shimmer"
                  onClick={() => {
                    sendToWhatsapp()
                    closeBooking()
                  }}
                >
                  Enviar no WhatsApp
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {lightboxOpen && lightboxSrc && (
        <div
          className="lightbox-overlay"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeLightbox()
          }}
        >
          <div className="lightbox" role="dialog" aria-modal="true" aria-label="Imagem ampliada">
            <button type="button" className="lightbox-close" aria-label="Fechar" onClick={closeLightbox}>
              ×
            </button>
            <img className="lightbox-img" src={lightboxSrc} alt={lightboxAlt || 'Imagem ampliada'} />
          </div>
        </div>
      )}
    </>
  )
}
