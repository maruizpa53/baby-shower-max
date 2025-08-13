'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Gift, Users, BarChart3, RefreshCw, Share2, Heart, Star, Filter, X, CheckCircle, Phone, User } from 'lucide-react'

interface Gift {
  id: number
  category: string
  gift: string
  description: string
  brands: string
  store: string
  reserved: boolean
  reservedBy: string
  phone: string
}

export default function BabyShowerGiftSelector() {
  const [gifts, setGifts] = useState<Gift[]>([
    // Recién Nacido (0-3 meses) - Pañales RN
    { id: 1, category: '👶 Recién Nacido (0-3 meses)', gift: 'Bodies RN + Pañales RN', description: 'Bodies de algodón orgánico talla RN (6 pack) + Paquete pañales RN', brands: 'Gerber + Huggies RN', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 2, category: '👶 Recién Nacido (0-3 meses)', gift: 'Pijamas RN + Pañales RN', description: 'Pijamas enterizas con cremallera talla RN + Paquete pañales RN', brands: 'Carter\'s + Pampers RN', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 3, category: '👶 Recién Nacido (0-3 meses)', gift: 'Manta térmica + Pañales RN', description: 'Manta ligera para recién nacido + Paquete pañales RN', brands: 'Chicco + Winny RN', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 4, category: '👶 Recién Nacido (0-3 meses)', gift: 'Kit aseo básico + Pañales RN', description: 'Crema anti-rozaduras + toallitas húmedas + Paquete pañales RN', brands: 'Johnson\'s Baby + Babysec RN', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 5, category: '👶 Recién Nacido (0-3 meses)', gift: 'Accesorios RN + Pañales RN', description: 'Gorritos, medias y manoplas + Paquete pañales RN', brands: 'Baby Colors + Huggies RN', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 6, category: '👶 Recién Nacido (0-3 meses)', gift: 'Toalla con capucha + Pañales RN', description: 'Toalla de microfibra suave con capucha + Paquete pañales RN', brands: 'Disney Baby + Pampers RN', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 7, category: '👶 Recién Nacido (0-3 meses)', gift: 'Kit hospital + Pañales RN', description: 'Ajuar para hospital (3 bodies + 2 pijamas) + Paquete pañales RN', brands: 'Gerber + Winny RN', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 8, category: '👶 Recién Nacido (0-3 meses)', gift: 'Manta de algodón + Pañales RN', description: 'Manta de algodón orgánico + Paquete pañales RN', brands: 'Carter\'s + Babysec RN', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },

    // Primeros Meses (3-6 meses) - Pañales P
    { id: 9, category: '🌟 Primeros Meses (3-6 meses)', gift: 'Bodies P + Pañales P', description: 'Bodies de algodón orgánico talla P (6 pack) + Paquete pañales P', brands: 'Gerber + Huggies P', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 10, category: '🌟 Primeros Meses (3-6 meses)', gift: 'Pijamas P + Pañales P', description: 'Pijamas enterizas con cremallera talla P + Paquete pañales P', brands: 'Carter\'s + Pampers P', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 11, category: '🌟 Primeros Meses (3-6 meses)', gift: 'Toalla con capucha + Pañales P', description: 'Toalla de microfibra suave con capucha + Paquete pañales P', brands: 'Chicco + Winny P', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 12, category: '🌟 Primeros Meses (3-6 meses)', gift: 'Baberos impermeables + Pañales P', description: 'Set de baberos de silicona + Paquete pañales P', brands: 'Munchkin + Babysec P', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 13, category: '🌟 Primeros Meses (3-6 meses)', gift: 'Mordederas + Pañales P', description: 'Mordederas de silicona grado alimenticio + Paquete pañales P', brands: 'Philips Avent + Huggies P', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 14, category: '🌟 Primeros Meses (3-6 meses)', gift: 'Conjunto verano P + Pañales P', description: 'Conjuntos de verano talla P + Paquete pañales P', brands: 'Disney Baby + Pampers P', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 15, category: '🌟 Primeros Meses (3-6 meses)', gift: 'Kit de alimentación + Pañales P', description: 'Biberones y chupetes + Paquete pañales P', brands: 'MAM + Winny P', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 16, category: '🌟 Primeros Meses (3-6 meses)', gift: 'Sábanas para cuna + Pañales P', description: 'Juego de sábanas de algodón + Paquete pañales P', brands: 'Baby Colors + Babysec P', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },

    // Más Activo (6-9 meses) - Pañales M
    { id: 17, category: '🚀 Más Activo (6-9 meses)', gift: 'Bodies M + Pañales M', description: 'Bodies de algodón orgánico talla M (6 pack) + Paquete pañales M', brands: 'Gerber + Huggies M', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 18, category: '🚀 Más Activo (6-9 meses)', gift: 'Pijamas M + Pañales M', description: 'Pijamas enterizas con cremallera talla M + Paquete pañales M', brands: 'Carter\'s + Pampers M', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 19, category: '🚀 Más Activo (6-9 meses)', gift: 'Libros de tela + Pañales M', description: 'Libros suaves para explorar + Paquete pañales M', brands: 'Fisher-Price + Winny M', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 20, category: '🚀 Más Activo (6-9 meses)', gift: 'Kit higiene completo + Pañales M', description: 'Termómetro + kit aseo con cepillo + Paquete pañales M', brands: 'Chicco + Babysec M', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 21, category: '🚀 Más Activo (6-9 meses)', gift: 'Suéter ligero M + Pañales M', description: 'Chaqueta o suéter de algodón talla M + Paquete pañales M', brands: 'Baby Colors + Huggies M', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 22, category: '🚀 Más Activo (6-9 meses)', gift: 'Zapatos primeros pasos + Pañales M', description: 'Zapatos blandos para gatear + Paquete pañales M', brands: 'Stride Rite + Pampers M', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 23, category: '🚀 Más Activo (6-9 meses)', gift: 'Juguetes sensoriales + Pañales M', description: 'Sonajeros y juguetes de texturas + Paquete pañales M', brands: 'VTech + Winny M', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 24, category: '🚀 Más Activo (6-9 meses)', gift: 'Ropa de verano M + Pañales M', description: 'Shorts y camisetas talla M + Paquete pañales M', brands: 'Offcorss + Babysec M', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },

    // Explorando (9-12 meses) - Pañales G
    { id: 25, category: '🎯 Explorando (9-12 meses)', gift: 'Bodies G + Pañales G', description: 'Bodies de algodón orgánico talla G (6 pack) + Paquete pañales G', brands: 'Gerber + Huggies G', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 26, category: '🎯 Explorando (9-12 meses)', gift: 'Pijamas G + Pañales G', description: 'Pijamas enterizas con cremallera talla G + Paquete pañales G', brands: 'Carter\'s + Pampers G', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 27, category: '🎯 Explorando (9-12 meses)', gift: 'Zapatos para caminar + Pañales G', description: 'Zapatos con suela flexible + Paquete pañales G', brands: 'Nike + Winny G', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 28, category: '🎯 Explorando (9-12 meses)', gift: 'Juguetes educativos + Pañales G', description: 'Cubos apilables y encajables + Paquete pañales G', brands: 'Fisher-Price + Babysec G', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 29, category: '🎯 Explorando (9-12 meses)', gift: 'Ropa casual G + Pañales G', description: 'Pantalones y camisas talla G + Paquete pañales G', brands: 'Disney Baby + Huggies G', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 30, category: '🎯 Explorando (9-12 meses)', gift: 'Vajilla para bebé + Pañales G', description: 'Platos, vasos y cubiertos + Paquete pañales G', brands: 'Munchkin + Pampers G', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 31, category: '🎯 Explorando (9-12 meses)', gift: 'Caminador o andador + Pañales G', description: 'Caminador con juguetes + Paquete pañales G', brands: 'Chicco + Winny G', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 32, category: '🎯 Explorando (9-12 meses)', gift: 'Libros de cartón + Pañales G', description: 'Libros resistentes con imágenes + Paquete pañales G', brands: 'Editorial Norma + Babysec G', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },

    // Primera Infancia (12+ meses) - Pañales XG / Pull-ups
    { id: 33, category: '🌈 Primera Infancia (12+ meses)', gift: 'Ropa talla 12M + Pull-ups', description: 'Conjunto completo talla 12 meses + Pañales tipo calzón', brands: 'Carter\'s + Huggies Pull-ups', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 34, category: '🌈 Primera Infancia (12+ meses)', gift: 'Zapatos talla 4-5 + Pull-ups', description: 'Zapatos para primeros pasos + Pañales tipo calzón', brands: 'Adidas + Pampers Easy-ups', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 35, category: '🌈 Primera Infancia (12+ meses)', gift: 'Juguetes de arrastre + Pull-ups', description: 'Juguetes con ruedas para arrastrar + Pañales tipo calzón', brands: 'Melissa & Doug + Winny Pants', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 36, category: '🌈 Primera Infancia (12+ meses)', gift: 'Instrumentos musicales + Pull-ups', description: 'Piano, tambor y maracas + Pañales tipo calzón', brands: 'Baby Einstein + Babysec Pants', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 37, category: '🌈 Primera Infancia (12+ meses)', gift: 'Rompecabezas grandes + Pull-ups', description: 'Rompecabezas de piezas grandes + Pañales tipo calzón', brands: 'Ravensburger + Huggies Pull-ups', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 38, category: '🌈 Primera Infancia (12+ meses)', gift: 'Kit arte y creatividad + Pull-ups', description: 'Crayones grandes y papel + Pañales tipo calzón', brands: 'Crayola + Pampers Easy-ups', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },

    // Regalos Especiales (Para los papás)
    { id: 39, category: '💎 Regalos Especiales', gift: 'Monitor para bebé', description: 'Monitor de video y audio con app móvil', brands: 'Motorola, Philips Avent', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 40, category: '💎 Regalos Especiales', gift: 'Esterilizador eléctrico', description: 'Esterilizador de biberones y accesorios', brands: 'Chicco, MAM', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 41, category: '💎 Regalos Especiales', gift: 'Cámara instantánea', description: 'Cámara para capturar momentos especiales', brands: 'Fujifilm Instax Mini', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 42, category: '💎 Regalos Especiales', gift: 'Humidificador ultrasónico', description: 'Humidificador con luz nocturna', brands: 'Crane, Safety 1st', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 43, category: '💎 Regalos Especiales', gift: 'Cojín de lactancia', description: 'Cojín ergonómico para alimentación', brands: 'Chicco, Boppy', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 44, category: '💎 Regalos Especiales', gift: 'Bañera ergonómica', description: 'Bañera con termómetro integrado', brands: 'Summer Infant, Munchkin', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 45, category: '💎 Regalos Especiales', gift: 'Mochila pañalera', description: 'Mochila con compartimentos organizadores', brands: 'Skip Hop, JJ Cole', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 46, category: '💎 Regalos Especiales', gift: 'Báscula digital para bebé', description: 'Báscula precisa para seguimiento de peso', brands: 'Chicco, Safety 1st', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 47, category: '💎 Regalos Especiales', gift: 'Silla mecedora', description: 'Silla con movimiento automático y música', brands: 'Fisher-Price, Graco', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 48, category: '💎 Regalos Especiales', gift: 'Kit de emergencia', description: 'Botiquín completo para bebé', brands: 'Safety 1st, Munchkin', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 49, category: '💎 Regalos Especiales', gift: 'Gimnasio de actividades', description: 'Manta de juegos con arcos y juguetes', brands: 'Fisher-Price, Tiny Love', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' },
    { id: 50, category: '💎 Regalos Especiales', gift: 'Album de recuerdos', description: 'Album para fotos y recuerdos del primer año', brands: 'Hallmark, C.R. Gibson', store: 'Falabella / Éxito', reserved: false, reservedBy: '', phone: '' }
  ])

  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [showReserved, setShowReserved] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSummary, setShowSummary] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    try {
      const savedGifts = localStorage.getItem('babyShowerGifts')
      if (savedGifts) {
        setGifts(JSON.parse(savedGifts))
      }
    } catch (error) {
      console.error('Error loading saved gifts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Guardar en localStorage cada vez que cambian los regalos
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('babyShowerGifts', JSON.stringify(gifts))
      } catch (error) {
        console.error('Error saving gifts:', error)
      }
    }
  }, [gifts, isLoading])

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^3[0-9]{9}$/
    return phoneRegex.test(phone.replace(/\s+/g, ''))
  }

  const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3').trim()
    }
    return cleaned
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const formatted = formatPhone(value)
    setUserPhone(formatted)
    
    if (value && !validatePhone(value)) {
      setPhoneError('Ingresa un número válido (ej: 320 123 4567)')
    } else {
      setPhoneError('')
    }
  }

  const handleSelectGift = (gift: Gift) => {
    if (gift.reserved) return
    setSelectedGift(gift)
    setUserName('')
    setUserPhone('')
    setPhoneError('')
  }

  const handleReserveGift = () => {
    if (!userName.trim() || !userPhone.trim() || !validatePhone(userPhone)) return

    const updatedGifts = gifts.map(gift =>
      gift.id === selectedGift?.id
        ? { 
            ...gift, 
            reserved: true, 
            reservedBy: userName.trim(),
            phone: userPhone.trim()
          }
        : gift
    )

    setGifts(updatedGifts)
    setSelectedGift(null)
    setUserName('')
    setUserPhone('')
    setPhoneError('')
  }

  const handleCancelReservation = (giftId: number) => {
    const updatedGifts = gifts.map(gift =>
      gift.id === giftId
        ? { ...gift, reserved: false, reservedBy: '', phone: '' }
        : gift
    )
    setGifts(updatedGifts)
  }

  const resetAllReservations = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todas las reservas?')) {
      const resetGifts = gifts.map(gift => ({
        ...gift,
        reserved: false,
        reservedBy: '',
        phone: ''
      }))
      setGifts(resetGifts)
      localStorage.removeItem('babyShowerGifts')
    }
  }

  const filteredGifts = useMemo(() => {
    return gifts.filter(gift => {
      const matchesSearch = gift.gift.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gift.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gift.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           gift.brands.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFilter = showReserved ? gift.reserved : !gift.reserved
      
      return matchesSearch && matchesFilter
    })
  }, [gifts, searchTerm, showReserved])

  const groupedGifts = useMemo(() => {
    return filteredGifts.reduce((acc, gift) => {
      if (!acc[gift.category]) {
        acc[gift.category] = []
      }
      acc[gift.category].push(gift)
      return acc
    }, {} as Record<string, Gift[]>)
  }, [filteredGifts])

  const stats = useMemo(() => {
    const totalReserved = gifts.filter(gift => gift.reserved).length
    const totalGifts = gifts.length
    const percentage = Math.round((totalReserved / totalGifts) * 100)
    return { totalReserved, totalGifts, percentage }
  }, [gifts])

  const generateSummary = () => {
    const reservedGifts = gifts.filter(gift => gift.reserved)
    return reservedGifts.map(gift => 
      `${gift.reservedBy} (${gift.phone}): ${gift.gift}`
    ).join('\n')
  }

  const generateWhatsAppLink = () => {
    const reservedGifts = gifts.filter(gift => gift.reserved)
    const message = `🎁 *Resumen de Regalos Baby Shower*\n\n${reservedGifts.map(gift => 
      `• ${gift.reservedBy} (${gift.phone}): ${gift.gift}`
    ).join('\n')}\n\n📊 Total: ${stats.totalReserved} de ${stats.totalGifts} regalos reservados`
    
    return `https://wa.me/?text=${encodeURIComponent(message)}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-300 border-t-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando regalos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-3xl p-8 text-center shadow-2xl mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-10 h-10 animate-bounce" />
            <h1 className="text-4xl font-bold">Selector de Regalos Baby Shower - Maximiliano</h1>
            <Heart className="w-10 h-10 animate-pulse text-pink-200" />
          </div>
          
          <p className="text-xl opacity-90 mb-6">
            Regalos únicos con pañales por etapa - ¡Sin repetidos!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="glass-effect rounded-2xl px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-6 h-6" />
                <span className="font-semibold text-lg">{stats.totalGifts - stats.totalReserved} Disponibles</span>
              </div>
            </div>
            <div className="glass-effect rounded-2xl px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-semibold text-lg">{stats.totalReserved} Reservados</span>
              </div>
            </div>
            <div className="glass-effect rounded-2xl px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="w-6 h-6" />
                <span className="font-semibold text-lg">{stats.percentage}% Completado</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-full h-4 mb-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-300 to-green-400 h-full transition-all duration-1000 ease-out"
              style={{ width: `${stats.percentage}%` }}
            ></div>
          </div>
          <p className="text-sm opacity-90">Progreso del Baby Shower</p>
        </div>

        {/* Controls */}
        <div className="card mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="🔍 Buscar regalo, marca, categoría..."
                className="input-field pl-12 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowReserved(!showReserved)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  showReserved 
                    ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4" />
                {showReserved ? '✅ Reservados' : '📋 Disponibles'}
              </button>
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-all shadow-lg"
              >
                <BarChart3 className="w-4 h-4" />
                📊 Resumen
              </button>
              <button
                onClick={resetAllReservations}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all shadow-lg"
                title="Reiniciar todas las reservas"
              >
                <RefreshCw className="w-4 h-4" />
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {/* Summary Modal */}
        {showSummary && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                  Resumen de Reservas
                </h3>
                <button
                  onClick={() => setShowSummary(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl mb-6 border-2 border-gray-100">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {generateSummary() || 'No hay reservas aún...'}
                </pre>
              </div>
              
              <div className="text-center space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                    <p className="text-2xl font-bold text-blue-600">{stats.totalReserved}</p>
                    <p className="text-sm text-blue-500">Reservados</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
                    <p className="text-2xl font-bold text-green-600">{stats.totalGifts - stats.totalReserved}</p>
                    <p className="text-sm text-green-500">Disponibles</p>
                  </div>
                </div>
                
                {stats.totalReserved > 0 && (
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    📱 Compartir por WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gift List */}
        <div className="space-y-8">
          {Object.keys(groupedGifts).length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No se encontraron regalos</h3>
              <p className="text-gray-500">Intenta con otro término de búsqueda</p>
            </div>
          ) : (
            Object.entries(groupedGifts).map(([category, categoryGifts]) => (
              <div key={category} className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    {category}
                  </h3>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {categoryGifts.length} regalo{categoryGifts.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryGifts.map((gift) => (
                    <div
                      key={gift.id}
                      className={`relative group rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                        gift.reserved
                          ? 'border-green-300 bg-green-50 shadow-lg'
                          : selectedGift?.id === gift.id
                          ? 'border-pink-400 bg-pink-50 shadow-xl scale-105'
                          : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-xl hover:scale-105 cursor-pointer'
                      }`}
                      onClick={() => !gift.reserved && handleSelectGift(gift)}
                    >
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex-1 space-y-3">
                          <h4 className={`font-bold text-lg leading-tight ${
                            gift.reserved ? 'text-green-700' : 'text-gray-800'
                          }`}>
                            🎁 {gift.gift}
                          </h4>
                          
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {gift.description}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <p className="text-xs text-blue-600 font-medium">🏪 {gift.store}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <p className="text-xs text-purple-600 italic">{gift.brands}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          {gift.reserved ? (
                            <div className="space-y-3">
                              <div className="bg-green-500 text-white px-4 py-3 rounded-xl text-center text-sm font-medium">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>✅ Reservado</span>
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                  <User className="w-3 h-3" />
                                  <strong>{gift.reservedBy}</strong>
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{gift.phone}</span>
                                </div>
                              </div>
                              {showReserved && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelReservation(gift.id);
                                  }}
                                  className="w-full bg-red-500 text-white px-3 py-2 rounded-lg text-xs hover:bg-red-600 transition-colors"
                                >
                                  Cancelar Reserva
                                </button>
                              )}
                            </div>
                          ) : (
                            <button className="btn-primary w-full text-center">
                              <Gift className="w-4 h-4 mr-2 inline" />
                              Seleccionar Regalo
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {!gift.reserved && (
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Reservation Modal */}
        {selectedGift && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">🎁 Reservar Regalo</h3>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl mb-6 border-2 border-pink-200">
                <h4 className="font-bold text-pink-800 mb-3 text-xl flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  {selectedGift.gift}
                </h4>
                <p className="text-sm text-pink-700 mb-3 leading-relaxed">{selectedGift.description}</p>
                <div className="space-y-2">
                  <p className="text-xs text-blue-600 font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    🏪 {selectedGift.store}
                  </p>
                  <p className="text-xs text-purple-600 italic flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    {selectedGift.brands}
                  </p>
                </div>
              </div>
              
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Tu nombre completo:
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ej: María González"
                    className="input-field text-lg"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Tu número de celular:
                  </label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={handlePhoneChange}
                    placeholder="Ej: 320 123 4567"
                    className={`input-field text-lg ${
                      phoneError 
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-100' 
                        : ''
                    }`}
                    maxLength={13}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && userName.trim() && userPhone.trim() && !phoneError) {
                        handleReserveGift();
                      }
                    }}
                  />
                  {phoneError && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                      <X className="w-4 h-4" />
                      {phoneError}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm mt-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Formato: número colombiano de 10 dígitos
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedGift(null);
                    setPhoneError('');
                  }}
                  className="btn-secondary flex-1 text-lg py-4"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReserveGift}
                  disabled={!userName.trim() || !userPhone.trim() || !!phoneError}
                  className="btn-primary flex-1 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  ✅ Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
              <Heart className="w-6 h-6 text-pink-500" />
              ¡Cada regalo incluye pañales por etapa!
              <Heart className="w-6 h-6 text-pink-500" />
            </h4>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h5 className="text-lg font-bold text-purple-700 flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  📱 Instrucciones:
                </h5>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-xs mt-0.5">1</div>
                    <p>Selecciona el regalo que quieres dar</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-xs mt-0.5">2</div>
                    <p>Escribe tu nombre completo</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-xs mt-0.5">3</div>
                    <p>Ingresa tu número de celular</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-xs mt-0.5">4</div>
                    <p>Confirma la reserva</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="text-lg font-bold text-blue-700 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  ℹ️ Información importante:
                </h5>
                <div className="space-y-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span><strong>📦 Pañales por etapa:</strong> RN → P → M → G → Pull-ups</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span><strong>🔒 Una vez reservado, nadie más podrá elegir ese regalo</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span><strong>📞 Tu teléfono será visible para coordinación</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span><strong>🛒 Compra en Falabella o Éxito con las marcas sugeridas</strong></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-gray-500 text-sm">
            <p className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" />
              Hecho con amor para el Baby Shower
              <Heart className="w-4 h-4 text-pink-400" />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}