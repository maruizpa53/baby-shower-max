"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Gift,
  Users,
  BarChart3,
  RefreshCw,
  Share2,
  Heart,
  Star,
  Filter,
  X,
  CheckCircle,
  Phone,
  User,
  Info,
} from "lucide-react";

interface Gift {
  id: number;
  category: string;
  gift: string;
  description: string;
  brands: string;
  store: string;
  reserved: boolean;
  reservedBy: string;
  phone: string;
}

export default function BabyShowerGiftSelector() {
  const [gifts, setGifts] = useState<Gift[]>([
    // ROPA Y ACCESORIOS
    {
      id: 1,
      category: "🦁 Regalos para Maximiliano",
      gift: "Bodies (0-3 meses) + Pañales Etapa 0",
      description: "Bodies de algodón orgánico con broches (6 pack) + Pañales Winny Etapa 0 (hasta 4.5kg)",
      brands: "Arrurrú + Winny Etapa 0",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 2,
      category: "🦁 Regalos para Maximiliano",
      gift: "Esqueletos (0-3 meses) + Pañales Etapa 0",
      description: "Esqueletos sin mangas talla RN (4 pack) + Pañales Winny Etapa 0 (hasta 4.5kg)",
      brands: "Carter's + Winny Etapa 0",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 3,
      category: "🦁 Regalos para Maximiliano",
      gift: "Pijamas (3-6 meses) + Pañales Etapa 1",
      description: "Pijamas enterizas con cremallera talla P + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Arrurrú + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 4,
      category: "🦁 Regalos para Maximiliano",
      gift: "Bodies (6-9 meses) + Pañales Etapa 2",
      description: "Bodies manga larga talla M (6 pack) + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Carter's + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 5,
      category: "🦁 Regalos para Maximiliano",
      gift: "Pijamas (9-12 meses) + Pañales Etapa 3",
      description: "Pijamas dos piezas talla G + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Arrurrú + Winny Etapa 3",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 6,
      category: "🦁 Regalos para Maximiliano",
      gift: "Conjunto (12-18 meses) + Pañales Etapa 4",
      description: "Conjunto camiseta y pantalón talla 12M + Pañales Winny Etapa 4 (10-16kg)",
      brands: "Carter's + Winny Etapa 4",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 7,
      category: "🦁 Regalos para Maximiliano",
      gift: "Calcetines antideslizantes + Pañales Etapa 1",
      description: "Set de calcetines con suela antideslizante + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Arrurrú + Winny Etapa 1",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 8,
      category: "🦁 Regalos para Maximiliano",
      gift: "Zapatos primeros pasos + Pañales Etapa 2",
      description: "Zapatos blandos para gatear talla 2-3 + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Bebebé + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 9,
      category: "🦁 Regalos para Maximiliano",
      gift: "Zapatos para caminar + Pañales Etapa 3",
      description: "Zapatos con suela flexible talla 4-5 + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Bebebé + Winny Etapa 3",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 10,
      category: "🦁 Regalos para Maximiliano",
      gift: "Baberos impermeables + Pañales Etapa 1",
      description: "Baberos de silicona con bolsillo (4 pack) + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Gerber + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 11,
      category: "🦁 Regalos para Maximiliano",
      gift: "Fajeros y gorritos + Pañales Etapa 0",
      description: "Set de fajeros y gorritos para recién nacido + Pañales Winny Etapa 0 (hasta 4.5kg)",
      brands: "Baby Fresh + Winny Etapa 0",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // HIGIENE Y CUIDADO
    {
      id: 12,
      category: "🦁 Regalos para Maximiliano",
      gift: "Kit higiene completo + Pañales Etapa 0",
      description: "Kit con lima, cortaúñas, cepillo, peine, termómetro + Pañales Winny Etapa 0 (hasta 4.5kg)",
      brands: "Safety 1st + Winny Etapa 0",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 13,
      category: "🦁 Regalos para Maximiliano",
      gift: "Kit cremas para bebé + Pañales Etapa 1",
      description: "Crema anti-rozaduras, loción hidratante, shampoo + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Johnson's Baby + Winny Etapa 1",
      store: "Alkosto / D1 / Ara",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 14,
      category: "🦁 Regalos para Maximiliano",
      gift: "Kit cremas Mustela premium + Pañales Etapa 2",
      description: "Kit de cremas especializadas para piel sensible + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Mustela + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 15,
      category: "🦁 Regalos para Maximiliano",
      gift: "Toalla con capucha safari + Pañales Etapa 1",
      description: "Toalla de microfibra con capucha temática safari + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Arrurrú + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 16,
      category: "🦁 Regalos para Maximiliano",
      gift: "Toalla de baño grande + Pañales Etapa 2",
      description: "Toalla extra suave para hora del baño + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Carter's + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // DORMITORIO Y DESCANSO
    {
      id: 17,
      category: "🦁 Regalos para Maximiliano",
      gift: "Sábanas para cuna safari + Pañales Etapa 1",
      description: "Juego de sábanas temática safari para cuna + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Arrurrú + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 18,
      category: "🦁 Regalos para Maximiliano",
      gift: "Edredón térmico + Pañales Etapa 2",
      description: "Edredón ligero para todas las estaciones + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Arrurrú + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 19,
      category: "🦁 Regalos para Maximiliano",
      gift: "Toldillo antimosquitos + Pañales Etapa 2",
      description: "Toldillo protector para cuna con fácil instalación + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Baby Fresh + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 20,
      category: "🦁 Regalos para Maximiliano",
      gift: "Esquimal/Manta térmica + Pañales Etapa 0",
      description: "Esquimal de algodón para recién nacido + Pañales Winny Etapa 0 (hasta 4.5kg)",
      brands: "Carter's + Winny Etapa 0",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 21,
      category: "🦁 Regalos para Maximiliano",
      gift: "Almohada ergonómica + Pañales Etapa 3",
      description: "Almohada especial para bebé + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Chicco + Winny Etapa 3",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // ALIMENTACIÓN
    {
      id: 22,
      category: "🦁 Regalos para Maximiliano",
      gift: "Teteros antirreflujo + Pañales Etapa 1",
      description: "Teteros Dr. Brown's antirreflujo con sistema de ventilación + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Dr. Brown's + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 23,
      category: "🦁 Regalos para Maximiliano",
      gift: "Teteros anticólicos + Pañales Etapa 2",
      description: "Teteros Philips Avent anticólicos + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Philips Avent + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 24,
      category: "🦁 Regalos para Maximiliano",
      gift: "Esterilizador de teteros + Pañales Etapa 2",
      description: "Esterilizador para 6 teteros con funcionamiento eléctrico + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Philips Avent + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 25,
      category: "🦁 Regalos para Maximiliano",
      gift: "Extractor de leche manual + Pañales Etapa 1",
      description: "Extractor manual cómodo y eficiente + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Medela + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 26,
      category: "🦁 Regalos para Maximiliano",
      gift: "Vajilla para bebé + Pañales Etapa 3",
      description: "Platos, vasos y cubiertos antideslizantes + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Munchkin + Winny Etapa 3",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 27,
      category: "🦁 Regalos para Maximiliano",
      gift: "Protector de pezones + Pañales Etapa 1",
      description: "Protectores para lactancia cómodos + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Medela + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // TRANSPORTE Y PASEO
    {
      id: 28,
      category: "🦁 Regalos para Maximiliano",
      gift: "Coche/Cochecito completo + Pañales Etapa 1",
      description: "Coche con sistema de seguridad y accesorios + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Chicco + Winny Etapa 1",
      store: "Falabella / Alkosto",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 29,
      category: "🦁 Regalos para Maximiliano",
      gift: "Canguro/Portabebés ergonómico + Pañales Etapa 2",
      description: "Portabebés con múltiples posiciones + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Ergobaby + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 30,
      category: "🦁 Regalos para Maximiliano",
      gift: "Caminador con juguetes + Pañales Etapa 3",
      description: "Caminador musical con actividades + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Chicco + Winny Etapa 3",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // JUGUETES Y ESTIMULACIÓN
    {
      id: 31,
      category: "🦁 Regalos para Maximiliano",
      gift: "Gimnasio de actividades + Pañales Etapa 1",
      description: "Manta de juegos con arcos y juguetes colgantes + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Fisher-Price + Winny Etapa 1",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 32,
      category: "🦁 Regalos para Maximiliano",
      gift: "Sonajeros estimulantes + Pañales Etapa 1",
      description: "Set de sonajeros con diferentes texturas y sonidos + Pañales Winny Etapa 1 (4-7kg)",
      brands: "Fisher-Price + Winny Etapa 1",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 33,
      category: "🦁 Regalos para Maximiliano",
      gift: "Mordederas sensoriales + Pañales Etapa 2",
      description: "Mordederas de silicona con diferentes formas + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Chicco + Winny Etapa 2",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 34,
      category: "🦁 Regalos para Maximiliano",
      gift: "Mordedoras avanzadas + Pañales Etapa 3",
      description: "Mordederas con gel refrigerante y texturas + Pañales Winny Etapa 3 (8-12kg)",
      brands: "MAM + Winny Etapa 3",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 35,
      category: "🦁 Regalos para Maximiliano",
      gift: "Móvil musical para cuna + Pañales Etapa 2",
      description: "Móvil con melodías y figuras rotativas + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Chicco + Winny Etapa 2",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 36,
      category: "🦁 Regalos para Maximiliano",
      gift: "Juguetes educativos + Pañales Etapa 3",
      description: "Cubos apilables y encajables para desarrollo + Pañales Winny Etapa 3 (8-12kg)",
      brands: "Fisher-Price + Winny Etapa 3",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 37,
      category: "🦁 Regalos para Maximiliano",
      gift: "Libros de tela + Pañales Etapa 2",
      description: "Libros suaves con texturas y sonidos + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Fisher-Price + Winny Etapa 2",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 38,
      category: "🦁 Regalos para Maximiliano",
      gift: "Peluche musical + Pañales Etapa 2",
      description: "Peluche suave con melodías relajantes + Pañales Winny Etapa 2 (6-9kg)",
      brands: "Chicco + Winny Etapa 2",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },

    // REGALOS ESPECIALES PREMIUM
    {
      id: 39,
      category: "🦁 Regalos para Maximiliano",
      gift: "Coche Premium con accesorios",
      description: "Coche completo con base para carro, lluvia, mosquitero y bolso",
      brands: "Graco, Chicco",
      store: "Falabella / Alkosto",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 40,
      category: "🦁 Regalos para Maximiliano",
      gift: "Mecedora automática musical",
      description: "Mecedora con movimiento automático, música y control remoto",
      brands: "Muebles Jamar, Alkosto",
      store: "Alkosto / Falabella",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 41,
      category: "🦁 Regalos para Maximiliano",
      gift: "Esterilizador profesional UV",
      description: "Esterilizador eléctrico con luz UV de alta capacidad",
      brands: "Philips Avent, Chicco",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 42,
      category: "🦁 Regalos para Maximiliano",
      gift: "Extractor eléctrico doble",
      description: "Extractor de leche eléctrico doble con accesorios completos",
      brands: "Medela, Philips Avent",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 43,
      category: "🦁 Regalos para Maximiliano",
      gift: "Monitor de bebé con video",
      description: "Monitor con cámara HD, aplicación móvil y audio bidireccional",
      brands: "Motorola, Safety 1st",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 44,
      category: "🦁 Regalos para Maximiliano",
      gift: "Kit completo para cuna",
      description: "Sábanas, edredón, protector, toldillo y almohada conjunto safari",
      brands: "Arrurrú, Carter's",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 45,
      category: "🦁 Regalos para Maximiliano",
      gift: "Kit alimentación profesional",
      description: "Teteros, esterilizador, extractor manual y todos los accesorios",
      brands: "Dr. Brown's, Philips Avent",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 46,
      category: "🦁 Regalos para Maximiliano",
      gift: "Gimnasio completo safari",
      description: "Gimnasio con múltiples juguetes, luces, sonidos y temática safari",
      brands: "Fisher-Price, Chicco",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 47,
      category: "🦁 Regalos para Maximiliano",
      gift: "Centro de entretenimiento",
      description: "Mesa de actividades con luces, sonidos y juguetes giratorios",
      brands: "Fisher-Price, VTech",
      store: "Falabella / Pepe Ganga / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 48,
      category: "🦁 Regalos para Maximiliano",
      gift: "Kit báscula y termómetro",
      description: "Báscula digital para bebé y termómetro infrarrojo",
      brands: "Safety 1st, Chicco",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 49,
      category: "🦁 Regalos para Maximiliano",
      gift: "Humidificador con aromaterapia",
      description: "Humidificador ultrasónico con luz nocturna y aromas",
      brands: "Crane, Safety 1st",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
    {
      id: 50,
      category: "🦁 Regalos para Maximiliano",
      gift: "Kit recuerdos primer año",
      description: "Álbum de fotos, marco huellitas y libro de recuerdos",
      brands: "Hallmark, C.R. Gibson",
      store: "Falabella / Alkosto / Éxito",
      reserved: false,
      reservedBy: "",
      phone: "",
    },
  ]);

  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [showReserved, setShowReserved] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mostrar pop-up de instrucciones al cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowInstructions(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^3[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3").trim();
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhone(value);
    setUserPhone(formatted);

    if (value && !validatePhone(value)) {
      setPhoneError("Ingresa un número válido (ej: 320 123 4567)");
    } else {
      setPhoneError("");
    }
  };

  const handleSelectGift = (gift: Gift) => {
    if (gift.reserved) return;
    setSelectedGift(gift);
    setUserName("");
    setUserPhone("");
    setPhoneError("");
  };

  const handleReserveGift = () => {
    if (!userName.trim() || !userPhone.trim() || !validatePhone(userPhone))
      return;

    const updatedGifts = gifts.map((gift) =>
      gift.id === selectedGift?.id
        ? {
            ...gift,
            reserved: true,
            reservedBy: userName.trim(),
            phone: userPhone.trim(),
          }
        : gift
    );

    setGifts(updatedGifts);
    setSelectedGift(null);
    setUserName("");
    setUserPhone("");
    setPhoneError("");
  };

  const handleCancelReservation = (giftId: number) => {
    const updatedGifts = gifts.map((gift) =>
      gift.id === giftId
        ? { ...gift, reserved: false, reservedBy: "", phone: "" }
        : gift
    );
    setGifts(updatedGifts);
  };

  const resetAllReservations = () => {
    if (
      window.confirm("¿Estás seguro de que quieres borrar todas las reservas?")
    ) {
      const resetGifts = gifts.map((gift) => ({
        ...gift,
        reserved: false,
        reservedBy: "",
        phone: "",
      }));
      setGifts(resetGifts);
    }
  };

  const filteredGifts = useMemo(() => {
    return gifts.filter((gift) => {
      const matchesSearch =
        gift.gift.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gift.brands.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = showReserved ? gift.reserved : !gift.reserved;

      return matchesSearch && matchesFilter;
    });
  }, [gifts, searchTerm, showReserved]);

  const groupedGifts = useMemo(() => {
    return filteredGifts.reduce((acc, gift) => {
      if (!acc[gift.category]) {
        acc[gift.category] = [];
      }
      acc[gift.category].push(gift);
      return acc;
    }, {} as Record<string, Gift[]>);
  }, [filteredGifts]);

  const stats = useMemo(() => {
    const totalReserved = gifts.filter((gift) => gift.reserved).length;
    const totalGifts = gifts.length;
    const percentage = Math.round((totalReserved / totalGifts) * 100);
    return { totalReserved, totalGifts, percentage };
  }, [gifts]);

  const generateSummary = () => {
    const reservedGifts = gifts.filter((gift) => gift.reserved);
    return reservedGifts
      .map((gift) => `${gift.reservedBy} (${gift.phone}): ${gift.gift}`)
      .join("\n");
  };

  const generateWhatsAppLink = () => {
    const reservedGifts = gifts.filter((gift) => gift.reserved);
    const message = `🦁 *Resumen de Regalos Baby Shower - Maximiliano*\n\n${reservedGifts
      .map((gift) => `• ${gift.reservedBy} (${gift.phone}): ${gift.gift}`)
      .join("\n")}\n\n📊 Total: ${stats.totalReserved} de ${
      stats.totalGifts
    } regalos reservados`;

    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-amber-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-300 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-green-800 text-lg">Cargando regalos safari para Maximiliano...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-amber-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-yellow-600 text-white rounded-3xl p-8 text-center shadow-2xl mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-10 h-10 animate-bounce" />
            <h1 className="text-4xl font-bold">
              🦁 Baby Shower Safari - Maximiliano 🐾
            </h1>
            <Heart className="w-10 h-10 animate-pulse text-yellow-300" />
          </div>

          <p className="text-xl opacity-90 mb-6">
            🎁 Aventura Safari: Regalos únicos pensando en tu presupuesto 🌿
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-green-300" />
                <span className="font-semibold text-lg">
                  {stats.totalGifts - stats.totalReserved} Disponibles
                </span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-yellow-300" />
                <span className="font-semibold text-lg">
                  {stats.totalReserved} Reservados
                </span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="w-6 h-6 text-amber-300" />
                <span className="font-semibold text-lg">
                  {stats.percentage}% Completado
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/20 rounded-full h-4 mb-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-yellow-500 h-full transition-all duration-1000 ease-out"
              style={{ width: `${stats.percentage}%` }}
            ></div>
          </div>
          <p className="text-sm opacity-90">Progreso de nuestra aventura safari 🦁</p>
        </div>

        {/* Controls */}
        <div className="bg-amber-50 rounded-3xl shadow-xl p-6 mb-6 border-2 border-green-200">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
              <input
                type="text"
                placeholder="🔍 Buscar regalo, marca, categoría..."
                className="w-full pl-12 pr-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-lg bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowInstructions(true)}
                className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-all shadow-lg"
              >
                <Info className="w-4 h-4" />
                📋 Instrucciones
              </button>
              <button
                onClick={() => setShowReserved(!showReserved)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  showReserved
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                <Filter className="w-4 h-4" />
                {showReserved ? "✅ Reservados" : "📋 Disponibles"}
              </button>
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-xl font-medium hover:bg-yellow-700 transition-all shadow-lg"
              >
                <BarChart3 className="w-4 h-4" />
                📊 Resumen
              </button>
              <button
                onClick={resetAllReservations}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all shadow-lg"
                title="Reiniciar todas las reservas"
              >
                <RefreshCw className="w-4 h-4" />
                🔄 Reset
              </button>
            </div>
          </div>
        </div>

        {/* Instructions Modal */}
        {showInstructions && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-amber-50 rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-green-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-green-800 flex items-center gap-2">
                  🦁 Instrucciones Safari - Baby Shower Maximiliano
                </h3>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <h5 className="text-lg font-bold text-green-700 flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    🐾 Cómo funciona:
                  </h5>
                  <div className="space-y-3 text-sm text-green-800">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">
                        1
                      </div>
                      <p>Explora y selecciona el regalo que quieres dar</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">
                        2
                      </div>
                      <p>Escribe tu nombre completo</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">
                        3
                      </div>
                      <p>Ingresa tu número de celular</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs mt-0.5">
                        4
                      </div>
                      <p>Confirma la reserva ¡y listo!</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-lg font-bold text-amber-700 flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    🌿 Información importante:
                  </h5>
                  <div className="space-y-3 text-sm text-green-800">
                    <p className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>
                        <strong>📦 Etapas Winny:</strong> 0 (hasta 4.5kg) → 1 (4-7kg) → 2 (6-9kg) → 3 (8-12kg) → 4 (10-16kg)
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>
                        <strong>🏷️ Pañales recomendados:</strong> Winny, Pampers
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>
                        <strong>🔒 Una vez reservado, nadie más podrá elegir ese regalo</strong>
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span>
                        <strong>📞 Tu teléfono será visible para coordinación</strong>
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>
                        <strong>🛒 Tiendas:</strong> Alkosto, Falabella, Éxito, Pepe Ganga, D1, Ara
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-yellow-100 rounded-2xl border-2 border-green-300">
                <h5 className="text-lg font-bold text-green-800 mb-4 text-center">
                  🦁 ¡Cada regalo incluye pañales según la etapa! 🌿
                </h5>
                <p className="text-center text-green-700">
                  Los regalos están organizados por edades y cada uno incluye los pañales Winny correspondientes a esa etapa de crecimiento de Maximiliano.
                </p>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg"
                >
                  🦁 ¡Entendido! Comenzar Safari
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Summary Modal */}
        {showSummary && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-amber-50 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border-4 border-green-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-green-800 flex items-center gap-2">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                  Resumen Safari de Regalos
                </h3>
                <button
                  onClick={() => setShowSummary(false)}
                  className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-green-50 p-6 rounded-2xl mb-6 border-2 border-green-200">
                <pre className="whitespace-pre-wrap text-sm text-green-800 font-mono">
                  {generateSummary() || "No hay reservas aún..."}
                </pre>
              </div>

              <div className="text-center space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-100 p-4 rounded-xl border-2 border-green-300">
                    <p className="text-2xl font-bold text-green-700">
                      {stats.totalReserved}
                    </p>
                    <p className="text-sm text-green-600">Reservados</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-xl border-2 border-yellow-300">
                    <p className="text-2xl font-bold text-yellow-700">
                      {stats.totalGifts - stats.totalReserved}
                    </p>
                    <p className="text-sm text-yellow-600">Disponibles</p>
                  </div>
                </div>

                {stats.totalReserved > 0 && (
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-all shadow-lg"
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
            <div className="text-center py-16 bg-amber-50 rounded-3xl shadow-lg border-2 border-green-200">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">
                No se encontraron regalos
              </h3>
              <p className="text-green-600">
                Intenta con otro término de búsqueda
              </p>
            </div>
          ) : (
            Object.entries(groupedGifts).map(([category, categoryGifts]) => (
              <div
                key={category}
                className="bg-amber-50 rounded-3xl shadow-xl p-8 border-2 border-green-200"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-green-200">
                  <Star className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-2xl font-bold text-green-800">
                    {category}
                  </h3>
                  <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {categoryGifts.length} regalo
                    {categoryGifts.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryGifts.map((gift) => (
                    <div
                      key={gift.id}
                      className={`relative group rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                        gift.reserved
                          ? "border-green-500 bg-green-100 shadow-lg"
                          : selectedGift?.id === gift.id
                          ? "border-yellow-500 bg-yellow-100 shadow-xl scale-105"
                          : "border-green-300 bg-white hover:border-yellow-500 hover:shadow-xl hover:scale-105 cursor-pointer"
                      }`}
                      onClick={() => !gift.reserved && handleSelectGift(gift)}
                    >
                      <div className="p-6 h-full flex flex-col">
                        <div className="flex-1 space-y-3">
                          <h4
                            className={`font-bold text-lg leading-tight ${
                              gift.reserved ? "text-green-800" : "text-green-900"
                            }`}
                          >
                            🎁 {gift.gift}
                          </h4>

                          <p className="text-sm text-green-700 leading-relaxed">
                            {gift.description}
                          </p>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              <p className="text-xs font-medium text-green-700">
                                🏪 {gift.store}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                              <p className="text-xs italic text-yellow-700">
                                {gift.brands}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-green-200">
                          {gift.reserved ? (
                            <div className="space-y-3">
                              <div className="bg-green-600 text-white px-4 py-3 rounded-xl text-center text-sm font-medium">
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
                            <button className="w-full bg-green-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-green-700 transition-all">
                              <Gift className="w-4 h-4 mr-2 inline" />
                              Seleccionar Regalo
                            </button>
                          )}
                        </div>
                      </div>

                      {!gift.reserved && (
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
            <div className="bg-amber-50 rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-green-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-3xl font-bold text-green-800">
                  🦁 Reservar Regalo Safari
                </h3>
              </div>

              <div className="bg-green-100 p-6 rounded-2xl mb-6 border-2 border-green-300">
                <h4 className="font-bold mb-3 text-xl text-green-800 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  {selectedGift.gift}
                </h4>
                <p className="text-sm text-green-700 mb-3 leading-relaxed">
                  {selectedGift.description}
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-green-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    🏪 {selectedGift.store}
                  </p>
                  <p className="text-xs italic text-yellow-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    {selectedGift.brands}
                  </p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5 text-green-700" />
                    Tu nombre completo:
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ej: María González"
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all text-lg bg-white"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-green-700" />
                    Tu número de celular:
                  </label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={handlePhoneChange}
                    placeholder="Ej: 320 123 4567"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all text-lg bg-white ${
                      phoneError
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-green-300 focus:border-green-500 focus:ring-green-100"
                    }`}
                    maxLength={13}
                    onKeyPress={(e) => {
                      if (
                        e.key === "Enter" &&
                        userName.trim() &&
                        userPhone.trim() &&
                        !phoneError
                      ) {
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
                  <p className="text-green-600 text-sm mt-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Formato: número colombiano de 10 dígitos
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedGift(null);
                    setPhoneError("");
                  }}
                  className="flex-1 bg-amber-600 text-white text-lg py-4 rounded-xl font-medium hover:bg-amber-700 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReserveGift}
                  disabled={
                    !userName.trim() || !userPhone.trim() || !!phoneError
                  }
                  className="flex-1 bg-green-600 text-white text-lg py-4 rounded-xl font-medium hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  ✅ Confirmar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="text-green-600 text-sm">
            <p className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-yellow-600" />
              🦁 Hecho con amor safari para el Baby Shower de Maximiliano 🌿
              <Heart className="w-4 h-4 text-yellow-600" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}