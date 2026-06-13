import { useEffect, useMemo, useState } from 'react'
import { animate, createTimeline } from 'animejs'

type Translations = Record<string, string>

const translations = {
  pt: {
    reservar: 'Reservar',
    hero_eyebrow: '<strong class="hero-place-strong">Summer Park · SGAS 910 Sul · Brasília, DF</strong>',
    hero_sub: 'Flat privativo na Asa Sul — reserve direto, sem taxas de plataforma',
    verificar_disponibilidade: 'Ver Disponibilidade',
    conhecer_flat: 'Conhecer o Flat',
    scroll: 'Scroll',
    galeria_label: 'O Espaço',
    galeria_title: 'Um flat pensado<br/><em>para quem exige</em> mais',
    galeria_desc:
      'Apartamento de 1 quarto no Summer Park, Asa Sul — cama queen, cozinha completa, ar-condicionado em todos os ambientes e condomínio fechado com portaria 24h. A 7 km do Parque da Cidade e 16 km do Aeroporto Internacional.',
    reserva_direta_label: 'Reserva Direta',
    desconto_headline: 'Sem taxas de plataforma.<br>Reserve aqui e <strong>pague o preço real</strong>',
    reservar_agora: 'Reservar Agora',
    comodidades_label: 'Comodidades',
    comodidades_title: 'O que você encontra<br/><em>quando chegar</em>',
    wifi: 'Wi‑Fi 5G',
    wifi_desc: 'Internet ultra-rápida e espaço de trabalho exclusivo',
    parking: 'Estacionamento',
    parking_desc: 'Vaga coberta gratuita no local (rotativa)',
    ac: 'Climatização',
    ac_desc: 'Ar-condicionado split silencioso',
    kitchen: 'Cozinha',
    kitchen_desc: 'Equipada com refrigerador, panelas, pratos e talheres',
    bathroom: 'Banheiro',
    bathroom_desc: 'Banheira, água quente e sabonete para o corpo',
    tv: 'Entretenimento',
    tv_desc: 'Smart TV de alta definição para streaming',
    bed: 'Itens Básicos',
    bed_desc: 'Toalhas, lençóis, sabonete e papel higiênico',
    laundry: 'Lavanderia',
    laundry_desc: 'Máquina de lavar e secar no condomínio',
    bedroom: 'Quarto',
    bedroom_desc: 'Closet espaçoso para organizar suas roupas',
    security: 'Segurança 24h',
    security_desc: 'Portaria e monitoramento por câmeras',
    superhost: 'Superhost',
    host_role: 'Anfitriã · Brasília, Brasil',
    host_bio:
      'Marina é anfitriã verificada no Summer Park há mais de 3 anos, com avaliação 5.0 em todas as estadias. Responde em menos de 1 hora, garante check-in sem burocracia e entrega o flat sempre impecável — sem surpresas, sem taxas ocultas.',
    avaliacao: 'Avaliação',
    resposta: 'Profissional',
    resposta_rapida: '+3 anos hospedando',
    reviews_label: 'Avaliações',
    reviews_title: 'O que dizem<br/>nossos <em>hóspedes</em>',
    location_label: 'Localização',
    location_title: 'No coração<br/><em>de Brasília</em>',
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
      'SGAS 910 Sul, Bloco H — Summer Park, Asa Sul, Brasília. Reserve direto, pague menos que no Airbnb e tenha atendimento direto com a anfitriã.',
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
    hero_eyebrow: '<strong class="hero-place-strong">Summer Park · SGAS 910 Sul · Brasília, DF</strong>',
    hero_sub: 'Private flat in Asa Sul — book direct, no platform fees',
    verificar_disponibilidade: 'Check Availability',
    conhecer_flat: 'Explore the Flat',
    scroll: 'Scroll',
    galeria_label: 'The Space',
    galeria_title: 'A flat designed<br/><em>for those who</em> expect more',
    galeria_desc:
      '1-bedroom apartment at Summer Park, Asa Sul — queen bed, full kitchen, AC in every room and 24h gated building. 7 km from Parque da Cidade and 16 km from Brasília International Airport.',
    reserva_direta_label: 'Direct Booking',
    desconto_headline: 'No platform fees.<br>Book here and <strong>pay the real price</strong>',
    reservar_agora: 'Book Now',
    comodidades_label: 'Amenities',
    comodidades_title: 'What you\'ll find<br/><em>when you arrive</em>',
    wifi: 'Wi‑Fi 5G',
    wifi_desc: 'Ultra-fast internet and dedicated workspace',
    parking: 'Parking',
    parking_desc: 'Free covered spot on site (rotating)',
    ac: 'Air Conditioning',
    ac_desc: 'Silent split AC unit',
    kitchen: 'Kitchen',
    kitchen_desc: 'Equipped with fridge, pots, plates and cutlery',
    bathroom: 'Bathroom',
    bathroom_desc: 'Bathtub, hot water and body soap',
    tv: 'Entertainment',
    tv_desc: 'High-definition Smart TV for streaming',
    bed: 'Basic Supplies',
    bed_desc: 'Towels, bed linen, soap and toilet paper',
    laundry: 'Laundry',
    laundry_desc: 'Washer and dryer in the building',
    bedroom: 'Bedroom',
    bedroom_desc: 'Spacious closet to organize your clothes',
    security: '24h Security',
    security_desc: 'Concierge and camera monitoring',
    superhost: 'Superhost',
    host_role: 'Host · Brasília, Brazil',
    host_bio:
      'Marina has been a verified host at Summer Park for over 3 years, maintaining a perfect 5.0 across every stay. She replies within the hour, delivers a hassle-free check-in, and hands over the flat in flawless condition — no hidden fees, no surprises.',
    avaliacao: 'Rating',
    resposta: 'Professional',
    resposta_rapida: '3+ years hosting',
    reviews_label: 'Reviews',
    reviews_title: 'What our<br/><em>guests</em> say',
    location_label: 'Location',
    location_title: 'In the heart<br/><em>of Brasília</em>',
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
      'SGAS 910 Sul, Bloco H — Summer Park, Asa Sul, Brasília. Book direct, pay less than on Airbnb, and deal straight with your host.',
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
    hero_eyebrow: '<strong class="hero-place-strong">Summer Park · SGAS 910 Sul · Brasília, DF</strong>',
    hero_sub: 'Flat privado en Asa Sul — reserva directo, sin tarifas de plataforma',
    verificar_disponibilidade: 'Ver Disponibilidad',
    conhecer_flat: 'Conocer el Flat',
    scroll: 'Scroll',
    galeria_label: 'El Espacio',
    galeria_title: 'Un flat pensado<br/><em>para quienes exigen</em> más',
    galeria_desc:
      'Apartamento de 1 dormitorio en Summer Park, Asa Sul — cama queen, cocina completa, aire acondicionado en todos los ambientes y edificio cerrado con portería 24h. A 7 km del Parque da Cidade y 16 km del aeropuerto.',
    reserva_direta_label: 'Reserva Directa',
    desconto_headline: 'Sin tarifas de plataforma.<br>Reserva aquí y <strong>paga el precio real</strong>',
    reservar_agora: 'Reservar Ahora',
    comodidades_label: 'Comodidades',
    comodidades_title: 'Lo que encontrarás<br/><em>cuando llegues</em>',
    wifi: 'Wi‑Fi 5G',
    wifi_desc: 'Internet ultrarrápida y espacio de trabajo exclusivo',
    parking: 'Estacionamiento',
    parking_desc: 'Plaza cubierta gratuita en el lugar (rotativa)',
    ac: 'Climatización',
    ac_desc: 'Aire acondicionado split silencioso',
    kitchen: 'Cocina',
    kitchen_desc: 'Equipada con refrigerador, ollas, platos y cubiertos',
    bathroom: 'Baño',
    bathroom_desc: 'Bañera, agua caliente y jabón corporal',
    tv: 'Entretenimiento',
    tv_desc: 'Smart TV de alta definición para streaming',
    bed: 'Artículos Básicos',
    bed_desc: 'Toallas, ropa de cama, jabón y papel higiénico',
    laundry: 'Lavandería',
    laundry_desc: 'Lavadora y secadora en el edificio',
    bedroom: 'Habitación',
    bedroom_desc: 'Amplio armario para organizar tu ropa',
    security: 'Seguridad 24h',
    security_desc: 'Portería y monitoreo por cámaras',
    superhost: 'Superanfitriona',
    host_role: 'Anfitriona · Brasília, Brasil',
    host_bio:
      'Marina es anfitriona verificada en Summer Park con más de 3 años de experiencia y calificación 5.0 en todas las estadías. Responde en menos de 1 hora, el check-in es sin complicaciones y el flat siempre está impecable — sin sorpresas, sin tarifas ocultas.',
    avaliacao: 'Calificación',
    resposta: 'Profesional',
    resposta_rapida: '3+ años hospedando',
    reviews_label: 'Valoraciones',
    reviews_title: 'Lo que dicen<br/>nuestros <em>huéspedes</em>',
    location_label: 'Ubicación',
    location_title: 'En el corazón<br/><em>de Brasília</em>',
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
      'SGAS 910 Sul, Bloco H — Summer Park, Asa Sul, Brasília. Reserva directo, paga menos que en Airbnb y trata directamente con la anfitriona.',
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
  // OpenStreetMap embed — Summer Park Bloco G, SGAS 910 Sul, Brasília DF
  // Exact coords from Google Maps: -15.8111341, -47.9137805
  const mapsEmbedSrc = 'https://www.openstreetmap.org/export/embed.html?bbox=-47.9238%2C-15.8180%2C-47.9038%2C-15.8040&layer=mapnik&marker=-15.8111%2C-47.9138&zoom=17'

  const [lang, setLangState] = useState<Lang>('pt')
  const t = (key: keyof typeof translations['pt']) => translations[lang][key]
  const setLang = (l: Lang) => { setLangState(l); document.documentElement.lang = l }
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
        imgSrc: '/aeroporto.webp',
        alt: 'Aeroporto JK',
        distKey: 'dist_airport',
        mapsUrl: 'https://maps.google.com/?q=Aeroporto%20Internacional%20de%20Bras%C3%ADlia%20JK',
      },
      {
        id: 'rod',
        name: 'Rodoviária',
        imgSrc: '/RodoviariaInterestadualde.webp',
        alt: 'Rodoviária',
        distKey: 'dist_rod',
        mapsUrl: 'https://maps.google.com/?q=Rodovi%C3%A1ria%20de%20Bras%C3%ADlia',
      },
      {
        id: 'pp',
        name: 'Plano Piloto',
        imgSrc: '/planopiloto.webp',
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

  const reviews = useMemo(
    () => [
      {
        stars: '★★★★★',
        text:
          '"Experiência absolutamente incrível. O flat é lindo, limpo, e a localização é perfeita. A comunicação foi rápida e eficiente. Com certeza voltarei."',
        name: 'Ana Clara S.',
        origin: 'São Paulo, Brasil',
      },
      {
        stars: '★★★★★',
        text:
          '"Perfect stay for a business trip. Spotless, well-equipped, and very attentive. The location is ideal for Brasília — close to everything."',
        name: 'James T.',
        origin: 'London, UK',
      },
      {
        stars: '★★★★★',
        text:
          '"Hospedagem impecável, apartamento decorado com muito gosto e todas as comodidades que precisamos. Recomendo sem hesitar para quem busca conforto em Brasília."',
        name: 'Ricardo M.',
        origin: 'Belo Horizonte, Brasil',
      },
      {
        stars: '★★★★★',
        text:
          '"Excelente ubicación y apartamento de lujo. Comunicación rápida y clara. Volvería sin dudarlo."',
        name: 'Carlos R.',
        origin: 'Buenos Aires, Argentina',
      },
      {
        stars: '★★★★★',
        text:
          '"Fiquei impressionada com a limpeza e o conforto. Check-in super fácil e uma sensação de segurança o tempo todo."',
        name: 'Fernanda L.',
        origin: 'Goiânia, Brasil',
      },
      {
        stars: '★★★★★',
        text:
          '"Ótima localização para compromissos no centro. Wi‑Fi rápido, cama confortável e tudo funcionando perfeitamente."',
        name: 'Bruno A.',
        origin: 'Curitiba, Brasil',
      },
      {
        stars: '★★★★★',
        text:
          '"Everything was exactly as described. Cozy vibe, great amenities, and the place feels premium from the moment you arrive."',
        name: 'Sarah K.',
        origin: 'Toronto, Canada',
      },
      {
        stars: '★★★★★',
        text:
          '"Muy cómodo y bien equipado. Excelente relación costo-beneficio y una experiencia muy agradable."',
        name: 'Lucía M.',
        origin: 'Madrid, España',
      },
      {
        stars: '★★★★★',
        text:
          '"Perfeito para casal. Cozinha completa, chuveiro excelente e localização ótima. Recomendo!"',
        name: 'Paulo V.',
        origin: 'Recife, Brasil',
      },
    ],
    [],
  )

  const reviewTrackItems = useMemo(() => [...reviews, ...reviews], [reviews])

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

  // Convert YYYY-MM-DD → DD/MM/YYYY (PT/ES) or MM/DD/YYYY (EN default)
  const formatDate = (iso: string) => {
    if (!iso) return '-'
    const [y, m, d] = iso.split('-')
    if (lang === 'en') return `${m}/${d}/${y}`
    return `${d}/${m}/${y}`
  }

  const bookingMessage = useMemo(() => {
    const fmtIn  = checkIn  ? (lang === 'en' ? checkIn.slice(5,7)+'/'+checkIn.slice(8,10)+'/'+checkIn.slice(0,4)   : checkIn.slice(8,10)+'/'+checkIn.slice(5,7)+'/'+checkIn.slice(0,4))   : '-'
    const fmtOut = checkOut ? (lang === 'en' ? checkOut.slice(5,7)+'/'+checkOut.slice(8,10)+'/'+checkOut.slice(0,4) : checkOut.slice(8,10)+'/'+checkOut.slice(5,7)+'/'+checkOut.slice(0,4)) : '-'

    if (lang === 'en') {
      return [
        '🏡 *VMS Flat — Booking Request*',
        '━━━━━━━━━━━━━━━━━━━━━',
        '',
        '📍 *Location*',
        `${address}`,
        `🗺️ https://maps.google.com/?q=-15.8111341,-47.9137805`,
        '',
        '📅 *Stay*',
        `  ▸ Check-in:   ${fmtIn}`,
        `  ▸ Check-out:  ${fmtOut}`,
        `  ▸ Guests:     ${guests}`,
        '',
        '📞 *Contact*',
        `  ▸ WhatsApp: ${contactWhatsapp || '-'}`,
        `  ▸ E-mail:   ${contactEmail || '-'}`,
        '',
        '━━━━━━━━━━━━━━━━━━━━━',
        'Could you confirm availability and rates? 🙏',
      ].join('\n')
    }

    if (lang === 'es') {
      return [
        '🏡 *VMS Flat — Solicitud de Reserva*',
        '━━━━━━━━━━━━━━━━━━━━━',
        '',
        '📍 *Ubicación*',
        `${address}`,
        `🗺️ https://maps.google.com/?q=-15.8111341,-47.9137805`,
        '',
        '📅 *Estadía*',
        `  ▸ Check-in:   ${fmtIn}`,
        `  ▸ Check-out:  ${fmtOut}`,
        `  ▸ Huéspedes:  ${guests}`,
        '',
        '📞 *Contacto*',
        `  ▸ WhatsApp: ${contactWhatsapp || '-'}`,
        `  ▸ E-mail:   ${contactEmail || '-'}`,
        '',
        '━━━━━━━━━━━━━━━━━━━━━',
        '¿Podría confirmar disponibilidad y valores? 🙏',
      ].join('\n')
    }

    return [
      '🏡 *VMS Flat — Solicitação de Reserva*',
      '━━━━━━━━━━━━━━━━━━━━━',
      '',
      '📍 *Localização*',
      `${address}`,
      `🗺️ https://maps.google.com/?q=-15.8111341,-47.9137805`,
      '',
      '📅 *Período*',
      `  ▸ Check-in:   ${fmtIn}`,
      `  ▸ Check-out:  ${fmtOut}`,
      `  ▸ Hóspedes:   ${guests}`,
      '',
      '📞 *Contato*',
      `  ▸ WhatsApp: ${contactWhatsapp || '-'}`,
      `  ▸ E-mail:   ${contactEmail || '-'}`,
      '',
      '━━━━━━━━━━━━━━━━━━━━━',
      'Pode confirmar disponibilidade e valores? 🙏',
    ].join('\n')
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
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    const cursorEnabled = window.matchMedia('(pointer: fine)').matches

    if (!cursorEnabled) {
      if (cursor) cursor.style.display = 'none'
      if (ring) ring.style.display = 'none'
      document.body.style.cursor = 'auto'
    }

    // ── Hero entrance animation ──
    const heroTargets = ['.hero-eyebrow', '.hero-logo', '.hero-sub', '.hero-cta-wrap', '.hero-scroll-hint']
    heroTargets.forEach((sel) => {
      const el = document.querySelector<HTMLElement>(sel)
      if (el) { el.style.opacity = '0'; el.style.transform = 'translateY(28px)' }
    })
    createTimeline({ defaults: { ease: 'outExpo' } })
      .add('.hero-eyebrow', { opacity: [0, 1], translateY: [28, 0], duration: 900 }, 300)
      .add('.hero-logo',    { opacity: [0, 1], translateY: [28, 0], scale: [0.94, 1], duration: 1000 }, 600)
      .add('.hero-sub',     { opacity: [0, 1], translateY: [20, 0], duration: 800 }, 900)
      .add('.hero-cta-wrap',{ opacity: [0, 1], translateY: [16, 0], duration: 700 }, 1100)
      .add('.hero-scroll-hint', { opacity: [0, 1], translateY: [12, 0], duration: 600 }, 1300)

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

    // Assign stagger index within each parent section for cascade delays
    reveals.forEach((el) => {
      const section = el.closest('section, footer, [id="cta-banner"]') || document.body
      const siblings = Array.from(section.querySelectorAll('.reveal, .reveal-left, .reveal-right'))
      const i = siblings.indexOf(el as Element)
      ;(el as HTMLElement).style.setProperty('--i', String(Math.min(i, 6)))
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = parseFloat(el.style.getPropertyValue('--i') || '0') * 80
          animate(el, {
            opacity: [0, 1],
            translateY: [32, 0],
            duration: 750,
            delay,
            ease: 'outExpo',
            onBegin: () => el.classList.add('visible'),
          })
          observer.unobserve(el)
        })
      },
      { threshold: 0.1 },
    )

    reveals.forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.opacity = '0'
      observer.observe(el)
    })

    // Gallery card 3D tilt via event delegation (cards render async)
    const galleryWrap = document.querySelector<HTMLElement>('.gallery-track-wrap')
    let tiltCard: HTMLElement | null = null

    const onGalleryMove = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>('.gallery-card')
      if (!card) {
        if (tiltCard) {
          tiltCard.style.transform = ''
          tiltCard.classList.remove('tilt-active')
          tiltCard = null
        }
        return
      }
      if (tiltCard && tiltCard !== card) {
        tiltCard.style.transform = ''
        tiltCard.classList.remove('tilt-active')
      }
      tiltCard = card
      card.classList.add('tilt-active')
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      card.style.transform = `perspective(700px) rotateY(${x * 11}deg) rotateX(${-y * 8}deg) scale(1.03)`
    }

    const onGalleryLeave = () => {
      if (tiltCard) {
        tiltCard.style.transform = ''
        tiltCard.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.4s ease'
        tiltCard.classList.remove('tilt-active')
        const captured = tiltCard
        window.setTimeout(() => { captured.style.transition = '' }, 500)
        tiltCard = null
      }
    }

    if (cursorEnabled && galleryWrap) {
      galleryWrap.addEventListener('mousemove', onGalleryMove)
      galleryWrap.addEventListener('mouseleave', onGalleryLeave)
    }

    // Magnetic effect on static CTA buttons
    const magneticEls = Array.from(
      document.querySelectorAll<HTMLElement>('#hero .btn-primary, #hero .btn-ghost, #float-cta .float-btn'),
    )
    const magneticEnter = new Map<HTMLElement, (e: MouseEvent) => void>()
    const magneticLeave = new Map<HTMLElement, () => void>()
    const magneticMove = new Map<HTMLElement, (e: MouseEvent) => void>()

    if (cursorEnabled) {
      magneticEls.forEach((btn) => {
        const onEnter = () => {
          btn.style.transition = 'transform 0.18s ease'
        }
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect()
          const x = (e.clientX - (rect.left + rect.width / 2)) * 0.22
          const y = (e.clientY - (rect.top + rect.height / 2)) * 0.22
          btn.style.transform = `translate(${x}px, ${y}px)`
        }
        const onLeave = () => {
          btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          btn.style.transform = 'translate(0, 0)'
          window.setTimeout(() => {
            btn.style.transition = ''
            btn.style.transform = ''
          }, 500)
        }
        magneticEnter.set(btn, onEnter)
        magneticMove.set(btn, onMove)
        magneticLeave.set(btn, onLeave)
        btn.addEventListener('mouseenter', onEnter)
        btn.addEventListener('mousemove', onMove)
        btn.addEventListener('mouseleave', onLeave)
      })
    }

    const track = document.getElementById('reviewsTrack')
    const cards = track ? Array.from(track.querySelectorAll<HTMLElement>('.review-card')) : []
    const total = Math.floor(cards.length / 2)
    let idx = 0

    const getStep = () => {
      if (!track) return 0
      if (!cards[0]) return 0
      const cs = window.getComputedStyle(track)
      const gapStr = cs.gap || cs.columnGap || '0px'
      const parsedGap = Number.parseFloat(gapStr.split(' ')[0] ?? '0')
      const gap = Number.isFinite(parsedGap) ? parsedGap : 32
      const w = cards[0].getBoundingClientRect().width
      return w + gap
    }

    const applyTransform = (animate: boolean) => {
      if (!track) return
      const step = getStep()
      if (step <= 0) return
      track.style.transition = animate ? 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
      track.style.transform = `translateX(-${idx * step}px)`
      if (!animate) {
        void track.offsetHeight
      }
    }

    const normalize = () => {
      if (!track) return
      if (total <= 0) return
      if (idx >= total) {
        idx -= total
        applyTransform(false)
        return
      }
      if (idx < 0) {
        idx += total
        applyTransform(false)
      }
    }

    const goNext = () => {
      if (!track) return
      if (total <= 0) return
      idx += 1
      applyTransform(true)
    }

    const goPrev = () => {
      if (!track) return
      if (total <= 0) return
      if (idx === 0) {
        idx = total
        applyTransform(false)
      }
      idx -= 1
      applyTransform(true)
    }

    const nextBtn = document.getElementById('nextBtn')
    const prevBtn = document.getElementById('prevBtn')
    nextBtn?.addEventListener('click', goNext)
    prevBtn?.addEventListener('click', goPrev)

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'transform') return
      normalize()
    }

    const onResize = () => {
      applyTransform(false)
    }

    applyTransform(false)
    track?.addEventListener('transitionend', onTransitionEnd)
    window.addEventListener('resize', onResize)

    const sliderInterval = window.setInterval(() => goNext(), 5500)

    // Stat counter animation via anime.js
    const statEls = Array.from(document.querySelectorAll<HTMLElement>('.hstat-num[data-count], .stat-num[data-count]'))
    const animateCounter = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count ?? '0')
      const decimals = parseInt(el.dataset.decimals ?? '0', 10)
      const suffix = el.dataset.suffix ?? ''
      const obj = { val: 0 }
      animate(obj, {
        val: target,
        duration: 1600,
        ease: 'outExpo',
        onUpdate: () => { el.textContent = obj.val.toFixed(decimals) + suffix },
      })
    }

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          animateCounter(entry.target as HTMLElement)
          statObserver.unobserve(entry.target)
        })
      },
      { threshold: 0.5 },
    )
    statEls.forEach((el) => statObserver.observe(el))

    return () => {
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
      statObserver.disconnect()
      track?.removeEventListener('transitionend', onTransitionEnd)
      window.removeEventListener('resize', onResize)
      nextBtn?.removeEventListener('click', goNext)
      prevBtn?.removeEventListener('click', goPrev)
      window.clearInterval(sliderInterval)

      if (galleryWrap) {
        galleryWrap.removeEventListener('mousemove', onGalleryMove)
        galleryWrap.removeEventListener('mouseleave', onGalleryLeave)
      }

      magneticEls.forEach((btn) => {
        const onEnter = magneticEnter.get(btn)
        const onMove = magneticMove.get(btn)
        const onLeave = magneticLeave.get(btn)
        if (onEnter) btn.removeEventListener('mouseenter', onEnter)
        if (onMove) btn.removeEventListener('mousemove', onMove)
        if (onLeave) btn.removeEventListener('mouseleave', onLeave)
      })
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
        <div className="lang-switcher">
          <button className={`lang-btn${lang === 'pt' ? ' active' : ''}`} type="button" aria-label="Português (Brasil)" onClick={() => setLang('pt')}>
            <img src="https://flagcdn.com/w20/br.png" srcSet="https://flagcdn.com/w40/br.png 2x" width="20" height="14" alt="BR" style={{ borderRadius: 2, display: 'block' }} />
            <span className="lang-code">PT</span>
          </button>
          <span className="lang-sep">|</span>
          <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} type="button" aria-label="English" onClick={() => setLang('en')}>
            <img src="https://flagcdn.com/w20/us.png" srcSet="https://flagcdn.com/w40/us.png 2x" width="20" height="14" alt="US" style={{ borderRadius: 2, display: 'block' }} />
            <span className="lang-code">EN</span>
          </button>
          <span className="lang-sep">|</span>
          <button className={`lang-btn${lang === 'es' ? ' active' : ''}`} type="button" aria-label="Español" onClick={() => setLang('es')}>
            <img src="https://flagcdn.com/w20/es.png" srcSet="https://flagcdn.com/w40/es.png 2x" width="20" height="14" alt="ES" style={{ borderRadius: 2, display: 'block' }} />
            <span className="lang-code">ES</span>
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="nav-reserve-btn btn-salmon-shimmer whatsapp-link"
            onClick={openBooking}
          >
            {t('reservar')}
          </button>
        </div>
      </header>

      <section id="hero">
        <div className="hero-video-wrap">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src="/istockphoto-2209484152-640_adpp_is.mp4"
          />
          <div className="hero-bg" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow" dangerouslySetInnerHTML={{ __html: t('hero_eyebrow') }} />
          <div className="hero-title">
            <img
              className="hero-logo"
              src="/logo2.webp"
              alt="VMS Flat"
              loading="eager"
              decoding="async"
            />
          </div>
          <p className="hero-sub">{t('hero_sub')}</p>
          <div className="hero-cta-wrap">
            <button type="button" className="btn-primary btn-salmon-shimmer whatsapp-link" onClick={openBooking}>
              <span>{t('verificar_disponibilidade')}</span>
            </button>
            <a href="#gallery" className="btn-ghost">
              {t('conhecer_flat')}
            </a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span className="scroll-text">{t('scroll')}</span>
        </div>
      </section>

      <div id="stats-strip">
        <div className="stats-inner">
          <div className="stat-item reveal">
            <span className="stat-num" data-count="5.0" data-decimals="1">5.0★</span>
            <span className="stat-label">Avaliação Média</span>
          </div>
          <div className="stat-item reveal">
            <span className="stat-num" data-count="9" data-suffix="+">9+</span>
            <span className="stat-label">Avaliações</span>
          </div>
          <div className="stat-item reveal">
            <span className="stat-num" data-count="3" data-suffix="+">3+</span>
            <span className="stat-label">Anos Hospedando</span>
          </div>
          <div className="stat-item reveal">
            <span className="stat-num" data-count="100" data-suffix="%">100%</span>
            <span className="stat-label">Taxa de Resposta</span>
          </div>
        </div>
      </div>

      <section id="gallery" className="section-pad">
        <div className="container gallery-header reveal">
          <p className="section-label">{t('galeria_label')}</p>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('galeria_title') }} />
          <div className="gold-divider" />
          <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', maxWidth: 500, lineHeight: 1.9 }}>
            {t('galeria_desc')}
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
              <p className="eyebrow">{t('reserva_direta_label')}</p>
              <h2 className="headline" dangerouslySetInnerHTML={{ __html: t('desconto_headline') }} />
            </div>
            <div className="cta-actions">
              <button
                type="button"
                className="btn-dark btn-salmon-shimmer whatsapp-link"
                onClick={openBooking}
              >
                {t('reservar_agora')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <section id="amenities" className="section-pad">
        <div className="container">
          <div className="reveal">
            <p className="section-label">{t('comodidades_label')}</p>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('comodidades_title') }} />
          </div>
          <div className="amenities-grid">
            <div className="amenity-item reveal">
              <span className="amenity-icon">📶</span>
              <div className="amenity-name">{t('wifi')}</div>
              <div className="amenity-desc">{t('wifi_desc')}</div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">🚗</span>
              <div className="amenity-name">{t('parking')}</div>
              <div className="amenity-desc">{t('parking_desc')}</div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">💨</span>
              <div className="amenity-name">{t('ac')}</div>
              <div className="amenity-desc">{t('ac_desc')}</div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">🍴</span>
              <div className="amenity-name">{t('kitchen')}</div>
              <div className="amenity-desc">{t('kitchen_desc')}</div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">🛁</span>
              <div className="amenity-name">{t('bathroom')}</div>
              <div className="amenity-desc">{t('bathroom_desc')}</div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">📺</span>
              <div className="amenity-name">{t('tv')}</div>
              <div className="amenity-desc">{t('tv_desc')}</div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">✅</span>
              <div className="amenity-name">{t('bed')}</div>
              <div className="amenity-desc">{t('bed_desc')}</div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">👕</span>
              <div className="amenity-name">{t('laundry')}</div>
              <div className="amenity-desc">{t('laundry_desc')}</div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">🗄️</span>
              <div className="amenity-name">{t('bedroom')}</div>
              <div className="amenity-desc">{t('bedroom_desc')}</div>
            </div>
            <div className="amenity-item reveal">
              <span className="amenity-icon">🛡️</span>
              <div className="amenity-name">{t('security')}</div>
              <div className="amenity-desc">{t('security_desc')}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="host" className="section-pad">
        <div className="container">
          <div className="host-inner">
            <div className="host-visual reveal-left">
              <h1 className="host-title">{t('superhost')}</h1>
              <div className="host-frame-wrap">
                <div className="host-frame">
                  <img
                    className="host-photo"
                    src="/fotobio.webp"
                    alt="Marina — Anfitriã VMS Flat"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const t = e.currentTarget as HTMLImageElement
                      t.style.display = 'none'
                      const parent = t.parentElement
                      if (parent) {
                        const ph = document.createElement('div')
                        ph.className = 'host-initial'
                        ph.textContent = 'M'
                        parent.appendChild(ph)
                      }
                    }}
                  />
                </div>
                <div className="host-badge-wrap">
                  <div className="badge-label">{t('avaliacao')}</div>
                  <div className="badge-val">5.0 ★</div>
                </div>
              </div>
            </div>

            <div className="host-info reveal-right">
              <div className="host-stars">★★★★★</div>
              <h2 className="host-name">Marina</h2>
              <p className="host-role">{t('host_role')}</p>
              <div className="gold-divider" />
              <p className="host-bio">{t('host_bio')}</p>
              <div className="host-highlight">
                <div className="host-highlight-item">
                  <span className="host-highlight-icon">✦</span>
                  <span>Check-in flexível e atendimento personalizado</span>
                </div>
                <div className="host-highlight-item">
                  <span className="host-highlight-icon">✦</span>
                  <span>Flat 100% equipado — chegue e se sinta em casa</span>
                </div>
                <div className="host-highlight-item">
                  <span className="host-highlight-icon">✦</span>
                  <span>Comunicação rápida via WhatsApp, 7 dias por semana</span>
                </div>
                <div className="host-highlight-item">
                  <span className="host-highlight-icon">✦</span>
                  <span>Indicada para executivos, casais e viajantes frequentes</span>
                </div>
              </div>
              <div className="host-stats">
                <div className="hstat reveal">
                  <span className="hstat-num" data-count="5.0" data-decimals="1">5.0</span>
                  <span className="hstat-label">{t('avaliacao')}</span>
                </div>
                <div className="hstat reveal">
                  <span className="hstat-num" data-count="100" data-suffix="%">100%</span>
                  <span className="hstat-label">{t('resposta')}</span>
                </div>
                <div className="hstat reveal">
                  <span className="hstat-num" data-count="3" data-suffix="+">3+</span>
                  <span className="hstat-label">{t('resposta_rapida')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="section-pad">
        <div className="container">
          <div className="reveal">
            <p className="section-label">{t('reviews_label')}</p>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('reviews_title') }} />
          </div>
          <div className="reviews-slider">
            <div className="reviews-track" id="reviewsTrack">
              {reviewTrackItems.map((r, i) => (
                <div className="review-card" key={`${r.name}-${i}`}>
                  <div className="review-stars">{r.stars}</div>
                  <p className="review-text">{r.text}</p>
                  <div className="review-author">
                    <div className="review-avatar">{r.name.trim().charAt(0).toUpperCase()}</div>
                    <div>
                      <div className="review-name">{r.name}</div>
                      <div className="review-origin">{r.origin}</div>
                    </div>
                  </div>
                </div>
              ))}
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
            <p className="section-label">{t('location_label')}</p>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('location_title') }} />
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
                      <div className="nearby-dist">{t(p.distKey as keyof typeof translations['pt'])}</div>
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
                  <span>{t('reservar_local')}</span>
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
              </div>
              <div className="location-address location-address-below">
                <div className="addr-label">{t('endereco')}</div>
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
              <p>{t('footer_desc')}</p>
              <div className="gold-divider" style={{ marginTop: 24 }} />
              <p style={{ fontSize: '.65rem', color: 'var(--gold)', marginTop: 4 }}>{t('superhost_footer')}</p>
              <p style={{ fontSize: '.63rem', color: 'var(--text-sub)', marginTop: 14, lineHeight: 1.7 }}>
                {address}
              </p>
            </div>
            <div className="footer-col reveal">
              <h4>{t('navegacao')}</h4>
              <ul>
                <li>
                  <button type="button" className="footer-nav-link" onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
                    {t('o_flat')}
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-nav-link" onClick={() => document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' })}>
                    {t('comodidades_nav')}
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-nav-link" onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}>
                    {t('avaliacoes_nav')}
                  </button>
                </li>
                <li>
                  <button type="button" className="footer-nav-link" onClick={() => document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })}>
                    {t('localizacao_nav')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="footer-nav-link"
                    onClick={openBooking}
                  >
                    {t('reservas_nav')}
                  </button>
                </li>
              </ul>
            </div>
            <div className="footer-col reveal">
              <h4>{t('contato')}</h4>
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
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">
              © 2025 VMS Flat — <span>{t('todos_direitos')}</span>
            </div>
            <div className="footer-links">
              <a href="#">{t('termos')}</a>
              <a href="#">{t('privacidade_footer')}</a>
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
          <span>{t('reserve_agora_float')}</span>
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
                      <span className="summary-v">{formatDate(checkIn)}</span>
                    </div>
                    <div className="summary-row">
                      <span className="summary-k">Check-out</span>
                      <span className="summary-v">{formatDate(checkOut)}</span>
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
